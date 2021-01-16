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

      const {
        _doc: {_id: battleId}
      } = await Battle.create({
        user1:datosUsuario["_id"],
        status1: "espera",
        status2: "espera",
        card1:id
      });

      const usuario = await User.findOneAndUpdate(
        { username: datosUsuario["username"] },
        { $push: {combates:  battleId }},
        { new: true }
      ).lean();

      //actualizo datos session con el combate añadido
      const { passwordHash, ...user } = usuario;
      req.session.currentUser = user;

      console.log(battleId,usuario);

    } catch (e) {
      console.log(e);
    }
  };



module.exports = {
    battlePage,
    createBattle,

  };