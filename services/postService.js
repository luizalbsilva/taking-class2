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
            post.filelocation = `./media/${usuarioId}/${body.storage}`;
            post = await post.save();
            await this.preparaPastas(usuarioId);
            console.log(`Movendo ./uploads/${body.storage}`)
            await fsPromises.rename(`./uploads/${body.storage}`,`./media/${usuarioId}/${body.storage}`, )
            return post;
        },

        async preparaPastas(usuarioId) {
            console.log('Gravou Post');
            try {
                if(! (await fsPromises.stat(`./media`))?.isDirectory()) {
                    console.log('Criando pasta media');
                    await fsPromises.mkdir('./media');
                }
            } catch (e) {
                console.log('Criando pasta media');
                await fsPromises.mkdir('./media');
            }
            try {
                if((await fsPromises.stat(`./media/${usuarioId}`))?.isDirectory()) {
                    console.log('Criando pasta media/user');
                    await fsPromises.mkdir(`./media/${usuarioId}`);
                }
            } catch(e) {
                console.log('Criando pasta media/user');
                await fsPromises.mkdir(`./media/${usuarioId}`);
            }
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
                post.setAttributes(body);
                post = await post.save();
                await this.preparaPastas(usuarioId);
                await fsPromises.rename(`./uploads/${body.storage}`,`./media/${usuarioId}/${body.storage}`, )
                return post;
            }
        }
    }
}
