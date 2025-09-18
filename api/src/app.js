import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Importando as rotas
import veiculoRoute from './routes/veiculoRoute.js';
import usuarioRoute from './routes/usuarioRoute.js';


const app = express();

app.use(cors());
app.use(express.json());


// Rotas de públicas
app.get('/',(req,res)=>{
    const rootDomain = req.protocol + '://' + req.get('host');
    res.status(200).json({     
        status_server: 'ok',
        dominio_raiz : rootDomain,
        atualização: '14/09/2024 - 18:42',
        rotas:{
            'GET - Consultar veículo por id': `${rootDomain}/api/veiculo:id`,
            'GET - Consultar todos os veículos': `${rootDomain}/api/veiculos`,
            'PUT - Alterar':`${rootDomain}/api/veiculo:id`,
            'DELETE - Deletar veículo':`${rootDomain}/api/veiculo:id`,
            
            'GET - Consultar usuario por id': `${rootDomain}/api/usuario:id`,
            'GET - Consultar todos os usuarios': `${rootDomain}/api/usuario`,
            
            
        }
    });
});

// Configurando as rotas
app.use('/api', veiculoRoute);
//app.use('/api', categoriaRoute);
app.use('/api', usuarioRoute);

const PORT = process.env.PORT || 3000; 
app.listen(PORT,()=>{
    console.log('Sistema inicializado: ', `Acesso: http://localhost:${PORT}`);
});
