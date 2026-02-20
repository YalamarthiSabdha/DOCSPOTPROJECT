# DOC-APPOINTMENT — Backend (Server)

Node.js + Express.js REST API for the DOC-APPOINTMENT doctor appointment booking system.

---

## Folder Structure

```
server/
├── app.js                  # Express app setup, middleware, routes
├── server.js               # Server entry point, MongoDB connection
├── .env                    # Environment variables (not committed to Git)
├── controllers/
│   ├── authController.js   # Signup, Login, JWT protect middleware
│   ├── userController.js   # User info, doctor list, appointments, notifications
│   ├── doctorController.js # Doctor applications, appointment management
│   └── errorController.js  # Global error handler
├── middleware/
│   └── upload.js           # Multer file upload configuration
├── models/
│   ├── userModel.js        # User schema (isAdmin, isDoctor, notifications)
│   ├── doctorModel.js      # Doctor profile schema (status, timings, fees)
│   └── appointmentModel.js # Appointment schema (userId, doctorId, date, status)
├── routes/
│   ├── userRoutes.js       # /api/v1/user/* endpoints
│   └── doctorRoutes.js     # /api/v1/doctor/* endpoints
├── uploads/
│   └── certificates/       # Uploaded doctor credential files
└── utils/
    ├── appError.js         # Custom operational error class
    └── catchAsync.js       # Async/await error wrapper
```

---

## Setup

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Create `.env` file

```env
PORT=5000
NODE_ENV=development
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/doc-appointment
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=30d
```

### 3. Start the server

```bash
npm start
```

Server runs at **http://localhost:5000**

---

## API Endpoints

### Auth Routes — `/api/v1/user`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | No | Register a new user (patient or doctor) |
| POST | `/login` | No | Login and receive a JWT token |
| GET | `/get-user-info` | Yes | Get current logged-in user info |
| PUT | `/update-profile` | Yes | Update user profile |

### User Routes — `/api/v1/user`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/apply-doctor` | Yes | Submit doctor application with documents |
| GET | `/get-all-doctors` | Yes | Get all approved doctors |
| POST | `/book-appointment` | Yes | Book an appointment |
| GET | `/get-all-appointments` | Yes | Get all appointments for the current user |
| GET | `/get-all-notifications` | Yes | Get all notifications |
| POST | `/mark-all-notifications-as-seen` | Yes | Mark all notifications as read |
| POST | `/delete-all-notifications` | Yes | Delete all seen notifications |

### Admin Routes — `/api/v1/user` (Admin only)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/get-all-users` | Yes (Admin) | Get all registered users |

### Doctor Routes — `/api/v1/doctor`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/get-all-doctors` | Yes (Admin) | Get all doctor applications |
| POST | `/change-doctor-account-status` | Yes (Admin) | Approve or reject a doctor |
| GET | `/get-doctor-info` | Yes | Get doctor profile by userId |
| POST | `/update-doctor-profile` | Yes | Update doctor profile |
| GET | `/get-doctor-appointments` | Yes (Doctor) | Get all appointments for a doctor |
| POST | `/update-appointment-status` | Yes (Doctor) | Accept, reject, or complete an appointment |

---

## Authentication

All protected endpoints require the following header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are issued on login/register and expire based on `JWT_EXPIRES_IN` in `.env`.

---

## File Uploads

Handled by Multer (`middleware/upload.js`):

- **Accepted types:** PDF, JPG, JPEG, PNG
- **Max size:** 5 MB
- **Storage location:** `uploads/certificates/`
- **Naming:** `<timestamp>-<original_filename>`

---

## Error Handling

All errors flow through `controllers/errorController.js`. Operational errors use the custom `AppError` class. Unhandled async errors are caught by `catchAsync.js`.

---

## Dependencies

| Package | Purpose |
|---|---|
| express | HTTP server framework |
| mongoose | MongoDB ODM |
| jsonwebtoken | JWT token generation and verification |
| bcryptjs | Password hashing (cost 12) |
| multer | File upload handling |
| morgan | HTTP request logging |
| dotenv | Environment variable loading |
| cors | Cross-origin resource sharing |
| validator | Input format validation |
