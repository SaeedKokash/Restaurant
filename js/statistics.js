'use strict';

//declaring an array
const allFood = [];
let countid = 1000;

//getting element by id from HTML
const foodTable = document.getElementById("foodTable");
const tableHead = document.getElementById("tableHead");

//creating a constructor
function Foodobject(foodName, foodType, foodPrice) {
    this.foodName = foodName;
    this.foodType = foodType;
    this.foodPrice = foodPrice;
    allFood.push(this);
}

//creating a unique 4 digit number for ID
Foodobject.prototype.id = function () {
    this.id = countid++;
}

//creating a table for the food form

//creating the table headers as static
let headerID = document.createElement("th");
headerID.textContent = "ID";

let headerName = document.createElement("th");
headerName.textContent = "Food Name";

let headerType = document.createElement("th");
headerType.textContent = "Type of Food";

let headerPrice = document.createElement("th");
headerPrice.textContent = "Price";

//appending table headers to the table 
tableHead.appendChild(headerID);
tableHead.appendChild(headerName);
tableHead.appendChild(headerType);
tableHead.appendChild(headerPrice);


//creating the table content as dynamic using a function
Foodobject.prototype.tableRender = function () {

    let newRow = document.createElement("tr");
    newRow.className = `Item-number-${this.id}`

    let rowID = document.createElement("td");
    rowID.textContent = this.id;

    let rowName = document.createElement("td");
    rowName.textContent = this.foodName;

    let rowType = document.createElement("td");
    rowType.textContent = this.foodType;

    let rowPrice = document.createElement("td");
    rowPrice.textContent = `${this.foodPrice} JD`;

    newRow.appendChild(rowID);
    newRow.appendChild(rowName);
    newRow.appendChild(rowType);
    newRow.appendChild(rowPrice);

    foodTable.appendChild(newRow);

}

getData();

function getData() {

    let allFoodRetrieved = localStorage.getItem("UserInput");
    let allFoodParsed = JSON.parse(allFoodRetrieved)

    // console.log(allFoodParsed)

    for (let i = 0; i < allFoodParsed.length; i++) {

        const newFoodArr = new Foodobject(allFoodParsed[i].foodName, allFoodParsed[i].foodType, allFoodParsed[i].foodPrice)

        newFoodArr.id();
        newFoodArr.tableRender();
    }

    // console.log(allFood);
}

//setting arrays for chart.js

const chartFoodName = [];
const chartFoodPrice = [];

for (let i = 0; i < allFood.length; i++) {
    chartFoodName.push(allFood[i].foodName)
    chartFoodPrice.push(allFood[i].foodPrice)
}

//chart.js codes


//multiple charts in same page data
const data = {

    labels: chartFoodName,
    datasets: [{
        label: 'My First Food Dataset',
        data: chartFoodPrice,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]
};

//multiple charts configs and render

//chart 1 bar

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        indexAxis: 'y',
    },
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);



//chart 2 pie

const config2 = {
    type: 'pie',
    data: data,

};

const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config2
);

const moreItemBtn = document.getElementById("addMore");
moreItemBtn.addEventListener("click", handleClick);


function handleClick(event) {
    event.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: "You will lose your Entries!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Clear it!'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire(
          'Deleted!',
          'Your Entries have been Cleared.',
          'success'
        )

        setTimeout(function(){
            window.location.href = ("./index.html")
        }, 2000);
        
      }
    })

}






