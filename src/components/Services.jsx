import { motion } from 'framer-motion'
import { HiOutlineCheckCircle } from 'react-icons/hi2'
import { TbReportMedical, TbDropletHalf2Filled } from 'react-icons/tb'
import './Services.css'

const PACKAGES = [
  {
    icon: TbReportMedical,
    title: 'General Health Checkup',
    tagline: 'A complete picture of your overall health',
    tests: [
      'Complete Blood Count (CBC)',
      'Blood Sugar Tests (RBS, FBS, PPBS)',
      'Urine Complete Examination',
      'HbA1c',
      'Kidney Function Test',
      'Liver Function Test',
      'Lipid Profile',
    ],
  },
  {
    icon: TbDropletHalf2Filled,
    title: 'Diabetic Health Package',
    tagline: 'Focused monitoring for diabetes management',
    tests: [
      'Complete Blood Count (CBC)',
      'Blood Sugar Tests',
      'HbA1c',
      'Kidney Function Assessment — Urea',
      'Kidney Function Assessment — Creatinine',
      'Kidney Function Assessment — Uric Acid',
    ],
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Our Test Panels</p>
          <h2>Health packages built around real diagnostic needs</h2>
          <p>
            Each panel reflects the exact tests included — no guesswork, just a clear order
            sheet of what gets checked.
          </p>
        </div>

        <div className="services__grid">
          {PACKAGES.map((pkg, i) => {
            const Icon = pkg.icon
            return (
              <motion.article
                key={pkg.title}
                className="panel-card"
                variants={cardVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                custom={i}
              >
                <div className="panel-card__head">
                  <span className="panel-card__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{pkg.title}</h3>
                    <p className="panel-card__tagline">{pkg.tagline}</p>
                  </div>
                </div>

                <ul className="panel-card__list">
                  {pkg.tests.map((test) => (
                    <li key={test}>
                      <HiOutlineCheckCircle aria-hidden="true" />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
