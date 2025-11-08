# Payment Setup Guide

## How Payment Works

The PayNow button generates a UPI QR code that customers can scan to make payments.

### Setup Steps:

1. **Configure UPI ID:**
   - Go to "Manage Menu" page
   - Scroll to "Settings" section
   - Enter your UPI ID (e.g., `yourname@paytm`, `yourname@ybl`, etc.)
   - Enter your Merchant Name
   - Click "Save Settings"

2. **Using PayNow:**
   - Add items to cart
   - Click "PayNow" button
   - A QR code will appear with your UPI ID
   - Customer scans the QR code with their UPI app (PhonePe, Google Pay, Paytm, etc.)
   - Customer enters the amount and pays
   - After payment, click "Complete Payment" to save the transaction

### Troubleshooting PayNow Button:

If the PayNow button is not working:

1. **Check Browser Console:**
   - Press F12 to open Developer Tools
   - Check Console tab for errors
   - Look for "QRCode library" messages

2. **Verify QRCode Library:**
   - The library loads from CDN: `https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js`
   - If you see "QRCode library failed to load", check your internet connection
   - Try refreshing the page

3. **Check Cart:**
   - Make sure cart is not empty
   - Add at least one item before clicking PayNow

4. **Check Settings:**
   - Ensure UPI ID is configured in Menu Management
   - Default UPI ID is `merchant@upi` (change this to your actual UPI ID)

### Payment Flow:

```
Customer adds items → Click PayNow → QR Code appears → 
Customer scans QR → Pays via UPI app → Click "Complete Payment" → 
Transaction saved → Cart cleared
```

### Notes:

- The QR code contains a UPI payment link with:
  - Your UPI ID (pa parameter)
  - Merchant Name (pn parameter)
  - Amount (am parameter)
  - Currency: INR (cu parameter)

- The payment is **static** - the QR code shows the amount but customer must manually enter it in their UPI app

- All transactions are saved in browser localStorage and can be viewed in Sales Report

- To export transactions, go to Sales Report and click "Export to Excel"

