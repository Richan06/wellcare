import { motion } from 'framer-motion'
import { HiOutlinePhone } from 'react-icons/hi2'
import { IoLogoWhatsapp } from 'react-icons/io5'
import logo from '../assets/logobg.png'
import { SITE, buildCallUrl } from '../utils/site.js'
import './Hero.css'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

const REPORT_ROWS = [
  { label: 'Hemoglobin', value: '14.2', unit: 'g/dL', status: 'in-range' },
  { label: 'Fasting Glucose', value: '92', unit: 'mg/dL', status: 'in-range' },
  { label: 'HbA1c', value: '5.4', unit: '%', status: 'in-range' },
  { label: 'Creatinine', value: '0.9', unit: 'mg/dL', status: 'in-range' },
]

export default function Hero({ onBookAppointment }) {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-grid" />
        <div className="hero__bg-glow hero__bg-glow--one" />
        <div className="hero__bg-glow hero__bg-glow--two" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="hero__logo-wrap">
            <img src={logo} alt="Wellcare Advanced Laboratory logo" className="hero__logo" />
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={1} className="hero__eyebrow">
            Diagnostic Laboratory &middot; Nagercoil
          </motion.p>

          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={2} className="hero__title">
            {SITE.name}
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3} className="hero__subtitle">
            {SITE.tagline}
          </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={4} className="hero__desc">
            Reliable, accurate, and timely diagnostic services — supporting confident healthcare
            decisions for you and your family.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5} className="hero__actions">
            <a href={buildCallUrl()} className="btn btn-primary">
              <HiOutlinePhone aria-hidden="true" />
              Call Now
            </a>
            <button className="btn btn-accent" onClick={onBookAppointment}>
              <IoLogoWhatsapp aria-hidden="true" />
              Book Appointment
            </button>
          </motion.div>
        </div>

        <motion.div
          className="hero__panel-wrap"
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.75, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="report-panel glass">
            <div className="report-panel__head">
              <div>
                <span className="report-panel__eyebrow">Sample Report</span>
                <strong>Diagnostic Summary</strong>
              </div>
              <span className="report-panel__badge">Verified</span>
            </div>

            <ul className="report-panel__rows">
              {REPORT_ROWS.map((row, idx) => (
                <motion.li
                  key={row.label}
                  className="report-panel__row"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="report-panel__row-label">{row.label}</span>
                  <span className="report-panel__row-value">
                    {row.value} <em>{row.unit}</em>
                  </span>
                  <span className={`report-panel__tick report-panel__tick--${row.status}`} />
                </motion.li>
              ))}
            </ul>

            <div className="report-panel__foot">
              <span>Reference range checked</span>
              <span className="report-panel__foot-dot" />
              <span>Reviewed by lab team</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
