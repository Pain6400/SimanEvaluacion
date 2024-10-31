import { asignacionesModel } from "../models/asignaciones.model.js";
import { viajesModel } from "../models/viajes.model.js";

// Controlador para asignar colaboradores a sucursales
export const asignarColaboradorSucursal = async (req, res) => {
    try {
        const { colaborador_id, sucursal_id, distancia_km } = req.body;

        if (distancia_km <= 0 || distancia_km > 50) {
            return res.status(400).json({ status: false, message: "La distancia debe ser entre 1 y 50 km." });
        }

        await asignacionesModel.createAsignacion(colaborador_id, sucursal_id, distancia_km);

        return res.json({ status: true, message: "Colaborador asignado a sucursal correctamente" });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Controlador para registrar viajes
export const registrarViaje = async (req, res) => {
    try {
        const { sucursal_id, transportista_id, colaboradores } = req.body;
        const { userId } = req;

        // Obtener distancias de la base de datos
        const asignaciones = await viajesModel.obtenerDistancias(sucursal_id, colaboradores);

        // Sumar las distancias para verificar la restricción de 100 km
        const total_km = asignaciones.reduce((acc, asig) => acc + parseFloat(asig.distancia_km), 0);

        if (total_km > 100) {
            return res.status(400).json({ status: false, message: "La distancia total del viaje no puede exceder los 100 km." });
        }

        console.log(total_km)
        // Crear el viaje
        const viaje_id = await viajesModel.createViaje(sucursal_id, transportista_id, userId, total_km);

        // Agregar los colaboradores al viaje
        for (const asignacion of asignaciones) {
            await viajesModel.addColaboradorViaje(viaje_id, asignacion.colaborador_id, asignacion.distancia_km);
        }

        return res.json({ status: true, message: "Viaje registrado correctamente" });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Controlador para obtener el reporte de viajes
export const obtenerReporteViajes = async (req, res) => {
    try {
        const { transportista_id, fecha_inicio, fecha_fin } = req.body;
        const reporte = await viajesModel.obtenerReporte(transportista_id, fecha_inicio, fecha_fin);

        return res.json({ status: true, message: "Reporte obtenido correctamente", reporte });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
