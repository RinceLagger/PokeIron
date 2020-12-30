require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const connectDb = require("./configs/db.config");
const router = require("./routes/routes");
const connectSession = require("./configs/session.config");

hbs.registerPartials(__dirname + "/views/partials");

connectDb();
connectSession(app);

app.set("views",`${__dirname}/views`);
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use("/", router );

app.listen(process.env.PORT,() => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);}); 