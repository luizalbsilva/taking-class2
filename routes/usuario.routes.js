module.exports = (app) => {
    const {usuarioController} = app.controllers;

    app.get("/usuarios", usuarioController.index);
    app.post("/usuario", usuarioController.create);
    app.get("/usuario/:id", usuarioController.get);
    app.delete("/usuario/:id", usuarioController.delete);
    app.put("/usuario/:id", usuarioController.update);
}
