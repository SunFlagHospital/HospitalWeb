import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { MapPin, Clock, Briefcase, ChevronDown, ChevronUp, Send, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import SEO from '@/seo/SEO'
import PageBanner from '@/components/common/PageBanner'
import SectionHeader from '@/components/ui/SectionHeader'
import { useCareers } from '@/hooks/useFirestore'
import { applicationsService } from '@/firebase/services'

export default function Careers() {
  const [expandedJob, setExpandedJob] = useState(null)
  const [applying, setApplying] = useState(null)
  const { data: careers, loading, error } = useCareers()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      await applicationsService.add({ ...data, position: applying, status: 'pending' })
      toast.success('Application submitted! We\'ll contact you soon.')
      reset()
      setApplying(null)
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <SEO
        title="Careers | Join Our Team"
        description="Join the Sunflag Global Hospital team. Exciting career opportunities for doctors, nurses, technicians and hospital staff in Rohtak, Haryana."
        canonical="/careers"
      />
      <PageBanner
        title="Join Our Team"
        subtitle="Build a meaningful career in healthcare. Join 1,000+ dedicated professionals at Sunflag Global Hospital."
        breadcrumb={[{ label: 'Careers' }]}
        imageUrl="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80"
        pageSlug="careers"
      />

      <section className="py-20 bg-gradient-soft">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Open Positions"
            title="Current Job Openings"
            subtitle="We are always looking for talented individuals who share our passion for healthcare excellence"
          />

          {/* Loading State */}
          {loading && (
            <div className="mt-12 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse card h-32 bg-slate-100" />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6 flex gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900">Error Loading Job Openings</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && careers.length === 0 && (
            <div className="text-center py-16 text-slate-400 mt-8">
              <p className="text-lg font-semibold">No job openings at the moment</p>
              <p className="text-sm">Check back soon for exciting career opportunities.</p>
            </div>
          )}

          {/* Jobs List */}
          {!loading && !error && careers.length > 0 && (
            <div className="mt-12 space-y-4">
              {careers.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card overflow-visible"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-bold text-primary-900 font-display text-lg">{job.title}</h3>
                          {job.active && (
                            <span className="badge bg-medical-green/10 text-medical-green text-xs">
                              <span className="w-1.5 h-1.5 bg-medical-green rounded-full" />
                              Active
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5" /> {job.department}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> {job.type}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" /> {job.location}
                          </span>
                        </div>
                      </div>
                      {expandedJob === job.id
                        ? <ChevronUp className="w-5 h-5 text-primary-400 flex-shrink-0" />
                        : <ChevronDown className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      }
                    </div>
                  </div>

                  {expandedJob === job.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="px-6 pb-6 border-t border-slate-100 pt-5"
                    >
                      <p className="text-slate-600 text-sm mb-4">{job.description}</p>
                      <h4 className="font-bold text-primary-900 text-sm font-display mb-3">Requirements:</h4>
                      <ul className="space-y-2 mb-5">
                        {Array.isArray(job.requirements) && job.requirements.map((req, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => setApplying(applying === job.id ? null : job.id)}
                        className="btn-primary text-sm"
                      >
                        Apply Now
                      </button>

                      {/* Application Form */}
                      {applying === job.id && (
                        <motion.form
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onSubmit={handleSubmit(onSubmit)}
                          className="mt-6 bg-gradient-soft rounded-2xl p-6 space-y-4"
                        >
                          <h4 className="font-bold text-primary-900 font-display">Apply for: {job.title}</h4>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Full Name *</label>
                              <input {...register('name', { required: true })} className="input-field" placeholder="Your full name" />
                              {errors.name && <p className="text-red-500 text-xs mt-1">Required</p>}
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Email *</label>
                              <input {...register('email', { required: true })} type="email" className="input-field" placeholder="you@email.com" />
                              {errors.email && <p className="text-red-500 text-xs mt-1">Required</p>}
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Phone *</label>
                              <input {...register('phone', { required: true })} className="input-field" placeholder="+91 XXXXX XXXXX" />
                              {errors.phone && <p className="text-red-500 text-xs mt-1">Required</p>}
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Experience (Years)</label>
                              <input {...register('experience')} className="input-field" placeholder="e.g., 5" />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Cover Letter</label>
                            <textarea {...register('coverLetter')} rows={3} className="input-field resize-none" placeholder="Why do you want to join us?" />
                          </div>
                          <button type="submit" disabled={isSubmitting} className="btn-primary">
                            <Send className="w-4 h-4" />
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                          </button>
                        </motion.form>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
