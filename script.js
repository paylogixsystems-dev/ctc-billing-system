// Check authentication
if (window.location.pathname !== '/login.html' && !window.location.pathname.includes('login.html')) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = './login.html';
    }
}

// Data Management
let menuItems = [];
let cart = [];
let currentCategory = 'Badminton';
let billCounter = 1;
let selectedSport = 'Badminton';
let bookingMethod = 'walkin'; // online, offline, walkin

// Initialize - Redirect to new flow if coming from old flow
document.addEventListener('DOMContentLoaded', async function() {
    await checkAuth();
    
    // Check if user is coming from old flow, redirect to new flow
    const selectedSport = localStorage.getItem('selectedSport');
    if (selectedSport && window.location.pathname.includes('index.html')) {
        // Redirect to new step-by-step flow
        window.location.href = './court-selection.html';
        return;
    }
    
    checkSportSelection();
    await loadMenuItems();
    await loadSettings();
    loadCart();
    loadSelectedSport();
    renderMenu();
    renderCart();
    setupEventListeners();
    await initializeDefaultMenu();
    
    // Setup real-time sync if Firebase is enabled
    if (window.firebaseService && firebaseService.isEnabled()) {
        firebaseService.setupRealtimeSync();
    }
});

// Check if sport is selected, redirect if not
function checkSportSelection() {
    const sport = localStorage.getItem('selectedSport');
    if (!sport) {
        window.location.href = './sports-selection.html';
    }
}

// Load selected sport
function loadSelectedSport() {
    selectedSport = localStorage.getItem('selectedSport') || 'Badminton';
    currentCategory = selectedSport;
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.dataset.category === selectedSport) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Load from localStorage
function loadMenuItems() {
    const stored = localStorage.getItem('menuItems');
    menuItems = stored ? JSON.parse(stored) : [];
}

function loadSettings() {
    const stored = localStorage.getItem('settings');
    const settings = stored ? JSON.parse(stored) : {
        upiId: 'merchant@upi',
        merchantName: 'CTC Sports Club',
        qrImagePath: '' // Optional: path to static QR code image
    };
    if (!stored) {
        localStorage.setItem('settings', JSON.stringify(settings));
    }
    // Ensure qrImagePath exists even if settings were created before
    if (!settings.qrImagePath) {
        settings.qrImagePath = '';
    }
    return settings;
}

function loadCart() {
    const stored = localStorage.getItem('cart');
    cart = stored ? JSON.parse(stored) : [];
}

function saveMenuItems() {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Initialize default menu if empty
async function initializeDefaultMenu() {
    if (menuItems.length === 0) {
        const defaultMenu = [
            // Badminton Courts - all 300
            { id: 1, name: 'Court 1', category: 'Badminton', price: 300 },
            { id: 2, name: 'Court 2', category: 'Badminton', price: 300 },
            { id: 11, name: 'Court 3', category: 'Badminton', price: 300 },
            { id: 12, name: 'Court 4', category: 'Badminton', price: 300 },
            // Badminton Equipment
            { id: 3, name: 'Racket Rent', category: 'Badminton', price: 50 },
            { id: 4, name: 'Shoe Rent', category: 'Badminton', price: 50 },
            // Cricket
            { id: 7, name: 'Ball', category: 'Cricket', price: 100 },
            // Beverages - updated prices
            { id: 8, name: 'Water Bottle', category: 'Beverages', price: 10 },
            { id: 9, name: 'Juice', category: 'Beverages', price: 10 },
            { id: 10, name: 'Badham Milk', category: 'Beverages', price: 10 },
            // Pickleball
            { id: 13, name: 'Court 1', category: 'Pickleball', price: 300 },
            { id: 14, name: 'Court 2', category: 'Pickleball', price: 300 }
        ];
        menuItems = defaultMenu;
        await saveMenuItems();
    }
}

// Render Menu
function renderMenu() {
    const menuContainer = document.getElementById('menuItems');
    if (!menuContainer) return; // Menu container not found (might be on different page)
    
    const filteredItems = menuItems.filter(item => item.category === currentCategory);
    
    if (filteredItems.length === 0) {
        menuContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No items in this category</p>';
        return;
    }
    
    menuContainer.innerHTML = filteredItems.map(item => `
        <div class="menu-item" onclick="addToCart(${item.id})">
            <h3>${item.name}</h3>
            <div class="price">₹${item.price}</div>
        </div>
    `).join('');
}

// Set booking method
function setBookingMethod(method) {
    bookingMethod = method;
}

// Category Tabs
function setupEventListeners() {
    // Set initial booking method
    const initialMethod = document.querySelector('input[name="bookingMethod"]:checked');
    if (initialMethod) {
        bookingMethod = initialMethod.value;
    }
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            renderMenu();
        });
    });
    
    document.getElementById('clearCart').addEventListener('click', clearCart);
    document.getElementById('payNowBtn').addEventListener('click', showPayNowModal);
    document.getElementById('printBillBtn').addEventListener('click', printBill);
    document.getElementById('completePayment').addEventListener('click', completePayment);
    
    // Modal close
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('payNowModal').style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('payNowModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Cart Functions
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(c => c.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }
    
    saveCart();
    renderCart();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    renderCart();
}

