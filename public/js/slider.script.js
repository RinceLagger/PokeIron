/* ----------- CARD CAROUSEL ---------- */

/*if (document.querySelector('#firstCards')) {
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
}*/

var slider = tns({
  container: "#cardsViewportMobile",
  items: 1,
  loop: false,
  swipeAngle: false,
  speed: 400,
  guter: 10,
  controlsPosition: "bottom",
  nav: false,
  rewind: true,
  mouseDrag: true,
  controlsText: ["<", ">"],
});
document.querySelector("#cardsMobile").style.display = "none";
document.querySelector("#cardsDesktop").style.display = "none";
function placeSlider() {
  if (document.querySelector("#firstCards")) {
    console.log(window.innerWidth);
    console.log("hola");
    if (window.innerWidth < 768) {
      console.log("slider");
      document.querySelector("#cardsMobile").style.display = "block";
      document.querySelector("#cardsDesktop").style.display = "none";
    } else {
      document.querySelector("#cardsMobile").style.display = "none";
      document.querySelector("#cardsDesktop").style.display = "block";
    }
  }
}

window.addEventListener("load", placeSlider);
window.onresize = placeSlider;
