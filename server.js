const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cors=require("cors");
const doctorRoutes=require("./routes/doctorRoutes");
const patientRoutes = require('./routes/patientRoutes');
const specialityRoutes= require('./routes/specialityRoutes');
const reviewRoutes=require('./routes/reviewRoutes');
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
app.use("/api3",reviewRoutes);
app.use("/auth", authRoutes);
app.use('/patient', patientRoutes);
app.use('/api', doctorRoutes);
app.use('/api2',specialityRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));