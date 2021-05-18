module.exports = (app) => {
    const {postService} = app.services;
    return {
        async index(req, res) {
            res.send(await postService.listAllForUser(req.params.id_usuario));
        },

        async get(req, res) {
            const ret = await postService.get(req.params.id_usuario, req.params.id);
            if (typeof ret !== "object" || ret.usuarioId != req.params.id_usuario) {
                res.statusCode = 204;
            }
            res.send(ret);
        },

        async delete(req, res) {
            if (! await postService.delete(req.params.id_usuario, req.params.id)) {
                res.statusCode = 410;
            }
            res.send();
        },

        async create(req, res) {
            const payload = req.body;
            let post = await postService.create(req.params.id_usuario, payload);
            res.statusCode = 201;
            res.set("location", `/usuario/${post.usuarioId}/post/${post.id}`)
            res.send();
        },

        async update(req, res) {
            if (typeof postService.update(req.params.id_usuario, req.params.id, req.body) !== "object") {
                res.statusCode = 410;
            }
            res.send();
        }
    }
}
