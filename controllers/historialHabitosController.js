import { actualizarACompletado, obtenerListaHistorialHabitos } from "../services/historialHabitosService";

export const obtenerhistorialDeHabitosController = async (request, response) => {
    const { id } = request.params;
    
    try {
        const historialCompleto = await obtenerListaHistorialHabitos(id);
        response.status(200).json({
            data : historialCompleto,
            error : null
        });
    } catch (err) {
        response.status(500).json({
            data : null,
            error : {
                code : 500,
                message : "Error al obtener el historial de los habitos del usuario."
            }
        });
    }
};

export const actualizarACompletadoController = async (request, response) => {
    const { id, habitoId } = request.params;
    
    try {
        const historialActualizado = await actualizarACompletado(id, habitoId);
        response.status(200).json({
            data : historialActualizado,
            error : null
        });
    } catch (err) {
        response.status(500).json({
            data : null,
            error : {
                code : 500,
                message : `Error al completar historial del habito con id = ${habitoId}.`
            }
        });
    }
};

