module.exports = (app) => {
    const {main} = app.controllers;

    app.get("/", main.index);
}
