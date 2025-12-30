import express from "express";
import { loginController, registrarUsuarioController } from "../controllers/authController.js";

const route = express.Router();

route.post("/login", loginController);
route.post("/registro", registrarUsuarioController);

export default route;