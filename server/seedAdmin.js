import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

const createAdmin = async () => {
  try {
    await mongoose.connect("mongodb+srv://safvan_k:safvan1998@cluster0.cp8rrlt.mongodb.net/kerala_it_park_jobs_website;")

    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

createAdmin();