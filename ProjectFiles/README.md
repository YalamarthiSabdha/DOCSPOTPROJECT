# DOC-APPOINTMENT — Doctor Appointment Booking System

A full-stack MERN web application that allows patients to search for doctors and book appointments online. Doctors can manage appointment requests and their profiles. Administrators can oversee all users, doctors, and appointments from a dedicated panel.

---

## Project Structure

```
ProjectFiles/
├── client/          # React 18 frontend (TypeScript)
└── server/          # Node.js + Express backend
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Material UI v5, Redux Toolkit, RTK Query |
| Backend | Node.js v22, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JWT (JSON Web Tokens), bcryptjs |
| File Upload | Multer |
| Forms | Formik + Yup |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- MongoDB Atlas account

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd DOC-APPOINTMENT/ProjectFiles
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
NODE_ENV=development
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/doc-appointment
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d
```

Start the server:

```bash
npm start
```

Server runs at **http://localhost:5000**

### 3. Setup the Frontend

```bash
cd client
npm install
npm start
```

Frontend runs at **http://localhost:3000**

---

## User Roles

| Role | Access |
|---|---|
| **Patient** | Browse doctors, book appointments, view notifications |
| **Doctor** | Manage appointment requests, update profile, apply with credentials |
| **Admin** | Manage all users, approve/reject doctors, view all appointments |

---

## Key Features

- Role-based registration and login (Patient / Doctor)
- Doctor application form with document upload (PDF/JPG/PNG, max 5 MB)
- Appointment booking with date and time selection
- Real-time status updates: Pending → Approved / Rejected / Completed
- In-app notification system
- Admin panel for platform management
- Responsive UI with violet/purple gradient design theme

---

## Environment Variables

See `server/.env` for backend configuration and `client/.env` for frontend API base URL.

---

## Available Scripts

### Backend (`server/`)

| Command | Description |
|---|---|
| `npm start` | Start the Express server |
| `npm run dev` | Start with nodemon (auto-restart) |

### Frontend (`client/`)

| Command | Description |
|---|---|
| `npm start` | Start development server |
| `npm run build` | Create production build |
| `npm test` | Run test suite |
