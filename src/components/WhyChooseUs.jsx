import { motion } from 'framer-motion'
import {
  HiOutlineBeaker,
  HiOutlineShieldCheck,
  HiOutlineBuildingOffice2,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineClock,
} from 'react-icons/hi2'
import './WhyChooseUs.css'

const REASONS = [
  {
    icon: HiOutlineBeaker,
    title: 'Accurate Diagnostic Testing',
    desc: 'Precision-calibrated processes for dependable results every time.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Reliable Results',
    desc: 'Quality checks at every stage so you can trust every report.',
  },
  {
    icon: HiOutlineBuildingOffice2,
    title: 'Modern Laboratory Facilities',
    desc: 'Equipped with advanced instruments for comprehensive testing.',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Experienced Professionals',
    desc: 'A skilled team committed to careful, attentive diagnostics.',
  },
  {
    icon: HiOutlineHeart,
    title: 'Patient-Focused Care',
    desc: 'Every visit is built around comfort, clarity, and respect.',
  },
  {
    icon: HiOutlineClock,
    title: 'Timely Report Delivery',
    desc: 'Prompt turnaround so you can act on your results sooner.',
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function WhyChooseUs() {
  return (
    <section className="section why">
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Why Choose Us</p>
          <h2>What sets our diagnostics apart</h2>
          <p>The standards we hold ourselves to on every test, every report, every visit.</p>
        </div>

        <div className="why__grid">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                className="why-card"
                variants={cardVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
              >
                <span className="why-card__icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{reason.title}</h3>
                <p>{reason.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
