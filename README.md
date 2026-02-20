# 🏥 Doctor Appointment Booking System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing doctor appointments with role-based access control for Admin, Doctor, and Patient users.

![Node.js](https://img.shields.io/badge/Node.js-18.14.2-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [User Roles](#-user-roles)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based secure authentication
- Role-based access control (Admin, Doctor, Patient)
- Protected routes and API endpoints
- First user automatically becomes Admin

### 👨‍⚕️ Doctor Management
- Doctor application and approval system
- Profile management with specialization
- Working hours configuration
- Fee per consultation setup

### 📅 Appointment System
- Real-time appointment booking
- Availability checking
- Conflict prevention (no double booking)
- Appointment approval/rejection by doctors
- Status tracking (Pending, Approved, Rejected)

### 🔔 Notification System
- Real-time notifications
- Unseen notification badges
- Notification for:
  - Doctor application status
  - New appointment requests
  - Appointment status changes
- Mark all as read functionality

### 👥 User Management (Admin)
- View all registered users
- Approve/reject doctor applications
- Delete users
- Monitor system activity

### 💼 Additional Features
- Responsive design for all devices
- Phone number masking for privacy
- Form validation
- Loading states and error handling
- Toast notifications
- Professional UI with Material-UI

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **Material-UI (MUI)** - Component library
- **React Router v6** - Routing
- **Formik & Yup** - Form handling and validation
- **Day.js** - Date manipulation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Moment.js** - Date/time handling
- **Validator** - Input validation

## 📦 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18.14.2 or higher)
- **npm** (v9.5.0 or higher)
- **MongoDB** (local or Atlas connection)
- **Git**

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd DOC-APPOINTMENT
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
```bash
cd ../client
npm install --legacy-peer-deps
```

### 4. Configure Environment Variables

#### Server Configuration
Create `.env` file in the `server` directory:
```env
NODE_ENV=development
PORT=5000
DATABASE=mongodb://localhost:27017/doc-app
JWT_SECRET=YourJWTSecretKeyHere
```

For MongoDB Atlas (cloud):
```env
DATABASE=mongodb+srv://username:password@cluster.mongodb.net/doc-app?retryWrites=true&w=majority
```

#### Client Configuration
The client already has `.env.development` file:
```env
REACT_APP_API_URL=http://127.0.0.1:5000/api/v1/
```

## 🎮 Running the Application

### Development Mode

#### Option 1: Separate Terminals

**Terminal 1 - Start Server**
```bash
cd server
npm run server
```
Server runs on: http://localhost:5000

**Terminal 2 - Start Client**
```bash
cd client
npm start
```
Client runs on: http://localhost:3000

#### Option 2: Production Mode

Build the client:
```bash
cd client
npm run build
```

Set server environment to production:
```env
NODE_ENV=production
```

Start server:
```bash
cd server
npm start
```

Access app at: http://localhost:5000

## 👤 User Roles

### 1. Admin (First User)
The first user who signs up automatically becomes the Admin.

**Capabilities:**
- View and manage all users
- Approve/reject doctor applications
- Delete users
- Access all system features

**Access:**
- All pages
- Admin dashboard
- User management
- Doctor management

### 2. Doctor (Approved User)
Regular users who applied as doctors and got approved by admin.

**Capabilities:**
- View appointment requests
- Approve/reject appointments
- Manage working hours
- Update profile
- Book appointments with other doctors

**Access:**
- Doctor appointments page
- Personal appointments
- Doctor profile
- All patient features

### 3. Patient (Regular User)
Any user who signs up after the first user.

**Capabilities:**
- View approved doctors
- Book appointments
- View appointment history
- Apply to become a doctor
- Receive notifications

**Access:**
- Dashboard with doctor list
- Appointment booking
- Personal appointments
- Notifications
- Profile

## 📁 Project Structure

```
DOC-APPOINTMENT/
│
├── server/                          # Backend application
│   ├── controllers/                 # Request handlers
│   │   ├── authController.js       # Authentication logic
│   │   ├── userController.js       # User operations
│   │   ├── doctorController.js     # Doctor operations
│   │   └── errorController.js      # Error handling
│   │
│   ├── models/                      # Database schemas
│   │   ├── userModel.js            # User schema
│   │   ├── doctorModel.js          # Doctor schema
│   │   └── appointmentModel.js     # Appointment schema
│   │
│   ├── routes/                      # API routes
│   │   ├── userRoutes.js           # User endpoints
│   │   └── doctorRoutes.js         # Doctor endpoints
│   │
│   ├── utils/                       # Helper functions
│   │   ├── appError.js             # Custom error class
│   │   └── catchAsync.js           # Async error wrapper
│   │
│   ├── .env                         # Environment variables
│   ├── app.js                       # Express app configuration
│   ├── server.js                    # Server entry point
│   └── package.json
│
├── client/                          # Frontend application
│   ├── public/                      # Static files
│   │   ├── index.html
│   │   └── manifest.json
│   │
│   ├── src/
│   │   ├── assets/                  # Images, icons
│   │   │
│   │   ├── components/              # Reusable components
│   │   │   ├── Navbar/             # Navigation bar
│   │   │   ├── MUITable/           # Custom table
│   │   │   ├── DatePicker/         # Date picker
│   │   │   ├── PhoneInput/         # Phone input
│   │   │   ├── Spinner/            # Loading spinner
│   │   │   └── ToastAlert/         # Toast notifications
│   │   │
│   │   ├── views/                   # Page components
│   │   │   ├── Login/              # Login page
│   │   │   ├── Signup/             # Registration page
│   │   │   ├── Dashboard/          # Home page
│   │   │   ├── Appointments/       # Appointments page
│   │   │   ├── ApplyDoctor/        # Doctor application
│   │   │   ├── Doctors/            # Doctors management
│   │   │   ├── Users/              # Users management
│   │   │   ├── Profile/            # User profile
│   │   │   └── Notifications/      # Notifications page
│   │   │
│   │   ├── redux/                   # State management
│   │   │   ├── store.ts            # Redux store
│   │   │   ├── alertSlice.ts       # Alert state
│   │   │   ├── auth/               # Auth state
│   │   │   │   └── authSlice.ts
│   │   │   └── api/                # API slices
│   │   │       ├── apiSlice.ts     # Base API config
│   │   │       ├── authApiSlice.ts # Auth endpoints
│   │   │       ├── userSlice.ts    # User endpoints
│   │   │       ├── doctorSlice.ts  # Doctor endpoints
│   │   │       └── notificationApiSlice.ts
│   │   │
│   │   ├── routes/                  # Route protection
│   │   │   ├── ProtectedRoutes.tsx # Auth required routes
│   │   │   └── PublicRoutes.tsx    # Public routes
│   │   │
│   │   ├── hooks/                   # Custom hooks
│   │   │   └── useTypedSelector.ts
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   └── index.ts            # Helper functions
│   │   │
│   │   ├── App.tsx                 # Main app component
│   │   ├── index.tsx               # Entry point
│   │   └── index.css               # Global styles
│   │
│   └── package.json
│
├── PROJECT_GUIDE.md                 # Detailed documentation
├── TESTING_GUIDE.md                 # Testing instructions
└── README.md                        # This file
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /users/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@email.com",
  "phoneNumber": "+1234567890",
  "password": "password123"
}
```

#### Login
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@email.com",
  "password": "password123"
}
```

### Doctor Endpoints

#### Apply as Doctor
```http
POST /doctors/signup
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id",
  "prefix": "Dr.",
  "fullName": "John Doe",
  "email": "john@email.com",
  "phoneNumber": "+1234567890",
  "specialization": "Cardiologist",
  "experience": "5 years",
  "feePerConsultation": 500,
  "fromTime": "09:00",
  "toTime": "17:00",
  "address": "123 Medical St",
  "website": "https://example.com"
}
```

#### Get All Approved Doctors
```http
GET /doctors/approved-doctors
```

#### Check Appointment Availability
```http
POST /doctors/check-booking-availability
Authorization: Bearer <token>
Content-Type: application/json

