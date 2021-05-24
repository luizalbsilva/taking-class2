const express = require("express");
const consign = require("consign");
const sequelize = require("./models/index");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

app.use(bodyParser.json());
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


app.listen(3000, () => console.log('Rodando na 3000'));
