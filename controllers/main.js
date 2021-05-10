module.exports = (app) => {
    const {mainService} = app.services;

    return {
        index(req, res) {
            res.send(mainService.hello());
        }
    }
}
