module.exports = (app) => {
    return (req, res, next) => {
        const payload = JSON.parse(req.body.payload);
        if (
            typeof payload !== "object" ||
                   payload === null ||
            typeof payload.codigo !== "string" ||
            typeof payload.nome !== "string" ||
            typeof payload.pr_venda !== "number" ||
            typeof payload.pr_custo !== "number" ||
            typeof payload.fabricante !== "string" ||
            ! req.file
        ) {
            res.statusCode = 400;
            res.send();
        } else {
            next();
        }
    };
}
