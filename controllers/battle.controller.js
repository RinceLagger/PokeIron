const User = require("../models/User.model");
const { Error } = require("mongoose");
const Card = require("../models/Card.model");
const Battle = require("../models/Battle.model");

const renderMessage = (res, page, alert) => {
  return res.render(page, { alert });

};

const findWinner = (hp1, hp2) => {
  if(hp1>hp2)return "user1";
  else if(hp2>hp1) return "user2";
  else return "empate";
}


const winnerAnimation = (req, res) => {
  try {
    const datosUsuario = req.session.currentUser;
    if (!datosUsuario) return renderMessage(res, "login", "Please Login first");
    
    res.send("winnerAnimation");
  } catch (e) {
    console.error(e);
  }
};


const fightBattle = async (req, res) => {
  try {
    //comprobamos que estamos ya logueados
    const datosUsuario = req.session.currentUser;
    if (!req.session.currentUser)return renderMessage(res, "login", "Please Login first");
      
      console.log("entro en fightBattle",req.params)
      const {id,battleID} = req.params;
      const { username } = datosUsuario;
     

      const {card1} = await Battle.findOne(
      { _id:battleID }).populate("card1");
      console.log(card1.hp);

      const {hp: hpCard2} = await Card.findOne(
        { _id:id });
        console.log(hpCard2);

      console.log(findWinner(card1.hp, hpCard2));  
       res.send(`${battleID}`);

    
  } catch (err) {
    console.error(err);
  }
};

const joinBattle = async (req, res) => {
  try {
    const datosUsuario = req.session.currentUser;
    if (!datosUsuario) return renderMessage(res, "login", "Please Login first");
    console.log(req.params);
    const {id: battleID} = req.params;
    console.log("id de batalla en join battle", battleID);
    const { username } = datosUsuario;
    const { cards } = await User.findOne({ username }).populate("cards");
    const datos = { ...datosUsuario, cards, battleID };
    console.log(datos);
    res.render("newBattle", datos);
  } catch (e) {
    console.error(e);
  }
};


const battleMain = (req, res) => {
  try {
    const datosUsuario = req.session.currentUser;
    if (!datosUsuario) return renderMessage(res, "login", "Please Login first");
    res.render("battleMain");
  } catch (e) {
    console.error(e);
  }
};

const ownBattlesPage = async (req, res) => {
  // mis combates creados no iniciados
  try {
    const datosUsuario = req.session.currentUser;
    if (!datosUsuario) return renderMessage(res, "login", "Please Login first");
    const combatesPropios = await Battle.find({
      user1: datosUsuario["_id"],
      status1: "espera",
    }).populate("card1");
    console.log(combatesPropios);
    res.render("myBattles", { combatesPropios });
  } catch (e) {
    console.error(e);
  }
};

const activesBattlePage = async (req, res) => {
  //combates a los que puedo unir
  try {
    const datosUsuario = req.session.currentUser;
    if (!datosUsuario) return renderMessage(res, "login", "Please Login first");
    const combatesOponente = await Battle.find({
      user1: { $ne: datosUsuario["_id"] },
      status1: "espera",
    })
      .populate("card1")
      .populate("user1");
    console.log(combatesOponente);
    res.render("activeBattles", { combatesOponente });
  } catch (e) {
    console.error(e);
  }
};

const preFinishBattlePage = async (req, res) => {
  //los que tengo que ver el resultado
  //combates a los que puedo unir
  try {
    const datosUsuario = req.session.currentUser;
    if (!datosUsuario) return renderMessage(res, "login", "Please Login first");
    const combatesMostrar = await Battle.find({
      user1: datosUsuario["_id"],
      status1: "mostrar",
    })
      .populate("card1")
      .populate("user2");
    res.render("preFinishBattles", { combatesMostrar });
  } catch (e) {
    console.error(e);
  }
};

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

    const { id } = req.params;

    const {
      _doc: { _id: battleId },
    } = await Battle.create({
      user1: datosUsuario["_id"],
      status1: "espera",
      status2: "espera",
      card1: id,
    });

    const usuario = await User.findOneAndUpdate(
      { username: datosUsuario["username"] },
      { $push: { combates: battleId } },
      { new: true }
    ).lean();

    //actualizo datos session con el combate añadido
    const { passwordHash, ...user } = usuario;
    req.session.currentUser = user;
    res.send("combate creado");
    console.log(battleId, usuario);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  battlePage,
  createBattle,
  ownBattlesPage,
  activesBattlePage,
  preFinishBattlePage,
  battleMain,
  joinBattle,
  fightBattle,
  winnerAnimation
};
