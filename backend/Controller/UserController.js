import User from "../Model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();


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

    const savedUser = await newUser.save();
    
     // Generate JWT token with user ID and role

    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.Usertype },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

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
    return res.status(500).json({ message: "Server error during registration" });
  }
};


// READ: Get all users  

export const getuserData = async (req, res) => {
  try {
    const users = await User.find().select("-Password");
    return res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Error fetching users" });
  }
};


// DELETE: Remove user  (auth + admin required — enforced in router)

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error deleting user" });
  }
};


export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params; 
    const { role } = req.body;

    const allowedRoles = ["user", "admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be 'user' or 'admin'." });
    }

   
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { Usertype: role },
      { new: true }
    ).select("-Password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating user role" });
  }
};

 
export const loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.Usertype },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    const { Password: _, ...userData } = user._doc;
    return res.status(200).json({ success: true, user: userData, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error during login" });
  }
};
