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

const MAXIMUMCOFFEES = 10;

// Main Menu Elements
let mainMenu = document.getElementById("mainMenu");
let pickUpButton = document.getElementById("pickUpButton");
let deliveryButton = document.getElementById("deliveryButton");

// Customer Info Elements
let customerInfoMenu = document.getElementById("customerInfoMenu");
let customerInfoForm = document.getElementById("customerInfoForm");
let customerInfoButton = document.getElementById("customerInfoButton")
let customerName = document.getElementById("customerName");
let deliveryInfo = document.getElementById("deliveryInfo")
let customerAddress = document.getElementById("customerAddress");
let customerPhone = document.getElementById("customerPhone");

// Coffee Selection Elements
let coffeeSelectionButton = document.getElementById("coffeeSelectionButton");
let coffeeAmountMenu = document.getElementById("coffeeAmountMenu");
let coffeeAmount = document.getElementById("coffeeAmount");
let coffeeSelectionMenu = document.getElementById("coffeeSelectionMenu");

// Customer Order
let orderAmount = 0;
let order = [];
let delivery = false;

// Main Menu Button Listeners
pickUpButton.addEventListener("click", function (e) {
    e.preventDefault();
    changePage('mainMenu', 'customerInfoMenu')
    // Hide delivery information input
    deliveryInfo.classList.add("hide");
});

deliveryButton.addEventListener("click", function (e) {
    e.preventDefault();
    changePage('mainMenu', 'customerInfoMenu')
    // Show delivery information input
    if (deliveryInfo.classList.contains("hide")) { deliveryInfo.classList.remove("hide"); }
    delivery = true;
});

// Setup Past Order Variables
let storedOrders = JSON.parse(localStorage.getItem("orders"));
if (storedOrders == null) {
    localStorage.setItem('orders', JSON.stringify([]))
}

storedOrders = JSON.parse(localStorage.getItem("orders"));
// Add Past Orders To Main Menu
let pastOrders = document.getElementById("pastOrders");
if (storedOrders.length != []) {
    storedOrders.forEach(pastOrder => {
        pastOrders.innerHTML += `<li><strong>Order #${storedOrders.indexOf(pastOrder) + 1} (${pastOrder[0][3][0]})</strong> <button id="pastOrderButton${storedOrders.indexOf(pastOrder)}" class="buttonDefault">View Order</button></li>`
    });
    storedOrders.forEach(pastOrder => {
        // Show the order details if the operator chooses to view.
        let viewPastOrderButton = document.getElementById(`pastOrderButton${storedOrders.indexOf(pastOrder)}`);
        viewPastOrderButton.addEventListener("click", function (e) {
            e.preventDefault();
            generatePastOrder("pastOrderTable", pastOrder);
            changePage("mainMenu", "pastOrderMenu");
        })
    });
}
else {
    pastOrders.innerHTML = '<li>There are no past orders.</li>'
}


