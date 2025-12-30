import { actualizarPesoUsuario, listarPesosUltimosDias } from "../services/pesosService.js";

export const crearPesoController = async (request, response) => {
    const {id} = request.params;
    const peso = parseFloat(request.body.peso);

    if (isNaN(peso) || peso <= 0.0) {
        return response.status(400).json({
            data : null,
            error : {
                code : 400,
                message : "Peso Invalido"
            }
        });
    }

    try {
        const result = await actualizarPesoUsuario(id, peso);
        
        response.status(201).json({
            data : result,
            error : null
        });

    } catch (err) {
        response.status(500).json({
            data : null,
            error : {
                code : 500,
                message : "Error al crear Peso."
            } 
        });
    }
};

export const listarPesosController = async (request, response) => {
    const { id } = request.params;
    const dias = parseInt(request.query.dias, 10);

    if ( isNaN(dias) || dias <= 0) {
        return response.status(400).json({
            data: null,
            error : {
                code : 400,
                message : "El parametro 'dias debe ser un numero entero positivo valido."
            }
        });
    }

    try {
        const ultimosPesos = await listarPesosUltimosDias(id, dias);
        response.status(200).json({
            data : ultimosPesos,
            error : null
        });
    } catch (err) {
        response.status(500).json({
            data: null,
            error : {
                code : 500,
                message : `Error al obtener la lista de pesos de los ultimos ${dias} dias.`
            }
        });
    }
};


