const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validatePassword =require("../utils/validatePassword")
const validateMobilenumber=require('../utils/validateMobile_number')
exports.signup = async (req, res) => {
  const { name, gender,dob,mobile_number, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists){
      return res.status(400).json({ message: "User already exists" });
     }
      const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      let errorMessage = 'Password must meet the following criteria:';
      if (!passwordValidation.errors.hasUpperCase) errorMessage += ' At least one uppercase letter.';
      if (!passwordValidation.errors.hasLowerCase) errorMessage += ' At least one lowercase letter.';
      if (!passwordValidation.errors.hasDigit) errorMessage += ' At least one number.';
      if (!passwordValidation.errors.hasSpecialChar) errorMessage += ' At least one special character.';
      if (!passwordValidation.errors.isValidLength) errorMessage += ' Minimum length of 8 characters.';

      return res.status(400).json({ message: errorMessage });
    }
    const mobileValidation = validateMobilenumber(mobile_number);
    if (!mobileValidation.isValid) {
      let errorMessage = 'Password must meet the following criteria:';
     
      
      if (!mobileValidation.errors.type) errorMessage += ' Must  be number.';
          
      if (!mobileValidation.errors.isvalidlength) errorMessage += ' Minimum length of 10 numbers.';

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
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      // { expiresIn: "1h" }
    );
    res
      .status(201)
      .json({
        message: "User registered successfully",
        token,
        user: { id: user._id, name: user.name, role: user.role },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
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
