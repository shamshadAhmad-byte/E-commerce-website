import express from "express";
import { admin, login, register } from "../controller/userRoutes.js";
const userRouter = express.Router();
userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/admin", admin);
export default userRouter;
