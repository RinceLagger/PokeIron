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

  for (let i = 0; i < pass.length; i++) {
    if (
      pass.charAt(i) === pass.charAt(i).toUpperCase() &&
      isNaN(pass.charAt(i))
    )
      mayus = true;
    if (
      pass.charAt(i) === pass.charAt(i).toLowerCase() &&
      isNaN(pass.charAt(i))
    )
      minus = true;
    if (!isNaN(pass.charAt(i))) num = true;
  }

  const hasLon =
    pass.length >= 6
      ? (longCheck.style.color = "green")
      : (longCheck.style.color = "red");
  const hasMayus = mayus
    ? (mayusCheck.style.color = "green")
    : (mayusCheck.style.color = "red");
  const hasMinus = minus
    ? (minusCheck.style.color = "green")
    : (minusCheck.style.color = "red");
  const hasNum = num
    ? (numCheck.style.color = "green")
    : (numCheck.style.color = "red");
};

if (document.querySelector("#formSign"))
  passInput.addEventListener("keyup", checkInput);


  /*--------generación combate-----*/

  

 

  const buttonBattle = document.querySelector("#battle-Card");

  const cardMobile = document.querySelector(".tns-slide-active"); //clase del slider activa

  const cardDesktop = document.querySelector(".card-active");

  const createCombat = ()=>{

    let id;
    if (window.innerWidth < 768) {

      

      id = cardMobile.id;

      console.log(id);
      
    } else {

      id = cardDesktop.id;
 
    }
    
    const apiURL=`/createBattle/${id}`;

    axios.post(apiURL);

  }

  buttonBattle.addEventListener("click",createCombat);

 

