import { motion } from 'framer-motion'
import { HiOutlineFlag, HiOutlineEye } from 'react-icons/hi2'
import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import logo from '../assets/logobg.png'
import './About.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function About() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="About Wellcare"
        title="Diagnostics you can rely on"
        subtitle="A closer look at the laboratory behind every accurate report."
      />

      <section className="section about-intro">
        <div className="container about-intro__grid">
          <motion.div
            className="about-intro__logo-wrap"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-intro__logo-card">
              <img src={logo} alt="Wellcare Advanced Laboratory logo" />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
          >
            <p className="eyebrow">Our Story</p>
            <h2>A laboratory built around the patient</h2>
            <p className="about-intro__text">
              Wellcare Advanced Laboratory is committed to providing reliable, accurate, and
              timely diagnostic services. We focus on delivering quality healthcare support
              through advanced testing methods, professional expertise, and patient-centered care.
            </p>
            <p className="about-intro__text">
              Every sample that comes through our doors is treated with the same level of care —
              because behind every test is a person waiting for clarity about their health.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section mv-standalone">
        <div className="container">
          <div className="mv-standalone__grid">
            <motion.div
              className="mv-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
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
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
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
      </section>

      <WhyChooseUs />
    </PageTransition>
  )
}
