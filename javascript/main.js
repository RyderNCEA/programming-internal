// Coffee Costs
const REGULAR = 5.50;
const MEDIUM = REGULAR + 1;
const LARGE = REGULAR + 2;

// Delivery Charge
const DELIVERYCHARGE = 5;

// Avaliable Coffees
const COFFEES = [
    "Cappuccino",
    "Flat White",
    "Hot Mocha",
    "Café Latte",
    "Macchiato",
    "White Chocolate Mocha",
    "Chai Latte",
    "Vanilla Latte",
    "Long Black",
    "Caramel Latte",
    "Short Black",
    "Piccolo Latte"];

// Main Menu Elements
let mainMenu = document.getElementById("mainMenu");
let pickUpButton = document.getElementById("pickUpButton");
let deliveryButton = document.getElementById("deliveryButton");

// Customer Info Elements
let customerInfo = document.getElementById("customerInfo");
let customerInfoForm = document.getElementById("customerInfoForm");
let customerName = document.getElementById("customerName");
let deliveryInfo = document.getElementById("deliveryInfo")
let customerAddress = document.getElementById("customerAddress");
let customerPhone = document.getElementById("customerPhone");

// Page operator is currently on
let currentPage = mainMenu;

// Main Menu Button Listeners
pickUpButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Hide delivery information input
    deliveryInfo.classList.add("hide");
});

deliveryButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Show delivery information input
    if (deliveryInfo.classList.contains("hide")) { deliveryInfo.classList.remove("hide"); }
});

// Change the screen to a new page
function changePage(currentPage, newPage) {
    document.getElementById(currentPage).classList.add("hide");
    document.getElementById(newPage).classList.remove("hide");
    return;
}