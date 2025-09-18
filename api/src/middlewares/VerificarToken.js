import jwt from "jsonwebtoken";
import { consultarPorId } from "../models/UsuarioModel.js";

const SECRET = "sua_chave_secreta";

export const verificarToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const partes = authHeader.split(" ");
  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({ erro: "Token mal formatado" });
  }

  const token = partes[1];

  jwt.verify(token, SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ erro: "Token inválido" });
    }

    try {
      const usuario = await consultarPorId(decoded.id);
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      // Salva o nome e id do usuário na requisição
      req.userId = usuario.id;
      req.userName = usuario.nome;

      next();
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  });
};
