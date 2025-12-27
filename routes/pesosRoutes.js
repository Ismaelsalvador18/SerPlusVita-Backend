import express from "express";
import { crearPesoController, listarPesosController } from "../controllers/pesosController.js";

const route = express.Router();

route.post("/", crearPesoController);

//      /:id/pesos?dias=7
route.get("/:id/pesos", listarPesosController);

export default route;