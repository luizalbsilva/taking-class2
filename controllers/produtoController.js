module.exports = (app) => {
    const {produtoService} = app.services;
    const {Produto} = app.models;
    return {
        async index(req, res) {
            res.send(await produtoService.findAll());
        },

        async get(req, res) {
            const produto = await produtoService.find(req.params.id);
            if (produto === null ) {
                res.statusCode = 204;
            }
            res.send(produto);
        },

        async create(req, res) {
            const payload = JSON.parse(req.body.payload);

            let produto = await produtoService.create(Produto.build(payload), req.file);

            res.statusCode = 201;
            res.set("location", `/produtos/${produto.id}`);
            res.send();
        },

        async update(req, res) {
            const payload = JSON.parse(req.body.payload);

            res.send(await produtoService.update(req.params.id, payload, req.file));
        },

        delete(req, res) {
            res.send(Produto.remove({where: {id:req.param.id}}));
        }

    }
    app.get("/produtos", produtoService.index);
    app.get("/produto/:id", produtoService.get);
    app.post("/produto", produtoService.create);
    app.put("/produto/:id", produtoService.update);
    app.delete("/produto/:id", produtoService.delete);
};
