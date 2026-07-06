import PageTransition from '../components/PageTransition.jsx'
import Hero from '../components/Hero.jsx'
import Services from '../components/Services.jsx'
import MissionVision from '../components/MissionVision.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import CtaBand from '../components/CtaBand.jsx'
import Workinghourscard from '../components/WorkingHoursCard.jsx'

export default function Home({ onBookAppointment }) {
  return (
    <PageTransition>
      <Hero onBookAppointment={onBookAppointment} />
      <Services />
      <MissionVision />
      <WhyChooseUs />
      <CtaBand onBookAppointment={onBookAppointment} />
    <Workinghourscard/>
    </PageTransition>
  )
}
