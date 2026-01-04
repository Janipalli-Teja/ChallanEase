# 🚦 ChallanEase - Smart E-Challan System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-blueviolet)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

**ChallanEase** is a modern, efficient E-Challan Generation System designed to streamline the work of traffic officers. Developed as a Progressive Web App (PWA), it allows for quick capturing of vehicle details, automated OCR-based number extraction, and instant challan generation.

---

## ✨ Key Features

- **📱 PWA Integration**: Works seamlessly on mobile devices and can be installed as a standalone app.
- **🔐 Secure Authentication**: Integrated signup and login system for traffic officers using session-based authentication.
- **📸 Image Upload & OCR**: Capture vehicle photos directly from the camera or upload them. The system uses **EasyOCR** (Python) to extract vehicle numbers automatically.
- **📝 Quick Challan Generation**: Pre-filled forms with dropdown selections for violations and fines, reducing manual entry errors.
- **📊 Database Integration**: All records are securely stored in MongoDB for easy tracking and retrieval.
- **🎨 Responsive UI**: A clean, user-friendly interface optimized for both desktop and mobile views.

---

## 🛠️ Tech Stack

### Frontend
- **HTML5 & CSS3**: Responsive layout and modern styling.
- **JavaScript (Vanilla)**: Core logic and PWA service workers.
- **PWA**: Manifest and Service Workers for offline capabilities and installation.

### Backend
- **Node.js & Express**: Robust server-side architecture.
- **MongoDB & Mongoose**: Scalable NoSQL database and schema modeling.
- **Python (EasyOCR)**: High-performance OCR for vehicle number plate extraction.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **Python 3.x**
- **MongoDB** (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Janipalli-Teja/ChallanEase.git
   cd ChallanEase
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Install Python dependencies:**
   ```bash
   pip install easyocr
   ```

4. **Environment Setup:**
   Create a `.env` file in the root directory and add your MongoDB URI:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

### Running the Application

1. **Start the server:**
   ```bash
   npm start
   ```
2. **Access the app:**
   Open your browser and navigate to `http://localhost:3000`.

---

## ⚙️ Backend Architecture

The backend of **ChallanEase** is built with efficiency and modularity in mind, combining a robust Node.js server with Python's machine learning capabilities for image processing.

### API Documentation

#### 🔐 User Authentication (`/user`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/signup` | Registers a new officer account. |
| `POST` | `/login` | Authenticates user and starts a session (HTTP-only cookie). |

#### 📝 Challan Management (`/api`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/challan` | Returns all generated challans from the database. |
| `POST` | `/submit-pic` | Uploads a vehicle image using Multer and returns a unique `imageID`. |
| `POST` | `/generate` | Finalizes challan creation with vehicle number, violation type, and fine amount. |

### OCR Engine Integration
The backend leverages a **Python Bridge** to perform OCR. When an image is processed:
1. The Node.js server receives the image via Multer.
2. A child process spawns the `ocr.py` script.
3. **EasyOCR** (PyTorch based) extracts the text strings from the vehicle plate.
4. The results are piped back to the server as JSON for form auto-filling.

---

## 📂 Project Structure

```text
ChallanEase/
├── controllers/    # Request handlers and business logic
├── middileware/    # File upload (Multer) and auth middleware
├── model/          # MongoDB schemas (User, Challan)
├── public/         # Static files (HTML, CSS, JS, PWA assets)
├── routes/         # Express API routes
├── service/        # Auth and helper services
├── ocr.py          # Python script for OCR extraction
├── app.js          # Main entry point
└── connection.js   # MongoDB connection logic
```
Collabrators
     -Teja-Janipalli
     -MrudhulaEdarapalli
