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
let orderAmount = 0;
let order = [];

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
    e.preventDefault();
    coffeeSelectionMenu.innerHTML = "";
    // Add order amount number to coffee selection screen
    orderAmount = coffeeAmount.value;
    coffeeSelectionMenu.innerHTML += `<p id="coffeeAmountIndicator">Coffee Amount: ${orderAmount}</p>`;
    // Add all coffees to coffee selection screen
    COFFEES.forEach(coffee => {
        coffeeSelectionMenu.innerHTML += `
        <div id="coffee${COFFEES.indexOf(coffee)}Container">
        <p>${coffee}</p>
        <select id="coffee${COFFEES.indexOf(coffee)}Size">
        <option>Regular</option>
        <option>Medium</option>
        <option>Large</option>
        </select>
        <button type="button" id="coffee${COFFEES.indexOf(coffee)}">Add</button>
        </div>`;
    });
    // Add cancel order button to coffee selection screen
    coffeeSelectionMenu.innerHTML += `<button type="button" onclick="changePage('coffeeSelectionMenu','mainMenu')" class="cancelOrder">Cancel Order</button>`;
    // Add edit order button to coffee selection screen
    coffeeSelectionMenu.innerHTML += `<button type="button" onclick="changePage('coffeeSelectionMenu','customerOrderMenu')" id="viewOrderButton">View Order</button>`;
    // Add Event Listeners to each Coffee button
    for (i = 0; i < COFFEES.length; i++) {
        let coffeeName = COFFEES[i];
        let coffeeButton = document.getElementById(`coffee${i}`);
        let coffeeSize = document.getElementById(`coffee${i}Size`);
        coffeeButton.addEventListener("click", function (e) {
            let coffeeAmountIndicator = document.getElementById("coffeeAmountIndicator");
            if (orderAmount == 1) {
                coffeeAmountIndicator.innerHTML = 'You have selected the entitled coffee order amount.';
                return;
            }
            e.preventDefault();
            if (coffeeSize.value == "Regular") { order.push([coffeeName, coffeeSize.value, REGULAR]); }
            if (coffeeSize.value == "Medium") { order.push([coffeeName, coffeeSize.value, MEDIUM]); }
            if (coffeeSize.value == "Large") { order.push([coffeeName, coffeeSize.value, LARGE]); }
            orderAmount -= 1;
            coffeeAmountIndicator.innerHTML = `Coffee Amount: ${orderAmount}`
        });
    }

    // Customer Order Menu Elements
    let viewOrderButton = document.getElementById("viewOrderButton");
    let customerOrderMenu = document.getElementById("customerOrderMenu");

    // When operator proceeds to view customer order
    viewOrderButton.addEventListener("click", function (e) {
        let table = document.getElementById("customerOrder");
        order.forEach(item => {
            let row = table.insertRow();
            let cell = row.insertCell();
            cell.innerHTML = `${item[0]}`;
            cell = row.insertCell();
            cell.innerHTML = `      
            <select id="coffee${order.indexOf(item)}SizeOrder">
            <option>Regular</option>
            <option>Medium</option>
            <option>Large</option>
            </select>`
            let coffeeSizeOrder = document.getElementById(`coffee${order.indexOf(item)}SizeOrder`);
            coffeeSizeOrder.value = `${item[1]}`;
            cell = row.insertCell();
            cell.innerHTML = `$${item[2]}`
            cell = row.insertCell();
            cell.innerHTML = `<button class="removeItem" id="removeItem${order.indexOf(item)}">X</button>`;
            let removeItem = document.getElementById(`removeItem${order.indexOf(item)}`);
            removeItem.addEventListener("click", function(e){
                table.deleteRow(`${order.indexOf(item)+1}`);
                order.splice(order.indexOf(item), 1);
            });
        });
    });
});

// Change the screen to a new page
function changePage(currentPage, newPage) {
    document.getElementById(currentPage).classList.add("hide");
    document.getElementById(newPage).classList.remove("hide");
    return;
}