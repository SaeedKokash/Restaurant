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