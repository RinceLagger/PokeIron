const axios = require('axios');

const apiURL="https://api.pokemontcg.io/v1/cards?setCode=base1";

async function getInfo() {
    try {
    
    const { data:{cards} } = await axios.get(apiURL)
        return cards;
    } catch (err) {
        console.error(err)
    }
}

    const cardsRaw = getInfo();
    