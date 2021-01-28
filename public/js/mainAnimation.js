

function main() {
  //genero las dimensiones del canvas de la animación

  const width = Math.floor(window.innerWidth * 0.9);
  const height = Math.floor(window.innerHeight * 0.6);

  const canvasElement = document.querySelector("canvas");

  canvasElement.setAttribute("width", width);
  canvasElement.setAttribute("height", height);

  const animation = new Game1(canvasElement);

  animation.startLoop();


}

main();
