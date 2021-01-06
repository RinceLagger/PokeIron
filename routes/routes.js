const { Router } = require("express");
const router = Router();
const { signIn, logIn, openFirst, mainProfile, userData, logOut} = require("../controllers/auth.controller");
const fileUploader = require('../config/cloudinary.config');

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
  .post("/UserData", fileUploader.single('image'), userData)
  .get("/logOut", logOut);

module.exports = router;