import express from 'express';
import { cadastrar } from '../models/UsuarioModel.js';
import { login } from '../controllers/tokenControllers.js';
import { verificarToken } from '../middlewares/VerificarToken.js';

const router = express.Router();

// Cadastro de usuário
router.post('/usuario', async (req, res) => {
  try {
    const novoUsuario = await cadastrar(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// Login do usuário
router.post('/login', login);

// Rota protegida
router.get('/me', verificarToken, async (req, res) => {
  try {
    const usuario = await consultarPorId(req.userId);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json({ mensagem: `Bem-vindo, ${usuario.nome}` });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});


export default router;
