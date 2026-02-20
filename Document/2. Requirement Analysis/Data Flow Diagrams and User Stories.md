# Data Flow Diagrams and User Stories
## Project: DOC-APPOINTMENT – Doctor Appointment Booking System

---

## User Stories

### Epic 1: User Management

| Story ID | As a... | I want to... | So that... | Priority |
|---|---|---|---|---|
| US-01 | New user | Register with name, email, phone, password | I can access the platform | HIGH |
| US-02 | New user | Select my role (User/Doctor) during registration | I get the right dashboard | HIGH |
| US-03 | Registered user | Login with email and password | I can access my account | HIGH |
| US-04 | Logged-in user | Logout securely | My account stays safe | HIGH |
| US-05 | User | View my profile | I can see my account details | MEDIUM |

---

### Epic 2: Patient Features

| Story ID | As a... | I want to... | So that... | Priority |
|---|---|---|---|---|
| US-06 | Patient | View all approved doctors | I can choose a suitable doctor | HIGH |
| US-07 | Patient | See doctor's fee, timings, specialization | I can make an informed choice | HIGH |
| US-08 | Patient | Book an appointment with date and time | I can schedule a visit | HIGH |
| US-09 | Patient | View all my appointments with status | I can track my bookings | HIGH |
| US-10 | Patient | Rate and review doctor after completion | I can share my experience | MEDIUM |
| US-11 | Patient | Receive notifications on appointment status | I stay updated | MEDIUM |

---

### Epic 3: Doctor Features

| Story ID | As a... | I want to... | So that... | Priority |
|---|---|---|---|---|
| US-12 | Doctor | Register with medical credentials | I can be listed on the platform | HIGH |
| US-13 | Doctor | Upload MBBS certificate | My credentials are verified | HIGH |
| US-14 | Doctor | View all my incoming appointments | I can manage my schedule | HIGH |
| US-15 | Doctor | Approve or Reject appointments | I have control over my schedule | HIGH |
| US-16 | Doctor | Mark appointments as completed | Records are updated after consultation | HIGH |
| US-17 | Doctor | View completed appointments separately | I have a history of consultations | MEDIUM |

---

### Epic 4: Admin Features

| Story ID | As a... | I want to... | So that... | Priority |
|---|---|---|---|---|
| US-18 | Admin | View all registered users | I can monitor platform activity | HIGH |
| US-19 | Admin | View all doctor applications | I can verify and approve doctors | HIGH |
| US-20 | Admin | Approve or Block doctors | Only verified doctors are listed | HIGH |
| US-21 | Admin | Receive notifications for new doctor applications | I can review them promptly | MEDIUM |

---

## Data Flow Diagrams

### Level 0 DFD – Context Diagram

```
                          ┌───────────────────────┐
                          │                       │
    Patient ─────────────►│   DOC-APPOINTMENT     │◄──────── Admin
                          │     SYSTEM            │
    Doctor ──────────────►│                       │────────► Notifications
                          └───────────────────────┘
```

---

### Level 1 DFD – Main Processes

```
┌──────────┐    Registration/Login    ┌─────────────────┐
│  Patient │ ─────────────────────►  │  1. Auth Module │
│          │ ◄─────────────────────  │  (JWT Tokens)   │
└──────────┘    Session Token         └────────┬────────┘
                                               │
                                               ▼
┌──────────┐    Book Appointment      ┌─────────────────┐     ┌──────────────┐
│  Patient │ ─────────────────────►  │  2. Appointment │────►│   MongoDB    │
│          │ ◄─────────────────────  │     Module      │◄────│   Database   │
└──────────┘    Confirmation          └────────┬────────┘     └──────────────┘
                                               │
                                               ▼
┌──────────┐    View/Approve          ┌─────────────────┐
│  Doctor  │ ─────────────────────►  │  3. Doctor      │
│          │ ◄─────────────────────  │     Module      │
└──────────┘    Updated Status        └────────┬────────┘
                                               │
                                               ▼
┌──────────┐    Manage Users/Doctors  ┌─────────────────┐
│  Admin   │ ─────────────────────►  │  4. Admin       │
│          │ ◄─────────────────────  │     Module      │
└──────────┘    Approval/Block        └─────────────────┘
```

---

### Level 2 DFD – Appointment Booking Process

```
Patient ──► [Select Doctor] ──► [Choose Date/Time] ──► [Submit Booking]
                                                              │
                                                              ▼
                                                    [Appointment Created]
                                                    Status: PENDING
                                                              │
                                                              ▼
                                                    [Doctor Notified]
                                                              │
                              ┌───────────────────────────────┤
                              │                               │
                              ▼                               ▼
                     [Doctor APPROVES]               [Doctor REJECTS]
                     Status: APPROVED               Status: CANCELLED
                              │
                              ▼
                    [Doctor Completes Visit]
                    Status: COMPLETED
                              │
                              ▼
                    [Patient can RATE Doctor]
                    Rating: 1-5 Stars + Review
```

---

### Data Stores

| Data Store | Description | Key Fields |
|---|---|---|
| Users Collection | All registered users | name, email, phone, password, isDoctor, isAdmin |
| Doctors Collection | Doctor profiles | userId, fullName, specialization, experience, fee, timings, certificate, status |
| Appointments Collection | All appointments | userId, doctorId, date, time, status, isCompleted, rating, review |

---

## API Endpoints

### Auth APIs
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/v1/users/signup | Register new user |
| POST | /api/v1/users/login | Login user |

### Doctor APIs
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/v1/doctors/signup | Apply as doctor |
| GET | /api/v1/doctors | Get all doctors (Admin) |
| GET | /api/v1/doctors/approved-doctors | Get approved doctors |
| PUT | /api/v1/doctors/:userId | Update doctor profile |
| POST | /api/v1/users/change-doctor-status | Approve/Block doctor (Admin) |

### Appointment APIs
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/v1/users/book-appointment | Book appointment |
| GET | /api/v1/users/user-appointments/:userId | Get user appointments |
| GET | /api/v1/users/doctor-appointments/:userId | Get doctor appointments |
| POST | /api/v1/users/update-appointment-status | Approve/Reject appointment |
| POST | /api/v1/users/complete-appointment | Mark appointment complete |
| POST | /api/v1/users/rate-appointment | Rate doctor |

---

*Document prepared for: DOC-APPOINTMENT Project*
*Date: February 2026*
