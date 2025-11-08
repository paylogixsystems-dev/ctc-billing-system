# Images Folder Structure

## Required Folder Structure

Create these folders and place your images here:

```
images/
├── sports/
│   ├── badminton.jpg      (600x400 recommended)
│   ├── cricket.jpg        (600x400 recommended)
│   └── pickleball.jpg     (600x400 recommended)
│
├── badminton/
│   ├── court1.jpg         (400x300 recommended)
│   ├── court2.jpg         (400x300 recommended)
│   ├── court3.jpg         (400x300 recommended)
│   ├── court4.jpg         (400x300 recommended)
│   ├── racket.jpg         (400x300 recommended)
│   └── shoes.jpg          (400x300 recommended)
│
├── cricket/
│   └── ball.jpg           (400x300 recommended)
│
├── pickleball/
│   ├── court1.jpg         (400x300 recommended)
│   └── court2.jpg         (400x300 recommended)
│
└── beverages/
    ├── water-bottle.jpg   (400x300 recommended)
    └── juice.jpg          (400x300 recommended)
```

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: 
  - Sports selection: 600x400 pixels (or similar ratio)
  - Menu items: 400x300 pixels (or similar ratio)
- **File Names**: Must match exactly (case-sensitive)
- **File Extensions**: .jpg, .png, or .webp

## How to Add Images

1. **Download or take photos** of your items
2. **Resize images** to recommended sizes (optional but recommended)
3. **Rename files** to match the exact names above
4. **Place files** in the correct folders
5. **Test** by opening the website

## Placeholder Images

If an image is missing, the system will automatically show a placeholder with the item name. This ensures the website works even if some images are missing.

## After Deployment

When you deploy your website:
1. **Upload the entire `images/` folder** to your hosting
2. **Keep the same folder structure**
3. **All images will work automatically**
4. **All functions (billing, reports, etc.) work independently of images**

## Notes

- Images are loaded from local paths, so they work offline
- No internet connection needed for images after deployment
- All billing functions, reports, and Excel exports work perfectly with or without images
- You can add more images later through Menu Management
