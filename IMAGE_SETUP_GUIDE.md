# Image Setup Guide - Using Local Images

## Step 1: Create Image Folders

Create these folders in your project directory:

```
CTC Billing/
├── images/
│   ├── sports/
│   │   ├── badminton.jpg
│   │   ├── cricket.jpg
│   │   └── pickleball.jpg
│   ├── badminton/
│   │   ├── court1.jpg
│   │   ├── court2.jpg
│   │   ├── court3.jpg
│   │   ├── court4.jpg
│   │   ├── racket.jpg
│   │   └── shoes.jpg
│   ├── cricket/
│   │   └── ball.jpg
│   ├── pickleball/
│   │   ├── court1.jpg
│   │   └── court2.jpg
│   └── beverages/
│       ├── juice.jpg
│       └── water-bottle.jpg
```

## Step 2: Download Images

Download images from online or use your own photos. Recommended sizes:
- Sports selection images: 600x400 pixels
- Menu item images: 400x300 pixels
- QR code: 200x200 pixels (square)

## Step 3: Name Your Images

Use these exact names (case-sensitive):

**Sports Selection:**
- `images/sports/badminton.jpg`
- `images/sports/cricket.jpg`
- `images/sports/pickleball.jpg`

**Badminton:**
- `images/badminton/court1.jpg`
- `images/badminton/court2.jpg`
- `images/badminton/court3.jpg`
- `images/badminton/court4.jpg`
- `images/badminton/racket.jpg`
- `images/badminton/shoes.jpg`

**Cricket:**
- `images/cricket/ball.jpg`

**Pickleball:**
- `images/pickleball/court1.jpg`
- `images/pickleball/court2.jpg`

**Beverages:**
- `images/beverages/juice.jpg`
- `images/beverages/water-bottle.jpg`

**QR Code (optional):**
- `images/qr-code.png` or `images/qr-code.jpg`

## Step 4: Image Paths Are Already Updated!

The code has been updated to use local images. Just place your images in the folders above and they'll work automatically.

## Step 5: Testing

1. Place one test image: `images/sports/badminton.jpg`
2. Open `sports-selection.html` in browser
3. If image shows, it's working! ✅
4. If not, check:
   - File name matches exactly (case-sensitive)
   - File is in correct folder
   - File extension is correct (.jpg, .png, etc.)

## After Deployment

When you deploy to hosting (GitHub Pages, Netlify, etc.):
1. Upload ALL files including `images/` folder
2. Keep the same folder structure
3. All images will work automatically
4. All functions and reports will work perfectly!

## Troubleshooting

### Image not showing?
- Check browser console (F12) for errors
- Verify file path is correct
- Make sure image file exists
- Check file permissions

### After deployment images broken?
- Make sure you uploaded the `images/` folder
- Check folder structure matches exactly
- Verify file names are correct (case-sensitive)

## Notes

- Images are loaded from local paths, so they work offline
- No internet needed for images after deployment
- All functions (billing, reports, etc.) work independently of images
- Reports and Excel export work perfectly with or without images

