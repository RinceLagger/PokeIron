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

const cardsDesktop = document.querySelectorAll("#cardsViewport .card");

const createCombat = async () => {
  let id;
  if (window.innerWidth < 768) {
    const cardMobile = document.querySelector(".tns-slide-active"); //clase del slider activa
    id = cardMobile.id;
  } else {
    const cardDesktop = document.querySelector(".card-active");
    id = cardDesktop.id;
  }

  const combatID = document.querySelector("#battleID").value;

  let apiURL;

  if (combatID) {
    apiURL = `/fight-battle/${id}/${combatID}`;
    const { data: winner } = await axios.post(apiURL);

    window.location.replace(`/battleAnimation/${combatID}`);
  } else {
    apiURL = `/createBattle/${id}`;
    console.log(apiURL);
    await axios.post(apiURL);

    window.location.replace(`/battle-created`);
  }
};

const markSelected = (e) => {
  for (let i = 0; i < cardsDesktop.length; i++) {
    cardsDesktop[i].classList.remove("card-active");
  }
  e.target.classList.add("card-active");
};

Array.from(cardsDesktop).forEach((card) => {
  card.addEventListener("click", markSelected);
});

if (document.querySelector(".newBattle"))
  buttonBattle.addEventListener("click", createCombat);

if (document.querySelector("#navbar")) {
  const currentPage = location.href;
  const navItem = document.querySelectorAll("#navbar a");
  for (let i = 0; i < navItem.length; i++) {
    if (navItem[i].href === currentPage) navItem[i].classList.add("nav-active");
  }
}

// -------- Menu ------- //

if (
  document.querySelector("#menuDesktop") ||
  document.querySelector("#menuMobile")
) {
  const menuDisplay = () => {
    const content = document.querySelector(".hamburger");
    if (content.style.display === "none") {
      content.style.display = "flex";
    } else {
      content.style.display = "none";
    }
  };

  const battlesDisplay = () => {
    const content = document.querySelector("#battlesList");
    if (content.style.display === "none") {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  };

  if (document.querySelector("#menuMobile")) {
    const menuTrigger = document.querySelector("#menuTrigger");
    const closeTrigger = document.querySelector("#closeTrigger");
    const battlesTrigger = document.querySelector("#battlesTrigger");
    menuTrigger.addEventListener("click", menuDisplay);
    closeTrigger.addEventListener("click", menuDisplay);
    battlesTrigger.addEventListener("click", battlesDisplay);
  }
}
