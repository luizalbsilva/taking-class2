module.exports = (app) => {
    const Usuario = app.models.usuario;
    return {
        async create(usuario) {
            return await Usuario.build(usuario).save();
        },
        async get(id) {
            return await Usuario.findByPk(id);
        },
        async listAll() {
            return await Usuario.findAll();
        },
        async update(id, usuario) {
            let usuarioBanco = await Usuario.findByPk(id);

            await usuarioBanco.setAttributes(usuario);
        },
        async delete(id) {
            return await Usuario.delete(id);
        }
    }
}
