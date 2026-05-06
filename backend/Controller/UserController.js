import User from "../Model/User.js"; // ✅ was "../model/user.js" — wrong case
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// CREATE: Register new user
export const postuserData = async (req, res) => {
  const { Firstname, Lastname, Address, Email, Phone, Password } = req.body;

  if (!Firstname || !Lastname || !Address || !Email || !Phone || !Password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const exists = await User.findOne({ Email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const newUser = new User({
      Firstname,
      Lastname,
      Address,
      Email,
      Phone,
      Password: hashedPassword,
    });

    const savedUser = await newUser.save(); // ✅ save first before signing token

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    const { Password: _, ...userData } = savedUser._doc;
    return res.status(201).json({ success: true, user: userData, token });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error during Saving" });
  }
};

// READ: Get all users
export const getuserData = async (req, res) => {
  try {
    const users = await User.find().select("-Password"); // ✅ never send passwords
    res.status(200).json(users);
  } catch (err) {
    console.error("Error while reading data at controller:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// DELETE: Remove user
export const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedUser = await User.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "User deleted successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error deleting user" });
  }
};

// UPDATE: Change user role
export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { Usertype: role },
      { new: true } // ✅ was returnDocument:"after" which is MongoDB driver syntax, not Mongoose
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User role updated successfully", user: updatedUser });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating user role" });
  }
};