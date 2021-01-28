

if(document.querySelector("#chart")){

const canvasElement = document.querySelector("#my-chart");
const width = "90%";
const height = "40%";
canvasElement.setAttribute("width", width);
canvasElement.setAttribute("height", height);

let ctx = canvasElement.getContext('2d');

const Wins = document.querySelector("#winNumber").value;
const Losses= document.querySelector("#loseNumber").value;


let data ={};

let options = {};

if(Wins==0 && Losses ==0){

    data = {
        datasets: [{
            data: [1],
            backgroundColor: ["grey"]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'no battles yet',
            
        ],
        
    };

    options = {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        legend: {
            display: false
        },tooltips: {enabled: false},
        hover: {mode: null},
    }

}else{

    data = {
        datasets: [{
            data: [Wins, Losses],
            backgroundColor: ["#219653", "#EB5757"]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'wins',
            'losses',
        ],
        
    };

    options = {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        legend: {
            display: false
        },
    }

}






function printChart(){
    let myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });
}

printChart();

}




