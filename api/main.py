from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
from io import BytesIO
import tensorflow as tf
import logging
from tensorflow.keras.applications.efficientnet import preprocess_input


logger = logging.getLogger("uvicorn.error")


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


try:
    DISEASE_MODEL = tf.keras.models.load_model(r"..\saved_models\1\best_potato_model.h5")
    LEAF_DETECTOR = tf.keras.models.load_model(r"..\saved_models\2\potato_leaf_detector.h5")
except Exception as e:
    logger.error(f"Error loading models: {str(e)}")
    raise RuntimeError("Error loading models")

LEAF_DETECTOR.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)


CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]


CONFIDENCE_THRESHOLD = 0.3

def read_file_as_image(data: bytes) -> np.ndarray:
    
    try:
        image = Image.open(BytesIO(data)).convert("RGB").resize((224, 224))  
        image = np.array(image)
        image = preprocess_input(image)  
        return image
    except Exception as e:
        logger.error(f"Error reading the uploaded image: {str(e)}")
        raise HTTPException(status_code=400, detail="Error reading the uploaded image")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
   
    logger.info(f"Received file: {file.filename}")
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

    try:
        
        contents = await file.read()
        image = read_file_as_image(contents)
        img_batch = np.expand_dims(image, 0)  # Add batch dimension

        # Check if the image is a potato leaf
        leaf_predictions = LEAF_DETECTOR.predict(img_batch)
        logger.info(f"Leaf predictions for {file.filename}: {leaf_predictions}")
        is_potato_leaf = np.argmax(leaf_predictions[0]) == 1
        leaf_confidence = np.max(leaf_predictions[0])
        logger.info(f"Leaf confidence: {leaf_confidence}")

        if not is_potato_leaf or leaf_confidence < CONFIDENCE_THRESHOLD:
            return JSONResponse(
                status_code=400,
                content={"error": "The uploaded image does not appear to be a potato leaf. Please upload a valid potato leaf image."},
            )

        # Perform disease classification
        disease_predictions = DISEASE_MODEL.predict(img_batch)
        predicted_class = CLASS_NAMES[np.argmax(disease_predictions[0])]
        confidence = float(np.max(disease_predictions[0]))

        return {
            "class": predicted_class,
            "confidence": confidence,
            "message": "Prediction successful",
        }

    except Exception as e:
        logger.error(f"Error occurred during prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred during prediction: {str(e)}")

@app.get("/")
def root():
    
    return {"message": "Potato Leaf Disease Detection API is running."}
