// Medical SVG Icons for Specialities
export const MedicalIcons = {
  // Cardiology - Heart
  cardiology: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 85C50 85 15 65 15 45C15 35 22 28 30 28C36 28 42 32 50 40C58 32 64 28 70 28C78 28 85 35 85 45C85 65 50 85 50 85Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Neurology - Brain
  neurology: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15C35 15 25 22 25 35C25 42 28 48 32 52M50 15C65 15 75 22 75 35C75 42 72 48 68 52M50 15V85M32 52C30 56 28 62 28 70C28 78 35 85 50 85M68 52C70 56 72 62 72 70C72 78 65 85 50 85" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="50" cy="50" r="8" fill="currentColor"/>
    </svg>
  ),

  // Orthopedics - Bone
  orthopedics: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="35" width="15" height="30" rx="7.5" fill="currentColor"/>
      <rect x="65" y="35" width="15" height="30" rx="7.5" fill="currentColor"/>
      <rect x="35" y="40" width="30" height="20" rx="3" fill="currentColor"/>
      <circle cx="27.5" cy="42" r="4" fill="white"/>
      <circle cx="72.5" cy="42" r="4" fill="white"/>
    </svg>
  ),

  // Pulmonology - Lungs
  pulmonology: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 35C25 40 22 48 22 58C22 72 30 85 40 85C45 85 48 80 48 72M70 35C75 40 78 48 78 58C78 72 70 85 60 85C55 85 52 80 52 72M48 72V35C48 25 50 15 50 15C50 15 52 25 52 35V72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Oncology - Medical Cross
  oncology: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M50 30V70M30 50H70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="50" cy="50" r="4" fill="currentColor"/>
    </svg>
  ),

  // Gynecology - Female Symbol
  gynecology: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="12" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="50" y1="47" x2="50" y2="75" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="30" y1="60" x2="70" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),

  // Pediatrics - Child/Family
  pediatrics: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="30" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 42H60C65 42 68 45 68 50V65C68 70 65 75 60 75H40C35 75 32 70 32 65V50C32 45 35 42 40 42Z" stroke="currentColor" strokeWidth="2"/>
      <circle cx="35" cy="20" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="65" cy="20" r="6" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),

  // General Medicine - Stethoscope
  general: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 20C30 20 22 28 22 38C22 48 30 56 40 56C45 56 50 54 54 50M54 50C60 56 70 56 80 50C85 45 88 38 88 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="60" cy="50" r="6" fill="currentColor"/>
      <circle cx="60" cy="75" r="5" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="60" y1="80" x2="60" y2="85" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),

  // Urology - Bladder
  urology: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15L65 28C70 35 72 45 72 55C72 70 62 82 50 82C38 82 28 70 28 55C28 45 30 35 35 28L50 15Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="50" y1="40" x2="50" y2="65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Dermatology - Skin
  dermatology: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="25" width="60" height="50" rx="8" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="35" cy="40" r="3" fill="currentColor"/>
      <circle cx="55" cy="35" r="2.5" fill="currentColor"/>
      <circle cx="70" cy="45" r="2" fill="currentColor"/>
      <circle cx="45" cy="60" r="2.5" fill="currentColor"/>
      <circle cx="62" cy="58" r="3" fill="currentColor"/>
    </svg>
  ),

  // Ophthalmology - Eye
  ophthalmology: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 50C20 50 30 35 50 35C70 35 80 50 80 50C80 50 70 65 50 65C30 65 20 50 20 50Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="50" cy="50" r="5" fill="currentColor"/>
    </svg>
  ),

  // ENT - Ear
  ent: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 40C30 30 35 20 45 20C55 20 60 30 60 40C60 55 52 68 45 72C38 68 30 55 30 40Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M40 40C40 36 42 32 45 32C48 32 50 36 50 40C50 48 48 55 45 58C42 55 40 48 40 40Z" stroke="currentColor" strokeWidth="2"/>
      <circle cx="70" cy="50" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  ),

  // Gastroenterology - Stomach
  gastroenterology: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 20H60C65 20 68 25 68 30V45C68 60 60 75 50 80C40 75 32 60 32 45V30C32 25 35 20 40 20Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="50" y1="30" x2="50" y2="60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  // Default - Hospital
  default: () => (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="30" width="50" height="50" rx="4" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="50" y1="30" x2="50" y2="80" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="25" y1="55" x2="75" y2="55" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="42" cy="42" r="3" fill="currentColor"/>
      <circle cx="58" cy="42" r="3" fill="currentColor"/>
      <circle cx="42" cy="68" r="3" fill="currentColor"/>
      <circle cx="58" cy="68" r="3" fill="currentColor"/>
    </svg>
  ),
}

// Map speciality names to icon components
export const getSpecialityIcon = (specialityName) => {
  const name = specialityName?.toLowerCase() || ''
  
  if (name.includes('cardio')) return MedicalIcons.cardiology
  if (name.includes('neuro')) return MedicalIcons.neurology
  if (name.includes('ortho') || name.includes('bone')) return MedicalIcons.orthopedics
  if (name.includes('pulmo') || name.includes('lung') || name.includes('respiratory')) return MedicalIcons.pulmonology
  if (name.includes('oncol')) return MedicalIcons.oncology
  if (name.includes('gynec') || name.includes('obstetric')) return MedicalIcons.gynecology
  if (name.includes('pedia')) return MedicalIcons.pediatrics
  if (name.includes('general') || name.includes('medicine')) return MedicalIcons.general
  if (name.includes('urol')) return MedicalIcons.urology
  if (name.includes('derma') || name.includes('skin')) return MedicalIcons.dermatology
  if (name.includes('ophth') || name.includes('eye')) return MedicalIcons.ophthalmology
  if (name.includes('ent') || name.includes('ear')) return MedicalIcons.ent
  if (name.includes('gastro') || name.includes('stomach')) return MedicalIcons.gastroenterology
  
  return MedicalIcons.default
}