{
  "doctorId": "doctor_id",
  "date": "2026-02-20",
  "time": "11:00"
}
```

### User Endpoints

#### Book Appointment
```http
POST /users/book-appointment
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id",
  "doctorId": "doctor_id",
  "doctorInfo": { /* doctor details */ },
  "userInfo": { /* user details */ },
  "date": "2026-02-20",
  "time": "11:00"
}
```

#### Get User Appointments
```http
GET /users/user-appointments/:userId
Authorization: Bearer <token>
```

#### Change Doctor Status (Admin)
```http
POST /users/change-doctor-status
Authorization: Bearer <token>
Content-Type: application/json

{
  "doctorId": "doctor_id",
  "status": "approved",
  "userId": "user_id"
}
```

For complete API documentation, see [PROJECT_GUIDE.md](PROJECT_GUIDE.md#-api-endpoints)

## 📸 Screenshots

### Login Page
User authentication with email and password.

### Dashboard (Home)
View all approved doctors with their specializations, fees, and working hours.

### Book Appointment
Select doctor, date, and time. System checks availability before booking.

### Appointments
View all your appointments with status (Pending, Approved, Rejected).

### Doctor Application
Apply to become a doctor with specialization details and working hours.

### Admin - Doctors Management
Approve or reject doctor applications.

### Notifications
Real-time notifications for appointment updates and doctor status changes.

## 🧪 Testing

For detailed testing instructions with step-by-step scenarios, see [TESTING_GUIDE.md](TESTING_GUIDE.md)

Quick test:
1. Create first user (becomes Admin)
2. Create second user (Patient)
3. Second user applies as Doctor
4. Admin approves Doctor
5. Patient books appointment
6. Doctor manages appointment

## 🔒 Security Features

- Password hashing with bcrypt (12 rounds)
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- Phone number masking in UI
- CORS configuration
- Environment variable protection

## 🐛 Known Issues

### Non-Critical Warnings
- **punycode deprecation**: Node.js 18+ warning (safe to ignore)
- **webpack middleware deprecation**: Old react-scripts (safe to ignore)
- **babel preset warning**: Can be fixed by installing `@babel/plugin-proposal-private-property-in-object`

## 📈 Future Enhancements

- [ ] Email notifications
- [ ] SMS reminders
- [ ] Payment integration
- [ ] Video consultation
- [ ] Prescription management
- [ ] Medical records storage
- [ ] Search and filter doctors
- [ ] Doctor reviews and ratings
- [ ] Calendar view for appointments
- [ ] Export appointment reports
- [ ] Multi-language support
- [ ] Dark mode

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Salman Muazam (Original)  
Modified and Enhanced: 2026

## 🙏 Acknowledgments

- Material-UI for the component library
- Redux Toolkit team for excellent state management
- MongoDB team for the database
- Express.js team for the backend framework
- React team for the frontend library

## 📞 Support

For issues and questions:
- Check [PROJECT_GUIDE.md](PROJECT_GUIDE.md) for detailed documentation
- Check [TESTING_GUIDE.md](TESTING_GUIDE.md) for testing scenarios
- Open an issue in the repository

## 🎯 Project Status

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: February 19, 2026

---

Made with ❤️ using MERN Stack
"# DOCSPOTPROJECT" 
