# GitHub Pages Fix - Troubleshooting Guide

## 🔧 **Common Issues After GitHub Deployment**

### **Issue 1: File Paths Not Working**

**Problem:** Files not loading (CSS, JavaScript, images)

**Solution:** Update all file paths to use relative paths (`./`) or absolute paths

**Fix:**
- Change `href="styles.css"` to `href="./styles.css"`
- Change `src="script.js"` to `src="./script.js"`
- Change `href="login.html"` to `href="./login.html"`

---

### **Issue 2: JavaScript Redirects Not Working**

**Problem:** Page redirects fail (404 errors)

**Solution:** Update JavaScript redirects to use relative paths

**Fix:**
- Change `window.location.href = 'login.html'` to `window.location.href = './login.html'`
- Or use absolute paths: `window.location.href = '/repository-name/login.html'`

---

### **Issue 3: Firebase/Supabase Not Working**

**Problem:** Real-time sync not working

**Solution:** Check Firebase/Supabase configuration

**Fix:**
1. Make sure `firebase-config.js` has correct API keys
2. Check browser console for errors (F12)
3. Verify Firebase/Supabase project is active

---

### **Issue 4: Images Not Loading**

**Problem:** Images not showing

**Solution:** Update image paths

**Fix:**
- Change `src="images/sports/badminton.jpg"` to `src="./images/sports/badminton.jpg"`
- Or use absolute paths: `src="/repository-name/images/sports/badminton.jpg"`

---

## 🚀 **Quick Fix Steps**

### **Step 1: Check Browser Console**

1. Open your GitHub Pages URL
2. Press **F12** (Developer Tools)
3. Check **Console** tab for errors
4. Check **Network** tab for failed requests

### **Step 2: Update File Paths**

Update all HTML files to use relative paths:

**Before:**
```html
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>
<a href="login.html">Login</a>
```

**After:**
```html
<link rel="stylesheet" href="./styles.css">
<script src="./script.js"></script>
<a href="./login.html">Login</a>
```

### **Step 3: Update JavaScript Redirects**

Update all JavaScript redirects:

**Before:**
```javascript
window.location.href = 'login.html';
```

**After:**
```javascript
window.location.href = './login.html';
```

### **Step 4: Test Again**

1. Push updated files to GitHub
2. Wait 1-2 minutes
3. Visit your GitHub Pages URL
4. Test all functions

---

## 📝 **Files to Update**

Update these files:
- ✅ `login.html`
- ✅ `index.html`
- ✅ `sports-selection.html`
- ✅ `court-selection.html`
- ✅ `equipment-selection.html`
- ✅ `beverages-selection.html`
- ✅ `payment-review.html`
- ✅ `sales-report.html`
- ✅ `menu-manager.html`
- ✅ `script.js`
- ✅ `firebase-service.js`

---

## 🔍 **Check These:**

1. ✅ All file paths use `./` prefix
2. ✅ All JavaScript redirects use `./` prefix
3. ✅ All image paths use `./` prefix
4. ✅ Firebase/Supabase config is correct
5. ✅ All files are uploaded to GitHub
6. ✅ GitHub Pages is enabled

---

## 💡 **Quick Test:**

1. Visit: `https://YOUR_USERNAME.github.io/REPOSITORY_NAME/`
2. Open browser console (F12)
3. Check for errors
4. Test login
5. Test all functions

---

**I'll fix all file paths now!** 🚀

