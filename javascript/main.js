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
            e.preventDefault();
            let coffeeAmountIndicator = document.getElementById("coffeeAmountIndicator");
            if (orderAmount == 0) { return }
            orderAmount -= 1;
            if (orderAmount == 0) {
                coffeeAmountIndicator.innerHTML = 'You have selected the entitled coffee order amount.';
            }
            else {
                coffeeAmountIndicator.innerHTML = `Coffee Amount: ${orderAmount}`;
            }
            if (coffeeSize.value == "Regular") { order.push([coffeeName, coffeeSize.value, REGULAR]); }
            if (coffeeSize.value == "Medium") { order.push([coffeeName, coffeeSize.value, MEDIUM]); }
            if (coffeeSize.value == "Large") { order.push([coffeeName, coffeeSize.value, LARGE]); }
        });
    }

    // Customer Order Menu Elements
    let viewOrderButton = document.getElementById("viewOrderButton");
    let customerDetailsContainer = document.getElementById("customerDetailsContainer")

    // When operator proceeds to view customer order
    viewOrderButton.addEventListener("click", function (e) {
        // Create variable which stores order cost

        // Displaying the customer details
        customerDetailsContainer.innerHTML += `<p>Name: ${customerName.value}`;
        if (customerPhone.value != "") {
            customerDetailsContainer.innerHTML += `<p>Address: ${customerAddress.value}`;
            customerDetailsContainer.innerHTML += `<p>Phone Number: ${customerPhone.value}`;
        }

        // Addition of the customers order to the screen
        let table = document.getElementById("customerOrder");
        table.innerHTML = "";
        table.innerHTML += `        
        <tr>
        <th>Coffee</th>
        <th>Size</th>
        <th>Cost</th>
        </tr>`
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
            cell.innerHTML = `$${parseFloat(item[2]).toFixed(2)}`;
            cell = row.insertCell();
            cell.innerHTML = `<button class="removeItem" id="removeItem${order.indexOf(item)}">X</button>`;
            // Remove coffee from the order
            let removeItem = document.getElementById(`removeItem${order.indexOf(item)}`);
            removeItem.addEventListener("click", function (e) {
                e.preventDefault();
                table.deleteRow(`${order.indexOf(item) + 1}`);
                order.splice(order.indexOf(item), 1);
                orderAmount += 1;
                coffeeAmountIndicator.innerHTML = `Coffee Amount: ${orderAmount}`;
            });
            let sizeAdjustment = document.getElementById(`coffee${order.indexOf(item)}SizeOrder`);
            // Change size of a coffee in the order
            sizeAdjustment.addEventListener("change", function (e) {
                e.preventDefault();
                order[order.indexOf(item)][1] = e.target.value;
                if (e.target.value == "Regular") { order[order.indexOf(item)][2] = REGULAR; }
                if (e.target.value == "Medium") { order[order.indexOf(item)][2] = MEDIUM; }
                if (e.target.value == "Large") { order[order.indexOf(item)][2] = LARGE;; }
                row.cells[2].innerHTML = `$${parseFloat(order[order.indexOf(item)][2]).toFixed(2)}`;
            });
        });
        // Adding Delivery Cost Display
        let deliverCostRow = table.insertRow();
        let deliveryCostCell = deliverCostRow.insertCell();
        deliveryCostCell.innerHTML = "";
        deliveryCostCell = deliverCostRow.insertCell();
        deliveryCostCell.innerHTML = "Delivery";
        deliveryCostCell = deliverCostRow.insertCell();
        deliveryCostCell.innerHTML = `$${DELIVERYCHARGE.toFixed(2)}`;

        // Adding Total Cost Display
        let totalCostRow = table.insertRow();
        let totalCostCell = totalCostRow.insertCell();
        totalCostCell.innerHTML = "";
        totalCostCell = totalCostRow.insertCell();
        totalCostCell.innerHTML = "Total";
        totalCostCell = totalCostRow.insertCell();
        totalCostCell.innerHTML = `$${calculateCost(order, customerPhone.value != "")}`;
    });
});

// Change the screen to a new page
function changePage(currentPage, newPage) {
    document.getElementById(currentPage).classList.add("hide");
    document.getElementById(newPage).classList.remove("hide");
    return;
}

// Calculate total cost of the order given items and whether it is delivery
function calculateCost(items, delivery) {
    let totalCost = 0;
    if (delivery == true) {
        totalCost += DELIVERYCHARGE;
    }
    items.forEach(item => {
        totalCost += parseFloat(item[2]);
    });
    return totalCost.toFixed(2);
}