# New Step-by-Step Billing Flow

## Complete Flow Overview

### 1. Choose Sport
- User selects: Badminton, Cricket, or Pickleball
- Redirects to Court Selection

### 2. Select Court (Badminton/Pickleball)
- Shows only courts for selected sport
- User selects court (Court 1, 2, 3, or 4)
- Court is added to cart
- Continue to Equipment

**Note:** If no courts available (like Cricket), automatically skips to Equipment

### 3. Equipment Selection
- Shows equipment for selected sport:
  - **Badminton**: Racket Rent, Shoe Rent
  - **Cricket**: Ball (or other equipment)
  - **Pickleball**: Equipment (if added)
- User can add quantities or skip
- Continue to Beverages

### 4. Beverages Selection (Common for All Sports)
- Shows all beverages:
  - Water Bottle - ₹10
  - Juice - ₹10
  - Badham Milk - ₹10
- System asks: "Any beverages?" (Optional)
- User can add quantities or skip
- Continue to Payment

### 5. Payment & Review
- Shows complete order summary:
  - Selected court
  - Equipment items
  - Beverages
  - Total amount
- Booking method selection (Online/Offline/Walk-in)
- PayNow button → Shows QR code
- Print Bill button → Prints bill
- After payment → Saves to sales report
- Returns to Sport Selection

## Benefits

✅ **Easy to track**: See exactly what was bought for each court
✅ **Clear flow**: Step-by-step process
✅ **Mobile friendly**: Works perfectly on mobile
✅ **Organized**: Court → Equipment → Beverages → Payment
✅ **Common beverages**: Same beverages for all sports
✅ **Flexible**: Can skip equipment or beverages

## Example Flow

**Badminton Booking:**
1. Choose Sport → Badminton
2. Select Court → Court 1 (₹300)
3. Equipment → Racket Rent × 1 (₹50), Shoe Rent × 1 (₹50)
4. Beverages → Juice × 2 (₹20)
5. Payment → Total: ₹420
6. PayNow → Customer pays
7. Print Bill → Shows all items
8. Done → Back to Sport Selection

## Bill Shows:
- Court: Court 1
- Racket Rent: 1 × ₹50
- Shoe Rent: 1 × ₹50
- Juice: 2 × ₹10
- **Total: ₹420**

## Mobile Experience

✅ All pages are mobile-responsive
✅ Touch-friendly buttons
✅ Easy scrolling
✅ Clear navigation
✅ Works on all screen sizes

## Adding Courts for Cricket/Pickleball

When you add courts for Cricket or Pickleball in Menu Management:
- They will automatically appear in Court Selection
- Flow works the same way
- Everything syncs in real-time (with Firebase)

