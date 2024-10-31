import { accountModel } from "../models/account.model.js";
import { userModel } from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/tokenManager.js";


export const login = async (req, res) => {
  try {
      const { usuario_id, password } = req.body;
      let user = await userModel.findOne(usuario_id)
      if(!user) return res.status(403).json({ status: false, message: "El usuario no existe"});

      const respuestaPassword = await comparePassrowd(password, user.password);

      if(!respuestaPassword) return res.status(403).json({ status: false, message: "Usuario o Contraseña incorrecta"});

      const token = await generateToken(usuario_id, res)

      return res.status(200).json(
          { 
              status:true, 
              message: "Usuario logeado correctamente", 
              tokenInfo: token, 
              userInfo: { 
                usuario_id: user.usuario_id, 
                nombre: user.nombre, 
                identidad: user.identidad, 
                telefono: user.telefono, 
                correo: user.correo
              }
          }
      );

  } catch (error) { 
      console.log(error)
      return res.status(500).json({status: false, message: error.message })
  }
}

export const logout = (req, res) => {
  res.clearCookie("tokenInfo");
  return res.json({ status:true, message: "Sesion cerrada correctamente"});
}


const comparePassrowd = async (candidatePassword, userPassword) => {
  return await bcryptjs.compare(candidatePassword, userPassword);
}

export const accountController = {
  login,
  logout
};