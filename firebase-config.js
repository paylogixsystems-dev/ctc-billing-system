// Firebase Configuration
// Replace these values with your Firebase project config
// Get your config from: Firebase Console > Project Settings > Your apps

const firebaseConfig = {
  apiKey: "AIzaSyAvxelkRo0h0gq0-dCb28CX4PwcF_CZtaE",
  authDomain: "ctc-billing-system.firebaseapp.com",
  projectId: "ctc-billing-system",
  storageBucket: "ctc-billing-system.firebasestorage.app",
  messagingSenderId: "743290997025",
  appId: "1:743290997025:web:28d0dcdd3ec4a8498a5660"
};

// Only initialize Firebase if config is valid (not placeholder values)
if (firebaseConfig.apiKey && 
    firebaseConfig.apiKey !== "AIzaSyAvxelkRo0h0gq0-dCb28CX4PwcF_CZtaE" && 
    firebaseConfig.projectId && 
    firebaseConfig.projectId !== "ctc-billing-system") {
    try {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.log('Firebase initialization failed:', error);
    }
} else {
    console.log('Firebase not configured - using localStorage mode');
}

