module.exports = (app) => {
    const {postController} = app.controllers;

    app.get("/usuario/:id_usuario/posts", postController.index);
    app.post("/usuario/:id_usuario/post", postController.create);
    app.get("/usuario/:id_usuario/post/:id", postController.get);
    app.put("/usuario/:id_usuario/post/:id", postController.update);
    app.delete("/usuario/:id_usuario/post/:id", postController.delete);
}
