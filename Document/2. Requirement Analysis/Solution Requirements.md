# Solution Requirements
## Project: DOC-APPOINTMENT – Doctor Appointment Booking System

---

## 1. Functional Requirements

### 1.1 User Authentication & Authorization
| Req ID | Requirement | Type |
|---|---|---|
| FR-01 | System shall allow new users to register with name, email, phone number, and password | Mandatory |
| FR-02 | System shall provide role selection (User/Doctor) during registration | Mandatory |
| FR-03 | System shall authenticate users via JWT tokens | Mandatory |
| FR-04 | System shall implement role-based access control (User, Doctor, Admin) | Mandatory |
| FR-05 | System shall allow users to logout and clear session | Mandatory |
| FR-06 | The first registered user shall automatically become Admin | Mandatory |

### 1.2 Doctor Management
| Req ID | Requirement | Type |
|---|---|---|
| FR-07 | Doctors shall submit an application with: prefix, full name, email, phone, specialization, experience, fee per consultation, from/to timing, address, website | Mandatory |
| FR-08 | Doctors shall upload their MBBS certificate (PDF/JPG/JPEG/PNG, max 5MB) | Mandatory |
| FR-09 | Admin shall approve or block doctor applications | Mandatory |
| FR-10 | Only approved doctors shall be visible on the home page | Mandatory |
| FR-11 | Admin shall receive notification when a new doctor application is submitted | Mandatory |
| FR-12 | Doctor shall receive notification when their application status changes | Mandatory |

### 1.3 Appointment Management
| Req ID | Requirement | Type |
|---|---|---|
| FR-13 | Patients shall be able to book appointments with available approved doctors | Mandatory |
| FR-14 | Appointment booking shall require date and time selection | Mandatory |
| FR-15 | Appointment status shall flow: Pending → Approved/Rejected | Mandatory |
| FR-16 | Doctor shall be able to approve or reject incoming appointments | Mandatory |
| FR-17 | Doctor shall be able to mark appointments as completed | Mandatory |
| FR-18 | Completed appointments shall be listed separately for doctors | Mandatory |
| FR-19 | Patient shall receive notification when appointment status changes | Mandatory |

### 1.4 Rating & Review
| Req ID | Requirement | Type |
|---|---|---|
| FR-20 | Patient shall be able to rate doctor (1-5 stars) after appointment is completed | Mandatory |
| FR-21 | Patient shall be able to write a review along with rating | Optional |
| FR-22 | Rating shall be stored and displayed per appointment | Mandatory |

### 1.5 Notifications
| Req ID | Requirement | Type |
|---|---|---|
| FR-23 | System shall maintain unseen and seen notifications for each user | Mandatory |
| FR-24 | Notification count badge shall display on the navbar | Mandatory |
| FR-25 | Users shall be able to mark notifications as read | Mandatory |

### 1.6 Admin Dashboard
| Req ID | Requirement | Type |
|---|---|---|
| FR-26 | Admin shall view all registered users | Mandatory |
| FR-27 | Admin shall view all doctor applications with status | Mandatory |
| FR-28 | Admin shall be able to approve or block doctors | Mandatory |

---

## 2. Non-Functional Requirements

### 2.1 Performance
| Req ID | Requirement |
|---|---|
| NFR-01 | API response time shall be under 500ms for standard operations |
| NFR-02 | The frontend shall load within 3 seconds on a standard connection |
| NFR-03 | File upload (MBBS certificate) shall complete within 10 seconds |

### 2.2 Security
| Req ID | Requirement |
|---|---|
| NFR-04 | All passwords shall be hashed using bcryptjs (cost factor 12) |
| NFR-05 | All protected routes shall require valid JWT token |
| NFR-06 | File uploads shall be restricted to PDF, JPG, JPEG, PNG formats |
| NFR-07 | Maximum upload file size shall be 5MB |
| NFR-08 | CORS shall be configured to accept requests only from trusted origins |

### 2.3 Usability
| Req ID | Requirement |
|---|---|
| NFR-09 | Application shall be a Single Page Application (SPA) with no full-page reloads |
| NFR-10 | UI shall use consistent purple/violet gradient theme across all pages |
| NFR-11 | All forms shall have proper validation with user-friendly error messages |
| NFR-12 | Application shall display loading indicators during API calls |
| NFR-13 | Toast notifications shall inform users of success/failure actions |

### 2.4 Reliability
| Req ID | Requirement |
|---|---|
| NFR-14 | Server shall handle uncaught exceptions and unhandled rejections gracefully |
| NFR-15 | Application shall maintain user session across page refreshes via localStorage |
| NFR-16 | API shall return standardized error responses with appropriate HTTP status codes |

### 2.5 Scalability
| Req ID | Requirement |
|---|---|
| NFR-17 | MongoDB Atlas cloud database shall be used for scalable data storage |
| NFR-18 | Application architecture shall separate frontend (React) and backend (Node.js) |

---

## 3. Technical Requirements

### 3.1 Frontend
- React 18.2.0 with TypeScript
- Material UI (MUI) v5 for components
- Redux Toolkit + RTK Query for state management
- React Router v6 for navigation
- Formik + Yup for form handling and validation
- React Icons for iconography

### 3.2 Backend
- Node.js with Express.js framework
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcryptjs for password hashing
- Multer for file uploads
- Morgan for HTTP request logging

### 3.3 Database
- MongoDB Atlas (Cloud)
- Collections: Users, Doctors, Appointments

### 3.4 Development Tools
- VS Code as IDE
- Git for version control
- npm for package management
- Postman for API testing

---

## 4. Constraints

1. Certificate upload limited to 5MB
2. Admin account is the first registered user only
3. Doctor approval is manual (by admin)
4. No payment gateway integration in current scope
5. No video consultation feature in current scope

---

*Document prepared for: DOC-APPOINTMENT Project*
*Date: February 2026*
