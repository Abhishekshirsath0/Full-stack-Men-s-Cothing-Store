import express from "express";
import * as UserController from "../Controller/UserController.js";

const userRouter = express.Router();

userRouter.post("/register", UserController.postuserData); // ✅ was "/" — changed to /register for clarity
userRouter.get("/", UserController.getuserData);
userRouter.delete("/:_id", UserController.deleteUser);
userRouter.put("/:userId/role", UserController.updateUserRole);


export default userRouter;