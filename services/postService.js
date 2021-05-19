const {moveDados, pastaPosts, PASTA_TEMP_POSTS} = require("../utils/FileTransferUtils");

const fs = require("fs");
const fsPromises = fs.promises;
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
            const destino = `${pastaPosts(usuarioId)}/${body.storage}`;
            post.filelocation = destino;
            await moveDados(`${PASTA_TEMP_POSTS}/${body.storage}`, destino );
            post = await post.save();
            return post;
        },

        async update(usuarioId, id, body) {
            let post = await Post.findOne({
                where: {
                    id, usuarioId
                }
            });
            if (post.filename) {
                await fsPromises.rm(`uploads/${post.filename}`);
            }
            if (typeof post ==="object" ) {
                const antigo = post.filelocation;
                post.setAttributes(body);
                await moveDados(`./uploads/${body.storage}`, `./media/${usuarioId}/${body.storage}`);
                post = await post.save();
                await fsPromises.rm(antigo);
                return post;
            }
        }
    }
}
