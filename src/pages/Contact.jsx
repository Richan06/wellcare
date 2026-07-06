import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { HiOutlinePhone, HiOutlineEnvelope, HiOutlineMapPin } from 'react-icons/hi2'
import { IoLogoWhatsapp } from 'react-icons/io5'
import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import { SITE, buildCallUrl, buildWhatsAppDirectUrl } from '../utils/site.js'
import './Contact.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

const initialForm = {
  name: '',
  email: '',
  reason: '',
  message: '',
}

const REASONS = [
  'General Enquiry',
  'Test Booking Question',
  'Report Related',
  'Feedback',
  'Other',
]

export default function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((errs) => ({ ...errs, [name]: undefined }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (!form.reason) next.reason = 'Please select a reason for contact.'
    if (!form.message.trim()) next.message = 'Please enter your message.'
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validation = validate()
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    setStatus('sending')

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error(
        'EmailJS environment variables are missing. Please set VITE_EMAILJS_SERVICE_ID, ' +
        'VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in your .env file.'
      )
      setStatus('error')
      return
    }

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      console.error('EmailJS send error:', err)
      setStatus('error')
    }
  }

  return (
    <PageTransition>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Wellcare Advanced Laboratory"
        subtitle="Reach out by phone, WhatsApp, or send us a message — we're happy to help."
      />

      <section className="section contact">
        <div className="container contact__grid">
          <motion.div
            className="contact__info"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
          >
            <p className="eyebrow">Contact Details</p>
            <h2>We're here to help</h2>

            <div className="contact-card">
              <span className="contact-card__icon">
                <HiOutlineMapPin aria-hidden="true" />
              </span>
              <div>
                <h3>Visit Us</h3>
                <p>
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                  <br />
                  {SITE.address.line3}
                </p>
              </div>
            </div>

            <div className="contact-card">
              <span className="contact-card__icon">
                <HiOutlinePhone aria-hidden="true" />
              </span>
              <div>
                <h3>Call Us</h3>
                <p>
                  <a href={buildCallUrl()}>{SITE.callNumber}</a>
                  <br />
                  <a href={`tel:${SITE.whatsappNumberRaw}`}>{SITE.whatsappNumber}</a>
                </p>
              </div>
            </div>

            <div className="contact-card">
              <span className="contact-card__icon">
                <HiOutlineEnvelope aria-hidden="true" />
              </span>
              <div>
                <h3>Email Us</h3>
                <p>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </p>
              </div>
            </div>

            <div className="contact__quick-actions">
              <a href={buildCallUrl()} className="btn btn-outline">
                <HiOutlinePhone aria-hidden="true" /> Call Now
              </a>
              <a
                href={buildWhatsAppDirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                <IoLogoWhatsapp aria-hidden="true" /> WhatsApp Us
              </a>
            </div>
          </motion.div>

          <motion.div
            className="contact__form-wrap card"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
          >
            <h3>Send us a message</h3>
            <p className="contact__form-sub">
              Fill out the form and our team will get back to you by email.
            </p>

            <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form__field">
                <label htmlFor="ct-name">Name</label>
                <input
                  id="ct-name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'ct-err-name' : undefined}
                />
                {errors.name && <span className="contact-form__error" id="ct-err-name">{errors.name}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="ct-email">Email</label>
                <input
                  id="ct-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'ct-err-email' : undefined}
                />
                {errors.email && <span className="contact-form__error" id="ct-err-email">{errors.email}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="ct-reason">Reason For Contact</label>
                <select
                  id="ct-reason"
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  aria-invalid={!!errors.reason}
                  aria-describedby={errors.reason ? 'ct-err-reason' : undefined}
                >
                  <option value="">Select a reason</option>
                  {REASONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {errors.reason && <span className="contact-form__error" id="ct-err-reason">{errors.reason}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="ct-message">Message</label>
                <textarea
                  id="ct-message"
                  name="message"
                  rows="4"
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'ct-err-message' : undefined}
                />
                {errors.message && <span className="contact-form__error" id="ct-err-message">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-accent btn-block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="contact-form__status contact-form__status--success" role="status">
                  Thank you — your message has been sent. We'll be in touch soon.
                </p>
              )}
              {status === 'error' && (
                <p className="contact-form__status contact-form__status--error" role="alert">
                  Something went wrong sending your message. Please try calling or WhatsApp us
                  directly, or try again in a moment.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      <section className="section contact-map">
        <div className="container">
          <motion.div
            className="section-head center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
          >
            <p className="eyebrow" style={{ justifyContent: 'center' }}>Find Us</p>
            <h2>Our location in Kottar, Nagercoil</h2>
          </motion.div>

          <motion.div
            className="contact-map__frame"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            custom={1}
          >
            <iframe
              title="Wellcare Advanced Laboratory location map"
              src={SITE.mapEmbedSrc}
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
