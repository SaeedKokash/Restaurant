'use strict';

//declaring an array
const allFood = [];
let countid = 1000;

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

//adding event for submit
const formEl = document.getElementById("foodForm");
formEl.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    let foodName = event.target.foodname.value;
    let foodType = event.target.foodtype.value;
    let foodPrice = event.target.foodprice.value;
    // console.log(foodName, foodType, foodPrice);

    const newFood = new Foodobject(foodName, foodType, foodPrice);
    // console.log(newFood);

    newFood.id();
    // newFood.tableRender();

    saveData();
}


//creating a local storage
function saveData() {

    let allFoodString = JSON.stringify(allFood);
    localStorage.setItem("UserInput", allFoodString)

}