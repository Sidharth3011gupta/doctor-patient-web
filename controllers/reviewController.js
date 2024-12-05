const Review = require("../models/Review");
exports.addReview = async (req, res) => {
    const { doctorId, rating, comment } = req.body;
  
    try {
      const patientId = req.user.id; 
      const doctor = await User.findById(doctorId);
  
      if (!doctor || doctor.role !== "doctor") {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      const review = new Review({
        doctorId,
        patientId,
        rating,
        comment,
      });
  
      await review.save();
  
      res.status(201).json({
        success: true,
        message: "Review added successfully",
        review,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  exports.getDoctorReviews = async (req, res) => {
    try {
      const { doctorId } = req.params;
  
      const reviews = await Review.find({ doctorId })
        .populate("patientId", "name email")
        .sort({ createdAt: -1 }); 
  
      if (!reviews.length) {
        return res.status(404).json({ message: "No reviews found for this doctor" });
      }
  
      res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  exports.getPatientReviews = async (req, res) => {
    try {
      const patientId = req.user.id; 
      const reviews = await Review.find({ patientId })
        .populate("doctorId", "name specialization")
        .sort({ createdAt: -1 });
  
      if (!reviews.length) {
        return res.status(404).json({ message: "No reviews found by this patient" });
      }
  
      res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
      