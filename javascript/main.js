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
let customerInfoMenu = document.getElementById("customerInfoMenu");
let customerInfoForm = document.getElementById("customerInfoForm");
let customerName = document.getElementById("customerName");
let deliveryInfo = document.getElementById("deliveryInfo")
let customerAddress = document.getElementById("customerAddress");
let customerPhone = document.getElementById("customerPhone");

// Coffee Selection Elements
let coffeeSelectionButton = document.getElementById("coffeeSelectionButton");
let coffeeAmountMenu = document.getElementById("coffeeAmountMenu");
let coffeeAmount = document.getElementById("coffeeAmount");
let coffeeSelectionMenu = document.getElementById("coffeeSelectionMenu");

// Page operator is currently on
let currentPage = mainMenu;

// Customer Order
let order = []

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

// When operator clicks button to open selection menu
coffeeSelectionButton.addEventListener("click", function (e) {
    coffeeSelectionMenu.innerHTML = "";
    // Add order amount number to coffee selection screen
    coffeeSelectionMenu.innerHTML += `<p>Coffee Amount: ${coffeeAmount.value}</p>`;
    // Add all coffees to coffee selection screen
    COFFEES.forEach(coffee => {
        coffeeSelectionMenu.innerHTML += `<button type="button" id="coffee${COFFEES.indexOf(coffee)}">${coffee}</button>`;
    });
    // Add cancel order button to coffee selection screen
    coffeeSelectionMenu.innerHTML += `<button type="button" onclick="changePage('coffeeSelectionMenu','mainMenu')" class="cancelOrder">Cancel Order</button>`;
    // Add edit order button to coffee selection screen
    coffeeSelectionMenu.innerHTML += `<button type="button" onclick="changePage('coffeeSelectionMenu','editOrderMenu')" class="editOrder">Edit Order</button>`;
    // Add Event Listeners to each Coffee button
    for (i = 0; i < COFFEES.length; i++) {
        coffeeButton = document.getElementById(`coffee${i}`);
        coffeeSize = document.getElementById(`coffee${i}Size`);
        coffeeButton.addEventListener("click", function (e) {
            e.preventDefault();
            order.append(i, coffeeSize)
        });
    }
});

// Change the screen to a new page
function changePage(currentPage, newPage) {
    console.log("Adding hide to " + currentPage)
    document.getElementById(currentPage).classList.add("hide");
    console.log("Removing hide from " + newPage)
    document.getElementById(newPage).classList.remove("hide");
    return;
}