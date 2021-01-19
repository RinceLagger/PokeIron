const { Router } = require("express");
const userRouter = Router();
const {
  mainProfile,
  changeUserData,
  userData,
  cardsProfile,
  cardDetail,
} = require("../controllers/auth.controller");

const fileUploader = require("../config/cloudinary.config");

userRouter
  .get("/dashboard", mainProfile)
  .get("/userdata", userData)
  .get("/usercards", cardsProfile)
  .get("/:id", cardDetail)
  .post("/userdata", fileUploader.single("image"), changeUserData);

module.exports = userRouter;
