import express from "express";
import { actualizarACompletadoController, obtenerhistorialDeHabitosController } from "../controllers/historialHabitosController";

const route = express.Router();

route.get("/:id/habitos/historial", obtenerhistorialDeHabitosController);
route.patch("/:id/habitos/:habitoId/historial/Completar", actualizarACompletadoController);

export default route;