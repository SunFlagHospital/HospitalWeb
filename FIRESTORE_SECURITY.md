# Firestore Security Rules & Implementation Guide

## Overview
This document covers all Firestore security rules and validations implemented for the Sunflag Hospital CMS system.

---

## 🔐 Firestore Security Rules

The complete security rules are defined in `firestore.rules` at the project root. Deploy them using:

```bash
firebase deploy --only firestore:rules
```

### Collections & Access Rules

#### 📖 **Public Collections (Read-Only for Public, Write by Admin Only)**

1. **doctors** - Doctor profiles
   - ✅ Public: READ access
   - ✅ Admin: WRITE access (CREATE, UPDATE, DELETE)

2. **services** - Hospital services
   - ✅ Public: READ access
   - ✅ Admin: WRITE access

3. **specialities** - Medical specialties
   - ✅ Public: READ access
   - ✅ Admin: WRITE access

4. **testimonials** - Patient testimonials
   - ✅ Public: READ access
   - ✅ Admin: WRITE access

5. **banners** - Page banners
   - ✅ Public: READ access
   - ✅ Admin: WRITE access

6. **gallery** - Image gallery
   - ✅ Public: READ access
   - ✅ Admin: WRITE access

7. **videos** - Video links
   - ✅ Public: READ access
   - ✅ Admin: WRITE access

8. **contactInfo** - Hospital contact information
   - ✅ Public: READ access
   - ✅ Admin: WRITE access

#### 💼 **Careers & Applications**

1. **careers** - Job listings
   - ✅ Public: READ access
   - ✅ Admin: WRITE access

2. **jobApplications** - Job applications (READ-ONLY)
   - ✅ Public: CREATE (submit applications)
   - ✅ Admin: READ, DELETE
   - ❌ No updates allowed (immutable records)
   - **Required Fields for CREATE:**
     - `fullName` (string)
     - `email` (string)
     - `phone` (string)
     - `position` (string)

#### 📞 **Appointments**

1. **appointments** - Appointment bookings
   - ✅ Public: CREATE
   - ✅ Admin: READ, DELETE
   - ❌ No updates allowed
   - **Required Fields for CREATE:**
     - `name` (string)
     - `email` (string)
     - `phone` (string)
     - `preferredDate` (timestamp)

#### 👤 **Admin Collection**

1. **admins** - Admin user records (Strictly Protected)
   - ✅ Only admins can READ/WRITE their own document
   - ❌ All other access denied

---

## ✅ Form Validations

### AdminVideos Form Validation

**Server-side validation in AdminVideos.jsx:**

```javascript
const validateForm = () => {
  const newErrors = {}

  // Section validation
  if (!formData.section || formData.section.trim() === '') {
    newErrors.section = 'Section is required'
  }

  // Video URL validation
  if (!formData.videoUrl || formData.videoUrl.trim() === '') {
    newErrors.videoUrl = 'YouTube URL is required'
  } else if (!isValidYouTubeUrl(formData.videoUrl)) {
    newErrors.videoUrl = 'Please enter a valid YouTube URL (youtube.com or youtu.be)'
  }

  // Title validation
  if (!formData.title || formData.title.trim() === '') {
    newErrors.title = 'Video title is required'
  } else if (formData.title.trim().length < 3) {
    newErrors.title = 'Title must be at least 3 characters long'
  }

  return newErrors
}
```

**Features:**
- Real-time error clearing when user starts typing
- Field-specific error messages
- YouTube URL pattern validation
- Minimum length validation for title

### AdminApplications Read-Only UI

Applications are now **read-only** in the admin panel:
- ✅ View application details
- ✅ Delete applications (if needed)
- ❌ No edit functionality
- ❌ No add new manually

This is correct since applications should come from the public career application form only.

---

## 🐛 Fixes Implemented

### 1. **Videos Loading Icon** ✅
- Fixed: The loading state properly stops after data is fetched
- Verified in `useAdminVideos()` hook with proper loading state management

### 2. **AdminApplications Read-Only** ✅
- Removed edit button
- Removed add new functionality
- Kept only delete button for admin cleanup
- Added better UI with email/phone links
- Added search functionality (name, email, position)

### 3. **Form Validations** ✅
- Added client-side validation before submission
- Field-specific error messages
- Real-time error clearing
- Better UX with error highlighting

---

## 📋 Firestore Rules Security Features

### Authentication Checks
```javascript
function isAuthenticated() {
  return request.auth != null;
}

function isAdmin() {
  return isAuthenticated() && 
         exists(/databases/{database}/documents/admins/{request.auth.uid});
}
```

### Collection Protection
- **Default deny** principle - all collections must be explicitly allowed
- **Admin verification** on every write operation
- **Field validation** for create operations (jobApplications, appointments)
- **Immutable records** for jobApplications and appointments (no updates)

---

## 🚀 Deployment Checklist

Before deploying to production:

1. **Deploy Firestore Rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Create Admin Collection** (Firebase Console)
   - Create collection: `admins`
   - Create document with admin UID
   - Document structure:
     ```json
     {
       "role": "admin",
       "createdAt": timestamp,
       "email": "admin@example.com"
     }
     ```

3. **Verify Collections Exist**
   - doctors, services, specialities
   - testimonials, banners, gallery, videos
   - careers, jobApplications
   - appointments, contactInfo
   - admins

4. **Test Rules** (Firebase Console Security Rules Simulator)
   - Test public read access
   - Test admin write access
   - Test application creation
   - Test unauthorized access denial

---

## 📝 API Reference

### Public Create (jobApplications)
```javascript
// This will succeed (public can create)
await addDoc(collection(db, 'jobApplications'), {
  fullName: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  position: 'Doctor',
  resumeLink: 'https://...',
  createdAt: serverTimestamp()
})
```

### Admin Operations (All Collections)
```javascript
// Admin can read
await getDocs(collection(db, 'doctors'))

// Admin can write
await addDoc(collection(db, 'doctors'), {...})
await updateDoc(doc(db, 'doctors', id), {...})
await deleteDoc(doc(db, 'doctors', id))
```

### Unauthorized Access (Will Fail)
```javascript
// Non-admin trying to write to doctors (FAILS)
await addDoc(collection(db, 'doctors'), {...})

// Trying to update immutable record (FAILS)
await updateDoc(doc(db, 'jobApplications', id), {...})

// Unauthorized collection access (FAILS)
await getDocs(collection(db, 'admins'))
```

---

## 🔍 Troubleshooting

### "Permission denied" Error
- Verify user is authenticated
- Check if user UID is in `admins` collection
- Verify Firestore rules are deployed correctly

### Form Validation Not Working
- Check browser console for JavaScript errors
- Verify YouTube URL format is correct
- Check that required fields are not empty

### Loading Icon Spinning Forever
- Check network tab for failed requests
- Verify Firestore rules allow read access
- Check browser console for errors

---

## 📞 Support

For issues or questions about security rules:
1. Check Firebase documentation: https://firebase.google.com/docs/firestore/security/start
2. Test rules in Firebase Console Security Rules Simulator
3. Enable Firestore audit logs for debugging
