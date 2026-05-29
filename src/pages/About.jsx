import { motion } from 'framer-motion'
import { CheckCircle2, Award, Heart, Target, Eye } from 'lucide-react'
import SEO from '@/seo/SEO'
import PageBanner from '@/components/common/PageBanner'
import SectionHeader from '@/components/ui/SectionHeader'
import { HOSPITAL_INFO, STATS } from '@/data/staticData'
import { Users, Stethoscope, Calendar } from 'lucide-react'

const iconMap = { Users, Stethoscope, Award, Calendar }

const milestones = [
  { year: '2016', event: 'Hospital Founded', desc: 'Sunflag Global Hospital established with a vision to deliver world-class healthcare in Rohtak.' },
  { year: '2020', event: 'Digital Transformation', desc: 'Complete digitization of patient records, telemedicine launch, and AI-powered diagnostics.' },
  { year: '2023', event: 'NABH Accreditation', desc: 'Received National Accreditation Board for Hospitals certification for quality patient care.' },
  { year: '2024', event: '20,000+ Patients/Year', desc: 'Achieved milestone of treating over 20,000 patients annually with 20+ specialist doctors.' },
]

export default function About() {
  return (
    <>
      <SEO
        title="About Sunflag Global Hospital Rohtak"
        description="Learn about Sunflag Global Hospital Rohtak — established in 2016, NABH accredited, 20+ specialists, 25+ specialities serving Rohtak and Haryana."
        canonical="/about"
      />
      <PageBanner
        title="About Us"
        subtitle="A legacy of healing, innovation, and compassionate care since 2016"
        breadcrumb={[{ label: 'About Us' }]}
        imageUrl="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80"
        pageSlug="about"
      />

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge bg-primary-50 text-primary-600 text-xs uppercase tracking-widest mb-4">
                Our Story
              </span>
              <h2 className="section-title mb-6">
                Two Decades of Healing,<br />Innovation & Trust
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">
                Founded in {HOSPITAL_INFO.established}, Sunflag Global Hospital has grown from a regional facility 
                into one of Haryana's premier healthcare institutions. Over the decades, we have maintained our 
                founding principle: to provide world-class medical care to every patient, regardless of their 
                background or condition.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                With 20+ specialist doctors, cutting-edge technology, and a compassionate team of healthcare 
                professionals, we serve over 25,000 patients annually. Our NABH accreditation reflects our 
                unwavering commitment to patient safety and quality care.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Target, title: 'Our Mission', desc: 'Deliver compassionate, accessible, and advanced healthcare that transforms lives.' },
                  { icon: Eye, title: 'Our Vision', desc: 'To be the most trusted healthcare institution in North India by 2030.' },
                  { icon: Heart, title: 'Our Values', desc: 'Compassion, integrity, excellence, innovation, and patient-first approach.' },
                  { icon: Award, title: 'Our Promise', desc: 'Every patient deserves the best medical care delivered with dignity and respect.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="p-4 bg-gradient-soft rounded-2xl">
                    <Icon className="w-6 h-6 text-primary-600 mb-2" />
                    <h4 className="font-bold text-primary-900 font-display text-sm mb-1">{title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-premium h-[500px]">
                <img
                  src="https://cdn.sunflagglobalhospital.com/uploads/banners/Bg.webp"
                  alt="Sunflag Global Hospital"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white rounded-2xl p-5 shadow-premium">
                <p className="text-4xl font-bold font-display">10+</p>
                <p className="text-primary-200 text-sm">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label, icon }, i) => {
              const Icon = iconMap[icon]
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  {Icon && <Icon className="w-8 h-8 text-accent mx-auto mb-3" />}
                  <p className="text-4xl font-bold text-white font-display">{value}</p>
                  <p className="text-primary-200 text-sm mt-1">{label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Journey"
            title="Milestones That Define Us"
            subtitle="A timeline of growth, innovation, and commitment to healthcare excellence"
          />

          <div className="mt-12 relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 to-accent hidden md:block" />
            <div className="space-y-8">
              {milestones.map(({ year, event, desc }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="hidden md:flex flex-col items-center flex-shrink-0">
                    <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-xs font-display shadow-premium z-10">
                      {year}
                    </div>
                  </div>
                  <div className="card p-6 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="md:hidden badge bg-primary-50 text-primary-600 text-xs">{year}</span>
                      <CheckCircle2 className="w-5 h-5 text-medical-green" />
                      <h3 className="font-bold text-primary-900 font-display">{event}</h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
