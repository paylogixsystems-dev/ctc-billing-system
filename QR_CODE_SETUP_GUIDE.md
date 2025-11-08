# How to Add Your UPI QR Code to the Website

## Method 1: Using Static QR Code Image (Recommended)

### Step 1: Generate Your QR Code
1. Go to any UPI QR code generator website:
   - https://upiqrcodegenerator.com/
   - https://www.qr-code-generator.com/
   - Or use your UPI app to generate QR code

2. Enter your UPI ID (e.g., `yourname@paytm`, `yourname@phonepe`, etc.)

3. Download the QR code image (PNG or JPG format)

### Step 2: Add QR Code to Website
1. **Option A: Place in images folder**
   - Create a folder named `images` in your website directory (if not exists)
   - Save your QR code image as `qr-code.png` or `qr-code.jpg`
   - Path will be: `images/qr-code.png`

2. **Option B: Use online hosting**
   - Upload your QR code to any image hosting service
   - Get the direct image URL

### Step 3: Configure in Menu Manager
1. Login to your website
2. Go to **"Manage Menu"** page
3. Scroll to **"Settings"** section
4. Enter your **UPI ID** in the "UPI ID" field (e.g., `yourname@paytm`)
5. Enter the **QR Code Image Path**:
   - If local: `images/qr-code.png`
   - If online: `https://your-image-url.com/qr-code.png`
6. Click **"Save Settings"**

### Step 4: Test
1. Go to billing page
2. Add items to cart
3. Click "PayNow" button
4. Your QR code should appear!

---

## Method 2: Using Dynamic QR Code Generation

If you don't have a static QR code image, the system will automatically generate one using your UPI ID.

### Steps:
1. Go to **"Manage Menu"** → **"Settings"**
2. Enter your **UPI ID** (e.g., `yourname@paytm`)
3. Leave **"QR Code Image Path"** empty
4. Click **"Save Settings"**

The system will automatically generate QR codes for each payment with the correct amount.

---

## Example UPI IDs Format:
- Paytm: `yourname@paytm`
- PhonePe: `yourname@ybl` or `yourname@phonepe`
- Google Pay: `yourname@okaxis` or `yourname@okhdfcbank`
- BHIM: `yourname@upi`

---

## Troubleshooting

### QR Code Not Showing?
1. Check if the image path is correct
2. Make sure the image file exists in the specified location
3. If using online URL, make sure it's accessible
4. Check browser console for errors (F12)

### QR Code Image Not Loading?
- Try using a different image format (PNG instead of JPG)
- Make sure file name has no spaces
- Use lowercase file names
- Check file permissions

### Want to Update QR Code?
- Just replace the image file with the same name, OR
- Update the path in Settings with new image location

---

## Quick Setup Checklist:
- [ ] Generated QR code image
- [ ] Saved QR code to `images/qr-code.png` (or uploaded online)
- [ ] Logged into website
- [ ] Went to "Manage Menu" → "Settings"
- [ ] Entered UPI ID
- [ ] Entered QR code image path
- [ ] Clicked "Save Settings"
- [ ] Tested by clicking "PayNow" button

---

**Note:** The QR code will be displayed when customers click "PayNow" button. They can scan it with any UPI app to make payment.

