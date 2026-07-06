import { motion } from 'framer-motion'
import { HiOutlineFlag, HiOutlineEye } from 'react-icons/hi2'
import './MissionVision.css'

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function MissionVision() {
  return (
    <section className="section mv">
      <div className="container">
        <div className="mv__grid">
          <motion.div
            className="mv__intro"
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
          >
            <p className="eyebrow">Who We Are</p>
            <h2>Diagnostics built on accuracy, care, and trust</h2>
            <p className="mv__intro-text">
              Wellcare Advanced Laboratory is committed to providing reliable, accurate, and
              timely diagnostic services. We focus on delivering quality healthcare support
              through advanced testing methods, professional expertise, and patient-centered care.
            </p>
          </motion.div>

          <div className="mv__cards">
            <motion.div
              className="mv-card"
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
            >
              <span className="mv-card__icon">
                <HiOutlineFlag aria-hidden="true" />
              </span>
              <h3>Our Mission</h3>
              <p>
                To help individuals and families make informed healthcare decisions through
                dependable laboratory diagnostics.
              </p>
            </motion.div>

            <motion.div
              className="mv-card"
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={2}
            >
              <span className="mv-card__icon">
                <HiOutlineEye aria-hidden="true" />
              </span>
              <h3>Our Vision</h3>
              <p>
                To be a trusted name in diagnostic healthcare, known for precision, integrity,
                and consistently dependable patient care.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
