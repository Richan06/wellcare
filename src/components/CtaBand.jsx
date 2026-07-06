import { motion } from 'framer-motion'
import { HiOutlinePhone } from 'react-icons/hi2'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { buildCallUrl } from '../utils/site.js'
import './CtaBand.css'

export default function CtaBand({ onBookAppointment }) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2>Ready for your health checkup?</h2>
          <p>Call us directly or book your appointment in seconds over WhatsApp.</p>
        </motion.div>

        <motion.div
          className="cta-band__actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href={buildCallUrl()} className="btn btn-ghost-light">
            <HiOutlinePhone aria-hidden="true" /> Call Now
          </a>
          <button className="btn btn-primary" onClick={onBookAppointment}>
            <IoLogoWhatsapp aria-hidden="true" /> Book Appointment
          </button>
        </motion.div>
      </div>
    </section>
  )
}
