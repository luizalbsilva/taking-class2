module.exports = (express) => {
    return (req, res, next) => {
        const usuario = req.body;
        if (   typeof usuario === "object"
            && typeof usuario.username === "string"
            && typeof usuario.password === "string"
            && typeof usuario.nome === "string"
        ) {
            next();
        } else {
            res.statusCode = 400;
            res.send();
        }
    }
}
