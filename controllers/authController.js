import { normalizarBooleans } from "../utils/utils.js";

import { generarToken } from "../middlewares/verificarToken.js";
import { loginUsuario } from "../services/authServices.js";
import { crearUsuario } from "../services/usuariosService.js";

export const registrarUsuarioController = async (request, response) => {
    let camposRequeridos = ["correo", "contrasena", "nombre", "altura", "peso", "fecha_nacimiento", "invitado"];
    if (request.body.invitado !== null && request.body.invitado) {
        request.body.correo = null;
        request.body.contrasena = null;
    } 
    const faltantes = camposRequeridos.filter( campo => !request.body.hasOwnProperty(campo));
    if (faltantes.length > 0) {
        return response.status(400).json({
            data: null,
            error: { 
                code: 400, 
                message: `Faltan campos: ${faltantes.join(", ")}` }
        });
    }
    
    try {
        const nuevoUsuario = await crearUsuario(request.body);
        console.log(request.body);
        const token = generarToken({ id: nuevoUsuario.id });
        
        return response.status(201).json({
            data : {
                id : nuevoUsuario.id,
                token : token
            },
            error : null
        });

    } catch (err) {
        response.status(500).json({
            data: null,
            error: {
                code: 500,
                message: "Error al registrar usuario."
            }
        });
        
    } 

}; 

export const loginController = async (request, response) => {
    const { correo, contrasena } = request.body;
    
    if (!correo || !contrasena ) {
        return response.status(400).json({
            data: null,
            error: { 
                code: 400, 
                message: "Los parámetros 'correo' y 'contrasena' son requeridos." 
            }
        });
    }

    try {
        const sesion = await loginUsuario(correo, contrasena);
        console.log(sesion);
        if (!sesion) {
            return response.status(401).json({ 
                data: null,
                error: { 
                    code: 401, 
                    message: `Credenciales invalidas.` 
                }
            });
        } 

        response.status(200).json({ 
            data : sesion,
            error : null
        });
    } catch (err) {
        return response.status(500).json({
            data: null,
            error : {
                code : 500,
                message : "Error de login."
            }
        });
    }
};
