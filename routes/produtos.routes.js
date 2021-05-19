const multer = require("multer");
const upload = multer({dest: "./uploads"});
module.exports = (app) => {
    const {produtoController} = app.controllers;
    const {ProdutoValidationFilter} = app.filters.produtos;

    app.get("/produtos", produtoController.index);
    app.get("/produto/:id", produtoController.get);
    app.post("/produto", upload.single("imagem"), ProdutoValidationFilter, produtoController.create);
    app.put("/produto/:id", upload.single("imagem"), ProdutoValidationFilter, produtoController.update);
    app.delete("/produto/:id", produtoController.delete);
};
