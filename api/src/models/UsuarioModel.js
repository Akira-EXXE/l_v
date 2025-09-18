import bcrypt from "bcryptjs";
import pool from "../database/data.js";

// Cadastrar novo usuário
export const cadastrar = async (usuario, cx = null) => {
  let cxLocal = cx;
  if (!cxLocal) {
    cxLocal = await pool.getConnection();
  }
  try {
    const { email, senha, nome, avatar } = usuario;

    // Verifica se já existe usuário com esse e-mail
    const usuarioExistente = await consultarPorEmail(email, cxLocal);
    if (usuarioExistente) {
      throw new Error("Email já cadastrado");
    }

    // Hash da senha
    const salt = bcrypt.genSaltSync(10);
    const hashSenha = bcrypt.hashSync(senha, salt);

    // Insere usuário
    const query = `INSERT INTO Usuario (email, senha, nome, avatar) VALUES (?, ?, ?, ?)`;
    const [result] = await cxLocal.query(query, [email, hashSenha, nome, avatar]);

    if (result.affectedRows === 0) {
      throw new Error("Erro ao cadastrar usuário");
    }

    // Busca usuário recém-cadastrado
    const usuarioCadastrado = await consultarPorId(result.insertId, cxLocal);
    usuarioCadastrado.senha = undefined; // remove a senha do retorno
    return usuarioCadastrado;
  } catch (error) {
    throw error;
  } finally {
    if (!cx && cxLocal) {
      cxLocal.release();
    }
  }
};

// Consultar usuário por e-mail
export const consultarPorEmail = async (email, cx = null) => {
  let cxLocal = cx;
  if (!cxLocal) {
    cxLocal = await pool.getConnection();
  }
  try {
    const query = `SELECT * FROM Usuario WHERE email = ?`;
    const [rows] = await cxLocal.query(query, [email]);

    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    throw error;
  } finally {
    if (!cx && cxLocal) {
      cxLocal.release();
    }
  }
};

// Consultar usuário por ID
export const consultarPorId = async (id, cx = null) => {
  let cxLocal = cx;
  if (!cxLocal) {
    cxLocal = await pool.getConnection();
  }
  try {
    const query = `SELECT * FROM Usuario WHERE id = ?`;
    const [rows] = await cxLocal.query(query, [id]);

    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    throw error;
  } finally {
    if (!cx && cxLocal) {
      cxLocal.release();
    }
  }
};
