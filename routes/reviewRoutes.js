const express = require("express");
const reviewController= require("../controllers/reviewController");


const router = express.Router();


router.post("/add",reviewController.addReview);


router.get("/doctor/:doctorId",reviewController. getDoctorReviews);
router.get("/patient", reviewController.getPatientReviews);

module.exports = router;
