module.exports = (express) => {
    return (req, res, next) => {
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        next();
    };
}
