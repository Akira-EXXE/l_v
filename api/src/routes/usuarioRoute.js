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
router.get("/me", verificarToken, (req, res) => {
  res.json({ mensagem: `Bem-vindo, ${req.userName}` });
});


export default router;
