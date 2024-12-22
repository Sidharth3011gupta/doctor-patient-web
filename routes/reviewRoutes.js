const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/reviews", reviewController.addReview); // Add a new review
router.get("/reviews/doctor/:doctorId", reviewController.getDoctorReviews); // Get all reviews for a doctor
router.get("/reviews/patient", reviewController.getPatientReviews); // Get all reviews by a patient
router.get("/reviews/:id", reviewController.getReviewById); // Get a specific review by ID
router.put("/reviews/:id", reviewController.updateReviewById); // Update a review by ID
router.delete("/reviews/:id", reviewController.deleteReviewById); // Delete a review by ID

module.exports = router;
