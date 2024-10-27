
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { authenticate, isDoctor, isPatient } = require('../middlewares/auth');

router.post('/signup', signup);

router.post('/login', login);

router.get('/doctor-dashboard', authenticate, isDoctor, (req, res) => {
  res.json({ message: 'Welcome, Doctor!' });
});

router.get('/patient-dashboard', authenticate, isPatient, (req, res) => {
  res.json({ message: 'Welcome, Patient!' });
});

module.exports = router;
