let shoppingCart = {
    items: [],
    totalCost: 0,
};

function updateTotal() {
    // Store overrall total amount of all items in a variable
    let subTotal = 0;

    // Iterate through each item in the shopping cart
    shoppingCart.items.forEach((item, index) => {
        let itemDiv = document.querySelectorAll('.perfume-container')[index];

        // Calculate and update the total price for each item
        let priceText = itemDiv.querySelector(".price").textContent;
        let price = parseFloat(priceText.split(" ")[1]); 
        let quantityInput = itemDiv.querySelector("#quantity");
        let quantity = parseInt(quantityInput.value);

        let itemCost = price * quantity;
        item.totalCost = itemCost;

        let totalDisplay = itemDiv.querySelector(".total");
        totalDisplay.textContent = `R ${itemCost.toFixed(2)}`;

        // Update the overall total amount
        subTotal += itemCost;
    });

    // Display the updated subtotal of all items
    let subtotalDisplay = document.querySelector(".subtotal");
    subtotalDisplay.textContent = `sub-total : R ${subTotal.toFixed(2)}`;
}

// Function to add items to the shopping cart
function addToCart(button) {
    let itemDiv = button.parentElement;

    let priceText = itemDiv.querySelector(".price").textContent;
    let price = parseFloat(priceText.split(" ")[1]); 

    let quantityInput = itemDiv.querySelector("#quantity");
    let quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
        alert("Please enter a valid quantity.");
        return;
    }

    // Calculate the total price for the current item
    let itemCost = price * quantity;

    // Create an item object with price, quantity, and total price
    let item = {
        price: price,
        quantity: quantity,
        totalPrice: itemCost,
    };

    // Add the item to the shopping cart
     // Update the total price in the shopping cart

    shoppingCart.items.push(item);

    shoppingCart.totalPrice += itemCost;

    // Display the updated total price
    updateTotal();
}


// Function to clear the shopping cart
function clearCart(itemDiv) {
    let totalDisplay = itemDiv.querySelector(".total");

    // Remove the item from the shopping cart
    shoppingCart.items = shoppingCart.items.filter((item) => item.totalCost !== parseFloat(totalDisplay.textContent.split(" ")[1]));

    // Display the updated subtotal and total amount
    shoppingCart.totalCost -= parseFloat(totalDisplay.textContent.split(" ")[1]);
    updateTotal();

    // Reset the total price displayed for the current item
    totalDisplay.textContent = "R 0";
}

// Function to decrease quantity
function decreaseQuantity(button) {
    let itemDiv = button.parentElement;
    let quantityInput = itemDiv.querySelector("#quantity");

    if (quantityInput.value > 1) {
        quantityInput.value--;

        // Display the updated total price for the current item
        updateTotal();
    }
}

// Function to increase quantity
function increaseQuantity(button) {
    let itemDiv = button.parentElement;
    let quantityInput = itemDiv.querySelector("#quantity");
    quantityInput.value++;

    // Display the updated total price for the current item
    updateTotal();
}

// Display updated total amount
updateTotal();
