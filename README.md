# TaterCheck-EfficientNetB0
Official implementation of “Potato Leaf Disease Detection Using EfficientNetB0: A Deep Learning Approach” — a published research project (SACAIM 2024, ISBN: 978-93-89476-71-2) achieving 99.57% accuracy with EfficientNetB0 and deployed using FastAPI + ReactJS for real-time agricultural diagnostics.
# 🥔 Tater-Check: Potato Leaf Disease Detection Using EfficientNetB0

### 📘 Research Paper:
**"Potato Leaf Disease Detection Using EfficientNetB0: A Deep Learning Approach"**  
Authors: Ravi Laxman Molake¹, Chetali V Naik², Srinivas B.L³  
¹ Department of MCA, St Aloysius Institute of Management and IT (AIMIT), Mangalore – 575022, India  
📖 Published in: *International Conference on Advance IT, Engineering and Management (SACAIM 2024, Volume 2)*  
**Publisher:** Infinity Publication (International Edition, Dec 2024)  
**ISBN:** 978-93-89476-71-2 | **DOI:** 10.25215/9389476712  

---

## 🧠 Abstract
Deep learning technologies have introduced innovative solutions for major agricultural challenges such as plant disease identification.  
This project introduces a **transfer learning approach** using **EfficientNetB0**, a pre-trained CNN architecture, to automatically detect **early blight** and **late blight** in potato leaves.  
Using the **PlantVillage dataset**, the model achieved an outstanding **test accuracy of 99.57%**, outperforming traditional CNN and SVM-based methods.  
This research demonstrates the feasibility of applying AI for **real-time, automated plant disease diagnosis** in precision agriculture.

---

## 🚀 Features
- 🌿 Automated Potato Leaf Disease Detection (Early Blight, Late Blight, Healthy)
- 🧩 Transfer Learning using **EfficientNetB0**
- 📈 Achieved **99.57% Test Accuracy**
- ⚙️ Evaluation Metrics: Accuracy, Precision, Recall, F1-Score, AUC-ROC
- 🌍 Full-Stack Deployment with **FastAPI (Backend)** and **ReactJS (Frontend)**
- 📸 Real-time disease classification from user-uploaded images

---

## 📂 Dataset
**Dataset Used:** [PlantVillage Dataset](https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset)  
- Total Images: 2,152 (Potato leaves only)  
- Classes: `Early Blight`, `Late Blight`, `Healthy`  
- Train/Validation/Test Split: **80% / 10% / 10%**  
- Image Size: 224x224 (standardized using TensorFlow preprocessing)

---

## ⚙️ Methodology
### Architecture:
- Base Model: **EfficientNetB0** (pre-trained on ImageNet)
- Fine-tuned layers with:
  - Global Average Pooling  
  - Dense Layer (256 units, ReLU + Dropout 0.5)  
  - Output Layer (3 units, Softmax)
- Optimizer: **Adam (lr = 0.001)**  
- Loss Function: **Sparse Categorical Crossentropy**  
- Epochs: **10**  
- Framework: **TensorFlow / Keras**

### Evaluation Metrics:
| Metric | Value |
|:-------:|:------:|
| Accuracy | 99.57% |
| Precision | 98.95% |
| Recall | 99.10% |
| F1-Score | 99.02% |
| AUC-ROC | 0.99 |

---

## 🧾 Results and Comparison

| Model | Accuracy | Reference |
|--------|-----------|------------|
| K-Means + SVM | 95.0% | Islam et al. (2017) |
| Custom CNN | 97.7% | Krizhevsky et al. (2012) |
| **Proposed EfficientNetB0** | **99.57%** | *This Work* |

The proposed model achieved **superior accuracy** while maintaining **low computational cost** and **faster inference** compared to other CNN architectures.

---

## 🖥️ System Architecture
