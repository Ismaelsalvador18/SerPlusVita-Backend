import express from "express";
import { requireOwner } from "../middlewares/requireOwner.js";

import { obtenerUsuarioPorIdController, actualizarUsuarioController, 
    eliminarUsuarioController, convertirInvitadoController 
} from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/:id", requireOwner, obtenerUsuarioPorIdController);

router.patch("/:id", requireOwner, actualizarUsuarioController);
router.patch("/:id/convertir", requireOwner, convertirInvitadoController);

router.delete("/:id", requireOwner, eliminarUsuarioController);

export default router;