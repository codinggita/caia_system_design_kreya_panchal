# ⚙️ CAIA Backend – Cognitive AI Architecture Backend API

This directory contains the **Node.js + Express.js backend** for the CAIA System Design Knowledge Base. 

It implements a clean, modular architecture utilizing ES Modules (`"type": "module"`) and native Node.js configurations without unnecessary heavy third-party dependencies.

---

## 🛠️ Tech Stack

*   **Runtime:** Node.js (>= v22.20.0)
*   **Framework:** Express.js (v5.2.1)
*   **Database ODM:** Mongoose (v9.6.3)
*   **Database:** MongoDB

---

## 📂 Project Directory Structure

```bash
Backend/
├── src/
│   ├── config/
│   │   ├── db.js            # MongoDB / Mongoose connection setup
│   │   └── env.js           # Environment variable loading & validation
│   ├── controllers/
│   │   └── healthController.js # Health-check logic
│   ├── routes/
│   │   ├── healthRoutes.js  # Router mapping for health endpoint
│   │   └── index.js         # API v1 Global Routing Index
│   └── app.js               # Express application initialization & middleware
├── server.js                # App entry point (listener & process handles)
├── .env                     # Local environment variables
└── README.md                # Developer documentation (this file)
```

---

## ⚙️ Configuration & Environment Variables

Environment variables are loaded natively using Node.js's built-in `process.loadEnvFile()` (available in Node.js 20.6.0+). The system checks the root of the Backend folder for a `.env` file containing:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_uri
NODE_ENV=development
```

---

## 🚀 Getting Started

### 1️⃣ Installation
Ensure you are in the `Backend` directory, then install the dependencies:
```bash
npm install
```

### 2️⃣ Running the App

*   **Production Mode:**
    ```bash
    npm start
    ```
*   **Development Mode (Nodemon):**
    ```bash
    npx nodemon server.js
    ```

---

## 🔗 REST API Endpoints

### 🏥 Health Check Endpoint

Returns current service status, uptime, system resources, and database connectivity.

*   **URL:** `/api/v1/health`
*   **Method:** `GET`
*   **Success Response (Status: `200 OK`):**
    ```json
    {
      "status": "UP",
      "timestamp": "2026-06-07T08:00:00.000Z",
      "uptime": "15s",
      "database": {
        "status": "connected",
        "readyState": 1
      },
      "system": {
        "memoryUsage": {
          "rss": "35 MB",
          "heapTotal": "10 MB",
          "heapUsed": "6 MB"
        },
        "nodeVersion": "v22.20.0",
        "platform": "win32"
      }
    }
    ```
*   **Degraded/Failure Response (Status: `503 Service Unavailable`):**
    Returned if the application cannot connect to the database.
    ```json
    {
      "status": "DOWN",
      "timestamp": "2026-06-07T08:00:00.000Z",
      "uptime": "2s",
      "database": {
        "status": "disconnected",
        "readyState": 0
      },
      "system": { ... }
    }
    ```

---

## 🛡️ Architecture & Design Decisions

1.  **ES Modules:** Native `import`/`export` syntax is used across the codebase. Remember to use explicit `.js` extensions for relative file imports inside the project.
2.  **Graceful Error-Handling Middleware:** Standardized error formats are processed globally in `src/app.js` with structured error logging. Uncaught exceptions and unhandled promise rejections are handled in `server.js` to ensure the process shuts down cleanly.
3.  **Lifecycle Logs:** Mongoose connections log when they are `connected`, `error`, `disconnected`, and `reconnected`, helping monitor database status in production logs.
4.  **Zero-Dependency CORS:** Configured as custom middleware headers within Express, minimizing external npm dependency clutter.
