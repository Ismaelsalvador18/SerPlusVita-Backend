import { request, response } from "express";
import { crearUsuario, obtenerUsuarioPorId , actualizarUsuario, eliminarUsuario} from "../services/usuariosService.js";

export const crearUsuarioController = async (request, response) => {
    try {
        await crearUsuario(request.body);

        response.status(201).send("Usuario creado");
    } catch (err) {
        response.status(500).send("Error al crear usuario");
    }
};

export const obtenerUsuarioPorIdController = async (request, response) => {
    const { id }= request.params;
    try {
        const usuario = await obtenerUsuarioPorId(id);

        if (!usuario) return response.status(404).send(`Error al obtener usuario con id = ${id}`)
               
        response.json(usuario);
    } catch (err) {
        response.status(500).send(`Error al obtener usuario con id = ${id}`)
    }
};

export const actualizarUsuarioController = async (request, response) => {
    const { id } = request.params;
    try {
        actualizarUsuario(id, request.body);
        
        response.status(201).send(`usuario con id = ${id} actualizado`);
    } catch (err) {
        response.status(500).send(`Error al actualizar datos del usuario con id = ${id}`);
    }
};

export const eliminarUsuarioController = async (request, response) => {
    const { id } = request.params;
    try {
        eliminarUsuario(id);
    } catch (err) {
        response.status(500).send(`Error al eliminar usuario con id = ${id}`);
    }
}




