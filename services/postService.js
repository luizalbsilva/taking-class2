module.exports = (app) => {
    const {Post} = app.models;
    return {
        async listAllForUser(id_usuario) {
            return await Post.findAll({
                where: {
                    usuarioId: id_usuario
                }
            });
        },

        async get(usuarioId, id) {
            return await Post.findOne(
                {
                    where: {
                        usuarioId, id
                    }
                }
            );
        },

        async delete(usuarioId, id) {
            return await Post.destroy({where: {
                usuarioId, id
                }});
        },

        async create(usuarioId, body) {
            let post = Post.build(body);
            post.usuarioId = usuarioId;
            return await post.save();
        },

        async update(usuarioId, id, body) {
            const post = await Post.findOne({
                where: {
                    id, usuarioId
                }
            });
            if (typeof post ==="object" ) {
                post.setAttributes(body);
                return await post.save();
            }
        }
    }
}
