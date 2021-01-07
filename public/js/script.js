
/* ------- PASSWORD CHECKER -------- */
const passInput = document.querySelector("#password");
const longCheck = document.querySelector("#longitud");
const mayusCheck = document.querySelector("#mayus");
const minusCheck = document.querySelector("#minus");
const numCheck = document.querySelector("#num");

 let mayus = false;
let minus = false;
let num = false;
  
const checkInput = () => {
  const pass = passInput.value;
   let mayus = false;
let minus = false;
let num = false;

  for (let i = 0; i < pass.length; i++){
    if (pass.charAt(i) === pass.charAt(i).toUpperCase() && isNaN(pass.charAt(i))) mayus = true;
    if (pass.charAt(i) === pass.charAt(i).toLowerCase() && isNaN(pass.charAt(i))) minus = true;
    if (!isNaN(pass.charAt(i))) num = true;
  }

  const hasLon = (pass.length >= 6) ? longCheck.style.color = "green": longCheck.style.color = "red";
  const hasMayus = (mayus) ? mayusCheck.style.color = "green" : mayusCheck.style.color = "red";
  const hasMinus = (minus) ? minusCheck.style.color = "green" : minusCheck.style.color = "red";
  const hasNum = (num) ? numCheck.style.color = "green" : numCheck.style.color = "red";
}

if(document.querySelector('#formSign')) passInput.addEventListener("keyup", checkInput)


/* ----------- CARD CAROUSEL ---------- */

if (document.querySelector('#firstCards')) {
  const cardsContainer = Array.from(document.querySelector('#cardsViewport').children);
  cardsArray = [];
  for (let i = 0; i < cardsContainer.length; i++) {
    cardsArray.push(cardsContainer[i])
  }

  console.log(cardsArray[0].offsetLeft);

  const checkCards = () => {
    var width = window.innerWidth;
    for (let i = 0; i < cardsArray.length; i++){
      console.log(cardsArray[i].getBoundingClientRect())
      const position = cardsArray[i].getBoundingClientRect()
      const x = position.left;
      cardsArray[i].className = "card";
      if (x < width / 10) cardsArray[i].className = "card cardLeft";
      else if (x > width/2 + width/5) cardsArray[i].className = "card cardRight";
      else cardsArray[i].className = "card cardCenter";
    }
  }

  document.querySelector('#cardsViewport').addEventListener("scroll", checkCards)


} 

  