function updateQuantity(itemId, change) {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        saveCart();
        renderCart();
    }
}

function clearCart() {
    if (cart.length === 0) return;
    if (confirm('Are you sure you want to clear the cart?')) {
        cart = [];
        saveCart();
        renderCart();
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    const totalElement = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Cart is empty</p>';
        totalElement.textContent = '0';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = total.toFixed(2);
    
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="item-price">₹${item.price} × ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
            </div>
        </div>
    `).join('');
}

// PayNow Modal
function showPayNowModal() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    
    const settings = loadSettings();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Clear previous QR code
    const qrContainer = document.getElementById('qrCode');
    qrContainer.innerHTML = '';
    
    // Check if static QR image is configured in settings
    if (settings.qrImagePath && settings.qrImagePath.trim() !== '') {
        // Use static QR image
        const img = document.createElement('img');
        img.src = settings.qrImagePath;
        img.alt = 'Payment QR Code';
        img.style.width = '200px';
        img.style.height = '200px';
        img.style.border = '5px solid #f0f0f0';
        img.style.borderRadius = '10px';
        img.style.padding = '10px';
        img.onerror = function() {
            qrContainer.innerHTML = '<p style="color: red; padding: 20px;">QR Image not found. Please check the image path in settings.</p>';
        };
        qrContainer.appendChild(img);
    } else {
        // Generate QR code dynamically (fallback)
        if (typeof QRCode === 'undefined') {
            qrContainer.innerHTML = '<p style="color: orange; padding: 20px;">QR Code library not loaded. Please add a static QR image in Menu Management → Settings.</p>';
        } else {
            // Generate UPI payment string
            const upiString = `upi://pay?pa=${settings.upiId}&pn=${encodeURIComponent(settings.merchantName)}&am=${total.toFixed(2)}&cu=INR`;
            
            // Create canvas element
            const canvas = document.createElement('canvas');
            qrContainer.appendChild(canvas);
            
            // Generate QR code with error handling
            try {
                QRCode.toCanvas(canvas, upiString, {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                }, function (error) {
                    if (error) {
                        console.error('QR Code generation error:', error);
                        qrContainer.innerHTML = '<p style="color: red; padding: 20px;">QR Code generation failed. Please add a static QR image in settings.</p>';
                    } else {
                        console.log('QR Code generated successfully');
                    }
                });
            } catch (error) {
                console.error('Error generating QR code:', error);
                qrContainer.innerHTML = '<p style="color: red; padding: 20px;">Error: ' + error.message + '</p>';
            }
        }
    }
    
    document.getElementById('upiIdValue').textContent = settings.upiId;
    document.getElementById('paymentAmount').textContent = total.toFixed(2);
    document.getElementById('payNowModal').style.display = 'block';
}

