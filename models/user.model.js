import { pool } from "../database/connectdb.js";
import bcryptjs from "bcryptjs";

const findAll = async () => {
  const { rows } = await pool.query(`
    select 
    u.USUARIO_ID, 
    u.NOMBRE, 
    u.IDENTIDAD, 
    u.TELEFONO, 
    u.CORREO 
  from usuarios u`
);
  return rows;
};

const findOne = async (userid) => {
    const { rows } = await pool.query(`SELECT * FROM usuarios
    where usuario_id = '${userid}'`);
    return rows[0];
  };

const create = async (usuario_id, nombre, identidad, telefono, correo, password) => {
  password = await passwordhash(password);
    const query = `
      INSERT INTO usuarios (usuario_id, nombre, identidad, telefono, correo, password, estado) 
      VALUES ($1, $2, $3, $4, $5, $6, 1) 
      RETURNING *`;
      
    const { rows } = await pool.query(query, [usuario_id, nombre, identidad, telefono, correo, password]);
    return rows[0];
  };

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

export const userModel = {
    findAll,
    findOne,
    create,
};