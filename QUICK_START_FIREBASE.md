# Quick Start: Firebase Setup (5 Minutes)

## Step 1: Create Firebase Account
1. Go to https://console.firebase.google.com/
2. Sign in with Google account (free)

## Step 2: Create Project
1. Click **"Add project"**
2. Name: `CTC-Billing` (or any name)
3. Click **Continue** → **Continue** → **Create project**
4. Wait 30 seconds → Click **Continue**

## Step 3: Enable Firestore
1. Click **"Firestore Database"** (left menu)
2. Click **"Create database"**
3. Select **"Start in test mode"**
4. Choose location: `asia-south1` (Mumbai) or closest to you
5. Click **Enable**

## Step 4: Enable Authentication
1. Click **"Authentication"** (left menu)
2. Click **"Get started"**
3. Click **"Sign-in method"** tab
4. Click **"Email/Password"**
5. **Enable** it → Click **Save**

## Step 5: Get Config Code
1. Click **⚙️ Settings** → **Project settings**
2. Scroll to **"Your apps"**
3. Click **Web icon** `</>`
4. App name: `CTC Billing Web`
5. Click **Register app**
6. **Copy the config code** (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

## Step 6: Paste Config
1. Open `firebase-config.js` file
2. Replace `YOUR_API_KEY_HERE` etc. with your actual values
3. Save the file

## Step 7: Set Security Rules
1. Go to **Firestore Database** → **Rules** tab
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

## ✅ Done!

Now login with `admin` / `admin123` and your data will sync across all devices!

## Test It:
1. Login on Device 1
2. Add a menu item
3. Login on Device 2
4. See the same menu item! ✨

## Free Tier Limits (More than enough):
- 50,000 reads/day
- 20,000 writes/day  
- 1 GB storage
- 10 GB/month bandwidth

You'll use maybe 1% of this for billing system!

