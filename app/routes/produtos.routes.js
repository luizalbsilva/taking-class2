const multer = require("multer");
const temporaryPath = require("../../config/path.json").produtos.temp;
const upload = multer({dest: temporaryPath});

module.exports = (express) => {
    const {produtoController} = express.app.controllers;
    const {ProdutoValidationFilter} = express.app.filters.produtos;
    const {LoggedUserFilter, RootAuthorizationFilter} = express.app.filters;

    express.get("/produtos", LoggedUserFilter, produtoController.index);
    express.get("/produto/:id", LoggedUserFilter, produtoController.get);
    express.post("/produto", RootAuthorizationFilter, upload.single("imagem"), ProdutoValidationFilter, produtoController.create);
    express.put("/produto/:id", RootAuthorizationFilter, upload.single("imagem"), ProdutoValidationFilter, produtoController.update);
    express.delete("/produto/:id", RootAuthorizationFilter, produtoController.delete);
};
