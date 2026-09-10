// GitHub db.json URL
const API_URL =
  "https://raw.githubusercontent.com/sowbh/shopITnow/main/db/db.json";

// Product container
const productContainer = document.getElementById("productContainer");

// Product details container
const productDetails = document.getElementById("productDetails");

// Search input and button
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Search section
const searchSection = document.getElementById("searchSection");

// Store products
let products = [];

// Fetch products
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    products = data.products;

    checkSingleProduct();
  } catch (error) {
    productContainer.innerHTML = `
      <div class="alert alert-danger w-100 text-center">
        Unable to load products. Please try again later.
      </div>
    `;
    console.error(error);
  }
}

// Display all products
function displayProducts(productList) {
  searchSection.style.display = "block";
  productContainer.classList.remove("d-none");
  productDetails.classList.add("d-none");
  productContainer.innerHTML = "";

  if (productList.length === 0) {
    productContainer.innerHTML = `
      <div class="alert alert-warning w-100 text-center">
        No products found.
      </div>
    `;
    return;
  }

  productList.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card product-card glass";

    card.innerHTML = `
      <img
        src="${product.image}"
        class="card-img-top"
        alt="${product.title}"
      >
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <h5 class="price">$${product.price}</h5>
        <a href="/products/products.html?id=${product.id}" class="btn btn-primary view-btn">
          View More
        </a>
      </div>
    `;

    productContainer.appendChild(card);
  });
}

// Display single product detail view
function displaySingleProduct(product) {
  searchSection.style.display = "none";
  productContainer.classList.add("d-none");
  productDetails.classList.remove("d-none");

  productDetails.innerHTML = `
    <div class="product-details-row">
      <div class="product-image-section">
        <img
          src="${product.image}"
          alt="${product.title}"
          class="product-detail-image"
        >
      </div>

      <div class="product-info-section">
        <h2 class="product-title">${product.title}</h2>

        <h4 class="product-category">
          Category: <span>${product.category}</span>
        </h4>

        <h3 class="product-price">$${product.price}</h3>

        <h4 class="product-rating">
          ⭐ ${product.rating?.rate || "0.0"} (${product.rating?.count || "0"} Reviews)
        </h4>

        <div class="description-box">
          <h5>Description</h5>
          <p>${product.description}</p>
        </div>

        <button class="btn btn-primary close-btn" onclick="closeProductDetails()">
          Close
        </button>
      </div>
    </div>
  `;
}

// Search Logic Execution
function executeSearch() {
  const value = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value)
    );
  });

  displayProducts(filteredProducts);
}

if (searchInput) {
  searchInput.addEventListener("input", executeSearch);
}

if (searchBtn) {
  searchBtn.addEventListener("click", executeSearch);
}

// Check URL id parameter
function checkSingleProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    const product = products.find((product) => product.id == id);
    if (product) {
      displaySingleProduct(product);
    } else {
      displayProducts(products);
    }
  } else {
    displayProducts(products);
  }
}

// Global Nav Handlers
window.closeProductDetails = function () {
  window.location.href = "/products/products.html";
};

window.goHome = function () {
  window.location.href = "/products/products.html";
};

// Check Admin Login state
const adminDashboardBtn = document.getElementById("adminDashboardBtn");
if (adminDashboardBtn) {
  if (sessionStorage.getItem("adminLoggedIn") === "true") {
    adminDashboardBtn.classList.remove("d-none");
  }
}

// Initialize Application
fetchProducts();