import { Router } from "express";
import { securityController } from "../controllers/security.controller.js";
import { bodyPermisoValidator, bodyUserValidator, bodyUsuarioPermisoValidator } from '../middleware/validatorManager.js'
import { verifyToken, checkPermission } from '../middleware/auth.js';
const router = Router();


//Permisos
router.get("/getPermisos", verifyToken, checkPermission(['Admin', 'SuperAdmin']), securityController.getPermisos);
router.post("/createPermiso", verifyToken, checkPermission(['SuperAdmin']), bodyPermisoValidator, securityController.createPermiso);
router.post("/updatePermiso", verifyToken, checkPermission(['SuperAdmin']), bodyPermisoValidator, securityController.UpdatePermiso);
router.post("/DeletePermiso/:permiso_id", verifyToken, checkPermission(['SuperAdmin']), securityController.DeletePermiso);

//Usuario Permisos
router.get("/getUsuariosPermisos", verifyToken, checkPermission(['Admin']), securityController.getUsuariosPermisos);
router.post("/createUsuarioPermiso", verifyToken, checkPermission(['Admin']), bodyUsuarioPermisoValidator, securityController.createUsuarioPermiso);
router.post("/DeleteUsuarioPermiso/:permisoId/:usuarioId", verifyToken, checkPermission(['Admin']), securityController.DeleteUsuarioPermiso);

//Usuarios
router.get("/getUsuarios", verifyToken, checkPermission(['Admin']), securityController.getUsuarios);
router.post("/createUsuario", verifyToken, checkPermission(['Admin']), bodyUserValidator, securityController.createUsuario);
router.post("/updateUsuario", verifyToken, checkPermission(['Admin']), bodyUserValidator, securityController.updateUsuario);

export default router;