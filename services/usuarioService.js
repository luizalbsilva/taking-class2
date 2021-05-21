const {createHash4Pass} = require("../utils/SecurityHelper");

module.exports = (app) => {
    const {Usuario} = app.models;
    return {
        async create(usuario) {
            usuario.password = createHash4Pass(usuario.password);
            return await Usuario.build(usuario).save();
        },
        async get(id) {
            return await Usuario.findByPk(id);
        },
        async listAll() {
            return await Usuario.findAll();
        },
        async update(id, usuario) {
            const usuarioBanco = await Usuario.findByPk(id);

            if (typeof usuario.password === "string") {
                usuario.password = await createHash4Pass(usuario.password);
            }
            usuarioBanco.setAttributes(usuario);
            return await usuarioBanco.save();
        },
        async delete(id) {
            return await Usuario.delete(id);
        }
    }
}
