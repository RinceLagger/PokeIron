const { Router } = require("express");
const router = Router();
const { signIn, logIn, openFirst, mainProfile, logOut} = require("../controllers/auth.controller");

router
  .get("/", (req, res) => {
    res.render("index");
  })
  .get("/signIn", (req, res) => {
    res.render("signIn");
  })
  .get("/logIn", (req, res) => {
    res.render("logIn");
  })
  .post("/signIn", signIn)
  .post("/logIn", logIn)
  .get("/openFirst", openFirst)
  .get("/mainProfile",mainProfile)
  .get("/logOut", logOut);

module.exports = router;