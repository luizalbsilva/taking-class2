module.exports = (express) => {
    const {usuarioController} = express.app.controllers;
    const {AuthorizationFilter, RootAuthorizationFilter} = express.app.filters;
    const {UsuarioValidationFilter} = express.app.filters.usuarios;

    express.get("/usuarios", usuarioController.index);
    express.post("/usuario", usuarioController.create);
    express.get("/usuario/:id", usuarioController.get);
    express.delete("/usuario/:id", usuarioController.delete);
    express.put("/usuario/:id", usuarioController.update);

    // express.get("/usuarios", RootAuthorizationFilter, usuarioController.index);
    // express.post("/usuario", UsuarioValidationFilter, usuarioController.create);
    // express.get("/usuario/:id", AuthorizationFilter, usuarioController.get);
    // express.delete("/usuario/:id", AuthorizationFilter, usuarioController.delete);
    // express.put("/usuario/:id", AuthorizationFilter,  usuarioController.update);
}
