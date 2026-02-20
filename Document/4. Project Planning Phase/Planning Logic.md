# Planning Logic
## Project: DOC-APPOINTMENT – Doctor Appointment Booking System

---

## Why This Project Was Planned This Way

### 1. Why MERN Stack?

| Factor | Decision |
|---|---|
| JavaScript everywhere | Node.js (backend) + React (frontend) = same language |
| JSON-based | MongoDB stores JSON natively, aligns with REST API responses |
| Fast development | Large ecosystem, abundant libraries |
| Scalability | MongoDB Atlas scales horizontally |
| Community | Largest open-source community for support |

---

### 2. Why RTK Query over Axios?

- RTK Query is built into Redux Toolkit — no extra dependency
- Auto-caches API responses and invalidates stale data with tags
- Provides `isLoading`, `isSuccess`, `isError` states out of the box
- Eliminates boilerplate for data fetching compared to traditional Redux + Axios
- Enables optimistic updates for better UX

---

### 3. Why Multer for Certificate Upload?

- Native Node.js middleware — no external service dependency
- Direct file system storage in `uploads/` folder
- Type validation: only PDF, JPG, JPEG, PNG accepted
- Size validation: max 5MB enforced at server level
- Unique filename generation: `fieldname-timestamp.extension`

---

### 4. Why JWT for Authentication?

- Stateless: no server-side session storage needed
- Scalable: works across multiple server instances
- Easy client-side storage in localStorage
- Includes user ID in payload: `{ id: user._id }`
- Middleware (`protect`) validates on every protected route

---

### 5. Why Role-Based Access Was Designed This Way?

Three roles with distinct behaviors:

```
isAdmin = true  → First registered user, manages platform
isDoctor = true → Registered as Doctor, manages schedule
isDoctor = false, isAdmin = false → Patient, books appointments
```

This avoids a separate roles collection and keeps the User model simple.

---

### 6. Sprint Ordering Logic

| Sprint | Reason for This Order |
|---|---|
| 1: Auth | Everything depends on authentication — must be first |
| 2: Doctor | Appointments need doctors to exist — built before appointments |
| 3: Appointments | Core business logic — built after doctors and users are ready |
| 4: Rating & Notifications | Enhancements on top of existing appointment flow |
| 5: UI | Applied consistently at the end for cohesive design |

---

### 7. Notification System Design Decision

Chose embedded array in User document instead of separate collection:
- Simpler queries: one user fetch returns all notifications
- No joins needed
- Two arrays: `unseenNotifications` + `seenNotifications`
- Client reads `unseenNotifications.length` for badge count
- On page visit: unseen → moved to seen

---

### 8. Profile Design Decision

Chose display-only card views (not editable forms) for profiles:
- Doctors already have detailed application form (`/apply-doctor`)
- Profile page should show clean, read-only information
- Card view is consistent for both User and Doctor profiles
- Simpler code: no Formik, no state management, no PUT API calls needed on profile page

---

### 9. Frontend Navigation Logic

```
isAdmin → adminRoutes (Users, Doctors)
isDoctor → doctorRoutes (Home, Apply Doctor, Appointments, Completed, Profile)
else → userRoutes (Home, Appointments, Profile)
```

Centralized in Navbar component using Redux selectors — no prop drilling needed.

---

### 10. Error Handling Strategy

```
Backend:
  - catchAsync() wrapper: eliminates try/catch in every controller
  - AppError class: standardized error with status code + message
  - globalErrorHandler: single error middleware for all routes

Frontend:
  - RTK Query error states: isError / error properties
  - Toast notifications: user-friendly error messages
  - Formik + Yup: field-level validation before API calls
```

---

*Document prepared for: DOC-APPOINTMENT Project*
*Date: February 2026*
