export const adminMiddleware = (req, res, next) => {
  // authMiddleware must run first — it populates req.user
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied: admins only" });
};