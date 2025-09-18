import * as Veiculo from '../models/VeiculoModel.js';

export const cadastrar = async (req, res) => {
    try {
        const veiculo = req.body;

        // Verificar se o corpo da requisição contém os dados necessários
        if (!veiculo || Object.keys(veiculo).length === 0) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Dados do veículo não fornecidos'
            });
        }
        // Validar os dados do veículo
        if (!veiculo.modelo || !veiculo.ano_fabricacao || !veiculo.ano_modelo || !veiculo.cor || !veiculo.num_portas || !veiculo.categoria_id || !veiculo.montadora_id || !veiculo.tipo_cambio || !veiculo.tipo_direcao) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Dados do veículo incompletos ou inválidos'
            });
        }
        
        const novoVeiculo = await Veiculo.cadastrar(veiculo);   
        res.status(201).json({
            success: true,
            status: 201,
            message: 'Veículo cadastrado com sucesso',
            veiculoId: novoVeiculo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao cadastrar veículo',
            error: error.message
        });
    }
};

export const consultarPorId = async (req, res) => {
    const id = req.params.id; // pega o id da URL
    try {
        const veiculos = await Veiculo.consultarPorId(id);

        if (veiculos.length === 0) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Nenhum veículo encontrado',
                data: []
            });
        }

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Veículo consultado por id com sucesso',
            data: veiculos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao consultar veículo',
            error: error.message
        });
    }
};


export const consultarTodos = async (req, res) => {
    const search = req.query.search || '';
    try {
    const veiculos = await Veiculo.consultarTodos(search);
        // Verificar se foram encontrados veículos
        if (veiculos.length === 0) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Nenhum veículo encontrado',
                data: []
            });
        }
        res.status(200).json({
            success: true,
            status: 200,
            message: 'Veículos consultados com sucesso',
            data: veiculos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao consultar veículos',
            error: error.message
        });
    }
};
export const alterar = async (req, res) => {
    try {
        let veiculo = req.body;          // dados que vieram no body
        veiculo.id = req.params.id;      // pega o id da URL
        const veiculoAlterado = await Veiculo.alterar(veiculo);

        if (veiculoAlterado.length === 0) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Veículo não encontrado para alteração",
                data: []
            });
        }

        res.status(200).json({
            success: true,
            status: 200,
            message: "Veículo alterado com sucesso",
            data: veiculoAlterado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Erro ao alterar veículo",
            error: error.message
        });
    }
};
export const deletar = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await Veiculo.deletar(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Veículo não encontrado para deletar',
                data: []
            });
        }

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Veículo deletado com sucesso',
            data: { id }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao deletar veículo',
            error: error.message
        });
    }
};
