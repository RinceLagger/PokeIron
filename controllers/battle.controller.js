const User = require("../models/User.model");
const { Error } = require("mongoose");
const Card = require("../models/Card.model");
const Battle = require("../models/Battle.model");

const renderMessage = (res, page, alert) => {
  return res.render(page, { alert });
};

const findWinner = (hp1, hp2) => {
  if (hp1 > hp2) return "user1";
  else if (hp2 > hp1) return "user2";
  else return "empate";
};

const winnerAnimation = async (req, res) => {
  try {
    const datosUsuario = req.session.currentUser;
    if (!datosUsuario) return renderMessage(res, "login", "Please Login first");
    const {battleID} = req.params;
    console.log("datos usuario", datosUsuario);


    //obtenemos el combate que hay que animar mediante el id enviado por parámetro

    const { user1, user2,card1,card2,vencedor} = await Battle.findOne({
      _id: battleID,
    }).populate("user1").populate("user2").populate("card1").populate("card2");

    //si quién hace la llamada corresponde al user1 tendremos que actualizar el status del combate de mostrar a acabado
    //además determinará qué carta corresponde al usuario y cuál al oponente
    let namePlayer;
    let cardPlayer ;
    let cardOponent ;
    let nameOponent ;
    

    if(datosUsuario.username===user1.username){
      const combate = await Battle.findOneAndUpdate( //mostrar --> acabado - actualizamos el status del combate a acabado del user1
        { _id: battleID },
        { status1: "acabado"},
        { new: true }
      ).lean();
      //console.log(combate);
        namePlayer = user1.username;
        cardPlayer = card1;
        cardOponent = card2;
        nameOponent = user2.username;
 
    }
    else if(datosUsuario.username===user2.username){//en este caso estamos mostrando directamente (el jugador se une a combate) y no hay que actualizar status
        namePlayer = user2.username;
        cardPlayer = card2;
        cardOponent = card1;
        nameOponent = user1.username;

        /******AQUÍ HABRÍA QUE ENVIAR EL CORREO DE AVISO AL CREADOR DEL COMBATE ********/
    }

    const datosCombate = {namePlayer,cardPlayer,cardOponent,nameOponent};

    //comprobamos si el jugador actual es el vencedor para pasarlo como parámetro

    if(datosUsuario["_id"]==vencedor){
      //console.log("VICTORIAAAA")
      datosCombate.vencedor = "jugador";}
    //console.log("usuario ID", datosUsuario["_id"]);
    //console.log("vencedor ID", vencedor);
    
    
    //console.log(datosCombate);


    res.render("animation",datosCombate);
  } catch (e) {
    console.error(e);
  }
};

const fightBattle = async (req, res) => {
  try {
    //comprobamos que estamos ya logueados
    const datosUsuario = req.session.currentUser;
    if (!req.session.currentUser)
      return renderMessage(res, "login", "Please Login first");

    const { id, battleID } = req.params;
    const { username } = datosUsuario;

    const { card1, user1: usuario1 } = await Battle.findOne({
      _id: battleID,
    }).populate("card1");

    const { hp: hpCard2 } = await Card.findOne({ _id: id });

    const winner = findWinner(card1.hp, hpCard2);

    if (winner === "user1") {
      const combate = await Battle.findOneAndUpdate(
        { _id: battleID },
        {
          user2: datosUsuario["_id"],
          status1: "mostrar",
          status2: "acabado",
          card2: id,
          vencedor: usuario1,
        },
        { new: true }
      ).lean();
      //console.log(combate);
    } else if (winner === "user2") {
      const combate = await Battle.findOneAndUpdate(
        { _id: battleID},
        {
          user2: datosUsuario["_id"],
          status1: "mostrar",
          status2: "acabado",
          card2: id,
          vencedor: datosUsuario["_id"],
        },
        { new: true }
      ).lean();
      //console.log(combate);
    } else {
      const numRandom = Math.floor(Math.random() * 2);

      if (numRandom) {
        //numRandom =1 gana user2

        const combate = await Battle.findOneAndUpdate(
          { _id: battleID },
          {
            user2: datosUsuario["_id"],
            status1: "mostrar",
            status2: "acabado",
            card2: id,
            vencedor: datosUsuario["_id"],
          },
          { new: true }
        ).lean();
        //console.log(combate);
      } else {
        //numRandom = 0  gana user1

        const combate = await Battle.findOneAndUpdate(
          {  _id: battleID },
          {
            user2: datosUsuario["_id"],
            status1: "mostrar",
            status2: "acabado",
            card2: id,
            vencedor: usuario1,
          },
          { new: true }
        ).lean();
        //console.log(combate);
      }
    }

    res.send(`${battleID}`);
  } catch (err) {
    console.error(err);
  }
};

const joinBattle = async (req, res) => {
  try {
    const datosUsuario = req.session.currentUser;
    if (!datosUsuario) return renderMessage(res, "login", "Please Login first");
    //console.log(req.params);
    const { id: battleID } = req.params;
    //console.log("id de batalla en join battle", battleID);
    const { username } = datosUsuario;
    const { cards } = await User.findOne({ username }).populate("cards");
    const datos = { ...datosUsuario, cards, battleID };
    //console.log(datos);
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
    //console.log(combatesPropios);
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
    //console.log(combatesOponente);
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

const deleteBattle = async (req, res) => {
  try {
    const datosUsuario = req.session.currentUser;
    if (!datosUsuario) return renderMessage(res, "login", "Please Login first");

    const { battleID } = req.params;

    const eliminadoComb = await Battle.findByIdAndDelete({_id: battleID });
    const eliminado = await User.findOneAndUpdate({combates: {$in: [battleID]}}, {$pull: {combates: battleID}})

    res.redirect("/my-battles");
    //console.log("eliminado", eliminadoComb, eliminado);
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
  winnerAnimation,
  deleteBattle
};
