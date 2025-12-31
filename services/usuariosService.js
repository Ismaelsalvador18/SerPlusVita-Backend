import pool from "../db.js";
import { upsertPeso } from "./pesosService.js";
import { reformatearDate } from "../utils/utils.js";
import bcrypt from "bcrypt";

export const crearUsuario = async (usuario) => {
    console.log(usuario);
    const constrasenaHasheada = null;

    if (usuario.contrasena !== null && usuario.invitado === false){
        constrasenaHasheada = await bcrypt.hash(usuario.contrasena, 10);
    }

    const result = await pool.query(
            `INSERT INTO usuarios (correo, contrasena, nombre, altura, peso, fecha_nacimiento, invitado)
                VALUES ($1, $2, $3, $4, $5, $6, $7) 
                RETURNING id, correo, nombre, altura, peso, fecha_nacimiento, invitado, creado_en`,
            [
                usuario.correo,
                constrasenaHasheada,
                usuario.nombre,
                usuario.altura,
                usuario.peso,
                usuario.fecha_nacimiento,
                usuario.invitado
            ]
    );

    const id = result.rows[0].id;

    await upsertPeso(id, usuario.peso);

    return reformatearDate(result.rows[0], "fecha_nacimiento");
};

export const obtenerUsuarioPorId = async (id) => {
    const result = await pool.query(
        `SELECT id, correo, nombre, altura, peso, fecha_nacimiento, invitado FROM usuarios WHERE id = $1`,
        [id]
    );
    if (result.rowCount !== 1) return null;
    
    return reformatearDate(result.rows[0], "fecha_nacimiento");
};

export const obtenerUsuarioPorCorreo = async (correo) => {
    const result = await pool.query(
        `SELECT id, correo, nombre, altura, peso, fecha_nacimiento, invitado FROM usuarios WHERE correo = $1`,
        [correo]
    );
    if (result.rowCount !== 1) return null;
    
    return reformatearDate(result.rows[0], "fecha_nacimiento");
};

export const actualizarDatosUsuario = async (id, datos) => {
    const camposPermitidos = ["nombre", "fecha_nacimiento", "altura", "peso"];
    const keys = Object.keys(datos).filter( key => camposPermitidos.includes(key));
    const values = keys.map( key => datos[key]);

    if (keys.length === 0) return null;

    const declaracion = keys.map( (key, index) => `${key} = $${index + 1}`).join(", ");

    const result = await pool.query(
        `UPDATE usuarios SET ${declaracion} WHERE id = $${keys.length + 1}
        RETURNING nombre, altura, peso, fecha_nacimiento`,
        [...values, id] 
    );

    if (keys.includes("peso")) {
        await upsertPeso(id, datos.peso);
    }

    return reformatearDate(result.rows[0], "fecha_nacimiento");
};

export const actualizarUsuarioInvitado = async (id, datos) => {

    if ( !datos.hasOwnProperty("correo") || !datos.hasOwnProperty("contrasena")) return null;

    const constrasenaHasheada = await bcrypt.hash(datos.contrasena, 10);

    const result = await pool.query(
        `UPDATE usuarios SET correo = $1, contrasena = $2, invitado = false WHERE id = $3
        RETURNING id, correo, invitado`,
        [datos.correo, constrasenaHasheada, id] 
    );

    return result.rows[0];
};

export const eliminarUsuario = async (id) => {
    await pool.query(
        `DELETE FROM usuarios WHERE id = $1`,
        [id]
    );
}; 