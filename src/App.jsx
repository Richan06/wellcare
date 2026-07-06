import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import ScrollToTopButton from './components/ScrollToTopButton.jsx'
import BookingModal from './components/BookingModal.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  const location = useLocation()
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  useEffect(() => {
    const titles = {
      '/': 'Wellcare Advanced Laboratory | A Place You Can Trust',
      '/about': 'About Us | Wellcare Advanced Laboratory',
      '/contact': 'Contact Us | Wellcare Advanced Laboratory',
    }
    document.title = titles[location.pathname] || titles['/']
  }, [location.pathname])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar onBookAppointment={() => setIsBookingOpen(true)} />

      <ScrollToTop />

      <main id="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={<Home onBookAppointment={() => setIsBookingOpen(true)} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer onBookAppointment={() => setIsBookingOpen(true)} />
      <ScrollToTopButton />

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}

export default App
