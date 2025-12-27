import express from "express";
import { crearUsuarioController, 
    obtenerUsuarioPorIdController, 
    actualizarUsuarioController, 
    eliminarUsuarioController, 
    obtenerUsuarioPorCorreoController, 
    convertirInvitadoController 
} from "../controllers/usuariosController.js";

const router = express.Router();

router.post("/", crearUsuarioController);

router.get("/", obtenerUsuarioPorCorreoController);     // para login 
router.get("/:id", obtenerUsuarioPorIdController);

router.patch("/:id", actualizarUsuarioController);
router.patch("/:id/convertir", convertirInvitadoController);

router.delete("/:id", eliminarUsuarioController);

export default router;