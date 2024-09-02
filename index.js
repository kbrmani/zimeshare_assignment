const inputSearch = document.querySelector(".input-search");
const mainContainer = document.querySelector(".main-container");
let allProducts = []; // Variable to store fetched products

initialResult();

function initialResult() {
  fetch('https://zimeshare-assignment-backend.onrender.com/api/products')
    .then(response => response.json())
    .then(data => {
      allProducts = data[0].products; // Store fetched products in allProducts
      displayProducts(allProducts); // Display initial products
    });
}


// Function to display products
function displayProducts(products) {
  mainContainer.innerHTML = ''; // Clear existing content
  products.forEach(product => {
    mainContainer.innerHTML += `
      <div class="bg-white border border-gray-300 rounded-lg shadow-md p-4">
        <img src="${product.collage_image}" alt="feature image" class="w-full object-cover rounded-lg mb-2">
        <p>${product.name.slice(0, 25) + "...."}</p>
        <p class="text-green-600">₹${product.min_product_price}</p>
      </div>`;
  });
}

const handleInputBox = (e) => {
  const query = e.target.value.toLowerCase();

  if (query.length <= 3) {
    displayProducts(allProducts); // Show all products
  } else {
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(query)
    );

    // Display filtered data
    if (filteredProducts.length > 0) {
      displayProducts(filteredProducts);
    } else {
      mainContainer.innerHTML = "<p>No results found</p>";
    }
  }
};

inputSearch.addEventListener("keyup", handleInputBox);
