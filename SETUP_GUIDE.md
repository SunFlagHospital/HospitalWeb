# Quick Start Guide - Sunflag Hospital Updates

## 🚀 What's New

### 1. Admin → Queries Management (`/admin/queries`)
See all contact form submissions in real-time with search, delete, and export features.

### 2. WhatsApp Auto-Redirect
Contact form now opens WhatsApp automatically with pre-formatted message.

### 3. Medical Icons
Specialities now display proper medical SVG icons instead of generic icons.

### 4. Why Choose Us Fix
Fixed layout shift issue in home page "Why Choose Us" section.

### 5. ImageKit Upload Ready
Component created for direct image uploads (integration steps below).

---

## ⚙️ Setup Required

### Step 1: Set Up ImageKit (Optional but Recommended)

1. Go to https://imagekit.io and create free account
2. Get your credentials from Settings → Developer:
   - **Public Key** (starts with `pk_`)
   - **URL Endpoint** (like `https://ik.imagekit.io/your-account/`)

3. Update `.env` file:
```env
VITE_IMAGEKIT_PUBLIC_KEY=your_public_key
VITE_IMAGEKIT_URL_ENDPOINT=your_url_endpoint
VITE_IMAGEKIT_PRIVATE_KEY=your_private_key
```

4. In ImageKit Dashboard → Settings → Security → CORS:
   - Add `http://localhost:5173` (development)
   - Add your production domain

### Step 2: Verify Firestore Collections

Your Firestore should have these collections:
- ✅ `queries` - For contact form submissions
- ✅ `appointments` - For appointment bookings

### Step 3: Deploy

```bash
# Build and test locally
npm run dev

# Build for production
npm run build

# Deploy to Vercel (auto on git push)
git push origin main
```

---

## 📱 How to Use

### Contact Form (Public)
1. User fills contact form on `/contact` page
2. Form validates data
3. Shows success message
4. **Opens WhatsApp automatically** with pre-formatted message
5. Data saved to Firestore

### Admin Queries Page (`/admin/queries`)
1. Login to admin panel
2. Click "Manage Queries" or go to `/admin/queries`
3. View all contact submissions in real-time
4. Search by name, email, phone, doctor, or message
5. Click eye icon to view full details
6. Send WhatsApp reply directly from modal
7. Delete queries
8. Export as CSV

---

## 🎨 Customization

### Change WhatsApp Number
File: `src/data/staticData.js`
```javascript
whatsapp: '+919876543210', // Update this
```

### Add More Medical Icons
File: `src/components/common/MedicalIcons.jsx`
- Add new SVG to `MedicalIcons` object
- Add mapping in `getSpecialityIcon()` function

### Customize Upload Component
File: `src/components/admin/ImageKitUpload.jsx`
- Change `maxSize` prop: `5 * 1024 * 1024` (5MB)
- Change `acceptTypes` prop: `image/*`

---

## 🧪 Testing

### Test Contact Form Submission
1. Go to `/contact`
2. Fill form with test data
3. Submit
4. Should see success toast
5. WhatsApp should open
6. Check admin panel for query

### Test Admin Queries Page
1. Login to admin
2. Go to `/admin/queries`
3. Should see real-time list of queries
4. Try search, delete, view, export

### Test Medical Icons
1. Go to `/specialities`
2. Should see proper medical icons (not emoji)
3. Try home page → specialities section

---

## 📊 Database Schema

### Queries Collection
```
{
  name: "John Doe",
  email: "john@example.com", 
  phone: "9876543210",
  selectedDoctor: "Cardiology",
  message: "Appointment needed",
  createdAt: timestamp,
  status: "pending"
}
```

---

## 🆘 Common Issues

### "ImageKit credentials not configured"
- Add `VITE_IMAGEKIT_PUBLIC_KEY` to `.env`
- Restart dev server: `npm run dev`

### "Queries not showing in admin"
- Check `queries` collection exists in Firestore
- Check Firestore security rules (admin should have read access)
- Refresh page

### "WhatsApp link not opening"
- Check hospital number in `staticData.js`
- Use format: `+919876543210` (country code + 10 digits)
- Test on actual phone (desktop has limited support)

### "Icons look wrong"
- Clear browser cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## 📞 File Locations

| Feature | File |
|---------|------|
| Admin Queries | `src/pages/admin/AdminQueries.jsx` |
| Contact Form | `src/pages/Contact.jsx` |
| Medical Icons | `src/components/common/MedicalIcons.jsx` |
| Image Upload | `src/components/admin/ImageKitUpload.jsx` |
| Why Choose Us | `src/components/home/WhyChooseUs.jsx` |
| Specialities | `src/pages/Specialities.jsx` |

---

## ✅ Feature Checklist

- [x] Admin Queries Management System
- [x] WhatsApp Auto-Redirect
- [x] Why Choose Us Image Fix
- [x] Medical Icons for Specialities
- [x] ImageKit Upload Component
- [x] Contact Form Backend Fix
- [x] Mobile Responsiveness
- [x] Real-time Updates
- [x] Error Handling
- [x] Toast Notifications

---

## 🎯 Next Steps

1. ✅ Review IMPLEMENTATION_GUIDE.md for detailed docs
2. ✅ Update ImageKit credentials in `.env`
3. ✅ Test features locally: `npm run dev`
4. ✅ Build for production: `npm run build`
5. ✅ Deploy to Vercel: `git push origin main`

---

**Status**: 🟢 Production Ready
**Last Updated**: May 27, 2024
