export const HOSPITAL_INFO = {
  name: 'Sunflag Global Hospital',
  city: 'Rohtak',
  tagline: 'Advanced Healthcare with a Human Touch',
  phone: '+91-1262-255555',
  emergency: '+91-1262-100',
  whatsapp: '+919812345678',
  email: 'info@sunflaghospital.com',
  address: 'Delhi Bypass Road, Rohtak, Haryana - 124001',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.1234567890!2d76.5!3d28.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDU0JzAwLjAiTiA3NsKwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
  hours: {
    opd: 'Mon–Sat: 8:00 AM – 8:00 PM',
    emergency: '24/7 Emergency Services',
    icu: '24/7 Intensive Care Unit',
  },
  social: {
    facebook: 'https://facebook.com/sunflaghospital',
    instagram: 'https://instagram.com/sunflaghospital',
    twitter: 'https://twitter.com/sunflaghospital',
    youtube: 'https://youtube.com/sunflaghospital',
  },
  established: 2002,
}

export const STATS = [
  { value: '25,000+', label: 'Patients Treated Annually', icon: 'Users' },
  { value: '200+', label: 'Medical Experts', icon: 'Stethoscope' },
  { value: '50+', label: 'Specialities & Services', icon: 'Award' },
  { value: '22+', label: 'Years of Excellence', icon: 'Calendar' },
]

export const MOCK_DOCTORS = [
  { id: '1', name: 'Dr. Rajesh Kumar Sharma', department: 'Cardiology', experience: '18 Years', qualification: 'MBBS, MD, DM (Cardiology)', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face', available: true, speciality: 'Interventional Cardiology' },
  { id: '2', name: 'Dr. Priya Mehta', department: 'Neurology', experience: '14 Years', qualification: 'MBBS, MD, DM (Neurology)', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face', available: true, speciality: 'Neuro Surgery' },
  { id: '3', name: 'Dr. Anil Verma', department: 'Orthopedics', experience: '20 Years', qualification: 'MBBS, MS (Ortho)', image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face', available: true, speciality: 'Joint Replacement' },
  { id: '4', name: 'Dr. Sunita Rani', department: 'Gynecology', experience: '16 Years', qualification: 'MBBS, MS (OBG)', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face', available: true, speciality: 'High Risk Pregnancy' },
  { id: '5', name: 'Dr. Vikas Arora', department: 'Oncology', experience: '12 Years', qualification: 'MBBS, MD, DM (Oncology)', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face', available: true, speciality: 'Surgical Oncology' },
  { id: '6', name: 'Dr. Meena Saxena', department: 'Pediatrics', experience: '15 Years', qualification: 'MBBS, MD (Pediatrics)', image: 'https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?w=400&h=400&fit=crop&crop=face', available: true, speciality: 'Neonatology' },
]

export const MOCK_SPECIALITIES = [
  { id: '1', name: 'Cardiology', icon: '🫀', description: 'Advanced cardiac care with state-of-the-art cath lab and cardiac ICU', color: '#ef4444', order: 1 },
  { id: '2', name: 'Neurology', icon: '🧠', description: 'Comprehensive brain and nervous system care with neuroimaging', color: '#8b5cf6', order: 2 },
  { id: '3', name: 'Orthopedics', icon: '🦴', description: 'Joint replacement, spine surgery, sports medicine and trauma care', color: '#f59e0b', order: 3 },
  { id: '4', name: 'Oncology', icon: '🎗️', description: 'Comprehensive cancer care with chemotherapy and radiation therapy', color: '#10b981', order: 4 },
  { id: '5', name: 'Gynecology', icon: '🌸', description: "Complete women's health — from routine care to complex surgery", color: '#ec4899', order: 5 },
  { id: '6', name: 'Pediatrics', icon: '👶', description: 'Dedicated child care from newborns to adolescents with NICU', color: '#06b6d4', order: 6 },
  { id: '7', name: 'Emergency', icon: '🚑', description: '24/7 emergency & trauma care with fully equipped ambulances', color: '#f97316', order: 7 },
  { id: '8', name: 'Gastroenterology', icon: '💊', description: 'Advanced digestive care with endoscopy and liver transplant', color: '#3b82f6', order: 8 },
]

export const MOCK_TESTIMONIALS = [
  { id: '1', name: 'Ramesh Gupta', rating: 5, review: 'Exceptional care during my bypass surgery. The doctors and nursing staff were incredibly professional and compassionate. Sunflag Global Hospital truly lives up to its name.', department: 'Cardiology', date: '2024-01-15', featured: true },
  { id: '2', name: 'Aarti Sharma', rating: 5, review: 'I had a complicated delivery and the gynecology team was outstanding. The NICU facilities saved my premature baby. Forever grateful to this hospital.', department: 'Gynecology', date: '2024-02-08', featured: true },
  { id: '3', name: 'Harish Yadav', rating: 5, review: 'Knee replacement surgery was a complete success. Dr. Anil Verma and his team are world-class. I am walking pain-free after years of suffering.', department: 'Orthopedics', date: '2024-03-20', featured: true },
]

export const MOCK_SERVICES = [
  { id: '1', title: 'Emergency & Trauma Care', description: '24/7 emergency services with rapid response team and advanced life support', icon: 'Zap', category: 'Emergency', featured: true, order: 1 },
  { id: '2', title: 'Diagnostic Imaging', description: 'MRI, CT Scan, X-Ray, Ultrasound and PET Scan with AI-assisted reporting', icon: 'Monitor', category: 'Diagnostics', featured: true, order: 2 },
  { id: '3', title: 'Advanced Surgery', description: 'Minimally invasive, robotic-assisted and open surgery across all specialities', icon: 'Scissors', category: 'Surgery', featured: true, order: 3 },
  { id: '4', title: 'Intensive Care Unit', description: 'State-of-the-art ICU with 24/7 intensivist coverage and monitoring', icon: 'Activity', category: 'Critical Care', featured: true, order: 4 },
  { id: '5', title: 'Blood Bank', description: 'Round-the-clock blood bank with full component separation facility', icon: 'Droplet', category: 'Support', featured: false, order: 5 },
  { id: '6', title: 'Pharmacy', description: '24/7 in-house pharmacy with comprehensive medication management', icon: 'Package', category: 'Support', featured: false, order: 6 },
]

export const MOCK_CAREERS = [
  { id: '1', title: 'Senior Cardiologist', department: 'Cardiology', type: 'Full-time', location: 'Rohtak, Haryana', description: 'Looking for an experienced interventional cardiologist to join our growing cardiac team.', requirements: ['MBBS, MD, DM Cardiology', '5+ years experience', 'Fellowship in Interventional Cardiology preferred'], posted: '2024-03-01', active: true },
  { id: '2', title: 'Staff Nurse (ICU)', department: 'Nursing', type: 'Full-time', location: 'Rohtak, Haryana', description: 'Experienced ICU nurses required for our expanding critical care unit.', requirements: ['B.Sc Nursing or GNM', '2+ years ICU experience', 'BLS/ACLS certification'], posted: '2024-03-10', active: true },
  { id: '3', title: 'Medical Lab Technician', department: 'Pathology', type: 'Full-time', location: 'Rohtak, Haryana', description: 'Skilled MLT required for our state-of-the-art pathology laboratory.', requirements: ['BMLT or DMLT', '1+ year experience', 'Knowledge of advanced analyzers'], posted: '2024-03-15', active: true },
]
