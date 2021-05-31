const express = require("express");
const consign = require("consign");
const sequelize = require("./models/index");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const corsFilter = require("./filters/corsFilter");
const app = express();

app.use(bodyParser.json());
app.use(corsFilter(app));
app.use(methodOverride('_method'));

app.sequelizeObj = sequelize;
app.app = {
    models: sequelize.sequelize.models
}

consign()
    .include("app/services")
    .then("app/controllers")
    .then("app/filters")
    .then("app/routes")
    .into(app);

const port = 4000;

app.listen(port, () => console.log(`Rodando na ${port}`));
