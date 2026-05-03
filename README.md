# JH Task Manager 

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

- **Create Tasks** - Add new tasks via a clean form interface
- **Read Tasks** - Display all tasks sorted by creation date (newest first)
- **Update Tasks** - Toggle task status (Done/Pending) with live UI updates
- **Delete Tasks** - Remove tasks instantly with visual feedback
- **Task Filtering** - Filter tasks by status (All, Done, Pending)
- **Loading Indicators** - Smooth loading states for better UX
- **Real-time Stats** - Live counters for total, completed, and pending tasks
- **Progress Bar** - Dynamic progress bar showing completion percentage

### Technical Highlights

- RESTful API with proper HTTP status codes
- SQLite3 database (lightweight, file-based, no server setup)
- CORS-enabled for cross-origin requests
- React hooks for state management (useState, useEffect)
- Modern Glassmorphism UI design with animated gradient background
- Input validation on both frontend and backend
- Error handling with toast notifications
- Responsive design (mobile + desktop)

---

## Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime environment |
| Express.js | Web framework for building RESTful APIs |
| SQLite3 | Lightweight file-based database |
| sqlite | Async/await wrapper for SQLite |
| cors | Cross-origin resource sharing |
| dotenv | Environment variable management |
| nodemon | Auto-restart during development |

### Frontend

| Technology | Purpose |
|------------|---------|
| React 18 | UI library for building the interface |
| CSS3 | Styling with flexbox, grid, glassmorphism, and animations |
| Fetch API | HTTP requests to the backend |

---
## Project Structure

JH-Task-Manager/
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


---

## Prerequisites

Before running the project, ensure you have:

| Requirement | Version | Download Link |
|-------------|---------|---------------|
| Node.js | v14 or higher | nodejs.org |
| npm | Comes with Node.js | - |
| Git | Latest | git-scm.com |

> Note: No MongoDB, MySQL, or external database setup needed. SQLite creates the database file automatically on first run.

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/thawra332/task-manager.git
cd task-manager

**Backend Setup**
Open a terminal and navigate to the backend directory:
cd backend
Install dependencies:
npm install
Create a .env file in the backend directory:
PORT=5000
Start the backend server:
npm run dev # Development mode (with auto-reload)
npm start
The backend will run at: http://localhost:5000
**Note:** The database.sqlite file will be created automatically in the backend folder on first run.
**Frontend Setup**
Open a new terminal (keep the backend running), then navigate to the frontend directory:
cd frontend
Install dependencies:
npm install
Start the React development server:
npm start
The frontend will open automatically at: http://localhost:3000
**NOTE**: Backend runs on port 5000, Frontend runs on port 3000.

---
API Endpoints
Base URL: http://localhost:5000/api

Method	Endpoint	Description	Request Body	Response
GET	/tasks	Get all tasks	-	Array of task objects
POST	/tasks	Create a new task	{ "title": "string" }	Created task object
PUT	/tasks/:id/status	Update task status	{ "status": "pending" or "done" }	Success message
DELETE	/tasks/:id	Delete a task	-	Success message

**Example Response (GET /tasks)
**[
  {
    "id": 1,
    "title": "Complete project documentation",
    "status": "pending",
    "created_at": "2026-05-03 10:30:00"
  },
  {
    "id": 2,
    "title": "Review pull requests",
    "status": "done",
    "created_at": "2026-05-02 15:20:00"
  }
]

**Example Request (POST /tasks)**
{
  "title": "Build the frontend UI"
}

**Example Request (PUT /tasks/1/status)**
{
  "status": "done"
}

---
**Frontend-Backend Integration
**The frontend communicates with the backend using the Fetch API (configured in App.js):
const API_URL = 'http://localhost:5000/api';

// Get all tasks
const res = await fetch(`${API_URL}/tasks`);
const tasks = await res.json();

// Create a new task
const res = await fetch(`${API_URL}/tasks`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: newTitle })
});

// Update task status
await fetch(`${API_URL}/tasks/${id}/status`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: newStatus })
});

// Delete a task
await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });

---

UI Design Highlights
Design Element	Implementation
Background	Animated dark navy gradient with soft blue/purple glow effects
Glassmorphism	Semi-transparent cards with backdrop-filter: blur(14px)
Rounded Corners	20-28px border-radius for modern look
Hover Effects	Smooth transitions (scale, translate, glow) with 0.3s ease
Buttons	Gradient backgrounds (blue to indigo) with hover scaling
Animations	Fade-in, slide-in, shimmer effects, and gradient shifts
Task Icons	Green checkmark appears only for completed tasks
Status Buttons	Done: green transparent glass, Undo: yellow transparent glass
Delete Button	Red transparent glass with hover effect
Responsive	Adapts to all screen sizes (mobile, tablet, desktop)
Color Palette
Color Name	Hex Code	Usage
Dark Navy	#151C35	Base background
Navy Medium	#1A2857	Gradient layer
Bright Blue	#3B5AB6	Buttons, borders, highlights
Light Blue	#98B0F5	Text highlights, progress bar
Soft Blue	#B5C4F0	Secondary text, card borders
White	#FFFFFF	Primary text
Testing the Application
Manual Testing Steps
1. Create a Task

