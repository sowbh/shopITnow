# shopITnow 🛍️

A simple, fast, and modern e-commerce web application built with Firebase Authentication and dynamic product displays.

🚀 **Live Demo:** [https://shopthisnow.netlify.app](https://shopthisnow.netlify.app)

---

## 🌟 Key Features

- **User Accounts:** Easy sign-up and login using Email/Password or Google OAuth.
- **Form Validation:** Instant visual feedback for missing inputs or invalid credentials.
- **Dynamic Product Display:** Items loaded automatically from a JSON backend database.
- **Search & Filter:** Real-time product search by title or category.
- **Dark / Light Mode:** Seamless theme toggling with glassmorphism design accents.

---

## 🛠️ Tech Stack

- **HTML5 & CSS3:** Bootstrap 5 & Glassmorphism Design
- **JavaScript (ES6+):** Vanilla JS DOM Manipulation
- **Firebase Auth:** User Authentication & Session Handling
- **JSON API:** Product Catalog Database

---

## 🚀 Getting Started & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/shopITnow.git
cd shopITnow
```

### 2. Set Up Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add project**.
2. Name your project **shopITnow** and complete the wizard.
3. On the project overview page, click the **Web icon (`</>`)** to register a new web application.
4. Copy your unique `firebaseConfig` credentials object provided by Firebase.

### 3. Configure Credentials Locally

1. Open `auth/firebase-config.js` in your code editor.
2. Replace the default configuration with your Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

### 4. Enable Authentication & Authorized Domains

In the Firebase Console, navigate to;
Build > Authentication > Sign-in method.

Enable Email/Password and Google sign-in options.

Go to Settings > Authorized domains and add your Netlify domain 
(e.g., shopthisnow.netlify.app) as well as localhost.

### 5. Run Locally

Open index.html directly in your web browser or use the Live Server extension in VS Code.
