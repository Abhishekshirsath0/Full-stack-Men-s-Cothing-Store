import express from "express";
import { Userlogin } from "../Controller/authController.js";

const authRouter = express.Router();

authRouter.post("/login", Userlogin);

export default authRouter;