
const imgCardPlayer = document.querySelector("#cardPlayerImg").value;

const imgCardOponent = document.querySelector("#cardOponentImg").value;
//console.log("enlace imagen",imgCardPlayer)

var cardPlayer = new Image(); 
cardPlayer.src = `${imgCardPlayer}`;
var cardOponent = new Image(); 
cardOponent.src = `${imgCardOponent}`;
//console.log("objeto imagen",cardPlayer)
var portada= new Image(); 
portada.src = `/img/portada_fight.jpg`;

class Game1 {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.isGameOver = false;
     }
  
    startLoop() {
      let timeReal = Date.now();

      this.createRoom();//generamos la habitación y objetos
      this.createAnimations(); //generamos animaciones personaje
      let time = 0; //variable para definir tiempo entre animaciones
      
  
      const loop = () => {
       
  
        if(Date.now()-timeReal >10){
  
        this.updateCanvas();
        this.clearCanvas();
        this.drawCanvas();
  
        if (!this.isGameOver) {
          window.requestAnimationFrame(loop);
  
        }
        timeReal = Date.now();
      }else{
        window.requestAnimationFrame(loop);
      }
      };

      //this.printIntro();

      setTimeout(()=>{ this.printIntro(); }, 500);
      
      setTimeout(function(){ window.requestAnimationFrame(loop); }, 5000); //iniciamos el loop dando tiempoa cargar las imágenes

      
  
    }

    printIntro(){//pintamos la portada introductoria

      this.ctx.fillStyle="#371482"; //fondo morado para las zonas no cubiertas
      this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
      this.ctx.drawImage(portada,this.canvas.width/2-this.canvas.height/4, 0, this.canvas.height/2, this.canvas.height);

    }
  

  
  
    changeMoveAnimations(time){
  
    //   time++;
    //   if(time===10){
    //     time=0;
    //     if(this.player1.directionY!=0 /*&& this.player1.directionX!=0*/ ){
    //      this.player1.changeAnimationFront();
    //     }
    //     else if(this.player1.directionY===0 && this.player1.directionX === -1 ){
    //       this.player1.changeAnimationLeft();
    //      }
    //     else if(this.player1.directionY===0 && this.player1.directionX === 1 ){
    //       this.player1.changeAnimationRight();
    //       //console.log("lateral");
    //      } 
  
    //   }
  
    //   return time;
  
    }
  
  
    updateCanvas() {
    //   this.player1.update();
  
    }
  
    clearCanvas() {
       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    drawCanvas() {
  
        this.ctx.drawImage(cardPlayer,30, 2*this.canvas.height/3, this.canvas.height/5, this.canvas.height/3);
        this.ctx.drawImage(cardOponent,this.canvas.width-this.canvas.height/5-30, 0, this.canvas.height/5, this.canvas.height/3);
      
  
    //   /*----dibujamos las líneas limitadoras de la habitación en función del tamaño del canvas-----*/
      // this.ctx.beginPath();
      // this.ctx.moveTo(this.canvas.width*0.1, 0);
      // this.ctx.lineTo(this.canvas.width*0.1, this.canvas.height/2);
      // this.ctx.stroke();
      
    //   this.ctx.beginPath();
    //   this.ctx.moveTo(this.canvas.width*0.9, 0);
    //   this.ctx.lineTo(this.canvas.width*0.9, this.canvas.height/2);
    //   this.ctx.stroke();
      
    //   this.ctx.beginPath();
    //   this.ctx.moveTo(this.canvas.width*0.1, this.canvas.height/2);
    //   this.ctx.lineTo(this.canvas.width*0.9, this.canvas.height/2);
    //   this.ctx.stroke();
  
    //   this.ctx.beginPath();
    //   this.ctx.moveTo(this.canvas.width*0.1, this.canvas.height/2);
    //   this.ctx.lineTo(0, this.canvas.height);
    //   this.ctx.stroke();
  
    //   this.ctx.beginPath();
    //   this.ctx.moveTo(this.canvas.width*0.9, this.canvas.height/2);
    //   this.ctx.lineTo(this.canvas.width, this.canvas.height);
    //   this.ctx.stroke();
  
    //   /*------dibujamos fondo de la habitación--------------------*/
  
    //   this.ctx.drawImage(room,0, 0, this.canvas.width, this.canvas.height);
  
    //   /*----------------------------------------------------------------------*/
  
    //   this.objects.forEach((object) => {
    //     object.draw();
    //   });
  
    //   this.player1.draw();
  
    //   //this.ctx.drawImage(img,this.canvas.width/2-50, this.canvas.height/2, 100, 200);
  
    }
   
    createRoom(){
  
  
  
    //   const ordenador = new Ordenador(this.canvas,this.canvas.width/2 + this.canvas.width/14,this.canvas.height/2-this.canvas.height/11, this.canvas.width/4,100,textObjetoPrueba,0);
    //   this.objects.push(ordenador);
  
    //   const magicHut = new MagicHut(this.canvas,this.canvas.width/34+this.canvas.width*0.1,this.canvas.height/2 -this.canvas.width/55 ,this.canvas.width/12,this.canvas.width/12,textObjetoPrueba3, 1);
    //   this.objects.push(magicHut);
  
    //   const cama = new Object(this.canvas,this.canvas.width-this.canvas.width/8,this.canvas.height - this.canvas.height/9, this.canvas.width/5,this.canvas.height/5,textObjetoPrueba2, 2);
    //   this.objects.push(cama);
  
    //   const armario = new Object(this.canvas,this.canvas.width-this.canvas.width/5,this.canvas.height/2-this.canvas.height/4+20, this.canvas.width/8,this.canvas.height/2-20,textObjetoPrueba4, 3);
    //   this.objects.push(armario);
  
    //   const croma = new Object(this.canvas,this.canvas.width/20+40,this.canvas.height-this.canvas.height*0.2-40, this.canvas.width/12,this.canvas.height*0.4,textObjetoPrueba5, 4);
    //   this.objects.push(croma);
  
      
    //   const ratas = new Object(this.canvas,this.canvas.width/34+this.canvas.width*0.3,this.canvas.height/2 - this.canvas.width/44, this.canvas.height/4 -this.canvas.width/55,this.canvas.width/14,textObjetoPrueba6, 5);
    //   this.objects.push(ratas);
  
    }
  
    createAnimations(){
      
        // this.imgFrente.push(imgFrente1);
        // this.imgFrente.push(imgFrente2);
        // this.imgFrente.push(imgFrente3);
        // this.imgFrente.push(imgFrente4);
        // this.imgFrente.push(imgFrente5);
    }
  

  
  }