import express from "express";
import * as UserController from "../Controller/UserController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {adminMiddleware} from "../middleware/roleMiddleware.js";
const userRouter = express.Router();


userRouter.post("/", UserController.postuserData);          
userRouter.post("/login", UserController.loginUser);         


userRouter.get("/", authMiddleware, adminMiddleware, UserController.getuserData);
userRouter.delete("/:id", authMiddleware, adminMiddleware, UserController.deleteUser);
userRouter.put("/:id/role", authMiddleware, adminMiddleware, UserController.updateUserRole);

export default userRouter;