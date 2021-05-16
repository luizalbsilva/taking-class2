module.exports = (app) => {
    const {usuarioController} = app.controllers;
    const {AuthorizationFilter, RootAuthorizationFilter} = app.filters;
    const {UsuarioValidationFilter} = app.filters.usuarios;

    app.get("/usuarios", RootAuthorizationFilter, usuarioController.index);
    app.post("/usuario", UsuarioValidationFilter, usuarioController.create);
    app.get("/usuario/:id", AuthorizationFilter, usuarioController.get);
    app.delete("/usuario/:id", AuthorizationFilter, usuarioController.delete);
    app.put("/usuario/:id", AuthorizationFilter,  usuarioController.update);
}
