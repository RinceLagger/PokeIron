const { Router } = require("express");
const router = Router();
const { signIn, logIn, openFirst, mainProfile, logOut} = require("../controllers/auth.controller");

router
  .get("/", (req, res) => {
    if(req.session.currentUser)res.redirect("/mainProfile");
    res.render("index");
  })
  .get("/signIn", (req, res) => {
    if(req.session.currentUser)res.redirect("/mainProfile");
    res.render("signIn");
  })
  .get("/logIn", (req, res) => {
    if(req.session.currentUser)res.redirect("/mainProfile");
    res.render("logIn");
  })
  .post("/signIn", signIn)
  .post("/logIn", logIn)
  .get("/openFirst", openFirst)
  .get("/mainProfile",mainProfile)
  .get("/logOut", logOut);

module.exports = router;