Enter text in the input field

Click "Add Task" button

New task appears at the top of the list

Statistics update automatically

2. Mark Task as Done

Click the "Done" button on any pending task

Button changes to "Undo"

Green checkmark icon appears next to the task

Task text gets strikethrough

Statistics and progress bar update

3. Undo a Completed Task

Click the "Undo" button on a completed task

Green checkmark disappears

Text strikethrough is removed

Task returns to pending state

Statistics and progress bar update

4. Delete a Task

Click the "Delete" button on any task

Task is removed from the list immediately

Statistics update automatically

5. Filter Tasks

Click "All Tasks" - shows all tasks

Click "Pending" - shows only incomplete tasks

Click "Done" - shows only completed tasks

6. Error Handling

Stop the backend server (Ctrl+C in backend terminal)

Try to add a task or refresh the page

Error toast notification appears at bottom-right

Message clears automatically after 3 seconds

Requirements Checklist
Backend Requirements
Requirement	Status
RESTful API with all CRUD operations	Done
Node.js + Express framework	Done
Database (SQLite3)	Done
Organized project structure (Routes, Controllers, Models)	Done
Proper error handling with HTTP status codes	Done
Input validation on server side	Done
Frontend Requirements
Requirement	Status
React user interface	Done
Display list of tasks	Done
Add new task via form	Done
Update task status (Done/Pending)	Done
Delete task functionality	Done
Full API integration	Done
Clean and user-friendly UI	Done
Error messages for user feedback	Done
General Requirements
Requirement	Status
Git repository initialized	Done
Source code organized properly	Done
Comprehensive README with setup instructions	Done
Working frontend-backend integration	Done
Professional code structure	Done
Bonus Features
Feature	Status
Task filtering (Done / Pending / All)	Done
Loading indicators	Done
Improved UX with animations	Done
Glassmorphism modern design	Done
Real-time statistics	Done
Animated progress bar	Done
Troubleshooting
Common Issues and Solutions
Problem	Solution
Port already in use	Backend: Change PORT in .env. Frontend: Use PORT=3001 npm start
Module not found	Run npm install in both frontend and backend folders
API calls fail	Verify backend is running on http://localhost:5000
Tasks not saving	Check if database.sqlite file exists in backend folder
Blank screen	Open browser console (F12) to see JavaScript errors
SQLITE_ERROR: no such table	Delete database.sqlite and restart backend
Database Issues
The SQLite database file (database.sqlite) is created automatically in the backend/ folder on first run. To reset the database:

Stop the backend server (Ctrl+C)

Delete backend/database.sqlite

Restart the backend (the file will be recreated with the tasks table)

CORS Errors
CORS is already enabled in the backend. If you see CORS errors:

Ensure backend is running on port 5000

Ensure frontend is making requests to http://localhost:5000

Check that no other service is blocking port 5000

---

**Environment Variables
**Create .env in the backend/ folder:
PORT=5000
**Note**: No database credentials needed. SQLite is file-based and requires no connection string.

---
**Responsive Design
**Screen Size	Layout
Desktop (>1200px)	3-column stats grid, horizontal form layout, side-by-side buttons
Tablet (768px-1200px)	3-column stats grid with adjusted spacing
Mobile (<768px)	1-column stats grid, vertical form layout, stacked task cards

---
Developer Notes
This project demonstrates:

Full-Stack Development: Complete implementation of both backend API and frontend UI

Database Design: SQLite schema with proper column types (INTEGER, TEXT, DATETIME)

API Design: RESTful principles with appropriate HTTP methods and status codes

Frontend State Management: React hooks (useState, useEffect)

Error Handling: Comprehensive try-catch blocks and user-friendly toast notifications

Code Organization: Clear separation of concerns (MVC pattern)

User Experience: Loading states, animations, glassmorphism, responsive design

Acknowledgments
JH Team for the development task proposal

React for the amazing frontend library

Express.js for the minimalist web framework

SQLite for the lightweight, zero-config database solution

License
ISC License - Open source

Author: thawra332 - JH Team Candidate















## Project Structure
