const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorContoller");


router.get("/dashboard/:id", doctorController.getDashboard);

router.get("/profile/:id", doctorController.getProfile);

router.get(
  "/appointments/:id",
  doctorController.getAppointments
);
router.post('/doctors/add-qualifications/:id', doctorController.addQualifications);
router.post('/doctors/add-experience/:id', doctorController.addExperience);
router.put('/doctors/profile/:id', doctorController.updateDoctorProfile);
router.get("/doctors", doctorController.getDoctors);
router.get('/doctors/searchbyUserid/:id',doctorController.getUserById);
router.get('/doctors/search',doctorController.searchDoctors)
module.exports = router;