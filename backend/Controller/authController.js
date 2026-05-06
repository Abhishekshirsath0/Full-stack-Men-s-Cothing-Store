import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../Model/User.js";

export const Userlogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.Usertype || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    const userData = user.toObject();
    delete userData.Password;

    res.status(200).json({
      success: true,
      token,
      user: userData,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Login error" });
  }
};