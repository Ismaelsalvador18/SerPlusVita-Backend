import { actualizarPesoUsuario } from "../services/pesosService.js";

export const insertarPesoController = async (request, response) => {
    const {id} = request.params;
    const {peso} = request.body;
    try {
         
        await actualizarPesoUsuario(id, peso);
        
        response.status(201).send(`Peso ${peso} ingresado correctamente al usuario con id ${id} `);

    } catch (err) {
        response.status(500).send(`Error al ingresar el peso: ${peso}`)
    }
};



