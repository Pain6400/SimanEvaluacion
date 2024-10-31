import { validationResult, body } from "express-validator";


export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next()
}

export const bodyLoginValidator = [
    body('usuario_id', "Campo requerido")
    .notEmpty()
    .trim(),
    body('password', "Campo requerido")
    .notEmpty()
    .trim(),
    validationResultExpress
];

export const bodyUserValidator = [
    body('usuario_id', "Campo requerido")
    .notEmpty()
    .trim(),
    body('nombre', "Campo requerido")
    .notEmpty()
    .trim(),
    body('identidad', "Campo requerido")
    .notEmpty()
    .trim(),
    body('telefono', "Campo requerido")
    .notEmpty()
    .trim(),
    body('correo', "Campo requerido")
    .notEmpty()
    .trim(),
    body('password', "Campo requerido")
    .notEmpty()
    .trim(),
    validationResultExpress
];

export const bodyPermisoValidator = [
    body('permiso_id', "Campo requerido")
    .notEmpty()
    .trim(),
    body('descripcion', "Campo requerido")
    .notEmpty()
    .trim(),
    validationResultExpress
];

export const bodyUsuarioPermisoValidator = [
    body('usuarioId', "Campo requerido")
    .notEmpty()
    .trim(),
    body('permisoId', "Campo requerido")
    .notEmpty()
    .trim(),
    validationResultExpress
]

export const bodyColaboradorValidator = [
    body('colaborador_id', "Campo requerido")
    .notEmpty()
    .trim(),
    body('sucursal_id', "Campo requerido")
    .notEmpty()
    .trim(),
    body('distancia_km', "Campo requerido")
    .notEmpty()
    .trim(),
    validationResultExpress
];

export const bodyViajeValidator = [
    body('sucursal_id', "Campo requerido")
    .notEmpty()
    .trim(),
    body('transportista_id', "Campo requerido")
    .notEmpty()
    .trim(),
    body('colaboradores', "Campo requerido")
    .notEmpty()
    .trim(),
    validationResultExpress
]

export const bodyReporteValidator = [
    body('transportista_id', "Campo requerido")
    .notEmpty()
    .trim(),
    body('fecha_inicio', "Campo requerido")
    .notEmpty()
    .trim(),
    body('fecha_fin', "Campo requerido")
    .notEmpty()
    .trim(),
    validationResultExpress
]