// Customer Information Button
customerInfoButton.addEventListener("click", function (e) {
    // Check if the operator has not entered the customers name
    if (checkEmpty(customerName, "Please enter the customers name.")) {
        return;
    }
    // Check if it is a delivery order
    if (delivery == true) {
        // Check if the operator has not entered the customers address
        if (checkEmpty(customerAddress, "Please enter the customers address.")) {
            return;
        }
        // Check if the operator has not entered the customers phone number
        if (checkEmpty(customerPhone, "Please enter the customers phone number.")) {
            return;
        }
        // Check if the entered phone number is valid
        let phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!phoneno.test(customerPhone.value)) {
            let errorText = document.getElementById(customerPhone.id + "Error");
            errorText.innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>` + 'Please enter a valid phone number.'
            return;
        }
    }
    // Change to the next page
    changePage("customerInfoMenu", "coffeeAmountMenu");
})

// When operator clicks button to open selection menu
coffeeSelectionButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Check if the operator has entered no value
    if (checkEmpty(coffeeAmount, "Please enter an amount of coffees.")) {
        return;
    }
    // Check if the amount is not greater than 10 and greater than 0
    if (coffeeAmount.value > MAXIMUMCOFFEES || coffeeAmount.value < 1 || coffeeAmount.value % 1 != 0) {
        let errorText = document.getElementById(coffeeAmount.id + "Error");
        errorText.innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>` + 'Please enter a number from 1-10.'
        return;
    }
    // Change to coffee selection screen
    changePage('coffeeAmountMenu', 'coffeeSelectionMenu');
    // Add order amount number to coffee selection screen
    coffeeSelectionMenu.innerHTML = "";
    // Add page content container
    coffeeSelectionMenu.innerHTML += `<div id="selectionContentContainer"></div>`
    let selectionContentContainer = document.getElementById("selectionContentContainer");
    selectionContentContainer.innerHTML += `<h2>Available Coffees</h2>`;
    selectionContentContainer.innerHTML += `<p>The customer can order up to a maximum of 10 coffees.<p>`;
    // Add coffee selection container 
    selectionContentContainer.innerHTML += `<div id="coffeeSelectionContainer"></div>`;
    let coffeeSelectionContainer = document.getElementById("coffeeSelectionContainer");
    // Add all coffees to coffee selection screen
    COFFEES.forEach(coffee => {
        coffeeSelectionContainer.innerHTML += `
        <div class="coffeeContainer" id="coffee${COFFEES.indexOf(coffee)}Container">
        <p>${coffee}</p>
        <select id="coffee${COFFEES.indexOf(coffee)}Size">
        <option>Regular</option>
        <option>Medium</option>
        <option>Large</option>
        </select>
        <button class="buttonDefault" type="button" id="coffee${COFFEES.indexOf(coffee)}">+</button>
        </div>`;
    });
    // Add cancel order button to coffee selection screen
    selectionContentContainer.innerHTML += `<button class="buttonDefault cancelOrder" type="button" onclick="location.reload()">Cancel Order</button>`;
    // Add edit order button to coffee selection screen
    selectionContentContainer.innerHTML += `<button class="buttonDefault" type="button" onclick="changePage('coffeeSelectionMenu','customerOrderMenu')" id="viewOrderButton">View Order</button>`;
    // Add customer order details
    coffeeSelectionMenu.innerHTML += `
    <div id="coffeeOrderContainer">
    <h2>Order Details</h2>
    <table id="customerSelectionOrder"></table>
    </div>`
    generateOrder('customerSelectionOrder');
    // Add Event Listeners to each Coffee button
    for (i = 0; i < COFFEES.length; i++) {
        let coffeeName = COFFEES[i];
        let coffeeButton = document.getElementById(`coffee${i}`);
        let coffeeSize = document.getElementById(`coffee${i}Size`);
        coffeeButton.addEventListener("click", function (e) {
            e.preventDefault();
            // Check if they have ordered the maximum coffee amount.
            if (orderAmount == 10) {
                return;
            }
            orderAmount += 1;
            // Add coffee to order depending on operator selection
            if (coffeeSize.value == "Regular") { order.push([coffeeName, coffeeSize.value, REGULAR, [customerName.value, customerAddress.value, customerPhone.value]]); }
            if (coffeeSize.value == "Medium") { order.push([coffeeName, coffeeSize.value, MEDIUM, [customerName.value, customerAddress.value, customerPhone.value]]); }
            if (coffeeSize.value == "Large") { order.push([coffeeName, coffeeSize.value, LARGE, [customerName.value, customerAddress.value, customerPhone.value]]); }
            generateOrder('customerSelectionOrder');
        });
    }

    // Customer Order Menu Elements
    let viewOrderButton = document.getElementById("viewOrderButton");
    let addCoffees = document.getElementById("addCoffeesButton");
    let completeOrderButton = document.getElementById('completeOrderButton')
    let customerDetailsContainer = document.getElementById("customerDetailsContainer")

    // When operator proceeds to view customer order
    viewOrderButton.addEventListener("click", function (e) {
        e.preventDefault();
        // Displaying the customer details
        customerDetailsContainer.innerHTML = "";
        customerDetailsContainer.innerHTML += `<h2>Current Order</h2>`;
        customerDetailsContainer.innerHTML += `Please ensure that all below details are correct and that the customers order is correct.`;
        customerDetailsContainer.innerHTML += `<h3>Customer Details</h3>`;
        customerDetailsContainer.innerHTML += `<p><strong>Name:</strong> ${customerName.value}`;
        // Display delivery details if it is a delivery order
        if (customerPhone.value != "") {
            customerDetailsContainer.innerHTML += `<p><strong>Address:</strong> ${customerAddress.value}`;
            customerDetailsContainer.innerHTML += `<p><strong>Phone Number:</strong> ${customerPhone.value}`;
        }
        generateOrder('customerOrder');
    });

    // When operator clicks button to complete order
    completeOrderButton.addEventListener("click", function (e) {
        e.preventDefault();
        // Display an error if the order is empty
        if (order.length == 0) {
            let errorText = document.getElementById("amountError");
            errorText.innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>` + "You have not selected any coffees.";
            return;
        }
        // Store order in past orders
        let storedOrders = JSON.parse(localStorage.getItem("orders"));
        storedOrders.push(order);
        localStorage.setItem('orders', JSON.stringify(storedOrders))
        location.reload();
    })

    // When operator clicks button to go back to selection menu
    addCoffees.addEventListener("click", function (e) {
        e.preventDefault();
        changePage('customerOrderMenu', 'coffeeSelectionMenu');
        let errorText = document.getElementById("amountError");
        errorText.innerHTML = "";
        generateOrder('customerSelectionOrder');
    })
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

// Check if user input is an empty string
function checkEmpty(element, message) {
    let errorText = document.getElementById(element.id + "Error");
    // Check if an error box is already present
    if (errorText == null) {
        element.insertAdjacentHTML('afterend', `<p class="errorMessage" id=${element.id + "Error"}></p>`);
    }
    // Check if the input is empty
    if (element.value == "") {
        let errorText = document.getElementById(element.id + "Error");
        errorText.innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>` + message;
        return true;
    }
    else {
        let errorText = document.getElementById(element.id + "Error");
        errorText.innerHTML = "";
        return false;
    }
}

// Generate the users order
function generateOrder(tableId) {
    // Addition of the customers order to the screen
    let table = document.getElementById(tableId);
    table.innerHTML = "";
    table.innerHTML += `        
       <tr>
       <th>Coffee</th>
       <th>Size</th>
       <th>Cost</th>
       </tr>`
    // Add each coffee to the order statement
    order.forEach(item => {
        let row = table.insertRow();
        let cell = row.insertCell();
        cell.innerHTML = `${item[0]}`;
        cell = row.insertCell();
        // Add ability to change sizes
        cell.innerHTML = `      
           <select id="coffee${order.indexOf(item)}Size${tableId}">
           <option>Regular</option>
           <option>Medium</option>
           <option>Large</option>
           </select>`
        let coffeeSizeOrder = document.getElementById(`coffee${order.indexOf(item)}Size${tableId}`);
        coffeeSizeOrder.value = `${item[1]}`;
        cell = row.insertCell();
        cell.innerHTML = `$${parseFloat(item[2]).toFixed(2)}`;
        cell = row.insertCell();
        cell.innerHTML = `<button class="removeItem" id="removeItem${order.indexOf(item)}${tableId}">X</button>`;
        // Remove coffee from the order
        let removeItem = document.getElementById(`removeItem${order.indexOf(item)}${tableId}`);
        removeItem.addEventListener("click", function (e) {
            e.preventDefault();
            table.deleteRow(`${order.indexOf(item) + 1}`);
            orderAmount -= 1;
            order.splice(order.indexOf(item), 1);
            table.rows[table.rows.length - 1].cells[2].innerHTML = `$${calculateCost(order, customerPhone.value != "")}`;
        });
        let sizeAdjustment = document.getElementById(`coffee${order.indexOf(item)}Size${tableId}`);
        // Change size of a coffee in the order
        sizeAdjustment.addEventListener("change", function (e) {
            e.preventDefault();
            order[order.indexOf(item)][1] = e.target.value;
            if (e.target.value == "Regular") { order[order.indexOf(item)][2] = REGULAR; }
            if (e.target.value == "Medium") { order[order.indexOf(item)][2] = MEDIUM; }
            if (e.target.value == "Large") { order[order.indexOf(item)][2] = LARGE;; }
            row.cells[2].innerHTML = `$${parseFloat(order[order.indexOf(item)][2]).toFixed(2)}`;
            table.rows[table.rows.length - 1].cells[2].innerHTML = `$${calculateCost(order, customerPhone.value != "")}`;
        });
    });
    // Adding Delivery Cost Display
    if (customerPhone.value != "") {
        let deliverCostRow = table.insertRow();
        let deliveryCostCell = deliverCostRow.insertCell();
        deliveryCostCell = deliverCostRow.insertCell();
        deliveryCostCell.innerHTML = "<strong>Delivery Fee</strong>";
        deliveryCostCell = deliverCostRow.insertCell();
        deliveryCostCell.innerHTML = `$${DELIVERYCHARGE.toFixed(2)}`;
    }

    // Adding Total Cost Display
    let totalCostRow = table.insertRow();
    let totalCostCell = totalCostRow.insertCell();
    totalCostCell = totalCostRow.insertCell();
    totalCostCell.innerHTML = "<strong>Total</strong>";
    totalCostCell = totalCostRow.insertCell();
    totalCostCell.innerHTML = `$${calculateCost(order, customerPhone.value != "")}`;
}

// Generate a past order
function generatePastOrder(tableId, order) {
    // Adding customers details to the screen
    let pastOrderCustomer = document.getElementById('pastOrderCustomer');
    pastOrderCustomer.innerHTML = "";
    pastOrderCustomer.innerHTML += `<p><strong>Name:</strong> ${order[0][3][0]}`;
    if (order[0][3][2] != "") {
        pastOrderCustomer.innerHTML += `<p><strong>Address:</strong> ${order[0][3][1]}`;
        pastOrderCustomer.innerHTML += `<p><strong>Phone Number:</strong> ${order[0][3][2]}`;
    }

    // Addition of the customers order to the screen
    let table = document.getElementById(tableId);
    table.innerHTML = "";
    table.innerHTML += `        
           <tr>
           <th>Coffee</th>
           <th>Size</th>
           <th>Cost</th>
           </tr>`
    // Add each coffee to the order statement
    order.forEach(item => {
        let row = table.insertRow();
        let cell = row.insertCell();
        cell.innerHTML = `${item[0]}`;
        cell = row.insertCell();
        // Add ability to change sizes
        cell.innerHTML = `${item[1]}`
        cell = row.insertCell();
        cell.innerHTML = `$${parseFloat(item[2]).toFixed(2)}`;
    });
    // Adding Delivery Cost Display
    if (order[0][3][2] != "") {
        let deliverCostRow = table.insertRow();
        let deliveryCostCell = deliverCostRow.insertCell();
        deliveryCostCell = deliverCostRow.insertCell();
        deliveryCostCell.innerHTML = "<strong>Delivery Fee</strong>";
        deliveryCostCell = deliverCostRow.insertCell();
        deliveryCostCell.innerHTML = `$${DELIVERYCHARGE.toFixed(2)}`;
    }

    // Adding Total Cost Display
    let totalCostRow = table.insertRow();
    let totalCostCell = totalCostRow.insertCell();
    totalCostCell = totalCostRow.insertCell();
    totalCostCell.innerHTML = "<strong>Total</strong>";
    totalCostCell = totalCostRow.insertCell();
    totalCostCell.innerHTML = `$${calculateCost(order, customerPhone.value != "")}`;

}
