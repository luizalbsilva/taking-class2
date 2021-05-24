const{criaNovaSessao, usuarioAdministrador, createHash4Pass, extractToken, validateAndDecodeJwt} = require("../utils/SecurityHelper");

module.exports = (express) => {
    return (req, res, next) => {
        const jwt = extractToken(req.headers);

        try {
            validateAndDecodeJwt(jwt);
            next();
            return;
        } catch (e) {
            console.error(e);
        }
        res.statusCode = 403;
        res.send();
    }
}
