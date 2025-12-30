import express from "express";
import { requireOwner } from "../middlewares/requireOwner.js";

import { actualizarACompletadoController, obtenerHistorialDeHabitosController } from "../controllers/historialHabitosController.js";

const route = express.Router();

route.get("/:id/historial-habitos", requireOwner, obtenerHistorialDeHabitosController);
route.patch("/:id/habitos/:habitoId/completar",  requireOwner, actualizarACompletadoController);

export default route;