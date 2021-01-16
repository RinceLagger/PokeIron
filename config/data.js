const axios = require('axios');

const apiURL="https://api.pokemontcg.io/v1/cards?setCode=base1";

async function getPokemons() {
    try {
    
    const { data:{cards} } = await axios.get(apiURL)
        const cardsFilter = cards.filter((card) => card.supertype === "Pokémon");
        //console.log(cardsFilter);
        return cardsFilter;
        
    } catch (err) {
        console.error(err)
    }
}
   //const pokemons = getInfo();
    module.exports = {getPokemons};

    
    
    