import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export default app

/*
 * FIRESTORE COLLECTIONS STRUCTURE:
 *
 * /doctors/{id}
 *   - name, department, experience, qualification, image, speciality, available, bio, slug
 *
 * /services/{id}
 *   - title, description, icon, category, image, featured, order
 *
 * /specialities/{id}
 *   - name, description, icon, image, color, doctors[], order
 *
 * /careers/{id}
 *   - title, department, type, location, description, requirements[], posted, active
 *
 * /testimonials/{id}
 *   - name, rating, review, department, date, image, featured
 *
 * /banners/{id}
 *   - page, imageUrl, title, subtitle, order
 *
 * /contact/{id}
 *   - phone, emergency, email, address, hours, whatsapp, mapEmbed
 *
 * /appointments/{id}
 *   - name, phone, email, department, date, message, status, createdAt
 *
 * /careers_applications/{id}
 *   - name, email, phone, position, resume, coverLetter, status, appliedAt
 */
