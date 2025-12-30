import express from "express";
import { requireOwner } from "../middlewares/requireOwner.js";

import { crearPesoController, listarPesosController } from "../controllers/pesosController.js";

const route = express.Router();

route.post("/:id/pesos", requireOwner, crearPesoController);
    
//      /:id/pesos?dias=7
route.get("/:id/pesos", requireOwner, listarPesosController);

export default route;