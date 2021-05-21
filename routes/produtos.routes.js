const multer = require("multer");
const upload = multer({dest: "./uploads"});
module.exports = (app) => {
    const {produtoController} = app.controllers;
    const {ProdutoValidationFilter} = app.filters.produtos;
    const {LoggedUserFilter, RootAuthorizationFilter} = app.filters;

    app.get("/produtos", LoggedUserFilter, produtoController.index);
    app.get("/produto/:id", LoggedUserFilter, produtoController.get);
    app.post("/produto", RootAuthorizationFilter, upload.single("imagem"), ProdutoValidationFilter, produtoController.create);
    app.put("/produto/:id", RootAuthorizationFilter, upload.single("imagem"), ProdutoValidationFilter, produtoController.update);
    app.delete("/produto/:id", RootAuthorizationFilter, produtoController.delete);
};