async function completePayment() {
    if (cart.length === 0) return;
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Confirm payment completion
    if (!confirm(`Mark payment as completed?\n\nTotal Amount: ₹${total.toFixed(2)}\nBooking Method: ${bookingMethod}\n\nThis will save the transaction to Sales Report and Bill Report.`)) {
        return;
    }
    
    // Save transaction
    const transaction = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: [...cart],
        total: total,
        sport: selectedSport,
        bookingMethod: bookingMethod
    };
    
    // Save to Firebase or localStorage
    if (window.firebaseService && firebaseService.isEnabled()) {
        await firebaseService.saveTransactionToFirebase(transaction);
    } else {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    
    // Clear cart
    cart = [];
    saveCart();
    renderCart();
    
    // Close modal
    document.getElementById('payNowModal').style.display = 'none';
    
    // Show success message
    alert(`✅ Payment Completed Successfully!\n\nAmount: ₹${total.toFixed(2)}\nBill No: BILL-${String(transaction.id).slice(-4).padStart(4, '0')}\nBooking Method: ${bookingMethod}\n\n✅ Entry added to Sales Report\n✅ Entry added to Bill Report\n\nYou can view it in Sales Report page.`);
}

// Print Bill
function printBill() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    
    const settings = loadSettings();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const now = new Date();
    
    document.getElementById('billMerchantName').textContent = settings.merchantName;
    document.getElementById('billNumber').textContent = `BILL-${String(billCounter).padStart(4, '0')}`;
    document.getElementById('billDate').textContent = now.toLocaleString('en-IN');
    
    // Add booking method and sport to bill
    const billInfo = document.getElementById('billInfo');
    if (billInfo) {
        billInfo.innerHTML = `
            <p>Sport: <strong>${selectedSport}</strong></p>
            <p>Booking Method: <strong>${bookingMethod}</strong></p>
        `;
    }
    
    const billItemsHtml = cart.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price}</td>
            <td>₹${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');
    
    document.getElementById('billItems').innerHTML = billItemsHtml;
    document.getElementById('billTotal').textContent = total.toFixed(2);
    
    // Show print view and print
    const printView = document.getElementById('billPrintView');
    printView.style.display = 'block';
    
    window.print();
    
    setTimeout(() => {
        printView.style.display = 'none';
    }, 1000);
    
    billCounter++;
}

// Export functions for menu manager
function getMenuItems() {
    // Always get fresh data from localStorage
    const stored = localStorage.getItem('menuItems');
    menuItems = stored ? JSON.parse(stored) : [];
    return menuItems;
}

async function addMenuItem(item) {
    // Reload menu items first
    await loadMenuItems();
    
    const newItem = {
        id: Date.now(),
        ...item
    };
    menuItems.push(newItem);
    await saveMenuItems();
    
    // Only render menu if we're on the billing page
    if (document.getElementById('menuItems')) {
        renderMenu();
    }
}

async function updateMenuItem(id, updatedItem) {
    // Reload menu items first
    await loadMenuItems();
    
    const index = menuItems.findIndex(item => item.id === id);
    if (index !== -1) {
        menuItems[index] = { ...menuItems[index], ...updatedItem };
        await saveMenuItems();
        
        // Only render menu if we're on the billing page
        if (document.getElementById('menuItems')) {
            renderMenu();
        }
    } else {
        console.error('Item not found for update:', id);
    }
}

async function deleteMenuItem(id) {
    // Reload menu items first
    await loadMenuItems();
    
    const beforeCount = menuItems.length;
    menuItems = menuItems.filter(item => item.id !== id);
    
    if (menuItems.length < beforeCount) {
        await saveMenuItems();
        
        // Only render menu if we're on the billing page
        if (document.getElementById('menuItems')) {
            renderMenu();
        }
    } else {
        console.error('Item not found for deletion:', id);
    }
}

// Authentication functions
async function checkAuth() {
    if (window.firebaseService && firebaseService.isEnabled()) {
        const isAuth = await firebaseService.checkFirebaseAuth();
        if (!isAuth) {
            window.location.href = './login.html';
        }
    } else {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = './login.html';
        }
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        if (window.firebaseService && firebaseService.isEnabled()) {
            firebaseService.firebaseLogout();
        } else {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
        }
        window.location.href = './login.html';
    }
}
