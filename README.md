# Badminton Billing System

A complete browser-based billing system for badminton and cricket facilities with menu management, cart functionality, payment QR codes, bill printing, and monthly sales reports.

## Features

- **Billing Interface**: Add items to cart, manage quantities, calculate totals
- **Menu Management**: Full CRUD operations for menu items
- **Payment**: Static UPI QR code for PayNow payments
- **Bill Printing**: Print formatted bills with itemized details
- **Sales Reports**: Monthly sales reports with Excel export
- **LocalStorage**: All data stored in browser (no backend required)

## Setup

1. Open `index.html` in a web browser
2. The system will automatically initialize with default menu items
3. All data is stored in browser localStorage

## Usage

### Billing
- Click on menu items to add them to cart
- Use quantity buttons to adjust quantities
- Click "PayNow" to show payment QR code
- Click "Print Bill" to print the current bill

### Menu Management
- Navigate to "Manage Menu" page
- Add/Edit/Delete menu items
- Configure merchant name and UPI ID in settings
- Set prices and image URLs for each item

### Sales Report
- View monthly sales reports
- Filter by month and year
- Export to Excel format (.xlsx)
- View item-wise sales breakdown

## Menu Categories

- **Badminton**: Court number, Racket rent, Shoe rent, Grip, Crock
- **Cricket**: Ball
- **Beverages**: Water bottle, Juice, Badham milk

## Image Setup

Place product images in the following structure:
```
images/
├── badminton/
│   ├── court1.jpg
│   ├── racket.jpg
│   └── ...
├── cricket/
│   └── ball.jpg
└── beverages/
    ├── water.jpg
    ├── juice.jpg
    └── badham.jpg
```

If images are not available, placeholder SVGs will be displayed automatically.

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- QRCode.js (for QR code generation)
- SheetJS (for Excel export)
- LocalStorage API

## Browser Compatibility

Works on all modern browsers that support:
- LocalStorage
- ES6 JavaScript
- CSS Grid

## Notes

- All data is stored locally in the browser
- Clearing browser data will remove all transactions
- UPI ID can be configured in Menu Management settings
- Default menu items are created on first load
# ctc-billing-system
