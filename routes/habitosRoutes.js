import express from "express";
import { crearHabitoController, eliminarHabitoController, listarHabitosController, obtenerHabitoPorIdController, modificarHabitoController } from "../controllers/habitosController.js";

const route = express.Router();

route.post("/:id/habitos", crearHabitoController);

route.get("/:id/habitos", listarHabitosController);                 // /:id/habitos?habilitado=true&detalles?true
route.get("/:id/habitos/:habitoId", obtenerHabitoPorIdController);
route.put("/:id/habitos/:habitoId", modificarHabitoController);
route.delete("/:id/habitos/:habitoId", eliminarHabitoController);

export default route;