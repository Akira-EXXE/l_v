import express from 'express';
import * as veiculo from '../controllers/veiculoController.js';

const router = express.Router();

router.get('/veiculo/:id',veiculo.consultarPorId);
router.get('/veiculos',veiculo.consultarTodos);
router.post('/veiculo',veiculo.cadastrar);
router.put('/veiculo/:id',veiculo.alterar);
router.delete('/veiculo/:id',veiculo.deletar);


export default router;