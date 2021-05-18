const {extractToken, validateAndDecodeJwt} = require("../helpers/SecurityHelper");
module.exports = (app) => {
    return (req, res, next) => {
        const jwt = extractToken( req.headers );
        try {
            decoded = validateAndDecodeJwt(jwt);
            if (decoded.sub < 0) {
                next();
                return;
            }
        } catch (e) { }
        res.statusCode = 403;
        res.send();
    }
}
