import express from "express";
import { authLogin, authRegister } from "./auth.controller";
const authRouter = express.Router();
const mainPrefix = "/auth";

authRouter.post(`${mainPrefix}/register`, authRegister);
authRouter.post(`${mainPrefix}/login`, authLogin);

export default authRouter;
