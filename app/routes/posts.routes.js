const multer = require("multer");
const uploader = multer({dest:'./uploads'})

module.exports = (express) => {
    const {postController} = express.app.controllers;

    express.get("/usuario/:id_usuario/posts", postController.index);
    express.post("/usuario/:id_usuario/post", uploader.single('music'), postController.create);
    express.get("/usuario/:id_usuario/post/:id", postController.get);
    express.put("/usuario/:id_usuario/post/:id", uploader.single('music'), postController.update);
    express.delete("/usuario/:id_usuario/post/:id", postController.delete);
}