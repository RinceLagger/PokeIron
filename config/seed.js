const connectDb = require("./db.config");
const mongoose = require("mongoose");
const { getPokemons } = require("./data.js");

const Card = require("../models/Card.model");

async function seedDb() {
  try {
    await connectDb("drop");

    const pokemons = await getPokemons();

    //console.log(pokemons);

    for (const pokemon of pokemons) {
      const newPokemon = {
        name: pokemon["name"],
        imgUser: pokemon["imageUrlHiRes"],
        tipo: pokemon["types"],
        hp: pokemon["hp"],
      };

      const addedPokemon = await Card.create(newPokemon);
      console.log(addedPokemon);
    }

    mongoose.connection.close();
  } catch (e) {
    console.error(e);
  }
}

seedDb();
