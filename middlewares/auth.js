const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

exports.isDoctor = (req, res, next) => {
  if (req.user.role !== "doctor") {
    return res
      .status(403)
      .json({ message: "Access restricted to doctors only" });
  }
  next();
};

exports.isPatient = (req, res, next) => {
  if (req.user.role !== "patient") {
    return res
      .status(403)
      .json({ message: "Access restricted to patients only" });
  }
  next();
};
