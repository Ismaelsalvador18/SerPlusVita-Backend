import pool from "../db.js"
import { reformatearDate } from "../utils/utils.js";

export const actualizarPesoUsuario = async (usuarioId, peso) => {
    const registroPeso = await upsertPeso(usuarioId, peso);
    const usuarioActualizado = await pool.query(
        `UPDATE usuarios SET peso = $1 WHERE id = $2
        RETURNING id, nombre, peso`,
        [peso, usuarioId]  
    );
    return {
        peso : registroPeso,
        usuario : usuarioActualizado.rows[0]
    };
}; 

export const upsertPeso = async (usuarioId, peso) => {
    const result = await pool.query(
        `INSERT INTO pesos (usuario_id, fecha, peso) VALUES ($1, CURRENT_DATE, $2)
            ON CONFLICT (usuario_id, fecha) 
            DO UPDATE SET peso = EXCLUDED.peso
            RETURNING usuario_id, peso, fecha`,
        [usuarioId, peso]
    );
    return reformatearDate(result.rows[0], "fecha");
};

export const listarPesosUltimosDias = async (usuarioId, dias) => {
    const result = await pool.query(
        `SELECT peso, fecha FROM pesos WHERE usuario_id = $1
            AND fecha BETWEEN CURRENT_DATE - ($2::int - 1) AND CURRENT_DATE
            ORDER BY fecha DESC`,
        [usuarioId, dias]
    );
    return result.rows.map( objetoPeso => reformatearDate(objetoPeso, "fecha"));
};

export const eliminarPesosAntiguos = async () => {
    const result = await pool.query(
        `DELETE FROM pesos WHERE fecha < CURRENT_DATE - INTERVAL '30 days'`,
    );
    return result.rowCount;
};