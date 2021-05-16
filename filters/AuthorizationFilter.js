const {extractToken, validateAndDecodeJwt} = require("../helpers/SecurityHelper");
module.exports = (app) => {
    return (req, res, next) => {
        const jwt = extractToken( req.headers );
        try {
            const decoded = validateAndDecodeJwt(jwt);
            console.log(decoded);
            console.log(req.params.id);
            if (decoded.sub < 0 || decoded.sub === +req.params.id) {
                next();
                return;
            }
        } catch (e) { }
        res.statusCode = 403;
        res.send();
    }
}
