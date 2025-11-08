// Firebase Service - Handles all Firebase operations
// Works with or without Firebase (falls back to localStorage)

let firebaseEnabled = false;
let db = null;
let auth = null;

// Check if Firebase is configured
function initFirebase() {
    try {
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            firebaseEnabled = true;
            db = firebase.firestore();
            auth = firebase.auth();
            console.log('Firebase initialized successfully');
            return true;
        }
    } catch (error) {
        console.log('Firebase not configured, using localStorage');
        firebaseEnabled = false;
    }
    return false;
}

// Initialize on load
initFirebase();

// ==================== AUTHENTICATION ====================

// User credentials mapping
const USER_CREDENTIALS = {
    'admin': 'CTC2023',
    'CTCUSER1': 'CTC123',
    'CTCUSER2': 'CTC1234'
};

// Check if user is admin
function isAdmin(username) {
    return username === 'admin';
}

async function firebaseLogin(username, password) {
    // Validate credentials
    if (!USER_CREDENTIALS[username] || USER_CREDENTIALS[username] !== password) {
        return { success: false, error: 'Invalid username or password' };
    }
    
    if (!firebaseEnabled) {
        // Fallback to local auth
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userRole', isAdmin(username) ? 'admin' : 'user');
        return { success: true };
    }

    try {
        // Use Firebase Auth with email
        const email = `${username}@ctcbilling.com`; // Convert username to email
        await auth.signInWithEmailAndPassword(email, password);
        
        // Store user info
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userRole', isAdmin(username) ? 'admin' : 'user');
        localStorage.setItem('firebaseUserId', auth.currentUser.uid);
        
        return { success: true };
    } catch (error) {
        // If user doesn't exist, create it (first time setup)
        if (error.code === 'auth/user-not-found') {
            try {
                const email = `${username}@ctcbilling.com`;
                await auth.createUserWithEmailAndPassword(email, password);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('userRole', isAdmin(username) ? 'admin' : 'user');
                localStorage.setItem('firebaseUserId', auth.currentUser.uid);
                
                // Initialize default data only for admin
                if (isAdmin(username)) {
                    await initializeFirebaseData();
                }
                
                return { success: true };
            } catch (createError) {
                return { success: false, error: createError.message };
            }
        }
        return { success: false, error: error.message };
    }
}

function firebaseLogout() {
    if (firebaseEnabled && auth) {
        auth.signOut();
    }
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('firebaseUserId');
}

