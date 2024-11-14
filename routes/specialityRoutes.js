const express = require('express');
const router = express.Router();
const specialityController = require('../controllers/specialityController');
router.get('/specialities', specialityController.getSpecialities);

module.exports = router;