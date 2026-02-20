# Technology Stack
## Project: DOC-APPOINTMENT – Doctor Appointment Booking System

---

## Overview

DOC-APPOINTMENT is a full-stack MERN (MongoDB, Express, React, Node.js) web application. Below is the complete technology stack used.

---

## Frontend Technologies

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2.0 | Frontend UI framework (SPA) |
| TypeScript | ~4.9.5 | Type-safe JavaScript |
| Material UI (MUI) | ^5.x | UI component library |
| Redux Toolkit | ^1.9.x | Global state management |
| RTK Query | (included in Redux Toolkit) | API data fetching & caching |
| React Router DOM | ^6.x | Client-side routing |
| Formik | ^2.x | Form state management |
| Yup | ^1.x | Form validation schema |
| React Icons | ^4.x | Icon library (replacing MUI icons) |
| Axios / Fetch | (via RTK Query) | HTTP requests |

---

## Backend Technologies

| Technology | Version | Purpose |
|---|---|---|
| Node.js | v22.14.0 | JavaScript runtime |
| Express.js | ^4.x | Web application framework |
| MongoDB | Atlas Cloud | NoSQL database |
| Mongoose | ^7.x | MongoDB ODM (Object Document Mapper) |
| JSON Web Token (JWT) | ^9.x | Authentication token generation |
| Bcryptjs | ^2.x | Password hashing |
| Multer | ^1.x | File upload middleware (certificate upload) |
| Morgan | ^1.x | HTTP request logger |
| Colors | ^1.x | Terminal output colorization |
| CORS | ^2.x | Cross-Origin Resource Sharing |
| Dotenv | ^16.x | Environment variable management |
| Validator | ^13.x | Input validation utilities |

---

## Database Design

### Database: MongoDB Atlas

#### Collection 1: Users
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique)",
  "phoneNumber": "String (unique)",
  "password": "String (hashed)",
  "isDoctor": "Boolean (default: false)",
  "isAdmin": "Boolean (default: false)",
  "seenNotifications": "Array",
  "unseenNotifications": "Array",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

#### Collection 2: Doctors
```json
{
  "_id": "ObjectId",
  "userId": "String",
  "prefix": "String (Dr./Prof.)",
  "fullName": "String",
  "email": "String (unique)",
  "phoneNumber": "String",
  "website": "String",
  "address": "String",
  "specialization": "String",
  "experience": "String",
  "feePerConsultation": "Number",
  "fromTime": "String",
  "toTime": "String",
  "certificate": "String (file path)",
  "status": "String (pending/approved/blocked)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

#### Collection 3: Appointments
```json
{
  "_id": "ObjectId",
  "userId": "String",
  "doctorId": "String",
  "userInfo": "Object",
  "doctorInfo": "Object",
  "date": "String",
  "time": "String",
  "status": "String (pending/approved/rejected)",
  "isCompleted": "Boolean (default: false)",
  "rating": "Number (1-5, nullable)",
  "review": "String (nullable)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT SIDE                       │
│  React 18 + TypeScript                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────────┐ │
│  │  Redux   │ │  React   │ │     Material UI       │ │
│  │ Toolkit  │ │  Router  │ │    Components         │ │
│  └──────────┘ └──────────┘ └──────────────────────┘ │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP (REST API)
                      │ Port 3000 → Port 5000
┌─────────────────────▼───────────────────────────────┐
│                    SERVER SIDE                       │
│  Node.js + Express.js                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────────┐ │
│  │  Routes  │ │Controllers│ │  Middleware           │ │
│  │ /users   │ │  Auth    │ │  JWT Auth            │ │
│  │ /doctors │ │  Doctor  │ │  Multer Upload       │ │
│  └──────────┘ └──────────┘ └──────────────────────┘ │
└─────────────────────┬───────────────────────────────┘
                      │ Mongoose ODM
┌─────────────────────▼───────────────────────────────┐
│                    DATABASE                          │
│  MongoDB Atlas (Cloud)                               │
│  Collections: Users | Doctors | Appointments         │
└─────────────────────────────────────────────────────┘
```

---

## Development Environment

| Tool | Purpose |
|---|---|
| Visual Studio Code | Primary IDE |
| Git + GitHub | Version control |
| npm | Package manager |
| Postman | API testing |
| MongoDB Compass | Database visualization |
| Chrome DevTools | Frontend debugging |

---

## Deployment

| Component | Platform |
|---|---|
| Frontend | Build served via Express in production |
| Backend | Node.js Express server |
| Database | MongoDB Atlas Cloud |
| File Storage | Local server uploads/ folder |

---

*Document prepared for: DOC-APPOINTMENT Project*
*Date: February 2026*
