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


const signIn = async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
      //console.log(user,password,email);
      const missingCredentials = !password || !email || !username;
      if (missingCredentials) {
        return res.send("missing credentials");
      }
      if (!hasCorrectPassword(password)) {
        return res.send("incorrect password format");
      }
  
      const usuario = User.findOne({ username }).lean();
      if (!usuario) {
        return res.send("user already exist");
      }
  
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const { passwordHash, ...user } = await User.create({
        email,
        passwordHash: hashedPassword,
        username,
      });
      console.log(user);
      res.send("aquí saldrían las 6 cartas por ser el primer registro, las añadiríamos al usuario y agragaríamos el usuario a la sesión");
    } catch (err) {
      if (isMongooseValidationError(err)) {
        console.error(err);
        return res.send("validation error: " + err.message);
      }
  
      if (isMongoError(err)) {
        return res.send("mongo error: " + err.message);
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
      if (!usuario) {
        return res.send("user does not exist");
      }

      const { passwordHash, ...user } = usuario;
  
      const verifiedPassword = await bcrypt.compare(password,passwordHash);
      if (!verifiedPassword) {
          return res.send("invalid credentials");
        }
        console.log(user);
        console.log(req.session);
        req.session.currentUser = user;
        res.send(" mostrar homepage");
  
  
      
    } catch (err) {
      console.error(err);
    }
  };


  module.exports = { logIn, signIn};