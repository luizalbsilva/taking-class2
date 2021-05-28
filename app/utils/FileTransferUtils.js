const pathConfig = require("../../config/path.json");
const fs = require('fs');
const path = require('path');

const fsPromisses = fs.promises;

const PASTA_TEMP_PRODUTOS = pathConfig.produtos.temp;
const PASTA_TEMP_POSTS = pathConfig.media.temp;

const PASTA_PRODUTOS = pathConfig.produtos.final;
const PASTA_POSTS = pathConfig.media.final;

async function moveDados(origem, destino) {
    const dirname = await path.dirname(destino);
    await fsPromisses.mkdir(dirname, {recursive: true});

    await fsPromisses.rename(origem, destino);
};

function pastaPosts(idUsuario) {
    return `${PASTA_POSTS}/${idUsuario}`;
}

module.exports = {
    PASTA_TEMP_POSTS, PASTA_TEMP_PRODUTOS, PASTA_PRODUTOS,
    pastaPosts, moveDados
}
