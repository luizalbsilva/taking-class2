module.exports = (app) => {
    const {main} = app.controllers;
    const {LogonFilter} = app.filters;

    app.get("/", main.index);
    app.post("/logon", LogonFilter, main.logon);
    app.post("/logoff", main.logoff);
}
