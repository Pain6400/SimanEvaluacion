import { pool } from "../database/connectdb.js";


const getPermisos = async () => {
  const { rows } = await pool.query(`
    select * from permisos p
`);
  return rows;
};

const createPermiso = async (permiso) => {
  const query = `INSERT INTO permisos (permiso_id, descripcion) 
                VALUES ($1, $2) 
                RETURNING *`;

  const { rows } = await pool.query(query, [
    permiso.permiso_id,
    permiso.descripcion,
  ]);
  return rows[0];
};

const updatePermiso = async (permiso) => {
  const query = 'UPDATE permisos SET descripcion = $1 WHERE permiso_id = $2 RETURNING *';

  const { rows } = await pool.query(query, [permiso.descripcion, permiso.permiso_id]);
  return rows[0];
};

const deletePermiso = async (permiso_id) => {
  const query = 'DELETE FROM permisos WHERE permiso_id = $1 RETURNING *';

  const { rows } = await pool.query(query, [permiso_id]);
  return rows[0];
};


const getUsuariosPermisos = async () => {
  const { rows } = await pool.query(
    `select 
      u.usuario_id,
      u.nombre,
      p.permiso_id,
      p.descripcion
    from usuarios_permisos up
    inner join usuarios u
    on u.usuario_id = up.usuario_id
    inner join permisos p
    on p.permiso_id = up.permiso_id`
  );
  return rows;
};

const createUsuarioPermiso = async (usuario_id, permiso_id) => {
  const query = `INSERT INTO USUARIOS_PERMISOS (usuario_id, permiso_id) 
  VALUES ($1, $2, $3) 
  RETURNING *`;

  const { rows } = await pool.query(query, [usuario_id, permiso_id]);
  return rows[0];
};



const getUsuarios = async () => {
  const { rows } = await pool.query(`
    select 
      u.USUARIO_ID, 
      u.NOMBRE, 
      u.IDENTIDAD, 
      u.TELEFONO, 
      u.CORREO,
      U.ESTADO 
    from usuarios u`
  );
  return rows;
};

const createUsuario = async (usuario) => {
  const query = `INSERT INTO usuarios (usuario_id, nombre, identidad, telefono, correo, password, estado) 
  VALUES ($1, $2, $3, $4, $5, $6, $7) 
  RETURNING *`;

  const { rows } = await pool.query(query, [,
    usuario.usuario_id,
    usuario.nombre,
    usuario.identidad,
    usuario.telefono,
    usuario.correo,
    usuario.password,
    '1'
  ]);
  return rows[0];
};

const updateUsuario = async (usuario) => {
  const query =  `UPDATE usuarios 
  SET nombre = $1, identidad = $2, telefono = $3, correo = $4, estado = $5
  WHERE and usuario_id = $6
  RETURNING *`;

  const { rows } = await pool.query(query, [
    usuario.nombre,
    usuario.identidad,
    usuario.telefono,
    usuario.correo,
    usuario.estado,
    usuario.usuario_id,
  ]);
  return rows[0];
};

const findProfilesByUserId = async (userid) => {
  try {
    const query = `
      SELECT p.*
      FROM perfiles p
      INNER JOIN usuarios_perfiles up ON p.perfil_id = up.perfil_id
      WHERE up.usuario_id = $1
  `;
    const { rows } = await pool.query(query, [userid]);
    return rows;
  } catch (error) {
    console.log("findProfilesByUserId" + error);
  }
};

const findPermissionsByUserId = async (userid) => {
  try {
    const query = `
    SELECT pm.*
    FROM permisos pm
    INNER JOIN usuarios_permisos pp ON pm.permiso_id = pp.permiso_id
    WHERE pp.usuario_id = $1
`;
    const { rows } = await pool.query(query, [userid]);
    return rows;
  } catch (error) {
    console.log("findProfilesByUserId", error);
  }
};

export const securityModel = {
  getPermisos,
  createPermiso,
  updatePermiso,
  deletePermiso,
  getUsuariosPermisos,
  createUsuarioPermiso,
  getUsuarios,
  createUsuario,
  updateUsuario,
  findProfilesByUserId,
  findPermissionsByUserId
};
