import { normalizarBooleans } from "../utils/utils.js";

import { crearHabito, obtenerHabitoPorId, obtenerlistaHabitos, modificarHabito, eliminarHabito } from "../services/habitosServices.js";

export const crearHabitoController = async (request, response) => {
    const { id } = request.params;
    const camposRequeridos = ["titulo", "descripcion", "recordatorio", "habilitado"];
    const faltantes = camposRequeridos.filter( campo => !request.body.hasOwnProperty(campo));
    console.log(request.body)
    if (faltantes.length > 0) {
        return response.status(400).json({
            data: null,
            error: { 
                code: 400, 
                message: `Faltan campos: ${faltantes.join(", ")}.` }
        });
    }

    try {
        const habitoCreado = await crearHabito(id, request.body);
        response.status(201).json({
            data : habitoCreado,
            error : null
        });
    } catch (err) {
        response.status(500).json({
            data : null,
            error : {
                code : 500,
                message : "Error al crear habito."
            }
        });
    }
};

export const listarHabitosController = async (request, response) => {
    const { id } = request.params;
    console.log(id, request.query)
    try {
        const { habilitado , detalles } = normalizarBooleans(request.query);

        const listaHabitos = await obtenerlistaHabitos(id, habilitado, detalles);

        response.status(200).json({
            data : listaHabitos,
            error : null
        });
    } catch (err) {

        if (err.message.includes("debe de ser 'true' o 'false'")) {
            return response.status(400).json({
                data: null,
                error: { 
                    code: 400, 
                    message: err.message 
                }
            });
        }

        response.status(500).json({
            data : null,
            error : {
                code : 500,
                message : "Error al obtener los habitos del usuario."
            }
        });
    }
};

export const obtenerHabitoPorIdController = async (request, response) => {
    const { id, habitoId } = request.params;

    try {
        const habito = await obtenerHabitoPorId(id, habitoId);
        if (!habito) {
            return response.status(404).json({
                data : null,
                error : {
                    code : 404,
                    message : `No se obtuvo nigun habito con id = ${habitoId} que pertenezca al usuario.`
                }
            });
        }
        response.status(200).json({
            data : habito,
            error : null 
        });
    } catch (err) {
        response.status(500).json({
            data : null,
            error : {
                code : 500,
                message : "Error al obtener habito del usuario."
            }
        });
    }
};

export const modificarHabitoController = async (request, response) => {
    const { id, habitoId } = request.params;

    try {
        const habitoActualizado = await modificarHabito(id, habitoId, request.body);

        if (habitoActualizado === null) {
            return response.status(400).json({
                data: null,
                error: { 
                    code: 400, 
                    message: "No se enviaron campos válidos para actualizar." }
            });
        }
        if (!habitoActualizado) {
            return response.status(404).json({
                data: null,
                error: { 
                    code: 404, 
                    message: `No se encontró hábito con id = ${habitoId} para el usuario ${id}.` }
            });
        }

        response.status(200).json({
            data :habitoActualizado,
            error : null
        });
    } catch (err) {
        response.status(500).json({
            data : null,
            error : {
                code : 500,
                message : "Error al modificar el habito del usuario."
            }
        });
    }
};

export const eliminarHabitoController = async (request, response) => {
    const { id, habitoId } = request.params;
    try {
        const result = await eliminarHabito(id, habitoId);
        if (result === 0) {
            return response.status(404).json({
                data: null,
                error: { 
                    code: 404, 
                    message: `No se encontró hábito con id = ${habitoId} para el usuario ${id}.` }
            });
        }
        response.status(204).end();
    } catch (err) {
        response.status(500).json({
            data : null,
            error : {
                code : 500,
                message : "Error al eliminar habito del usuario."
            }
        });
    }
};