function checkFirebaseAuth() {
    if (!firebaseEnabled) {
        return localStorage.getItem('isLoggedIn') === 'true';
    }
    
    return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

// ==================== DATA SYNC ====================

async function initializeFirebaseData() {
    if (!firebaseEnabled) return;
    
    // Check if data exists in shared collection
    const menuDoc = await db.collection('shared').doc('menuItems').get();
    const settingsDoc = await db.collection('shared').doc('settings').get();
    
    if (!menuDoc.exists) {
        // Initialize default menu in shared collection
        const defaultMenu = [
            { id: 1, name: 'Court 1', category: 'Badminton', price: 300 },
            { id: 2, name: 'Court 2', category: 'Badminton', price: 300 },
            { id: 11, name: 'Court 3', category: 'Badminton', price: 300 },
            { id: 12, name: 'Court 4', category: 'Badminton', price: 300 },
            { id: 3, name: 'Racket Rent', category: 'Badminton', price: 50 },
            { id: 4, name: 'Shoe Rent', category: 'Badminton', price: 50 },
            { id: 7, name: 'Ball', category: 'Cricket', price: 100 },
            { id: 8, name: 'Water Bottle', category: 'Beverages', price: 10 },
            { id: 9, name: 'Juice', category: 'Beverages', price: 10 },
            { id: 10, name: 'Badham Milk', category: 'Beverages', price: 10 },
            { id: 13, name: 'Court 1', category: 'Pickleball', price: 300 },
            { id: 14, name: 'Court 2', category: 'Pickleball', price: 300 }
        ];
        await db.collection('shared').doc('menuItems').set({ 
            items: defaultMenu,
            lastUpdated: new Date().toISOString(),
            updatedBy: localStorage.getItem('username') || 'admin'
        });
    }
    
    if (!settingsDoc.exists) {
        await db.collection('shared').doc('settings').set({
            upiId: 'EZE0323912@CUB',
            merchantName: 'CTC Sports Club',
            qrImagePath: './images/CTC SPORTS ARENA-QRCode.png',
            lastUpdated: new Date().toISOString(),
            updatedBy: localStorage.getItem('username') || 'admin'
        });
    }
}

// Menu Items - Using shared collection for all users
async function loadMenuItemsFromFirebase() {
    if (!firebaseEnabled) {
        const stored = localStorage.getItem('menuItems');
        return stored ? JSON.parse(stored) : [];
    }
    
    try {
        // Use shared collection instead of user-specific
        const doc = await db.collection('shared').doc('menuItems').get();
        if (doc.exists) {
            const items = doc.data().items || [];
            // Also update localStorage for immediate access
            localStorage.setItem('menuItems', JSON.stringify(items));
            return items;
        }
    } catch (error) {
        console.error('Error loading menu items:', error);
    }
    return [];
}

async function saveMenuItemsToFirebase(items) {
    // Save to localStorage first (for immediate use)
    localStorage.setItem('menuItems', JSON.stringify(items));
    
    if (!firebaseEnabled) return;
    
    try {
        // Use shared collection instead of user-specific
        await db.collection('shared').doc('menuItems').set({ 
            items,
            lastUpdated: new Date().toISOString(),
            updatedBy: localStorage.getItem('username') || 'Unknown'
        });
    } catch (error) {
        console.error('Error saving menu items:', error);
    }
}

// Settings - Using shared collection for all users
async function loadSettingsFromFirebase() {
    if (!firebaseEnabled) {
        const stored = localStorage.getItem('settings');
        return stored ? JSON.parse(stored) : {
            upiId: 'EZE0323912@CUB',
            merchantName: 'CTC Sports Club',
            qrImagePath: './images/CTC SPORTS ARENA-QRCode.png'
        };
    }
    
    try {
        // Use shared collection instead of user-specific
        const doc = await db.collection('shared').doc('settings').get();
        if (doc.exists) {
            const settings = doc.data();
            // Also update localStorage for immediate access
            localStorage.setItem('settings', JSON.stringify(settings));
            return settings;
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
    
    return {
        upiId: 'EZE0323912@CUB',
        merchantName: 'CTC Sports Club',
        qrImagePath: './images/CTC SPORTS ARENA-QRCode.png'
    };
}

async function saveSettingsToFirebase(settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
    
    if (!firebaseEnabled) return;
    
    try {
        // Use shared collection instead of user-specific
        await db.collection('shared').doc('settings').set({
            ...settings,
            lastUpdated: new Date().toISOString(),
            updatedBy: localStorage.getItem('username') || 'Unknown'
        });
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

// Transactions - Using shared collection for all users
async function loadTransactionsFromFirebase() {
    if (!firebaseEnabled) {
        const stored = localStorage.getItem('transactions');
        return stored ? JSON.parse(stored) : [];
    }
    
    try {
        // Use shared collection instead of user-specific
        const snapshot = await db.collection('shared').doc('transactions').collection('all').orderBy('date', 'desc').get();
        const transactions = snapshot.docs.map(doc => doc.data());
        // Also update localStorage for immediate access
        localStorage.setItem('transactions', JSON.stringify(transactions));
        return transactions;
    } catch (error) {
        console.error('Error loading transactions:', error);
    }
    return [];
}

async function saveTransactionToFirebase(transaction) {
    // Save to localStorage first
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    if (!firebaseEnabled) return;
    
    try {
        // Use shared collection instead of user-specific
        await db.collection('shared').doc('transactions').collection('all').doc(String(transaction.id)).set(transaction);
    } catch (error) {
        console.error('Error saving transaction:', error);
    }
}

// Real-time sync listeners - Using shared collections
function setupRealtimeSync() {
    if (!firebaseEnabled) return;
    
    // Sync menu items from shared collection
    db.collection('shared').doc('menuItems')
        .onSnapshot((doc) => {
            if (doc.exists) {
                const items = doc.data().items || [];
                localStorage.setItem('menuItems', JSON.stringify(items));
                // Trigger update if menu is loaded
                if (typeof renderMenu === 'function') {
                    if (typeof loadMenuItems === 'function') {
                        loadMenuItems().then(() => {
                            if (typeof renderMenu === 'function') {
                                renderMenu();
                            }
                        }).catch(err => {
                            console.error('Error loading menu items:', err);
                            if (typeof renderMenu === 'function') {
                                renderMenu();
                            }
                        });
                    } else {
                        renderMenu();
                    }
                }
            }
        });
    
    // Sync settings from shared collection
    db.collection('shared').doc('settings')
        .onSnapshot((doc) => {
            if (doc.exists) {
                const settings = doc.data();
                localStorage.setItem('settings', JSON.stringify(settings));
            }
        });
    
    // Sync transactions from shared collection
    db.collection('shared').doc('transactions').collection('all')
        .orderBy('date', 'desc')
        .onSnapshot((snapshot) => {
            const transactions = snapshot.docs.map(doc => doc.data());
            localStorage.setItem('transactions', JSON.stringify(transactions));
            // Trigger update if report is loaded
            if (typeof loadTransactions === 'function') {
                loadTransactions();
            }
        });
}

// Export functions
window.firebaseService = {
    initFirebase,
    firebaseLogin,
    firebaseLogout,
    checkFirebaseAuth,
    initializeFirebaseData,
    loadMenuItemsFromFirebase,
    saveMenuItemsToFirebase,
    loadSettingsFromFirebase,
    saveSettingsToFirebase,
    loadTransactionsFromFirebase,
    saveTransactionToFirebase,
    setupRealtimeSync,
    isEnabled: () => firebaseEnabled,
    isAdmin: (username) => isAdmin(username),
    getCurrentUser: () => localStorage.getItem('username'),
    getCurrentUserRole: () => localStorage.getItem('userRole') || 'user'
};

