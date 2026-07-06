import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import { HiOutlineCalendarDays, HiOutlineClock } from 'react-icons/hi2'
import { buildWhatsAppBookingUrl } from '../utils/site.js'
import './BookingModal.css'

const initialForm = {
  name: '',
  phone: '',
  date: '',
  time: '',
  message: '',
}

export default function BookingModal({ isOpen, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const dialogRef = useRef(null)
  const firstFieldRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => firstFieldRef.current?.focus(), 80)
    } else {
      document.body.style.overflow = ''
      setForm(initialForm)
      setErrors({})
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((errs) => ({ ...errs, [name]: undefined }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your full name.'
    if (!form.phone.trim()) {
      next.phone = 'Please enter your phone number.'
    } else if (!/^[0-9+\s-]{7,15}$/.test(form.phone.trim())) {
      next.phone = 'Please enter a valid phone number.'
    }
    if (!form.date) next.date = 'Please choose a preferred date.'
    if (!form.time) next.time = 'Please choose a preferred time.'
    return next
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validation = validate()
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    const formattedDate = new Date(form.date + 'T00:00:00').toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

    const url = buildWhatsAppBookingUrl({
      name: form.name.trim(),
      phone: form.phone.trim(),
      date: formattedDate,
      time: form.time,
      message: form.message.trim(),
    })

    window.open(url, '_blank', 'noopener,noreferrer')
    onClose()
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  const todayStr = new Date().toISOString().split('T')[0]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="booking-backdrop"
          onMouseDown={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            ref={dialogRef}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="booking-modal__head">
              <div>
                <p className="booking-modal__eyebrow">Book Appointment</p>
                <h3 id="booking-modal-title">Schedule your visit</h3>
              </div>
              <button className="booking-modal__close" onClick={onClose} aria-label="Close booking form">
                <HiX />
              </button>
            </div>

            <p className="booking-modal__sub">
              Fill in your details below. We'll open WhatsApp with your request ready to send to our team.
            </p>

            <form className="booking-form" onSubmit={handleSubmit} noValidate>
              <div className="booking-form__field">
                <label htmlFor="bk-name">Full Name</label>
                <input
                  id="bk-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Arun Kumar"
                  value={form.name}
                  onChange={handleChange}
                  ref={firstFieldRef}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                />
                {errors.name && <span className="booking-form__error" id="err-name">{errors.name}</span>}
              </div>

              <div className="booking-form__field">
                <label htmlFor="bk-phone">Phone Number</label>
                <input
                  id="bk-phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'err-phone' : undefined}
                />
                {errors.phone && <span className="booking-form__error" id="err-phone">{errors.phone}</span>}
              </div>

              <div className="booking-form__row">
                <div className="booking-form__field">
                  <label htmlFor="bk-date">
                    <HiOutlineCalendarDays aria-hidden="true" /> Preferred Date
                  </label>
                  <input
                    id="bk-date"
                    name="date"
                    type="date"
                    min={todayStr}
                    value={form.date}
                    onChange={handleChange}
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? 'err-date' : undefined}
                  />
                  {errors.date && <span className="booking-form__error" id="err-date">{errors.date}</span>}
                </div>

                <div className="booking-form__field">
                  <label htmlFor="bk-time">
                    <HiOutlineClock aria-hidden="true" /> Preferred Time
                  </label>
                  <input
                    id="bk-time"
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleChange}
                    aria-invalid={!!errors.time}
                    aria-describedby={errors.time ? 'err-time' : undefined}
                  />
                  {errors.time && <span className="booking-form__error" id="err-time">{errors.time}</span>}
                </div>
              </div>

              <div className="booking-form__field">
                <label htmlFor="bk-message">Message (optional)</label>
                <textarea
                  id="bk-message"
                  name="message"
                  rows="3"
                  placeholder="Any specific test or requirement..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-accent btn-block booking-form__submit">
                Continue on WhatsApp
              </button>
              <p className="booking-form__note">
                This will open WhatsApp with your appointment details prefilled to send to our team.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
