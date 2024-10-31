import { pool } from "../database/connectdb.js";

const createViaje = async (sucursal_id, transportista_id, usuario_id, total_km) => {
    const query = `
        INSERT INTO viajes (sucursal_id, transportista_id, fecha, usuario_registro_id, total_km)
        VALUES ($1, $2, CURRENT_DATE, $3, $4)
        RETURNING id
    `;
    const { rows } = await pool.query(query, [sucursal_id, transportista_id, usuario_id, total_km]);
    return rows[0].id;
};

const addColaboradorViaje = async (viaje_id, colaborador_id, distancia_km) => {
    const query = `
        INSERT INTO viaje_colaboradores (viaje_id, colaborador_id, distancia_km)
        VALUES ($1, $2, $3)
    `;
    await pool.query(query, [viaje_id, colaborador_id, distancia_km]);
};

const obtenerReporte = async (transportista_id, fecha_inicio, fecha_fin) => {
    const query = `
        SELECT v.id, v.fecha, t.nombre AS transportista, ROUND(SUM(vc.distancia_km * t.tarifa_por_km), 2) AS total_pago
        FROM viajes v
        JOIN viaje_colaboradores vc ON v.id = vc.viaje_id
        JOIN transportistas t ON v.transportista_id = t.id
        WHERE v.transportista_id = $1 AND v.fecha BETWEEN $2 AND $3
        GROUP BY v.id, t.nombre
    `;
    const { rows } = await pool.query(query, [transportista_id, fecha_inicio, fecha_fin]);
    return rows;
};

const obtenerDistancias = async (sucursal_id, colaboradores) => {
    const { rows } = await pool.query(`
        SELECT colaborador_id, distancia_km 
        FROM asignaciones 
        WHERE sucursal_id = $1 
          AND colaborador_id = ANY($2::int[])
    `, [sucursal_id, colaboradores]);
    return rows;
};

export const viajesModel = {
    createViaje,
    addColaboradorViaje,
    obtenerReporte,
    obtenerDistancias
};
