const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { Error } = require("mongoose");
const Card = require("../models/Card.model");

const hasCorrectPassword = (password) => {
  const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/);
  return passwordRegex.test(password);
};

const isMongooseValidationError = (error) =>
  error instanceof Error.ValidationError;

const isMongoError = ({ code: errorCode }) => errorCode === 11000;

const renderMessage = (res, page, alert) => {
  return res.render(page, { alert });
};


const getRandomArray = () => { //genera un Array de 6 números aleatorios correspondientes a 6 cartas
  const arrayRandom = [];
  for(let i=0;i<6;i++){
    let numRandom = Math.floor(Math.random() * 67);
    while(arrayRandom.includes(numRandom)) numRandom = Math.floor(Math.random() * 67); //evitamos introducir números random repetidos
    arrayRandom.push(numRandom);
  }
  return arrayRandom;
}

const randomCards = (arrayCards) => { //de todas las cartas devuelve un array con las coincidentes con los índices aleatorios
  
  const arrayRandom = getRandomArray();
  console.log(arrayRandom);
  return arrayCards.filter((card,index) => arrayRandom.includes(index));


}

const signIn = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    //console.log(user,password,email);
    const missingCredentials = !password || !email || !username;

    if (missingCredentials) return res.send("missing credentials");

    if (!hasCorrectPassword(password))
      return renderMessage(res, "signIn", "Incorrect password format");

    const usuario = User.findOne({ username }).lean();
    console.log("usuario", usuario);
    if (!usuario) return renderMessage(res, "signIn", "user already exist"); //Esto no acaba de funcionar --> no es necesario al lanzar mongo un error

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { _doc:{passwordHash, ...user} } = await User.create({
      email,
      passwordHash: hashedPassword,
      username,
    });
    console.log(user);
    req.session.currentUser = user;
    res.render("openingIntro");
  } catch (err) {
    if (isMongooseValidationError(err)) {
      console.error(err);
      return renderMessage(res, "signIn", "validation error: " + err.message);
    }

    if (isMongoError(err)) {
      return renderMessage(res, "signIn", "mongo error: " + err.message);
    }

    console.error(err);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const missingCredentials = !password || !username;
    if (missingCredentials) {
      return res.send("missing credentials");
    }
    const usuario = await User.findOne({ username }).lean();
    if (!usuario) return renderMessage(res, "login", "user does not exist");

    const { passwordHash, ...user } = usuario;

    const verifiedPassword = await bcrypt.compare(password, passwordHash);
    if (!verifiedPassword) return renderMessage(res, "login", "Wrong password");

    console.log(user);
    console.log(req.session);
    req.session.currentUser = user;
    return res.redirect("/mainProfile");
  } catch (err) {
    console.error(err);
    return renderMessage(res, "login", "validation error: " + err.message);
  }
};

const openFirst = async (req, res, next) => {
  try{
    //comprobamos que estamos ya logueados
    if(!req.session.currentUser)return renderMessage(res, "login", "Please Login first");
    console.log(req.session.currentUser);
    const username = req.session.currentUser.username;
    
    //comprobamos a continuación que realmente sea la primera vez que entramos( no hay cartas en la DB)
    const {cards} = await User.findOne({username},{cards:1, _id:0});
    console.log("cartas", cards);
    if(cards.length)return res.redirect("/mainProfile");

    //obtenemos las 6 cartas al azar
    const cartas = await Card.find();
    const finalCards = randomCards(cartas);
    const finalCardsId = finalCards.map((card)=> card["_id"]);
    
    //introducimos los id de las cartas en el usuario
    const user =  await User.findOneAndUpdate({username},{$push:{cards: {$each:finalCardsId}}},{new:true});
    
    //actualizo la sesión para que el usuario este actualizado con cartas
    req.session.currentUser = user;
    //mostramos ahora las primeras cartas al usuario

    res.render("firstCards", {finalCards});
    
    console.log(user);


  }catch(err){
    console.error(err);
  }
};

const mainProfile = (req, res) => {
  if(!req.session.currentUser)return renderMessage(res, "login", "Please Login first");
  res.render("mainProfile", req.session.currentUser);

  
};


const logOut = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = { logIn, signIn, openFirst, mainProfile, logOut };
