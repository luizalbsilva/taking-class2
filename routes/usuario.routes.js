module.exports = (app) => {
    const {usuarioController} = app.controllers;
    const {AuthorizationFilter, RootAuthorizationFilter} = app.filters;

    app.get("/usuarios", RootAuthorizationFilter, usuarioController.index);
    app.post("/usuario", usuarioController.create);
    app.get("/usuario/:id", AuthorizationFilter, usuarioController.get);
    app.delete("/usuario/:id", AuthorizationFilter, usuarioController.delete);
    app.put("/usuario/:id", AuthorizationFilter,  usuarioController.update);
}
