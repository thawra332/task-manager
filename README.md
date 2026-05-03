# JH Task Manager - TaskFlow

A full-stack task management system built with **Node.js + Express** backend and **React** frontend, featuring a modern glassmorphism UI, real-time statistics, and smooth animations.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Frontend-Backend Integration](#frontend-backend-integration)
- [UI Design Highlights](#ui-design-highlights)
- [Testing the Application](#testing-the-application)
- [Requirements Checklist](#requirements-checklist)
- [Troubleshooting](#troubleshooting)
- [Environment Variables](#environment-variables)

---

## Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Create Tasks** | Add new tasks via a clean form interface |
| **Read Tasks** | Display all tasks sorted by creation date (newest first) |
| **Update Tasks** | Toggle task status (Done/Pending) with live UI updates |
| **Delete Tasks** | Remove tasks instantly with visual feedback |
| **Task Filtering** | Filter tasks by status (All, Done, Pending) |
| **Loading Indicators** | Smooth loading states for better UX |
| **Real-time Stats** | Live counters for total, completed, and pending tasks |
| **Progress Bar** | Dynamic progress bar showing completion percentage |

### Technical Highlights

- **RESTful API** with proper HTTP status codes
- **SQLite3** database (lightweight, file-based, no server setup)
- **CORS-enabled** for cross-origin requests
- **React hooks** for state management (useState, useEffect)
- **Glassmorphism** UI design with animated gradient background
- **Input validation** on both frontend and backend
- **Error handling** with toast notifications
- **Responsive design** (mobile + desktop)

---

## Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for building RESTful APIs |
| **SQLite3** | Lightweight file-based database |
| **sqlite** | Async/await wrapper for SQLite |
| **cors** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |
| **nodemon** | Auto-restart during development |

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library for building the interface |
| **CSS3** | Styling with flexbox, grid, glassmorphism, and animations |
| **Fetch API** | HTTP requests to the backend |

---

## Project Structure
JH-Task-Manager/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ │ └── taskController.js
│ │ ├── models/
│ │ │ └── taskModel.js
│ │ ├── routes/
│ │ │ └── taskRoutes.js
│ │ └── db/
│ │ └── connection.js
│ ├── server.js
│ ├── .env
│ ├── .gitignore
│ ├── database.sqlite
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── App.js
│ │ ├── index.js
│ │ └── index.css
│ ├── public/
│ │ └── index.html
│ ├── .gitignore
│ └── package.json
│
└── README.md

text

---

## Prerequisites

Before running the project, ensure you have:

| Requirement | Version | Download Link |
|-------------|---------|---------------|
| **Node.js** | v14 or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | Comes with Node.js | - |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

> **Note:** No MongoDB, MySQL, or external database setup needed. SQLite creates the database file automatically on first run.

---

## Installation & Setup

1. Clone the Repository
git clone https://github.com/thawra332/task-manager.git
cd task-manager
2. Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file:

PORT=5000

Start the backend server:

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

The backend will run at:
👉 http://localhost:5000

Note: The database.sqlite file will be created automatically on first run.

3. Frontend Setup

Open a new terminal and run:

cd frontend
npm install
npm start

The frontend will run at:
👉 http://localhost:3000

Important: Backend runs on port 5000, frontend on 3000.

API Endpoints

Base URL: http://localhost:5000/api

Method	Endpoint	Description	Request Body	Response
GET	/tasks	Get all tasks	-	Array of tasks
POST	/tasks	Create task	{ "title": "string" }	Created task
PUT	/tasks/:id/status	Update status	{ "status": "done" }	Success message
DELETE	/tasks/:id	Delete task	-	Success message
Example Response (GET /tasks)
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "status": "pending",
    "created_at": "2026-05-03 10:30:00"
  }
]
Example Request (POST /tasks)
{
  "title": "Build the frontend UI"
}
Example Request (PUT /tasks/:id/status)
{
  "status": "done"
}
Frontend-Backend Integration
const API_URL = 'http://localhost:5000/api';

// Get tasks
await fetch(`${API_URL}/tasks`);

// Create task
await fetch(`${API_URL}/tasks`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: newTitle })
});

// Update task
await fetch(`${API_URL}/tasks/${id}/status`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: newStatus })
});

// Delete task
await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
UI Design Highlights
Element	Description
Background	Animated dark gradient
Glassmorphism	Blur + transparency
Buttons	Gradient with hover
Animations	Smooth transitions
Responsive	Mobile + Desktop
Testing the Application
1. Create Task
Enter text
Click Add Task
Task appears instantly
2. Mark as Done
Click Done
Task updates + stats update
3. Delete Task
Click Delete
Task removed immediately
Requirements Checklist
Backend
Requirement	Status
CRUD API	✅
Express	✅
SQLite	✅
Frontend
Requirement	Status
React UI	✅
API Integration	✅
UX Design	✅
Troubleshooting
Problem	Solution
Port in use	Change .env
Modules missing	npm install
API not working	Check backend running
Environment Variables
PORT=5000
Responsive Design
Screen	Layout
Desktop	3 columns
Tablet	Adjusted grid
Mobile	1 column
Developer Notes
Full-stack (React + Node.js)
RESTful API
Clean MVC structure
Smooth UX + animations
License

ISC License

Author

thawra332
