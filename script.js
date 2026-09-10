/* shopITnow GLOBAL SCRIPT */

// THEME MANAGEMENT

const themeToggle = document.getElementById("themeToggle");

// Load saved theme

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);

    updateThemeIcon(savedTheme);
  }
}

// Toggle theme

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);

  localStorage.setItem("theme", newTheme);

  updateThemeIcon(newTheme);
}

// Change icon

function updateThemeIcon(theme) {
  if (!themeToggle) return;

  themeToggle.innerHTML = theme === "dark" ? "☀️" : "🌙";
}

// Event Listener

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

// Initialize theme

loadTheme();

// ALERT MANAGEMENT

function showAlert(message, type = "danger") {
  const alertBox = document.getElementById("authAlert");

  if (!alertBox) return;

  alertBox.innerHTML = message;

  alertBox.className = `alert alert-${type}`;

  alertBox.style.display = "block";
}

function hideAlert() {
  const alertBox = document.getElementById("authAlert");

  if (alertBox) {
    alertBox.style.display = "none";
  }
}

// FORM VALIDATION HELPERS

function setError(input, message) {
  input.classList.add("is-invalid");

  const feedback = input.nextElementSibling;

  if (feedback) {
    feedback.innerHTML = message;
  }
}

function clearError(input) {
  input.classList.remove("is-invalid");
}

function validateRequired(fields) {
  let valid = true;

  fields.forEach((field) => {
    if (field.value.trim() === "") {
      setError(field, "This field is required");

      valid = false;
    } else {
      clearError(field);
    }
  });

  return valid;
}

// BUTTON LOADING STATE

function startLoading(button) {
  if (!button) return;

  button.disabled = true;

  const spinner = button.querySelector(".spinner-border");

  const text = button.querySelector(".btn-text");

  if (spinner) spinner.classList.remove("d-none");

  if (text) text.style.opacity = "0";
}

function stopLoading(button) {
  if (!button) return;

  button.disabled = false;

  const spinner = button.querySelector(".spinner-border");

  const text = button.querySelector(".btn-text");

  if (spinner) spinner.classList.add("d-none");

  if (text) text.style.opacity = "1";
}

// FIREBASE ERROR TRANSLATOR

function firebaseErrorMessage(code) {
  const errors = {
    "auth/email-already-in-use": "This email is already registered.",

    "auth/invalid-email": "Please enter a valid email.",

    "auth/weak-password": "Password should contain minimum 6 characters.",

    "auth/user-not-found": "No account found with this email.",

    "auth/wrong-password": "Incorrect password.",

    "auth/popup-closed-by-user": "Google login was cancelled.",

    "auth/network-request-failed":
      "Network error. Check your internet connection.",
  };

  return errors[code] || "Something went wrong. Please try again.";
}

// Make functions available globally

window.showAlert = showAlert;

window.hideAlert = hideAlert;

window.startLoading = startLoading;

window.stopLoading = stopLoading;

window.validateRequired = validateRequired;

window.firebaseErrorMessage = firebaseErrorMessage;
