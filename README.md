# 🚀 CAIA – Cognitive AI Architecture  
### ⚡ Full Stack System Design (Frontend + Backend)

<p align="center">
  <b>Build Scalable, Intelligent & Production-Ready Full Stack Applications</b><br>
  Backend (Node.js) + Frontend (React) + Clean Architecture
</p>

---

## 🌟 Overview
**CAIA (Cognitive AI Architecture)** is a **Full Stack System Design Project** that demonstrates how to build scalable, maintainable, and production-ready applications.

It includes:
- 🌐 Frontend (React UI)
- ⚙️ Backend (Node.js + Express API)
- 🧠 System Design Architecture
- 🔐 Secure Authentication System

---

## ✨ Features

### 🔐 Backend
- JWT Authentication & Authorization  
- RESTful API Design  
- Knowledge Base CRUD  
- Dashboard APIs  
- Middleware & Error Handling  

### 🎨 Frontend
- Modern UI using React  
- API Integration (Axios/Fetch)  
- Responsive Design  
- Component-based Architecture  

---

## 🧠 Tech Stack

| Layer        | Technology |
|-------------|-----------|
| Frontend    | React.js, Vite |
| Backend     | Node.js, Express.js |
| Database    | MongoDB (Mongoose) |
| Auth        | JWT, bcrypt |
| Architecture| MVC Pattern |
| Tools       | Git, Postman |

---

## 📂 Project Structure

```bash
caia-system-design/
│
├── frontend/              # React App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/      # API calls
│   │   └── App.jsx
│   └── package.json
│
├── backend/               # Node.js API
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔗 API Endpoints (Backend)

### 🔐 Authentication
```bash
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

### 📚 Knowledge Base
```bash
GET    /api/knowledge
GET    /api/knowledge/:id
POST   /api/knowledge
PUT    /api/knowledge/:id
DELETE /api/knowledge/:id
```

### 📊 Dashboard
```bash
GET /api/dashboard
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/kreya228/caia-system-design.git
cd caia-system-design
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

Run backend:
```bash
npm run dev
```

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```bash
http://localhost:5173
```

---

## 🔄 API Integration
Frontend connects to backend using:

```js
const BASE_URL = "http://localhost:5000/api";
```

---

## 🚀 Usage

- Open frontend in browser  
- Register/Login user  
- Perform CRUD operations  
- View dashboard data  

---

## 🔐 Security
- Password hashing using bcrypt  
- JWT-based authentication  
- Protected API routes  

---

## 📈 Future Scope
- AI Recommendation System  
- Advanced Dashboard UI  
- Role-based access control  
- Real-time features (WebSockets)  
- Deployment (AWS / Vercel / Render)  

---

## 🎯 System Design Highlights
- Full Stack Architecture  
- Separation of Concerns  
- Scalable API Design  
- Modular Codebase  

---

## 👩‍💻 Author
**Kreya Panchal**  

GitHub: https://github.com/kreya228  

---
