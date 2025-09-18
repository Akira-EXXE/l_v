import jwt from "jsonwebtoken";

const SECRET = "sua_chave_secreta";

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const partes = authHeader.split(" ");
  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({ erro: "Token mal formatado" });
  }

  const token = partes[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ erro: "Token inválido" });
    }

    // CORREÇÃO: usar "id" do token
    req.userId = decoded.id;
    next();
  });
};
