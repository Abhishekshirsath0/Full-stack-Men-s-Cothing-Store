import express from "express";
import * as LoginController from "../Controller/LoginController.js";

const userRouter = express.Router();

userRouter.post("/", LoginController.postuserData);
userRouter.get("/", LoginController.getuserData);
userRouter.delete("/:_id", LoginController.deleteUser);
userRouter.put("/:userId/role", LoginController.updateUserRole);
export default userRouter;
