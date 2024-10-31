import { userModel } from "../models/user.model.js";
import { generateToken } from "../utils/tokenManager.js";

export const getAllUsers = async(req, res) => {
    try {
        const users = await userModel.findAll();


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

export const getUserInfo = async(req, res) => {
    try {
        const {usuarioid } = req.params;
        const  { usuario_id, nombre, identidad, telefono, correo } = await userModel.findOne(usuarioid);
        return res.json({ 
            status: true, 
            message: "Usuario obtenido correctamente", 
            userInfo: { usuario_id, nombre, identidad, telefono, correo }
        })
    } catch (error) {
        return res.status(500).json({status: false, message: "Error de servidor: " + error.message})
    }
}

const register = async (req, res) => {
    const { 
        usuario_id, 
        nombre, 
        identidad, 
        telefono, 
        correo, 
        password
        } = req.body;
 
    try {
        let user = await userModel.findOne(usuario_id);
        if(user) throw { code: 1100};
        console.log(req.body)


        await userModel.create(usuario_id, nombre, identidad, telefono, correo, password, 1);

        const token = await generateToken(usuario_id, res);


        return res.status(201).json({ status: true, message: "Usuario creado correctamente", token });
    } catch (error) {
        if(error.code === 1100) {
            return res.status(400).json({status: false, message: "El correo ya existe"})
        }

        return res.status(500).json({status: false, message: error.message})
    }
}

export const userController = {
    register,
    getAllUsers,
    getUserInfo
  };