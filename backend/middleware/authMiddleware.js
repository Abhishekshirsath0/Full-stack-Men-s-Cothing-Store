import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  // Accept token from httpOnly cookie OR Authorization: Bearer <token> header
  const token =
    req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied: no token provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // { id, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Access denied: invalid or expired token" });
  }
};