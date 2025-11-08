# CTC Sports Club Billing System - Features

## ✅ Completed Features

### 1. Login System
- **Username**: `admin`
- **Password**: `admin123`
- Logout button available on all pages
- Session management using localStorage

### 2. Sports Selection Page
- Choose from 3 sports:
  - **Badminton** - Court booking, equipment rental & beverages
  - **Cricket** - Equipment rental & beverages
  - **Pickleball** - Court booking, equipment rental & beverages
- Beautiful card-based interface with online images
- Redirects to billing page after selection

### 3. Billing Interface

#### Badminton Pricing (Updated):
- **Court 1, 2, 3, 4**: ₹300 each
- **Racket Rent**: ₹50
- **Shoe Rent**: ₹50

#### Beverages Pricing (Updated):
- **Juice**: ₹10
- **Water Bottle**: ₹10

#### Booking Methods:
- **Online** - For online bookings
- **Offline** - For offline bookings
- **Walk-in** - For walk-in customers (default)

#### Features:
- Add items to cart by clicking
- Adjust quantities with +/- buttons
- Remove items from cart
- Clear entire cart
- Real-time total calculation
- Category tabs: Badminton, Cricket, Pickleball, Beverages

### 4. Payment System (PayNow)
- Static QR code display
- UPI ID display
- Payment amount shown
- "Mark Payment Completed" button
- Saves transaction to sales report
- Clears cart after payment

### 5. Print Bill
- Professional bill format
- Includes:
  - Merchant name
  - Bill number
  - Date & time
  - Sport type
  - Booking method
  - Itemized list with quantities
  - Grand total
- Print-ready format

### 6. Menu Management (CRUD Operations)
- **Create**: Add new menu items
- **Read**: View all menu items in dropdown/list
- **Update**: Edit existing items
- **Delete**: Remove items
- Categories: Badminton, Cricket, Pickleball, Beverages
- Settings:
  - Merchant name
  - UPI ID
  - QR Code image path (optional)

### 7. Monthly Sales Report
- View all transactions
- Filter by:
  - Date range (from/to)
  - Month
  - Year
  - Item name
- Summary cards:
  - Total Revenue
  - Total Transactions
  - Average Order Value
- Transaction details table with:
  - Date & Time
  - Bill No
  - Sport
  - Booking Method
  - Items
  - Total
- Item-wise sales breakdown
- **Excel Export** (.xlsx format)
  - Includes summary, transactions, and item breakdown
  - Auto-named based on filters

## Technical Details

### Data Storage
- All data stored in browser localStorage
- No backend required
- Data persists across sessions

### Images
- All images loaded from online sources (Unsplash)
- Fallback placeholder images if online images fail
- Ready for hosting

### Browser Compatibility
- Works on all modern browsers
- Responsive design for mobile and desktop
- No external dependencies except CDN libraries

## File Structure

```
├── login.html              # Login page
├── sports-selection.html   # Sports selection page
├── index.html              # Main billing page
├── menu-manager.html       # Menu management page
├── sales-report.html       # Sales report page
├── script.js               # Main JavaScript logic
├── styles.css              # Styling
└── README.md               # Documentation
```

## Usage Flow

1. **Login** → Enter admin/admin123
2. **Choose Sport** → Select Badminton, Cricket, or Pickleball
3. **Billing** → 
   - Select booking method (Online/Offline/Walk-in)
   - Add items to cart
   - Click "PayNow" for payment
   - Click "Print Bill" to print
4. **Manage Menu** → Add/Edit/Delete items
5. **Sales Report** → View transactions and export to Excel

## Notes

- All prices are in Indian Rupees (₹)
- QR code can be static image or dynamically generated
- Bills are numbered sequentially (BILL-0001, BILL-0002, etc.)
- Transactions are saved with sport type and booking method
- Excel reports include all transaction details

