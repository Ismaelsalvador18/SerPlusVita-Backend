import pool from "../db.js";
import bcrypt from "bcrypt";
import { generarToken } from "../middlewares/verificarToken.js";

export const loginUsuario = async (correo, contrasena) => {
    const result = await pool.query(
        `SELECT id, contrasena FROM usuarios WHERE correo = $1`,
        [correo]
    );

    if (result.rowCount !== 1) return null;

    const usuario = result.rows[0];

    const esValido = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValido) return null;

    const token = generarToken({ id: usuario.id })

    return { 
        id: usuario.id, 
        token: token 
    };
};