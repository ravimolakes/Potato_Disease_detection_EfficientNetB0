import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import Clear from "@material-ui/icons/Clear";
import axios from "axios";
import { common } from "@material-ui/core/colors";
import backgroundImage from "../assets/images/bg.png"; // Ensure the path is correct

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "93vh",
    marginTop: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    maxWidth: 600,
    width: "100%",
    textAlign: "center",
  },
  imageCard: {
    maxWidth: 500,
    margin: "auto",
    boxShadow: theme.shadows[5],
  },
  media: {
    maxHeight: 400,
    maxWidth: "100%",
    objectFit: "contain",
    margin: "auto",
  },
  resultContainer: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    border: "1px solid #ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  buttonGrid: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  loader: {
    margin: theme.spacing(2, 0),
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    "&:hover": { backgroundColor: "#ffffff7a" },
  },
}))(Button);

const ImageUpload = () => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendFile = useCallback(async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      try {
        setIsLoading(true);
        let res = await axios.post(process.env.REACT_APP_API_URL, formData);
        if (res.status === 200) {
          setData(res.data);
        } else {
          setData({ error: "An unexpected error occurred. Please try again." });
        }
      } catch (error) {
        setData({
          error: error.response ? error.response.data.error : "An unexpected error occurred.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  }, [selectedFile, image]);

  const onSelectFile = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        setImage(true);
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };

  useEffect(() => {
    if (image && !data) sendFile();
  }, [image, data, sendFile]);

  const clearData = () => {
    setPreview(null);
    setImage(false);
    setData(null);
  };

  const goToSolution = () => {
    if (data?.class) {
      const disease = data.class.toLowerCase().replace(" ", "-");
      history.push(`/solution/${disease}`);
    }
  };

  return (
    <Container className={classes.mainContainer}>
      <div className={classes.contentContainer}>
        <Card className={classes.imageCard}>
          {image ? (
            <>
              <CardMedia
                component="img"
                alt="Selected"
                height="400"
                image={preview}
                title="Selected Image"
                className={classes.media}
              />
              <CardContent>
                {isLoading ? (
                  <CircularProgress className={classes.loader} />
                ) : (
                  <div className={classes.resultContainer}>
                    {data?.error ? (
                      <Typography color="error">{data.error}</Typography>
                    ) : (
                      data && (
                        <>
                          <Typography>{data.class}</Typography>
                          <Typography>{`Confidence: ${(data.confidence * 100).toFixed(2)}%`}</Typography>
                        </>
                      )
                    )}
                  </div>
                )}
              </CardContent>
            </>
          ) : (
            <CardContent>
              <Typography variant="h6">Upload Image Here</Typography>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                onChange={onSelectFile}
                dropzoneText="Drag and drop an image or click to select"
                showPreviews={false}
                showPreviewsInDropzone={false}
                maxFileSize={16000000}
                filesLimit={1}
              />
            </CardContent>
          )}
        </Card>
        <div className={classes.buttonGrid}>
          <ColorButton variant="outlined" onClick={clearData} startIcon={<Clear />}>
            Clear
          </ColorButton>
          {data?.class && (
            <ColorButton variant="contained" color="primary" onClick={goToSolution}>
              View Solution
            </ColorButton>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ImageUpload;
