import pool from "../db.js"

export const actualizarPesoUsuario = async (UsuarioId, peso) => {
    insertarPeso(UsuarioId, peso);

    await pool.query(
        "UPDATE usuarios SET peso = $1 WHERE id = $2",
        [peso, UsuarioId]  
    );
}; 

export const insertarPeso = async (UsuarioId, peso) => {
    await pool.query(
        `INSERT INTO pesos (usuario_id, fecha, peso) VALUES ($1, CURRENT_DATE, $2)
            ON CONFLICT (usuario_id, fecha) 
            DO UPDATE SET peso = EXCLUDED.peso`,
        [UsuarioId, peso]
    );
};