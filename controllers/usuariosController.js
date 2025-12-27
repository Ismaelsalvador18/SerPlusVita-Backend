import { request, response } from "express";
import { crearUsuario, obtenerUsuarioPorId , actualizarDatosUsuario, eliminarUsuario, obtenerUsuarioPorCorreo, actualizarUsuarioInvitado} from "../services/usuariosService.js";

export const crearUsuarioController = async (request, response) => {
    const camposRequeridos = ["correo", "contrasena", "nombre", "altura", "peso", "fecha_nacimiento", "invitado"];
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
        const usuario = await crearUsuario(request.body);

        response.status(201).json({
            data : usuario,
            error : null
        });
    } catch (err) {
        response.status(500).json({
            data : null,
            error : {
                code : 500,
                message : "Error al crear Usuario."
            }
        });
    }
};

export const obtenerUsuarioPorIdController = async (request, response) => {
    const { id } = request.params;
    try {
        const usuario = await obtenerUsuarioPorId(id);

        if (!usuario) {
            return response.status(404).json({
                data : null,
                error : {
                    code : 404,
                    message : `No se encontro el usuario con id = ${ id }.`
                }
            });
        }       
        response.status(200).json({
            data : usuario,
            error : null
        });
    } catch (err) {
        response.status(500).json({
            data : null,
            error : {
                code : 500,
                message : "Error al encontrar usuario por su id."
            }
        });
    }
};

export const obtenerUsuarioPorCorreoController = async (request, response) => {
    const correo = request.query.correo;

    if (!correo) {
        return response.status(400).json({
            data : null,
            error : {
                code : 400,
                message : "Solicitud de consulta por correo erronea."
            }
        });
    }

    try {
        const usuario = await obtenerUsuarioPorCorreo(correo);

        if (!usuario) {
            return response.status(404).json({
                data : null,
                error : {
                    code : 404,
                    message : `No se encontro el usuario con correo = ${correo}.`
                }
            });
        }       
        response.status(200).json({
            data : usuario,
            error : null
        });
    } catch (err) {
        response.status(500).json({
            data : null,
            error : {
                code : 500,
                message : "Error al encontrar usuario por su correo."
            }
        });
    }
};

export const actualizarUsuarioController = async (request, response) => {
    const { id } = request.params;
    try {
        const usuarioActualizado = await actualizarDatosUsuario(id, request.body);

        response.status(200).json({
            data :usuarioActualizado,
            error : null,
        });
    } catch (err) {
        response.status(500).send({
            data : null,
            error : {
                code : 500,
                message : `Error al actualizar usuario con id = ${id}`
            }
        });
    }
};

export const convertirInvitadoController = async (request, response) => {
    const { id } = request.params
    const correo = request.query.correo;
    const datos = request.body;
    if (!correo) {
        return response.status(400).json({
            data : null,
            error : {
                code : 400,
                message : "El parametro 'correo' invalido en la consulta."
            }
        });
    }

    if ( !datos.hasOwnProperty("correo") || !datos.hasOwnProperty("contrasena")) {
        return response.status(400).json({
            data : null,
            error : {
                code : 400,
                message : "datos necesario 'correo' y 'contrasena' para la consulta."
            }
        });
    }

    try {
        const usuarioActualizado = await actualizarUsuarioInvitado(id, datos);
        response.status(200).json({
            data : usuarioActualizado,
            error : null
        });
    } catch (err) {
        response.status(500).send({
            data : null,
            error : {
                code : 500,
                message : `Error al convertir al usuario con id = ${id}`
            }
        });
    }
};


export const eliminarUsuarioController = async (request, response) => {
    const { id } = request.params;
    try {
        await eliminarUsuario(id);
        response.status(204).end();
    } catch (err) {
        response.status(500).json({
            data : null,
            error : {
                code : 500,
                message : "Error al eliminar usuario."
            }
        });
    }
}




