import express from "express";
import { actualizarACompletadoController, obtenerHistorialDeHabitosController } from "../controllers/historialHabitosController.js";

const route = express.Router();

route.get("/:id/historial-habitos", obtenerHistorialDeHabitosController);
route.patch("/:id/habitos/:habitoId/Completar", actualizarACompletadoController);

export default route;