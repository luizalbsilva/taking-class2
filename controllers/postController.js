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
            const payload = JSON.parse(req.body.payload);
            payload.filename = req.file.originalname;
            payload.storage = req.file.filename;
            payload.mediatype = req.file.mimetype;

            let post = await postService.create(req.params.id_usuario, payload);
            res.statusCode = 201;
            res.set("location", `/usuario/${post.usuarioId}/post/${post.id}`)

            res.send();
        },

        async update(req, res) {
            console.log(req.file);
            const payload = JSON.parse(req.body.payload);
            payload.filename = req.file.originalname;
            payload.storage = req.file.filename;
            payload.mediatype = req.file.mimetype;

            if (typeof postService.update(req.params.id_usuario, req.params.id, payload) !== "object") {
                res.statusCode = 410;
            }
            res.send();
        }
    }
}
