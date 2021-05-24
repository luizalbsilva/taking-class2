const {PASTA_TEMP_PRODUTOS, PASTA_PRODUTOS, moveDados} = require("../utils/FileTransferUtils");
const fsPromise = require("fs").promises;

module.exports = (express) => {
    const {Produto} = express.app.models;

    return {
        async findAll() {
            return await Produto.findAll();
        },

        async find(id) {
            return await Produto.findByPk(id);
        },

        async create(produto, imagem) {
            const destino = `${PASTA_PRODUTOS}/${imagem.originalname}`;
            await moveDados(`${PASTA_TEMP_PRODUTOS}/${imagem.filename}`, destino);
            produto.imagem = destino;
            const prod = await produto.save();
            return prod;
        },

        async update(id, produto, imagem) {
            let produtoBanco = await Produto.findByPk(id);
            const antigoArquivo  = produtoBanco.imagem;
            if (imagem) {
                console.log("Atualizando imagem");
                const origem = `${PASTA_TEMP_PRODUTOS}/${imagem.filename}`;
                const destino = `${PASTA_PRODUTOS}/${imagem.originalname}`;
                moveDados(origem, destino);
                produto.imagem = destino;
            }
            delete produto.id;

            const produtoSalvo = await produtoBanco.update(produto);
            if (antigoArquivo) {
                await fsPromise.rm(antigoArquivo);
            }
            return produtoSalvo;
        },

        delete(req, res) {
            res.send(Produto.remove({where: {id:req.param.id}}));
        }
    }
}
