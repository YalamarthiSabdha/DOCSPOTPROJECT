// 3rd Party Imports
const express = require("express");
// Custom Imports
const authController = require("../controllers/authController");
const doctorController = require("../controllers/doctorController");
const upload = require("../middleware/upload");

const router = express.Router();

// DOCTOR CONTROLLER
router.get("/", doctorController.getAllDoctors);
router.get("/approved-doctors", doctorController.getAllApprovedDoctors);

router.use(authController.protect);

router.post("/signup", upload.single('certificate'), doctorController.doctorSignup);
router.get("/:id", doctorController.getDoctor);
router.put("/:id", doctorController.updateDoctor);
router.get("/appointments/:id", doctorController.doctorAppointments);
router.get("/booked-appointments/:id", doctorController.getBookAppointments);
router.get("/completed-appointments/:id", doctorController.getCompletedAppointments);
router.post(
  "/change-appointment-status",
  doctorController.changeAppointmentStatus
);
router.post(
  "/mark-appointment-completed",
  doctorController.markAppointmentCompleted
);
router.post(
  "/check-booking-availability",
  doctorController.checkBookingAvailability
);

module.exports = router;
