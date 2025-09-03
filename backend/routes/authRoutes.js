import express from "express";
import { googleAuth, login, logOut, signUp } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.post("/googleauth",googleAuth)
authRouter.get("/logout",logOut)

export default authRouter;