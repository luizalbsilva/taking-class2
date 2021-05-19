const fs = require('fs');
const path = require('path');

const fsPromisses = fs.promises;

const PASTA_TEMP_PRODUTOS = "./uploads";
const PASTA_TEMP_POSTS = "./uploads";

const PASTA_PRODUTOS = "./media/produtos";
const PASTA_POSTS = "./media/posts";

async function moveDados(origem, destino) {
    const dirname = await path.dirname(destino);
    await fsPromisses.mkdir(dirname, {recursive: true});

    await fsPromisses.rename(origem, destino);
};

function pastaPosts(idUsuario) {
    return `${PASTA_PRODUTOS}/${idUsuario}`;
}

module.exports = {
    PASTA_TEMP_POSTS, PASTA_TEMP_PRODUTOS, PASTA_PRODUTOS,
    pastaPosts, moveDados
}
