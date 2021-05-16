module.exports = (app) => {
    return (req, res, next) => {
        const {user, pass} = req.body;
        if (typeof user === "string" && typeof pass === "string") {
            next();
        } else {
            res.statusCode = 400;
            res.send();
        }
    }
}
