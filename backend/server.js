require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);

// Start server AFTER DB connects
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log("🚀 Server running");
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();