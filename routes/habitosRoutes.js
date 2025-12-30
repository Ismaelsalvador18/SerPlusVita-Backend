import express from "express";
import { requireOwner } from "../middlewares/requireOwner.js";
import { crearHabitoController, eliminarHabitoController, listarHabitosController, obtenerHabitoPorIdController, modificarHabitoController } from "../controllers/habitosController.js";

const route = express.Router();

route.post("/:id/habitos", requireOwner, crearHabitoController);

route.get("/:id/habitos", requireOwner, listarHabitosController);                 // /:id/habitos?habilitado=true&detalles=true
route.get("/:id/habitos/:habitoId", requireOwner, obtenerHabitoPorIdController);

route.patch("/:id/habitos/:habitoId", requireOwner, modificarHabitoController);
route.delete("/:id/habitos/:habitoId", requireOwner, eliminarHabitoController);

export default route;