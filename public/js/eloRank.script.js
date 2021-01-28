



//------gráfico rank ----------//


const playerWins = document.querySelector("#winNumber").value;
const playerLosses= document.querySelector("#loseNumber").value;
const eloRating= document.querySelector("#eloRating");

let points = playerWins;


if(playerWins<20){
    
    eloRating.innerHTML = "Rookie";

}else if(playerWins<50){

    eloRating.innerHTML = "Average";

}else if(playerWins<90){

    eloRating.innerHTML = "Expert";

}else{
    eloRating.innerHTML = "Master";
    if(playerWins>100)points = 100;

}

if(points<0)points=0;

const rank= document.querySelector("#puntos");


rank.style.width = `${points}%`