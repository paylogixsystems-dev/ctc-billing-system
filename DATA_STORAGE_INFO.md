# Data Storage Information

## ✅ What is Stored in localStorage:

All data is stored **ONLY in browser localStorage** - no server, no database, no cloud storage.

### 1. **Transactions Data** (localStorage key: `transactions`)
   - All sales transactions
   - Bill details (items, quantities, totals, dates)
   - Used to generate sales reports
   - **This is the source data for Excel exports**

### 2. **Menu Items** (localStorage key: `menuItems`)
   - All menu items (Badminton, Cricket, Beverages)
   - Item names, prices, categories, images
   - Used for billing interface

### 3. **Settings** (localStorage key: `settings`)
   - Merchant Name
   - UPI ID
   - QR Code Image Path (optional)

### 4. **Cart** (localStorage key: `cart`)
   - Current shopping cart items
   - Temporary until payment is completed

### 5. **Login Status** (localStorage key: `isLoggedIn`)
   - Authentication status
   - Username

## 📊 Excel Files - NOT Stored in localStorage

**Important:** Excel files are **NOT stored** in localStorage. Here's how it works:

1. **Source Data:** All transaction data is stored in localStorage
2. **Excel Generation:** When you click "Export to Excel", the system:
   - Reads data from localStorage
   - Generates Excel file on-the-fly using SheetJS library
   - Downloads the file to your computer's Downloads folder
   - The Excel file is saved on your computer, NOT in the browser

### Excel File Location:
- Downloads to your computer (usually `Downloads` folder)
- Filename format: `Sales_Report_Jan_2024.xlsx` (or similar)
- You can save, email, or backup these files manually

## 🔒 Data Persistence:

- **Browser-only:** All data stays in your browser
- **Clearing browser data will delete everything** (transactions, menu, settings)
- **No backup by default** - you need to export Excel files to backup
- **Different browsers = different data** (Chrome, Firefox, Edge each have separate localStorage)

## 💾 Backup Recommendations:

1. **Regular Excel Exports:** Export sales reports regularly to backup transaction data
2. **Menu Backup:** Take screenshots or note down menu items (or export if we add that feature)
3. **Settings Backup:** Note down your UPI ID and settings

## 📝 Summary:

- ✅ **Transactions:** localStorage only
- ✅ **Menu Items:** localStorage only  
- ✅ **Settings:** localStorage only
- ❌ **Excel Files:** Downloaded to your computer (NOT in localStorage)
- ✅ **Excel Source Data:** Comes from localStorage

The Excel export is just a **download** - it reads from localStorage and creates a file on your computer.

