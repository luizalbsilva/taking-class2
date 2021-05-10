const express = require("express");
const consign = require("consign");

const app = express();
consign()
    .include("services")
    .then("controllers")
    .then("routes")
    .into(app);

app.listen(3000, () => console.log('Rodando na 3000'));
