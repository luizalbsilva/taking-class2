const multer = require("multer");
const uploader = multer({dest:'./uploads'})

module.exports = (app) => {
    const {postController} = app.controllers;

    app.get("/usuario/:id_usuario/posts", postController.index);
    app.post("/usuario/:id_usuario/post", uploader.single('music'), postController.create);
    app.get("/usuario/:id_usuario/post/:id", postController.get);
    app.put("/usuario/:id_usuario/post/:id", uploader.single('music'), postController.update);
    app.delete("/usuario/:id_usuario/post/:id", postController.delete);
}
