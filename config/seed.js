const connectDb = require("./db.config");
const mongoose = require("mongoose");
const { pokemons } = require("./data.js");

const Card = require("../models/Card.model");

connectDb();
pokemons.then((pokemons)=>{pokemons.forEach((pokemon) => seedDb(pokemon));})
mongoose.connection.close();

async function seedDb(pokemon) {
  try {
    const newPokemon = {
      name: pokemon["name"],
      imgUser: pokemon["imageUrlHiRes"],
      tipo: pokemon["types"],
      hp: pokemon["hp"],
    };

    const addedPokemon = await Card.create(newPokemon);
    console.log(addedPokemon);
  } catch (e) {
    console.error(e);
  }
}


