const ADMIN_EMAIL = "admin@shopitnow.com";
const ADMIN_PASSWORD = "admin123";

const API_URL =
  "https://raw.githubusercontent.com/sowbh/shopITnow/main/db/db.json";

let products = [];

// Admin login

const adminLoginForm = document.getElementById("adminLoginForm");

if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("adminEmail").value.trim();

    const password = document.getElementById("adminPassword").value.trim();

    const alertBox = document.getElementById("adminAlert");

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      alertBox.classList.remove("d-none");
      alertBox.classList.remove("alert-danger");
      alertBox.classList.add("alert-success");

      alertBox.innerHTML = "Admin login successful";

      sessionStorage.setItem("adminLoggedIn", "true");
      sessionStorage.setItem("isAdmin", "true");

      setTimeout(() => {
        window.location.href = "./dashboard.html";
      }, 1000);
    } else {
      alertBox.classList.remove("d-none");
      alertBox.classList.remove("alert-success");
      alertBox.classList.add("alert-danger");

      alertBox.innerHTML = "Invalid admin credentials";
    }
  });
}

// Protect dashboard page

if (window.location.pathname.includes("dashboard.html")) {
  if (sessionStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "./admin.html";
  }
}

// Logout admin

window.logoutAdmin = function () {

  const confirmLogout = confirm(
    "Are you sure you want to logout from admin?"
  );


  if (!confirmLogout) {
    return;
  }


  sessionStorage.removeItem("adminLoggedIn");

  sessionStorage.removeItem("isAdmin");


  window.location.href = "./admin.html";

};

// Load products

async function loadProducts() {
  const productList = document.getElementById("adminProductList");

  if (!productList) {
    return;
  }

  try {
    const response = await fetch(API_URL);

    const data = await response.json();

    products = data.products;

    displayAdminProducts();

    updateDashboardCounts();
  } catch (error) {
    console.log(error);
  }
}

// Display products in table

function displayAdminProducts() {
  const productList = document.getElementById("adminProductList");

  if (!productList) {
    return;
  }

  productList.innerHTML = "";

  products.forEach((product) => {
    const row = document.createElement("tr");

    row.innerHTML = `

      <td>

        <img 
          src="${product.image}"
          width="60"
          height="60"
          style="object-fit:contain"
        >

      </td>


      <td>
        ${product.title}
      </td>


      <td>
        $${product.price}
      </td>


      <td>
        ${product.category}
      </td>


      <td>

        <button 
          class="btn btn-warning btn-sm me-2"
        >
          Edit
        </button>


        <button 
          class="btn btn-danger btn-sm"
        >
          Delete
        </button>

      </td>

    `;

    productList.appendChild(row);
  });
}

// Dashboard cards

function updateDashboardCounts() {
  const totalProducts = document.getElementById("totalProducts");

  if (totalProducts) {
    totalProducts.innerText = products.length;
  }

  const totalUsers = document.getElementById("totalUsers");

  if (totalUsers) {
    totalUsers.innerText = "0";
  }

  const totalOrders = document.getElementById("totalOrders");

  if (totalOrders) {
    totalOrders.innerText = "0";
  }
}

// Add product

const productForm = document.getElementById("productForm");

if (productForm) {
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newProduct = {
      title: document.getElementById("productTitle").value,

      price: document.getElementById("productPrice").value,

      category: document.getElementById("productCategory").value,

      image: document.getElementById("productImage").value,

      description: document.getElementById("productDescription").value,
    };

    products.push(newProduct);

    displayAdminProducts();

    productForm.reset();

    alert("Product added locally");
  });
}

// Start

loadProducts();

// Show and hide admin password

const toggleAdminPassword = document.getElementById("toggleAdminPassword");

if (toggleAdminPassword) {
  toggleAdminPassword.addEventListener("click", () => {
    const password = document.getElementById("adminPassword");

    if (password.type === "password") {
      password.type = "text";

      toggleAdminPassword.innerHTML = "🙈";
    } else {
      password.type = "password";

      toggleAdminPassword.innerHTML = "👁";
    }
  });
}

// Forgot admin credentials

const forgotAdmin = document.getElementById("forgotAdmin");

if (forgotAdmin) {
  forgotAdmin.addEventListener("click", () => {
    alert(
      "Admin Credentials:\n\nEmail: admin@shopitnow.com\nPassword: admin123",
    );
  });
}
