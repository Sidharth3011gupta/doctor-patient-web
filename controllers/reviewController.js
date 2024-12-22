const Review = require("../models/Review");
const User = require("../models/User");
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
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params; 

    const review = await Review.findById(id)
      .populate("patientId", "name email")
      .populate("doctorId", "name specialization");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateReviewById = async (req, res) => {
  try {
    const { id } = req.params; 
    const { rating, comment } = req.body;

    if (!rating && !comment) {
      return res.status(400).json({ message: "Rating or comment is required to update the review" });
    }

    const updatedData = {};
    if (rating) updatedData.rating = rating;
    if (comment) updatedData.comment = comment;

    const updatedReview = await Review.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
