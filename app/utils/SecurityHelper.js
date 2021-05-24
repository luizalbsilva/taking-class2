const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");

const myLittleAndCutePassword = "1"; // :D

const TRINTA_MINUTOS = 1800;

// Possuem acesso a tudo.  =8-0 >
const usuariosAdministradores = [
    {
        id: -9999,
        username: "root",
        password: createHash4Pass("123456")
    }
];

const sessoes = {
};

const chavesAtivas = [];

function usuarioAdministrador(usuario) {
    return usuariosAdministradores.filter(u => u.username === usuario)[0];
}

function createHash4Pass(senha) {
    return crypto.createHash("md5")
        .update(senha)
        .digest("hex");
}

function createJwt(userId, username, email) {
    let creationDate = new Date();
    let exp = creationDate.getTime() / 1000 + TRINTA_MINUTOS;
    return jsonwebtoken.sign(
        {
            iss: 'Taking-class-02',
            sub: userId,
            exp,
            nickname: username,
            email,
            creationDate
        },
        myLittleAndCutePassword
    )
}

function extractToken(headers) {
    return headers.authorization?.slice(7);
}

function decodeJwt(jwt) {
    jsonwebtoken.decode(jwt)
}

function createAndRegisterSession(user) {
    const jwt = createJwt(user.id, user.username, user.email);
    sessoes[user.id] = jwt;
    chavesAtivas.push(jwt);
    return jwt;
}

function criaNovaSessao(user) {
    const jwt = sessoes[user.id];
    if (typeof jwt === "undefined") {
        return createAndRegisterSession(user);
    } else {
        if (validateAndDecodeJwt(jwt)) {
            return jwt;
        } else {
            createAndRegisterSession(user);
        }
    }
}

function validateAndDecodeJwt(jwt) {
    if (chavesAtivas.indexOf(jwt) == -1) {
        throw { message: "Sem sessao" };
    }
    return jsonwebtoken.verify(jwt, myLittleAndCutePassword);
}

module.exports = {
    criaNovaSessao, usuarioAdministrador, createHash4Pass, extractToken, validateAndDecodeJwt
};
