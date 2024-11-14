const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validatePassword = require("../utils/validatePassword");
const validateMobilenumber = require("../utils/validateMobile_number");
exports.signup = async (req, res) => {
  const { name, gender, dob, mobile_number, email, password, role,specialization,clinicAddress,experienceMonths,experience,profile,qualifications,licenceNumber} = req.body;
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
    const hashedPassword = await bcrypt.hash(password, 8);
    const isDoctor = role === "doctor";

    const user = new User({
      name,
      gender,
      dob,
      mobile_number,
      email,
      password: hashedPassword,
      role,
      isDoctor,
      specialization,
      clinicAddress,
      profile,qualifications,experienceMonths,experience,licenceNumber
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

  try {
    console.log(loginId)
    const user =  email ? await User.findOne({email : loginId})
     : await User.findOne({ mobile_number : loginId});
     console.log(user)
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

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
    res.status(500).json({ message: "Server error" });
  }
};
