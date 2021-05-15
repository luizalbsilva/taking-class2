const {extractToken, validateAndDecodeJwt} = require("../helpers/SecurityHelper");
module.exports = (app) => {
    return (req, res, next) => {
        const jwt = extractToken( req.headers );
        try {
            validateAndDecodeJwt(jwt);
            next();
            return;
        } catch (e) { }
        res.statusCode = 403;
        res.send();
    }
}
