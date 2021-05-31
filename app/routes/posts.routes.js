const multer = require("multer");
const {Router} = require("express")
const temporaryPath = require("../../config/path.json").media.temp;
const uploader = multer({dest: temporaryPath})
module.exports = (express) => {
    const {postController} = express.app.controllers;
    const router = Router();

    router.get("/posts", postController.index);
    router.post("/post", uploader.single('media'), postController.create);
    router.get("/post/:id", postController.get);
    router.get("/post/:id/media", postController.getMedia);
    router.put("/post/:id", uploader.single('media'), postController.update);
    router.delete("/post/:id", postController.delete);

    express.use("/usuario/:id_usuario", router);
}
