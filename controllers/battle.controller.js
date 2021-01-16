const User = require("../models/User.model");
const { Error } = require("mongoose");
const Card = require("../models/Card.model");
const Battle = require("../models/Battle.model");


const battlePage = async (req, res) => {
    try {
      const datosUsuario = req.session.currentUser;
      if (!datosUsuario) return renderMessage(res, "login", "Please Login first");
      const { username } = datosUsuario;
      const { cards } = await User.findOne({ username }).populate("cards");
      const datos = { ...datosUsuario, cards };
      res.render("newBattle", datos);
    } catch (e) {
      console.log(e);
    }
  };


const createBattle = async (req, res) => {
    try {
      const datosUsuario = req.session.currentUser;
      if (!datosUsuario) return renderMessage(res, "login", "Please Login first");

      const {id} = req.params;

      console.log(id);

    } catch (e) {
      console.log(e);
    }
  };



module.exports = {
    battlePage,
    createBattle,

  };