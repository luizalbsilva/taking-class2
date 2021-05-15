module.exports = (app) => {
    const {mainService} = app.services;

    return {
        index(req, res) {
            res.send(mainService.hello());
        },

        async logon(req, res) {
            let jwt = await mainService.logon(req.body.user, req.body.pass);
            if (jwt == null) {
                res.statusCode = 401;
                res.send({message: 'Usuário ou senha inválida', 'error-code': 1});
                return;
            }
            res.send({'access-token': jwt, 'error-code': 0});
        },

        async logoff(req, res) {
            let jwt = req.headers.authorization?.substr(7);

            if (typeof jwt === "string" ) {
                let ok = await mainService.logoff(jwt);
                if (!ok) {
                    res.statusCode = 401;
                    res.send ({message: 'Não logado', 'error-code':2})
                    return;
                }
            }
            res.send();
        }
    }
}
