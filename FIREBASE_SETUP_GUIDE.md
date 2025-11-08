# Firebase Setup Guide - Free Data Sync Across Devices

## Why Firebase?
- **100% FREE** for small apps (50K reads/day, 20K writes/day)
- Real-time data sync across all devices
- No backend code needed
- Secure authentication
- Easy to set up

## Step 1: Create Firebase Project (5 minutes)

1. Go to https://console.firebase.google.com/
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `CTC-Billing-System` (or any name)
4. Click **"Continue"**
5. **Disable Google Analytics** (optional, to keep it simple)
6. Click **"Create project"**
7. Wait for project creation, then click **"Continue"**

## Step 2: Enable Firestore Database

1. In Firebase Console, click **"Firestore Database"** in left menu
2. Click **"Create database"**
3. Select **"Start in test mode"** (for now)
4. Choose a location (closest to you, e.g., `asia-south1` for India)
5. Click **"Enable"**

## Step 3: Get Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click **Web icon** `</>` 
5. Register app name: `CTC Billing Web`
6. Click **"Register app"**
7. **Copy the config object** that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 4: Update Your Website

1. Open `firebase-config.js` file (will be created)
2. Paste your Firebase config
3. Save the file
4. That's it! Your data will now sync across all devices

## Step 5: Set Up Security Rules (Important!)

1. In Firebase Console, go to **Firestore Database**
2. Click **"Rules"** tab
3. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

4. Click **"Publish"**

## Step 6: Enable Authentication

1. In Firebase Console, click **"Authentication"** in left menu
2. Click **"Get started"**
3. Click **"Sign-in method"** tab
4. Click **"Email/Password"**
5. **Enable** it
6. Click **"Save"**

## That's It!

Now when anyone logs in with `admin` / `admin123`, their data will sync in real-time across all devices!

## Free Tier Limits (More than enough for billing system):
- **50,000 reads per day** (you'll use ~100-500/day)
- **20,000 writes per day** (you'll use ~50-200/day)
- **1 GB storage** (you'll use ~1-10 MB)
- **10 GB/month bandwidth** (plenty for billing data)

## Troubleshooting

### Data not syncing?
- Check browser console (F12) for errors
- Make sure Firebase config is correct
- Verify Firestore is enabled
- Check internet connection

### Can't login?
- Make sure Authentication is enabled
- Check that email/password sign-in is enabled
- Verify security rules allow authenticated users

### Need help?
- Firebase Docs: https://firebase.google.com/docs
- Support: Check browser console for error messages

