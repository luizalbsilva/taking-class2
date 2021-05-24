module.exports = (express) => {
    const {main} = express.app.controllers;
    const {LogonFilter} = express.app.filters;

    express.get("/", main.index);
    express.post("/logon", LogonFilter, main.logon);
    express.post("/logoff", main.logoff);
}
