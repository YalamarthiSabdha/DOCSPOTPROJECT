# Project Planning Template
## Project: DOC-APPOINTMENT – Doctor Appointment Booking System

---

## 1. Project Overview

| Field | Details |
|---|---|
| Project Name | DOC-APPOINTMENT – Doctor Appointment Booking System |
| Project Type | Full-Stack Web Application (MERN Stack) |
| Start Date | February 2026 |
| Technology | MongoDB, Express.js, React 18, Node.js |
| Team Size | 1 Developer |
| Methodology | Agile (Sprint-based) |

---

## 2. Project Scope

### In Scope
- User registration with role-based access (Patient / Doctor / Admin)
- Doctor application with MBBS certificate upload
- Admin approval workflow for doctors
- Appointment booking, management, and status tracking
- Doctor appointment management (approve/reject/complete)
- Patient rating and review system
- Notification system
- Role-based navigation and dashboards
- Profile pages for all user types

### Out of Scope
- Payment gateway integration
- Video consultation
- Mobile application
- Email/SMS notifications
- Advanced search and filter for doctors
- Multi-language support

---

## 3. Sprint Plan

### Sprint 1 – Project Setup & Authentication (Week 1)
| Task | Status | Priority |
|---|---|---|
| Initialize Node.js + Express server | Done | HIGH |
| Setup MongoDB Atlas connection | Done | HIGH |
| Create User model with schema | Done | HIGH |
| Implement signup API with JWT | Done | HIGH |
| Implement login API | Done | HIGH |
| React project setup with TypeScript | Done | HIGH |
| Redux store setup with RTK Query | Done | HIGH |
| Login and Signup pages | Done | HIGH |
| Protected & Public route guards | Done | HIGH |

### Sprint 2 – Doctor Management (Week 2)
| Task | Status | Priority |
|---|---|---|
| Create Doctor model with schema | Done | HIGH |
| Doctor signup API with Multer file upload | Done | HIGH |
| Admin doctor approval/block API | Done | HIGH |
| Apply Doctor form (frontend) | Done | HIGH |
| Admin Doctors management page | Done | HIGH |
| Role-based navigation (User/Doctor/Admin) | Done | HIGH |
| MBBS certificate validation | Done | HIGH |

### Sprint 3 – Appointment System (Week 3)
| Task | Status | Priority |
|---|---|---|
| Create Appointment model | Done | HIGH |
| Book appointment API | Done | HIGH |
| Get user appointments API | Done | HIGH |
| Get doctor appointments API | Done | HIGH |
| Update appointment status API | Done | HIGH |
| Mark appointment complete API | Done | HIGH |
| Appointment pages (User + Doctor) | Done | HIGH |
| Completed appointments page for Doctor | Done | HIGH |

### Sprint 4 – Rating, Notifications & UI (Week 4)
| Task | Status | Priority |
|---|---|---|
| Rate appointment API | Done | HIGH |
| Rating dialog component | Done | HIGH |
| Notification system (unseen/seen) | Done | HIGH |
| Notifications page | Done | HIGH |
| Notification badge on navbar | Done | HIGH |
| UI modernization (gradient theme) | Done | MEDIUM |
| Profile pages (User card + Doctor card) | Done | MEDIUM |
| Role-based registration dropdown | Done | HIGH |

---

## 4. Milestones

| Milestone | Target Date | Status |
|---|---|---|
| M1: Project Setup & Auth | Week 1 | Completed |
| M2: Doctor Management | Week 2 | Completed |
| M3: Appointment System | Week 3 | Completed |
| M4: Rating & Notifications | Week 4 | Completed |
| M5: UI Polish & Testing | Week 5 | Completed |
| M6: Documentation | Week 6 | Completed |

---

## 5. Risk Analysis

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| MongoDB Atlas connection failure | Low | High | Use .env for credentials, connection error handling |
| JWT token expiry causing auth loss | Medium | High | Token stored in localStorage, validated on each request |
| File upload size/type violations | Medium | Medium | Multer middleware with strict validation |
| CORS issues in production | Low | High | Configured CORS with proper origins |
| Redux state loss on refresh | Low | Medium | Persist auth state in localStorage |

---

## 6. Resource Plan

| Resource | Details |
|---|---|
| Development Machine | Windows PC with Node.js v22.14.0 |
| IDE | Visual Studio Code |
| Database | MongoDB Atlas Free Tier |
| Version Control | Git |
| Package Manager | npm |
| Testing | Manual testing via Browser + Postman |

---

## 7. Definition of Done

A feature is considered "Done" when:
- [x] API endpoint is implemented and tested via Postman
- [x] Frontend component is created with proper TypeScript types
- [x] UI is consistent with the purple/violet gradient theme
- [x] Form validation is handled (Formik + Yup)
- [x] Loading states are shown during API calls
- [x] Error states are handled with toast notifications
- [x] No compilation errors in the project
- [x] Feature is tested end-to-end in browser

---

*Document prepared for: DOC-APPOINTMENT Project*
*Date: February 2026*
