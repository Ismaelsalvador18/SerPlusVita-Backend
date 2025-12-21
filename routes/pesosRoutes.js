import express from "express";
import { guardarPesoController, listarPesosController } from "../controllers/pesosController.js";

const route = express.Router();

route.post("/", guardarPesoController);
route.get("/:id/pesos", listarPesosController);

export default route;