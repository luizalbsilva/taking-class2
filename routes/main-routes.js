module.exports = (app) => {
    const {main} = app.controllers;

    app.get("/", main.index);
    app.post("/logon", main.logon);
    app.post("/logoff", main.logoff);
}
