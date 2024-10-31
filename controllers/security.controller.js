import { securityModel } from "../models/security.model.js";
import bcryptjs from "bcryptjs";

export const getPefiles = async(req, res) => {
    try {
        const { empresa_id } = req;

        const perfiles = await securityModel.getPefiles(empresa_id);

        return res.status(200).json({ status: true, message: "Peticion Exitosa", perfiles}); 
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}


export const createPefil = async(req, res) => {
    try {
        const { empresa_id } = req;
        const { perfil_id, descripcion } = req.body;
        const perfil_P = {
            empresa_id,
            perfil_id,
            descripcion
        };

        const perfil = await securityModel.createPefil(perfil_P);
        
        return res.status(201).json({ status: true, message: "Perfil creado correctamente", perfil })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}

export const UpdatePefil = async(req, res) => {
    try {
        const { empresa_id } = req;
        const { perfil_id, descripcion } = req.body;
        const perfil_P = {
            empresa_id,
            perfil_id,
            descripcion
        };
        
        const perfil = await securityModel.updatePefil(perfil_P);
        
        return res.status(201).json({ status: true, message: "Perfil actualizado correctamente", perfil })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}



export const getPermisos = async(req, res) => {
    try {
        const { empresa_id } = req;
        const permisos = await securityModel.getPermisos(empresa_id);

        return res.status(200).json({ status: true, message: "Peticion Exitosa", permisos}); 
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}


export const createPermiso = async(req, res) => {
    try {
        const { empresa_id } = req;
        const { permiso_id, descripcion } = req.body;

        const permiso_P = {
            empresa_id,
            permiso_id,
            descripcion
        };

        const permiso = await securityModel.createPermiso(permiso_P);

        return res.status(201).json({ status: true, message: "Permiso creado correctamente", permiso })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}

export const UpdatePermiso = async(req, res) => {
    try {
        const { empresa_id } = req;
        const { permiso_id, descripcion } = req.body;
        const permiso_P = {
            empresa_id,
            permiso_id,
            descripcion
        };
        
        const perfil = await securityModel.updatePermiso(permiso_P);
        
        return res.status(201).json({ status: true, message: "Permiso actualizado correctamente", perfil })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}

export const DeletePermiso = async(req, res) => {
    try {
        const { empresa_id } = req;
        const { permiso_id } = req.params;

        const permiso = await securityModel.deletePermiso(empresa_id, permiso_id);
        
        return res.status(201).json({ status: true, message: "Permiso eliminado correctamente", permiso })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message})
    }
}



export const getUsuariosPermisos = async(req, res) => {
    try {
        const { empresa_id } = req;

        const usuariosPermisos = await securityModel.getUsuariosPermisos(empresa_id);

        return res.status(200).json({ status: true, message: "Peticion Exitosa", usuariosPermisos}); 
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error})
    }
}

export const createUsuarioPermiso = async(req, res) => {
    try {
        const { empresa_id } = req;
        const { usuarioId, permisoId } = req.body;

        const usuarioPermiso = await securityModel.createUsuarioPermiso(empresa_id, usuarioId, permisoId);

        return res.status(201).json({ status: true, message: "Registro creado correctamente", usuarioPermiso })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}

export const DeleteUsuarioPermiso = async(req, res) => {
    try {
        const { empresa_id } = req;
        const { permisoId, usuarioId } = req.params;

        const permiso = await securityModel.deleteUsuarioPermiso(empresa_id, usuarioId, permisoId);
        
        return res.status(201).json({ status: true, message: "Perfil eliminado correctamente", permiso })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error.message})
    }
}

export const getUsuarios = async(req, res) => {
    try {
        const { empresa_id } = req;
        const users = await securityModel.getUsuarios(empresa_id);


        return res.json(
            { 
                status: false, 
                message: "Usuarios obtenidos correctamente", 
                users
            });

    } catch (error) {
        return res.status(500).json({status: false, message: error.message})
    }
}

export const createUsuario = async(req, res) => {
    try {
        const { empresa_id } = req;
        const { usuario_id, nombre, identidad, telefono, correo, password } = req.body;

        if (!password || password.trim() === '') {
            return res.status(400).json({ status: false, message: "La contraseña es requerida cuando usuario_id está presente" });
        }

        const usuario_P = {
            empresa_id,
            usuario_id,
            nombre,
            identidad,
            telefono,
            correo,
            password: await passwordhash(password)
        };
        
        const usuario = await securityModel.createUsuario(usuario_P);

        return res.status(201).json({ status: true, message: "Permiso creado correctamente", usuario })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}

export const updateUsuario = async(req, res) => {
    try {
        const { empresa_id } = req;
        const { usuario_id, nombre, identidad, telefono, correo, estado } = req.body;

        const usuario_P = {
            empresa_id,
            usuario_id,
            nombre,
            identidad,
            telefono,
            correo,
            estado
        };

        const usuario = await securityModel.updateUsuario(usuario_P);

        return res.status(201).json({ status: true, message: "Permiso creado correctamente", usuario })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}

const passwordhash = async(password) => {
    try {
      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt);
      return hashPassword
    } catch (error) {
      console.log(error);
      throw new Error("Fallo el hash de contraseña")
    }
}  

export const securityController = {
    getPefiles,
    createPefil,
    UpdatePefil,
    getPermisos,
    createPermiso,
    UpdatePermiso,
    DeletePermiso,
    getUsuariosPermisos,
    createUsuarioPermiso,
    createUsuarioPermiso,
    DeleteUsuarioPermiso,
    getUsuarios,
    createUsuario,
    updateUsuario
  };