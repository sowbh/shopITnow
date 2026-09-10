// Firebase config imports

import {
  auth,
  googleProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "./firebase-config.js";

// Firebase authentication functions

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

let confirmationResult = null;

// Register user
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("registerName");
    const email = document.getElementById("registerEmail");
    const password = document.getElementById("registerPassword");
    const button = document.getElementById("registerBtn");

    if (!validateRequired([name, email, password])) return;

    startLoading(button);

    try {
      await createUserWithEmailAndPassword(
        auth,
        email.value.trim(),
        password.value,
      );

      // Sign out immediately so the user must explicitly log in with credentials
      await signOut(auth);

      showAlert(
        "Account created successfully. Please log in with your credentials.",
        "success",
      );

      registerForm.reset();

      // Switch to the Login tab automatically
      setTimeout(() => {
        const loginTab = document.getElementById("loginTab");
        if (loginTab) {
          loginTab.click();
        }
      }, 1500);
    } catch (error) {
      showAlert(firebaseErrorMessage(error.code));
    } finally {
      stopLoading(button);
    }
  });
}

// Login user

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail");

    const password = document.getElementById("loginPassword");

    const button = document.getElementById("loginBtn");

    if (!validateRequired([email, password])) return;

    startLoading(button);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.value.trim(),
        password.value,
      );

      showAlert("Login successful", "success");

      setTimeout(() => {
        window.location.href = "/products/products.html";
      }, 1000);
    } catch (error) {
      showAlert(firebaseErrorMessage(error.code));
    } finally {
      stopLoading(button);
    }
  });
}

// Google login

const googleButton = document.getElementById("googleLogin");

if (googleButton) {
  googleButton.addEventListener("click", async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      showAlert("Google login successful", "success");

      setTimeout(() => {
        window.location.href = "/products/products.html";
      }, 1000);
    } catch (error) {
      showAlert(firebaseErrorMessage(error.code));
    }
  });
}

// Phone login (Under Construction)

const phoneButton = document.getElementById("phoneLogin");

if (phoneButton) {
  phoneButton.addEventListener("click", () => {
    // Show under construction notification
    showAlert("Continue with OTP is under construction.", "warning");

    // Hide phone section if open
    const phoneSection = document.getElementById("phoneSection");
    if (phoneSection) {
      phoneSection.classList.add("d-none");
    }
  });
}

// Send OTP (Under Construction Fallback)

const sendOtpButton = document.getElementById("sendOtp");

if (sendOtpButton) {
  sendOtpButton.addEventListener("click", () => {
    showAlert("Continue with OTP is under construction.", "warning");
  });
}

// Verify OTP (Under Construction Fallback)

const verifyOtpButton = document.getElementById("verifyOtp");

if (verifyOtpButton) {
  verifyOtpButton.addEventListener("click", () => {
    showAlert("Continue with OTP is under construction.", "warning");
  });
}

// Logout user

window.logoutUser = async function () {
  const isAdmin = sessionStorage.getItem("adminLoggedIn");

  if (isAdmin === "true") {
    const choice = confirm(
      "You are currently viewing User Dashboard.\n\nOK = Logout completely\nCancel = Return to Admin Dashboard",
    );

    if (!choice) {
      window.location.href = "../admin/dashboard.html";

      return;
    }
  }

  const confirmLogout = confirm("Are you sure you want to logout?");

  if (!confirmLogout) {
    return;
  }

  try {
    await signOut(auth);

    sessionStorage.removeItem("adminLoggedIn");

    sessionStorage.removeItem("isAdmin");

    alert("Logged out successfully");

    window.location.href = "../index.html";
  } catch (error) {
    console.log(error);
  }
};

// Authentication state

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in:", user.email || user.phoneNumber);
  } else {
    console.log("No user logged in");
  }
});

// Login/Register tab switching

const loginTab = document.getElementById("loginTab");

const registerTab = document.getElementById("registerTab");

if (loginTab && registerTab) {
  loginTab.addEventListener("click", () => {
    document.getElementById("loginForm").classList.remove("d-none");

    document.getElementById("registerForm").classList.add("d-none");

    loginTab.classList.add("active");

    registerTab.classList.remove("active");
  });

  registerTab.addEventListener("click", () => {
    document.getElementById("registerForm").classList.remove("d-none");

    document.getElementById("loginForm").classList.add("d-none");

    registerTab.classList.add("active");

    loginTab.classList.remove("active");
  });
}

// Show and hide login password

const toggleLoginPassword = document.getElementById("toggleLoginPassword");

if (toggleLoginPassword) {
  toggleLoginPassword.addEventListener("click", () => {
    const password = document.getElementById("loginPassword");

    if (password.type === "password") {
      password.type = "text";

      toggleLoginPassword.innerHTML = "🙈";
    } else {
      password.type = "password";

      toggleLoginPassword.innerHTML = "👁";
    }
  });
}

// Show and hide register password

const toggleRegisterPassword = document.getElementById(
  "toggleRegisterPassword",
);

if (toggleRegisterPassword) {
  toggleRegisterPassword.addEventListener("click", () => {
    const password = document.getElementById("registerPassword");

    if (password.type === "password") {
      password.type = "text";

      toggleRegisterPassword.innerHTML = "🙈";
    } else {
      password.type = "password";

      toggleRegisterPassword.innerHTML = "👁";
    }
  });
}

// Forgot password

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {
  forgotPassword.addEventListener("click", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("loginEmail");

    const email = emailInput.value.trim();

    if (!email) {
      showAlert("Please enter your email first");

      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      showAlert("Password reset link sent to your email", "success");
    } catch (error) {
      showAlert(firebaseErrorMessage(error.code));
    }
  });
}
