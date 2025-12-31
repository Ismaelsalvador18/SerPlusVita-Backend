import pool from "../db.js";

export const crearHabito = async (usuarioId, habito) => {
    const result = await pool.query(
        `INSERT INTO habitos (usuario_id, titulo, descripcion, recordatorio, habilitado)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, titulo, descripcion, recordatorio, habilitado`,
        [
            usuarioId,
            habito.titulo,
            habito.descripcion,
            habito.recordatorio,
            habito.habilitado
        ]
    );

    return result.rows[0];
};

export const obtenerlistaHabitos = async (usuarioId, habilitado, detalles) => {
    const campos = detalles === false ?
        "h.id, h.titulo, h.habilitado" :
        "h.id, h.titulo, h.descripcion, h.recordatorio, h.habilitado";

    let consulta = `
        SELECT ${campos},
               EXISTS(
                 SELECT 1 FROM historial_habitos 
                 WHERE habito_id = h.id 
                   AND usuario_id = h.usuario_id 
                   AND completado = true 
                   AND DATE(fecha) = CURRENT_DATE
               ) as completado
        FROM habitos h
        WHERE h.usuario_id = $1`;

    const parametros = [usuarioId];

    if (habilitado !== undefined) {
        consulta += ` AND h.habilitado = $2`;
        parametros.push(habilitado);
    }

    const result = await pool.query(consulta, parametros);
    return result.rows;
};

export const obtenerHabitoPorId = async (usuarioId, habitoId) => {
    const result = await pool.query(
        `SELECT id, titulo, descripcion, recordatorio, habilitado FROM habitos
            WHERE id = $1 AND usuario_id = $2`,
        [habitoId, usuarioId]
    ); 
                           
    return result.rows[0];
};

export const modificarHabito = async (usuarioId, habitoId, datos) => {
    const camposPermitidos = ["titulo", "descripcion", "recordatorio", "habilitado"];
    const keys = Object.keys(datos).filter(key => camposPermitidos.includes(key));
    const values = keys.map( key => datos[key]);

    if (keys.length === 0) return null;

    const declaracion = keys.map( (key, index) => `${key} = $${index + 1}`).join(", ");
    
    const result = await pool.query(
        `UPDATE habitos SET ${declaracion} 
        WHERE id = $${keys.length + 1} AND usuario_id = $${keys.length + 2}
        RETURNING id, titulo, descripcion, recordatorio, habilitado`,
        [...values, habitoId, usuarioId]
    );

    return result.rows[0];
};


export const eliminarHabito = async (usuarioId, habitoId) => {
    const result =  await pool.query(
        `DELETE FROM habitos WHERE id = $1 AND usuario_id = $2`,
        [habitoId, usuarioId]
    );

    return result.rowCount;
};
