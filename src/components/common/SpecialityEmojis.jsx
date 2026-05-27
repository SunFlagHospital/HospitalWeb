// Premium emoji icons for medical specialities
export const SpecialityEmojis = {
  cardiology: '❤️',
  neurology: '🧠',
  orthopedics: '🦴',
  pulmonology: '🫁',
  oncology: '⚕️',
  gynecology: '👩‍⚕️',
  pediatrics: '👶',
  general: '🏥',
  urology: '🚽',
  dermatology: '🩹',
  ophthalmology: '👁️',
  ent: '👂',
  gastroenterology: '🍽️',
  rheumatology: '🦵',
  endocrinology: '🫀',
  nephrology: '💊',
  psychiatry: '🧘',
  anesthesia: '💉',
  surgery: '🔬',
  radiology: '🖼️',
  pathology: '🧪',
  microbiology: '🔬',
  default: '⚕️',
}

// Map specialty names to emoji
export const getSpecialityEmoji = (specialityName) => {
  const name = specialityName?.toLowerCase() || ''
  
  if (name.includes('cardio')) return SpecialityEmojis.cardiology
  if (name.includes('neuro')) return SpecialityEmojis.neurology
  if (name.includes('ortho') || name.includes('bone') || name.includes('joint')) return SpecialityEmojis.orthopedics
  if (name.includes('pulmo') || name.includes('lung') || name.includes('respiratory') || name.includes('chest')) return SpecialityEmojis.pulmonology
  if (name.includes('oncol') || name.includes('cancer')) return SpecialityEmojis.oncology
  if (name.includes('gynec') || name.includes('obstetric') || name.includes('women')) return SpecialityEmojis.gynecology
  if (name.includes('pedia') || name.includes('child')) return SpecialityEmojis.pediatrics
  if (name.includes('general') || name.includes('medicine')) return SpecialityEmojis.general
  if (name.includes('urol') || name.includes('kidney')) return SpecialityEmojis.urology
  if (name.includes('derma') || name.includes('skin')) return SpecialityEmojis.dermatology
  if (name.includes('ophth') || name.includes('eye') || name.includes('vision')) return SpecialityEmojis.ophthalmology
  if (name.includes('ent') || name.includes('ear') || name.includes('nose') || name.includes('throat')) return SpecialityEmojis.ent
  if (name.includes('gastro') || name.includes('stomach') || name.includes('liver')) return SpecialityEmojis.gastroenterology
  if (name.includes('rheum') || name.includes('arthritis')) return SpecialityEmojis.rheumatology
  if (name.includes('endo') || name.includes('diabetes')) return SpecialityEmojis.endocrinology
  if (name.includes('nephr') || name.includes('dialysis')) return SpecialityEmojis.nephrology
  if (name.includes('psych') || name.includes('mental')) return SpecialityEmojis.psychiatry
  if (name.includes('anesth')) return SpecialityEmojis.anesthesia
  if (name.includes('surg') || name.includes('operation')) return SpecialityEmojis.surgery
  if (name.includes('radio') || name.includes('imaging') || name.includes('ct') || name.includes('mri')) return SpecialityEmojis.radiology
  if (name.includes('path')) return SpecialityEmojis.pathology
  if (name.includes('micro')) return SpecialityEmojis.microbiology
  
  return SpecialityEmojis.default
}
