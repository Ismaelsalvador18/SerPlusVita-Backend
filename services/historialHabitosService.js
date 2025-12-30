import pool from "../db.js";
import { reformatearDate } from "../utils/utils.js";

export const crearHistorialHabitosDeHoy = async () => {
    const habitos = await pool.query(`SELECT id, usuario_id FROM habitos`);

    for (const habito of habitos.rows) {
        await pool.query(
            `INSERT INTO historial_habitos (usuario_id, habito_id, fecha, completado)
                VALUES ($1, $2, CURRENT_DATE, false)
                ON CONFLICT (usuario_id, habito_id, fecha) DO NOTHING`,
            [habito.usuario_id ,habito.id]
        );
    }

    return habitos.rowCount;
};

export const obtenerListaHistorialHabitos = async (usuarioId) => {
    const result = await pool.query(
        `SELECT h.titulo, hh.fecha, hh.completado 
            FROM historial_habitos hh
            JOIN habitos h ON hh.habito_id = h.id
            WHERE hh.usuario_id = $1 
            AND hh.fecha >= CURRENT_DATE - INTERVAL '29 days'
            ORDER BY hh.fecha DESC`,
        [usuarioId]
    );
    return result.rows.map( obj => reformatearDate(obj, "fecha"));
};

export const actualizarACompletado = async (usuarioId, habitoId) => {

    const result = await pool.query(
        `UPDATE historial_habitos SET completado = true
            WHERE fecha = CURRENT_DATE
                AND usuario_id = $1
                AND habito_id = $2
            RETURNING habito_id, fecha, completado`,
        [usuarioId, habitoId]
    );
    if (result.rowCount === 0) return null;
    return reformatearDate(result.rows[0], "fecha");
};

export const eliminarHistorialAntiguo = async () => {
    const result = await pool.query(
        `DELETE FROM historial_habitos WHERE fecha < CURRENT_DATE - INTERVAL '30 days'`,  
    );
    return result.rowCount;
} ;
