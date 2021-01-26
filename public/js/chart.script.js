

const canvasElement = document.querySelector("#my-chart");
const width = "90%";
const height = "40%";
canvasElement.setAttribute("width", width);
canvasElement.setAttribute("height", height);

let ctx = canvasElement.getContext('2d');

const playerWins = document.querySelector("#winNumber").value;
const playerLosses= document.querySelector("#loseNumber").value;


let data = {
    datasets: [{
        data: [playerWins, playerLosses],
        backgroundColor: ["#219653", "#EB5757"]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'wins',
        'losses',
    ],
    
};



function printChart(){
    let myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                display: false
            },
        }
    });
}

printChart();


//------gráfico rank ----------//


let points = playerWins-playerLosses;

if(points<0)points=0;

const rank= document.querySelector("#puntos");


rank.style.width = `${points}%`



