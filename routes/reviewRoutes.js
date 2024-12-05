const express = require("express");
const {
  addReview,
  getDoctorReviews,
  getPatientReviews,
} = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/", authMiddleware, addReview);


router.get("/doctor/:doctorId", authMiddleware, getDoctorReviews);
router.get("/patient", authMiddleware, getPatientReviews);

module.exports = router;
