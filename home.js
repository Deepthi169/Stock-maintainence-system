// Initial stock with more household items
const stock = {
  "Plates": 15,
  "Cups": 8,
  "Spoons": 30,
  "Pans": 10,
  "Bowls": 25,
  "Knives": 20,
  "Forks": 18,
  "Glass Jars": 12,
  "Cooking Pots": 16,
  "Frying Pans": 14,
  "Water Bottles": 22,
  "Storage Containers": 19,
  "Cutting Boards": 11,
  "Mugs": 10,
  "Serving Trays": 13
};

const salesCount = {}; // Track number of sales per item
const stagnantThreshold = 10; // Stock level considered too high if not selling
const discountPercentage = 10; // Discount percentage for stagnant products

// Function to update the stock list in the UI
function updateStockList() {
  const stockList = document.getElementById("stockList");
  stockList.innerHTML = ""; // Clear the current list
  for (let item in stock) {
    const li = document.createElement("li");
    li.textContent = `${item}: ${stock[item]} units`;
    stockList.appendChild(li);
  }
}

// Function to apply discount (show discount recommendation message)
function applyDiscount(product) {
  const discountMessage = `${product} is now discounted by ${discountPercentage}%! Consider applying the discount to boost sales.`;
  return discountMessage;
}

// Event listener for the form submission
document.getElementById("sellForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting normally
  const product = document.getElementById("product").value.trim();
  const quantity = parseInt(document.getElementById("quantity").value.trim());
  const alertMessage = document.getElementById("alertMessage");
  const recommendation = document.getElementById("recommendation");

  alertMessage.textContent = ""; // Reset the alert message
  recommendation.textContent = ""; // Reset the recommendation message

  // Check if the product exists in the stock
  if (!stock[product]) {
    alertMessage.textContent = "Product not found in stock.";
    return;
  }

  // Check if the quantity to be sold is available in stock
  if (stock[product] < quantity) {
    alertMessage.textContent = `${product} is out of stock or not enough quantity available.`;
    return;
  }

  // Process the sale: decrease stock and increment sales count
  stock[product] -= quantity;
  salesCount[product] = (salesCount[product] || 0) + 1;

  // Update the stock list UI
  updateStockList();

  // Low stock alert
  if (stock[product] <= 5) {
    alertMessage.textContent = `${product} is running low! Consider restocking soon.`;
  }

  // Stagnant stock recommendation (apply discount)
  if (salesCount[product] >= 3 && stock[product] > stagnantThreshold) {
    recommendation.textContent = `${product} is not selling fast. ${applyDiscount(product)}`;
  }
});

// Initial stock display when the page loads
updateStockList();