const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const validatePassword = require("../utils/validatePassword");
const validateMobilenumber = require("../utils/validateMobile_number");
exports.signup = async (req, res) => {
  const { name, gender, dob, mobile_number,confirm_password, email, password, role,specialization,clinicAddress,experienceMonths,years,experience,profile,qualifications,next_available,licenceNumber} = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      let errorMessage = "Password must meet the following criteria:";
      if (!passwordValidation.errors.hasUpperCase)
        errorMessage += " At least one uppercase letter.";
      if (!passwordValidation.errors.hasLowerCase)
        errorMessage += " At least one lowercase letter.";
      if (!passwordValidation.errors.hasDigit)
        errorMessage += " At least one number.";
      if (!passwordValidation.errors.hasSpecialChar)
        errorMessage += " At least one special character.";
      if (!passwordValidation.errors.isValidLength)
        errorMessage += " Minimum length of 8 characters.";

      return res.status(400).json({ message: errorMessage });
    }
    const mobileValidation = validateMobilenumber(mobile_number);
    if (!mobileValidation.isValid) {
      let errorMessage = "Mobile Number must meet the following criteria:";
      if (!mobileValidation.errors.mobiletype)
        errorMessage += " Must be number.";

      if (!mobileValidation.errors.isvalidlength)
        errorMessage += " Minimum length of 10 numbers.";

      return res.status(400).json({ message: errorMessage });
    }
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>3",password)
    const hashedPassword = await bcrypt.hash(password, 8);
    const hashedPassword2 = await bcrypt.hash(confirm_password, 8);
    const isDoctor = role === "doctor";
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>4",password)
    const user = new User({
      name,
      gender,
      dob,
      mobile_number,
      email,
      password:hashedPassword,
      confirm_password:hashedPassword2,
      role,
      isDoctor,
      specialization,
      clinicAddress,
      profile,
      qualifications,
      experienceMonths,
      experience,
      licenceNumber,
      years,
      next_available
    });
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { email, mobile_number, password } = req.body;
  const loginId = email ?? mobile_number;
console.log({ email,loginId, mobile_number, password })
  try {
    if (!email && !mobile_number) {
      return res.status(400).json({ message: "Email or mobile number is required" });
    }

    console.log("LoginId:", loginId);

    const user = email
      ? await User.findOne({ email: loginId })
      : await User.findOne({ mobile_number: loginId });

    console.log("User found:", user);

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(password,user.password)
    console.log("Password match:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({
      message: "Logged in successfully",
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpires = Date.now() + 3600000; 
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });

    const mailOptions = {
      to: user.email,
      from: "no-reply@yourapp.com",
      subject: "Password Reset Request",
      text: `You are receiving this email because you requested a password reset.\n\n
      Please click the link below to reset your password:\n\n
      ${resetUrl}\n\n
      If you did not request this, please ignore this email.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error: error.message });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};
