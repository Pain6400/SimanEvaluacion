import { pool } from "../database/connectdb.js";

const createAsignacion = async (colaborador_id, sucursal_id, distancia_km) => {
    const query = `
        INSERT INTO asignaciones (colaborador_id, sucursal_id, distancia_km)
        VALUES ($1, $2, $3)
        ON CONFLICT (colaborador_id, sucursal_id) DO NOTHING
    `;
    await pool.query(query, [colaborador_id, sucursal_id, distancia_km]);
};

export const asignacionesModel = {
    createAsignacion
};
