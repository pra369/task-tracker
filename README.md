# ✅ TaskTracker — MERN Stack Web Application

A full-stack Task Tracker application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) as part of the Full Stack Developer Internship assignment at Coll-Edge Connect.

## 🌐 Live Demo

- **Frontend:** https://task-tracker-git-main-pra369s-projects.vercel.app
- **Backend API:** https://loving-nourishment-production-e82e.up.railway.app

## 💻 GitHub Repository

https://github.com/pra369/task-tracker

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Deployment | Vercel (Frontend), Railway (Backend) |

## ✨ Features

### Mandatory Features
- ✅ Create, View, Update & Delete Tasks (CRUD)
- ✅ Form Validation
- ✅ REST APIs
- ✅ MongoDB Integration
- ✅ Responsive UI
- ✅ Dynamic updates without page refresh

### Bonus Features
- 🔍 Search tasks by title/description
- 🎯 Filter by Status (Pending, In Progress, Completed)
- 🔥 Filter by Priority (High, Medium, Low)
- 📊 Sort by Date, Priority, Title
- 📅 Due Date with Overdue alerts
- 🏷️ Tags support
- 📈 Stats Dashboard
- 🔔 Toast Notifications
- 🌙 Professional Dark Theme UI
- ♻️ Reusable Components
- 🔐 Environment Variables

## 📁 Project Structure 
task-tracker/

├── backend/

│   ├── controllers/

│   │   └── taskController.js

│   ├── middleware/

│   │   └── errorHandler.js

│   ├── models/

│   │   └── Task.js

│   ├── routes/

│   │   └── taskRoutes.js

│   ├── .env

│   ├── package.json

│   └── server.js

└── frontend/

├── src/

│   ├── components/

│   │   ├── Navbar.jsx

│   │   ├── TaskCard.jsx

│   │   ├── TaskForm.jsx

│   │   ├── TaskFilters.jsx

│   │   ├── StatsBar.jsx

│   │   └── Toast.jsx

│   ├── context/

│   │   └── TaskContext.jsx

│   ├── pages/

│   │   └── Home.jsx

│   ├── utils/

│   │   └── api.js

│   ├── App.jsx

│   └── App.css

├── .env

└── package.json

## 🚀 Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
'''

**frontend/.env**
VITE_API_URL=http://localhost:5000/api

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get task by ID |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/:id | Update task |
| PATCH | /api/tasks/:id/status | Update task status |
| DELETE | /api/tasks/:id | Delete task |
| GET | /api/tasks/stats | Get task statistics |

## 👩‍💻 Developer

**Pradnya Bhosale**
- GitHub: https://github.com/pra369

---
