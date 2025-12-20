import pool from "../db.js";
import { insertarPeso } from "./pesosService.js";
import { reformatearDate } from "../utils/utils.js";
  

export const crearUsuario = async (usuario) => {

    const result = await pool.query(
            `INSERT INTO usuarios (correo, contrasena, nombre, altura, peso, fecha_nacimiento, invitado)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
            [
                usuario.correo,
                usuario.contrasena,
                usuario.nombre,
                usuario.altura,
                usuario.peso,
                usuario.fecha_nacimiento,
                usuario.invitado
            ]
    );

    const id = result.rows[0].id;

    insertarPeso(id, usuario.peso);
};

export const obtenerUsuarioPorId = async (id) => {
    const result = await pool.query(
        `SELECT * FROM usuarios WHERE id = $1`,
        [id]
    );
    if (result.rowCount !== 1) return null;
    
    return reformatearDate(result.rows[0], "fecha_nacimiento");
};

export const actualizarUsuario = async (id, datos) => {
    const keys = Object.keys(datos);
    const values = Object.values(datos);

    if (keys.length === 0) return;  

    const declaracion = keys.map( (key, index) => `${key} = $${index + 1}`).join(", ");

    await pool.query(
        `UPDATE usuarios SET ${declaracion} WHERE id = $${keys.length + 1}`,
        [...values, id] 
    );

    if (keys.includes("peso")) {
        await insertarPeso(id, datos.peso);
    }
};

export const eliminarUsuario = async (id) => {
     await pool.query(
        `DELETE FROM usuarios WHERE id = $1`,
        [id]
    );
} 