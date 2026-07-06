import { Link } from 'react-router-dom'
import { HiOutlinePhone, HiOutlineEnvelope, HiOutlineMapPin } from 'react-icons/hi2'
import { IoLogoWhatsapp } from 'react-icons/io5'
import name from '../assets/lab_name.png'
import { SITE, buildCallUrl, buildWhatsAppDirectUrl } from '../utils/site.js'
import './Footer.css'

export default function Footer({ onBookAppointment }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__brand-link">
            <img src={name} alt="Wellcare Advanced Laboratory logo" className="footer__logo" />
           
          </Link>
          <p className="footer__tagline">{SITE.tagline}</p>
          <p className="footer__desc">
            Reliable, accurate, and timely diagnostic services for confident healthcare decisions.
          </p>
        </div>

        <div className="footer__col">
          <p className="links_title">Quick Links</p>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li>
              <button onClick={onBookAppointment} className="footer__link-btn">
                Book Appointment
              </button>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <p className="links_title">Contact Information</p>
          <ul className="footer__contact">
            <li>
              <HiOutlineMapPin aria-hidden="true" />
              <span>{SITE.address.full}</span>
            </li>
            <li>
              <HiOutlinePhone aria-hidden="true" />
              <a href={buildCallUrl()}>{SITE.callNumber}</a>
            </li>
            <li>
              <IoLogoWhatsapp aria-hidden="true" />
              <a href={buildWhatsAppDirectUrl()} target="_blank" rel="noopener noreferrer">
                {SITE.whatsappNumber}
              </a>
            </li>
            <li>
              <HiOutlineEnvelope aria-hidden="true" />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {year} Wellcare Advanced Laboratory. All rights reserved.</p>
          <p className="footer__credit">A Place You Can Trust</p>
        </div>
      </div>
    </footer>
  )
}
