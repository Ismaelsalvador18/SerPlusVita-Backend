import { actualizarPesoUsuario, obtenerUltimosPesos } from "../services/pesosService.js";

export const guardarPesoController = async (request, response) => {
    const {id} = request.params;
    const {peso} = request.body;
    try {
        await actualizarPesoUsuario(id, peso);
        
        response.status(201).send(`Peso ${peso} ingresado correctamente al usuario con id ${id} `);

    } catch (err) {
        response.status(500).send(`Error al insertar el peso: ${peso} al usuario: ${id}`)
    }
};

export const listarPesosController = async (request, response) => {
    const { id } = request.params;
    const dias = parseInt(request.query.dias, 10);
    try {
        if (isNaN(dias) || dias <= 0) {
            return response.status(400).send(`El parametro 'dias' debe de ser un numero entero mayor a 0.`);
        }
        const pesosArray = await obtenerUltimosPesos(id, dias);
        response.json(pesosArray);
    } catch (err) {
        response.status(500).send(`Error al obtener los pesos de usuario con id ${id}.`);
    }
};


