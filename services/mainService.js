const {createHash4Pass, criaNovaSessao, usuarioAdministrador} = require("../utils/SecurityHelper");

const logons = [];

module.exports = (app) => {
    const Usuario = app.models.usuario;
    return {
        hello() {
            return "Bonjour, Takers !!!"
        },

        logon: async function (usuario, senha) {
            let senhaHash = createHash4Pass(senha);
            let logUser = usuarioAdministrador(usuario);
            if (typeof logUser == "undefined") {
                logUser = await Usuario.findOne({where: {
                        username: usuario
                    }});
            }
            if (logUser?.password === senhaHash) {
                return criaNovaSessao(logUser);
            } else {
                console.log(`Tentativa de acesso de ${usuario}`);
            }
        },

        logoff(jwt) {
            let index = logons.indexOf(jwt);
            if (index >= 0) {
                logons.slice(index);
                return true;
            }
            return false;
        }
    };
}
