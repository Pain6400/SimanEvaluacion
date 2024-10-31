import { pool } from "../database/connectdb.js";

const findAll = async () => {
  const { rows } = await pool.query("SELECT * FROM usuario");
  return rows;
};

const findOne = async (userid) => {
  const { rows } = await pool.query(`select * from usuarios
  where usuario_id = '${userid}'`);
  return rows[0];
};




export const accountModel = {
  findAll,
  findOne
};