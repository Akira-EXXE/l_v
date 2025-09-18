import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { consultarPorEmail } from '../models/UsuarioModel.js';

const SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Buscar usuário no banco
    const usuario = await consultarPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    // Validar senha
    const senhaValida = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha inválida' });
    }

    // Gerar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      SECRET,
      { expiresIn: '1h' }
    );

    usuario.senha = undefined; // não expor senha

    res.json({ auth: true, token, usuario });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
