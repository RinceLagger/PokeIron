const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { Error } = require("mongoose");

const hasCorrectPassword = (password) => {
  const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/);
  return passwordRegex.test(password);
};

const isMongooseValidationError = (error) =>
  error instanceof Error.ValidationError;

const isMongoError = ({ code: errorCode }) => errorCode === 11000;

const renderMessage = (res, page, alert) => {
    return res.render(page , {alert})
}

const signIn = async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
      //console.log(user,password,email);
      const missingCredentials = !password || !email || !username;

      if (missingCredentials) return res.send("missing credentials");
    
      if (!hasCorrectPassword(password)) return renderMessage(res, "signIn", "Incorrect password format")
  
      const usuario = User.findOne({ username }).lean;
      console.log("usuario", usuario)
      if (!usuario) return renderMessage(res, "signIn", "user already exist") //Esto no acaba de funcionar
  
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const { passwordHash, ...user } = await User.create({
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
      console.log(username,password);
      const missingCredentials = !password || !username;
      if (missingCredentials) {
        return res.send("missing credentials");
      }
      const usuario = await User.findOne({ username }).lean();
      if (!usuario) return renderMessage(res, "login", "user does not exist");
  
      const { passwordHash, ...user } = usuario;
  
      const verifiedPassword = await bcrypt.compare(password,passwordHash);
      if (!verifiedPassword) return renderMessage(res, "login", "Wrong password")

        console.log(user);
        console.log(req.session);
        req.session.currentUser = user;
        return renderMessage(res, "index", "login successfully")
  
  
      
    } catch (err) {
      console.error(err);
      return renderMessage(res, "login", "validation error: " + err.message);
    }
  };


  module.exports = { logIn, signIn};