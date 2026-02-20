# Customer Journey Map
## Project: DOC-APPOINTMENT – Doctor Appointment Booking System

---

## Journey 1: Patient Booking an Appointment

### Stage 1: AWARENESS
**Patient discovers the platform**

| Touchpoint | Actions | Thoughts & Feelings | Pain Points |
|---|---|---|---|
| Web Browser | Searches for doctor appointment app | "I hope this is easy to use" | Uncertainty about reliability |
| Landing/Login Page | Views the platform for the first time | "Looks clean and modern" | Needs to register first |

**Emotion: Curious 😐**

---

### Stage 2: REGISTRATION
**Patient creates an account**

| Touchpoint | Actions | Thoughts & Feelings | Pain Points |
|---|---|---|---|
| Signup Page | Fills name, email, phone, password | "Simple registration form" | Must choose User type |
| Role Selection | Selects "User (Patient)" from dropdown | "Good, I'm a patient" | None |
| Login Page | Logs in with credentials | "Quick and smooth" | Forgot password not yet implemented |

**Emotion: Hopeful 🙂**

---

### Stage 3: DISCOVERY
**Patient browses available doctors**

| Touchpoint | Actions | Thoughts & Feelings | Pain Points |
|---|---|---|---|
| Home/Dashboard | Views list of approved doctor cards | "I can see their specialization and fees!" | No search/filter yet |
| Doctor Card | Reads phone, address, timings, fee | "This is very useful information" | Can't see doctor ratings on card |
| Book Button | Clicks "Book Appointment" | "Easy to find the button" | None |

**Emotion: Excited 😊**

---

### Stage 4: BOOKING
**Patient books an appointment**

| Touchpoint | Actions | Thoughts & Feelings | Pain Points |
|---|---|---|---|
| Booking Dialog | Selects date and time | "Simple calendar picker" | Time slots not dynamically shown |
| Confirm Button | Submits the appointment | "Done in seconds" | No immediate confirmation email |
| Notification | Receives notification | "Great, I got notified" | None |

**Emotion: Satisfied 😄**

---

### Stage 5: POST-APPOINTMENT
**Patient rates the doctor**

| Touchpoint | Actions | Thoughts & Feelings | Pain Points |
|---|---|---|---|
| Appointments Page | Sees completed appointment | "I can see all my history" | None |
| Rate Button | Opens rating dialog | "Easy star rating system" | None |
| Submits Review | Gives 1-5 stars + review text | "I feel heard" | None |

**Emotion: Happy 😃**

---

## Journey 2: Doctor Registration & Approval Flow

| Stage | Action | System Response | Outcome |
|---|---|---|---|
| Registration | Signs up, selects "Doctor" | Redirected to Apply Doctor page | Account created with isDoctor=true |
| Application | Fills prefix, name, specialization, experience, fee, timings, uploads MBBS certificate | Form validated, submitted | Application saved as Pending |
| Admin Review | Admin sees pending doctor in list | Admin clicks Approve | Doctor status changed to Approved, user notified |
| Active | Doctor receives notification | Badge shows "Doctor" | Doctor manages appointments |

---

## Journey 3: Admin Managing Platform

| Stage | Action | Outcome |
|---|---|---|
| Login | Admin logs in (first registered user) | Sees Admin badge + admin menu |
| Review Doctors | Views all doctor applications | Can Approve or Block |
| Manage Users | Views all registered users | Can block/manage users |
| Monitor | Sees all activity on platform | Platform quality maintained |

---

## Opportunities for Improvement

1. Add search/filter for doctors by specialization
2. Email notifications for appointment confirmations
3. Forgot password functionality
4. Doctor ratings visible on home page cards
5. Patient medical history tracking

---

*Document prepared for: DOC-APPOINTMENT Project*
*Date: February 2026*
