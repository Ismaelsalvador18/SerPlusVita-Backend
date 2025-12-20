import express from "express";
import { crearUsuarioController, obtenerUsuarioPorIdController, actualizarUsuarioController, eliminarUsuarioController } from "../controllers/usuariosController.js";

const router = express.Router();

router.post("/", crearUsuarioController);
router.get("/:id", obtenerUsuarioPorIdController);
router.put("/:id", actualizarUsuarioController);
router.delete("/:id", eliminarUsuarioController);

export default router;