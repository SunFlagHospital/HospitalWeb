import { motion } from 'framer-motion'
import { CheckCircle2, Ambulance, Microscope, Heart, Building2, Wifi } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import VideoSection from '@/components/common/VideoSection'
import ResponsiveImage from '@/components/common/ResponsiveImage'

const reasons = [
  { icon: Ambulance, title: '24/7 Emergency Services', desc: 'Round-the-clock emergency care with rapid response team and advanced life support equipment.', color: 'text-medical-red', bg: 'bg-red-50' },
  { icon: Microscope, title: 'Advanced Diagnostics', desc: 'State-of-the-art MRI, CT, PET Scan, and molecular diagnostics with AI-assisted reporting.', color: 'text-primary-600', bg: 'bg-primary-50' },
  { icon: Heart, title: 'Patient-First Care', desc: 'Compassionate, personalized healthcare with dedicated patient care coordinators.', color: 'text-medical-red', bg: 'bg-red-50' },
  { icon: Building2, title: 'Modern Infrastructure', desc: 'Internationally designed hospital with modular OT, hybrid cath lab, and sterile environments.', color: 'text-accent', bg: 'bg-sky-50' },
  { icon: CheckCircle2, title: 'NABH Accreditation', desc: 'National Accreditation Board certified for maintaining highest standards of patient safety.', color: 'text-medical-green', bg: 'bg-emerald-50' },
  { icon: Wifi, title: 'Digital Health Records', desc: 'Seamless digital records, telemedicine consultations, and online appointment management.', color: 'text-purple-600', bg: 'bg-purple-50' },
]

export default function WhyChooseUs() {
  return (
    <>
      {/* Main Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-premium h-[500px]">
                <ResponsiveImage
                  src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80"
                  alt="Advanced hospital technology"
                  type="service"
                  className="w-full h-full"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-card-hover p-5 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-medical-green/10 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-medical-green" />
                  </div>
                  <div>
                    <p className="font-bold text-primary-900 font-display text-sm">NABH Accredited</p>
                    <p className="text-slate-500 text-xs">Quality Certified Hospital</p>
                  </div>
                </div>
                <p className="text-slate-600 text-xs">Recognized for exceptional standards in patient care, safety, and medical excellence.</p>
              </div>

              {/* Stats pill */}
              <div className="absolute top-6 -left-6 bg-primary-600 text-white rounded-2xl shadow-premium px-5 py-4">
                <p className="text-3xl font-bold font-display">200+</p>
                <p className="text-primary-200 text-xs">Specialist Doctors</p>
              </div>
            </motion.div>

            {/* Right: Content */}
            <div>
              <SectionHeader
                badge="Why Choose Us"
                title="Why Thousands Trust Sunflag Global Hospital"
                subtitle="We combine cutting-edge medical technology with heartfelt care to deliver outcomes that matter."
                center={false}
              />

              <div className="grid sm:grid-cols-2 gap-4 mt-10">
                {reasons.map(({ icon: Icon, title, desc, color, bg }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="p-4 rounded-2xl border border-slate-100 hover:border-primary-100 hover:shadow-card transition-all duration-300"
                  >
                    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <h3 className="font-bold text-primary-900 text-sm font-display mb-1.5">{title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              <span className="w-2 h-2 bg-primary-600 rounded-full" />
              Our Hospital Tour
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 font-display mb-4">
              Experience Sunflag Global Hospital
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Take a virtual tour of our state-of-the-art facilities and meet our dedicated team of healthcare professionals.
            </p>
          </motion.div>

          {/* Main Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <VideoSection
              title="Hospital Overview"
              description="Tour our facilities"
              videoUrl="dQw4w9WgXcQ"
              videoType="youtube"
              thumbnailUrl="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop"
              controls={true}
              showModal={true}
              aspectRatio="16/9"
            />
          </motion.div>

          {/* Additional Video Features */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Emergency Department',
                desc: 'Advanced 24/7 emergency facilities',
                videoUrl: 'dQw4w9WgXcQ',
              },
              {
                title: 'Operation Theaters',
                desc: 'State-of-the-art modular OT setup',
                videoUrl: 'dQw4w9WgXcQ',
              },
              {
                title: 'Patient Care',
                desc: 'Compassionate healthcare delivery',
                videoUrl: 'dQw4w9WgXcQ',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <VideoSection
                  title={item.title}
                  description={item.desc}
                  videoUrl={item.videoUrl}
                  videoType="youtube"
                  thumbnailUrl={`https://images.unsplash.com/photo-1576091160${550 + i * 10}-112ba8d25d1d?w=800&h=600&fit=crop`}
                  controls={false}
                  showModal={true}
                  aspectRatio="16/9"
                  className="h-64"
                />
                <h3 className="font-bold text-primary-900 font-display text-sm mt-3">{item.title}</h3>
                <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

