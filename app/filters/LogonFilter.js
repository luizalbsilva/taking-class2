module.exports = (express) => {
    return (req, res, next) => {
        const {user, pass} = req.body;
        if (typeof user === "string" && user.trim().length > 0 && typeof pass === "string" ) {
            next();
        } else {
            res.statusCode = 400;
            res.send();
        }
    }
}
