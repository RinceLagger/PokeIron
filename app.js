require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const hbs = require("hbs");
const bodyParser = require("body-parser");

hbs.registerPartials(__dirname + "/views/partials");

app.set("views",`${__dirname}/views`);
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

app.listen(process.env.PORT,() => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);}); 