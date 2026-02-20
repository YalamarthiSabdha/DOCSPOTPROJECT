# Solution Architecture
## Project: DOC-APPOINTMENT – Doctor Appointment Booking System

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                             │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                 React 18 + TypeScript (SPA)                  │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │    │
│  │  │  Redux   │ │  Pages   │ │ Components│ │  React Router│   │    │
│  │  │ Store    │ │  /Views  │ │  (MUI)   │ │     v6       │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │    │
│  └─────────────────────────────────────────────────────────────┘    │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ HTTPS REST API
                               │ Port: 5000
┌──────────────────────────────▼──────────────────────────────────────┐
│                      SERVER (Node.js + Express)                      │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                     Middleware Layer                           │   │
│  │  CORS | Morgan | Express.json | JWT Auth | Multer Upload      │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌────────────────────┐    ┌────────────────────────────────────┐   │
│  │   Routes           │    │        Controllers                  │   │
│  │  /api/v1/users     │───►│  authController.js                  │   │
│  │  /api/v1/doctors   │───►│  userController.js                  │   │
│  └────────────────────┘    │  doctorController.js                │   │
│                             │  errorController.js                 │   │
│                             └────────────────────────────────────┘   │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                      Models (Mongoose)                        │   │
│  │    userModel.js | doctorModel.js | appointmentModel.js        │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ Mongoose ODM
┌──────────────────────────────▼──────────────────────────────────────┐
│                     MongoDB Atlas (Cloud)                             │
│                                                                       │
│  ┌─────────────┐  ┌─────────────────┐  ┌──────────────────────┐    │
│  │   Users     │  │    Doctors      │  │    Appointments      │    │
│  │ Collection  │  │   Collection    │  │     Collection       │    │
│  └─────────────┘  └─────────────────┘  └──────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture

### Folder Structure
```
client/src/
├── assets/              # Images and static assets
├── components/          # Reusable UI components
│   ├── CustomChip/      # Status badge component
│   ├── DatePicker/      # Date selection component
│   ├── Heading/         # Page heading component
│   ├── MUITable/        # Styled data table
│   ├── Navbar/          # Sidebar + AppBar navigation
│   ├── PhoneInput/      # Phone number input
│   ├── PrimaryInput/    # General text input
│   ├── RatingDialog/    # Rating modal component
│   ├── Spinner/         # Loading indicators
│   └── ToastAlert/      # Toast notifications
├── hooks/               # Custom React hooks
│   └── useTypedSelector.ts
├── redux/               # State management
│   ├── store.ts
│   ├── alertSlice.ts
│   ├── auth/authSlice.ts
│   └── api/
│       ├── apiSlice.ts
│       ├── authApiSlice.ts
│       ├── doctorSlice.ts
│       ├── notificationApiSlice.ts
│       └── userSlice.ts
├── routes/              # Route protection
│   ├── ProtectedRoutes.tsx
│   └── PublicRoutes.tsx
├── utils/               # Helper functions
├── views/               # Page components
│   ├── ApplyDoctor/
│   ├── Appointments/
│   ├── Dashboard/
│   ├── Doctors/
│   ├── Login/
│   ├── Notifications/
│   ├── Profile/
│   ├── Signup/
│   └── Users/
├── App.tsx
└── index.tsx
```

### State Management Architecture

```
Redux Store
├── auth (authSlice)
│   └── user: { token, data: { user: { _id, name, email, isDoctor, isAdmin, ... } } }
└── RTK Query APIs (apiSlice)
    ├── authApiSlice     → signup, login
    ├── doctorSlice      → doctor CRUD, appointments
    ├── userSlice        → user appointments, booking, rating
    └── notificationApiSlice → notifications
```

---

## 3. Backend Architecture

### Folder Structure
```
server/
├── controllers/
│   ├── authController.js      # Signup, login, protect middleware
│   ├── userController.js      # Appointments, booking, rating, admin
│   ├── doctorController.js    # Doctor CRUD, approval
│   └── errorController.js     # Global error handler
├── models/
│   ├── userModel.js           # User schema
│   ├── doctorModel.js         # Doctor schema
│   └── appointmentModel.js    # Appointment schema
├── routes/
│   ├── userRoutes.js          # User-related routes
│   └── doctorRoutes.js        # Doctor-related routes
├── utils/
│   ├── appError.js            # Custom error class
│   └── catchAsync.js          # Async error wrapper
├── uploads/                   # MBBS certificate uploads
├── app.js                     # Express app setup
└── server.js                  # Server entry point
```

### Request-Response Flow

```
Client Request
     │
     ▼
Express App (app.js)
     │
     ▼
Middleware (CORS → Morgan → JSON Parser → JWT Auth)
     │
     ▼
Route Handler (/api/v1/users | /api/v1/doctors)
     │
     ▼
Controller (authController | userController | doctorController)
     │
     ▼
Model (Mongoose → MongoDB)
     │
     ▼
Response (JSON)
     │
     ▼
Client receives data → Redux Store updated → React UI re-renders
```

---

## 4. Authentication Flow

```
User Login/Signup
      │
      ▼
Server validates credentials
      │
      ▼
JWT Token generated (signToken with user._id)
      │
      ▼
Response: { status, token, data: { user } }
      │
      ▼
Client: dispatch(setUser()) → localStorage.setItem("user")
      │
      ▼
All subsequent requests: Authorization: Bearer <token>
      │
      ▼
Server: protect middleware verifies token → req.user = freshUser
```

---

## 5. File Upload Architecture

```
Client: Selects certificate file
      │
      ▼
FormData object created (append file + userId)
      │
      ▼
POST /api/v1/doctors/signup (multipart/form-data)
      │
      ▼
Multer middleware:
  - Validates file type (PDF/JPG/JPEG/PNG)
  - Validates file size (max 5MB)
  - Saves to server/uploads/ with unique filename
      │
      ▼
File path stored in Doctor document (certificate field)
      │
      ▼
File served statically at /uploads/<filename>
```

---

## 6. Notification Architecture

```
Event Occurs (e.g., new appointment booked)
      │
      ▼
Controller finds relevant user(s)
      │
      ▼
Pushes notification object to unseenNotifications array
  { type, message, onClickPath }
      │
      ▼
User data updated in MongoDB
      │
      ▼
Client: Navbar reads unseenNotifications from Redux
      │
      ▼
Badge count shown on notification bell icon
      │
      ▼
User clicks bell → /notifications page
      │
      ▼
Mark as seen: unseenNotifications → seenNotifications
```

---

## 7. Role-Based Access Control (RBAC)

| Role | isAdmin | isDoctor | Access |
|---|---|---|---|
| User (Patient) | false | false | Home, Appointments, Profile |
| Doctor | false | true | Home, Apply Doctor, Appointments, Completed, Profile |
| Admin | true | false | Home, Users, Doctors, Profile |

---

*Document prepared for: DOC-APPOINTMENT Project*
*Date: February 2026*
