import { Router } from "express";
import { verifyToken, checkPermission } from '../middleware/auth.js';
import { asignarColaboradorSucursal, registrarViaje, obtenerReporteViajes } from "../controllers/viajes.controller.js";
import { bodyColaboradorValidator, bodyReporteValidator, bodyViajeValidator } from "../middleware/validatorManager.js";

const router = Router();

router.post("/asignarColaboradorSucursal", verifyToken, checkPermission(['Admin', 'GRT']), bodyColaboradorValidator, asignarColaboradorSucursal);
router.post("/registrarViaje", verifyToken, checkPermission(['Admin',  'GRT']), bodyViajeValidator, registrarViaje);
router.get("/reporteViajes", verifyToken, checkPermission(['Admin']), bodyReporteValidator, obtenerReporteViajes);

export default router;
