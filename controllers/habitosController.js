import { request, response } from "express";
import { crearHabito, obtenerHabitoPorId, obtenerHabitos } from "../services/habitosServices.js";
import { normalizarBooleans } from "../utils/utils.js";

export const crearHabitoController = async (request, response) => {
    const { id } = request.params;
    try {
        await crearHabito(id, request.body);
        response.status(201).send(`Habito creado correctamente.`);
    } catch (err) {
        response.status(500).send(`Error al crear habito.`);
    }
};

export const listarHabitosController = async (request, response) => {
    const { id } = request.params;
    const { habilitado , detalles } = normalizarBooleans(request.query);
    
    try {
        const habitos = await obtenerHabitos(id, habilitado, detalles);
        response.json(habitos);
    } catch (err) {
        response.status(500).send(`Error al obtener los datos del usuario.`);
    }
};

export const obtenerHabitoPorIdController = async (request, response) => {
    const { id, habitoId } = request.params;

    try {
        const habito = await obtenerHabitoPorId(id, habitoId);
        if (!habito) {
            return response.status(400).send("Habito no encontrado.");
        }
        response.json(habito);
    } catch (err) {
        response.status(500).send(`Error al obtener el habito del usuario.`);
    }
};

export const modificarHabitoController = async (request, response) => {
    const { id, habitoId } = request.params;

    try {
        await modificarHabito(id, habitoId, request.body);
        response.status(201).send("El habito se ha actualizado correctamente");
    } catch (err) {
        response.status(500).send("Error al actualizar habito.");
    }
};

export const eliminarHabitoController = async (request, response) => {
    const { id, habitoId } = request.params;
    try {
        await eliminarHabito(id, habitoId);
        response.status(200).send("Se elimino el habito.");
    } catch (err) {
        response.status(500).send("Error al eliminar habito.");
    }
};