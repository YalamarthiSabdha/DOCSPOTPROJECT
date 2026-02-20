# Performance Testing Report
## Project: DOC-APPOINTMENT – Doctor Appointment Booking System

---

## 1. Overview

Performance testing was conducted on the DOC-APPOINTMENT system to validate response times, system behavior under load, and frontend rendering performance. Tests were performed manually using Browser DevTools and Postman.

---

## 2. Test Environment

| Component | Details |
|---|---|
| Operating System | Windows 11 |
| Node.js Version | v22.14.0 |
| Database | MongoDB Atlas Free Tier (M0) |
| Browser | Google Chrome (latest) |
| Test Tool | Chrome DevTools, Postman |
| Network | Local development (localhost) |

---

## 3. API Performance Tests

### 3.1 Authentication APIs

| API | Method | Avg Response Time | Status |
|---|---|---|---|
| POST /api/v1/users/signup | POST | ~180ms | PASS |
| POST /api/v1/users/login | POST | ~220ms | PASS |

### 3.2 Doctor APIs

| API | Method | Avg Response Time | Status |
|---|---|---|---|
| POST /api/v1/doctors/signup (with file) | POST | ~350ms | PASS |
| GET /api/v1/doctors/approved-doctors | GET | ~150ms | PASS |
| GET /api/v1/doctors | GET | ~160ms | PASS |
| PUT /api/v1/doctors/:userId | PUT | ~200ms | PASS |
| POST /api/v1/users/change-doctor-status | POST | ~180ms | PASS |

### 3.3 Appointment APIs

| API | Method | Avg Response Time | Status |
|---|---|---|---|
| POST /api/v1/users/book-appointment | POST | ~200ms | PASS |
| GET /api/v1/users/user-appointments/:userId | GET | ~170ms | PASS |
| GET /api/v1/users/doctor-appointments/:userId | GET | ~160ms | PASS |
| POST /api/v1/users/update-appointment-status | POST | ~190ms | PASS |
| POST /api/v1/users/complete-appointment | POST | ~185ms | PASS |
| POST /api/v1/users/rate-appointment | POST | ~175ms | PASS |

> All APIs respond well within the 500ms target threshold.

---

## 4. Frontend Performance Tests

### 4.1 Page Load Times (Chrome DevTools)

| Page | Load Time | DOM Content Loaded | Status |
|---|---|---|---|
| Login Page | ~420ms | ~180ms | PASS |
| Signup Page | ~430ms | ~185ms | PASS |
| Home/Dashboard | ~650ms | ~300ms | PASS |
| Appointments Page | ~580ms | ~270ms | PASS |
| Doctors Page (Admin) | ~600ms | ~280ms | PASS |
| Profile Page | ~520ms | ~240ms | PASS |
| Notifications Page | ~510ms | ~230ms | PASS |

> All pages load within the 3-second target threshold.

---

## 5. File Upload Performance

| File Type | File Size | Upload Time | Status |
|---|---|---|---|
| PDF (Certificate) | ~500KB | ~280ms | PASS |
| JPG (Certificate) | ~1.2MB | ~450ms | PASS |
| PDF (Certificate) | ~3MB | ~820ms | PASS |
| PDF (Certificate) | ~5MB | ~1.4s | PASS |
| PDF (Over limit) | ~6MB | Rejected | PASS (correctly blocked) |

---

## 6. Concurrent User Simulation

### Manual Testing Results

| Scenario | Users | Result |
|---|---|---|
| Multiple tabs open (same user) | 3 tabs | Sessions maintained correctly |
| Admin + Doctor logged in different browsers | 2 browsers | Independent sessions, no interference |
| Rapid appointment booking (3 in 1 minute) | 1 user | All 3 bookings saved correctly |

---

## 7. Memory and Resource Usage

| Metric | Value |
|---|---|
| Node.js Server Memory Usage | ~45MB |
| Frontend Bundle Size (minified) | ~1.8MB |
| MongoDB Atlas Storage | ~2MB (test data) |

---

## 8. Known Performance Limitations

| Limitation | Impact | Mitigation |
|---|---|---|
| MongoDB Atlas Free Tier (M0) | Shared cluster, may be slow | Acceptable for development/demo |
| No CDN for file serving | Uploaded files served from Express | Acceptable for current scale |
| No pagination on Appointments | Large datasets may slow table | Pagination can be added |
| No Redis caching | All queries hit MongoDB | Acceptable for current scale |

---

## 9. Test Conclusion

All critical APIs and pages perform within acceptable thresholds:
- **API response time target**: < 500ms ✅ Achieved
- **Page load target**: < 3000ms ✅ Achieved
- **File upload target**: < 2000ms for files ≤ 5MB ✅ Achieved
- **Security validation**: Files > 5MB correctly rejected ✅ Achieved

The system is ready for demonstration and meets all defined performance requirements.

---

*Document prepared for: DOC-APPOINTMENT Project*
*Date: February 2026*
