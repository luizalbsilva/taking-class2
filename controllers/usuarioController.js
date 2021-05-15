module.exports = (app) => {
    const {usuarioService} = app.services;
    return {
        async index(req, res) {
            res.send( await usuarioService.listAll());
        },
        async get(req, res) {
            let usuario = await usuarioService.get(req.params.id);
            if (usuario == null) {
                res.statusCode = 204;
            }
            res.send(usuario);
            return;
        },
        async create(req, res) {
            let criado = await usuarioService.create(req.body);
            res.statusCode = 201;
            res.set("location", `/usuario/${criado.id}`);
            res.send();
        },
        async update(req, res) {
            await usuarioService.update(req.params.id, req.body);
        },
        async delete(req, res) {
            await usuarioService.delete(req.params.id);
        }
    }
}
