
//comprueba cada segudno si el body de la página ha cargado, 
// en caso afirmativo muestra la página y oculta el bloque de carga
function onReady(callback) {
    var intervalId = window.setInterval(function() {
      if (document.getElementsByTagName('body')[0] !== undefined) {
        window.clearInterval(intervalId);
        callback.call(this);
      }
    }, 1000);
  }
  
  //cambia la visibilidad del bloque de carga y de la página que queremos mostrar
  function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
  }
  


  onReady(function() {
    setVisible('#firstCards', true);
    setVisible('#loading', false);
  });