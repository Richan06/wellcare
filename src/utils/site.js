// Central place for contact details & site constants so every
// component stays in sync if numbers/address ever change.

export const SITE = {
  name: 'Wellcare Advanced Laboratory',
  tagline: 'A Place You Can Trust',
  callNumber: '+91 75987 35468 ',
  callNumberRaw: '+917598735468 ',
  whatsappNumber: '+91 88257 60398',
  whatsappNumberRaw: '918825760398', // for wa.me (no plus, no spaces)
  email: 'wellcareadvancedlab@gmail.com',
  address: {
    line1: '184F, Cape Road,',
    line2: 'Opp. Kavimani School, Near Abinash Bakery,',
    line3: 'Kottar, Nagercoil - 629002',
    full: '184F, Cape Road, Opp. Kavimani School, Near Abinash Bakery, Kottar, Nagercoil - 629002',
  },
  mapEmbedSrc:
    'https://www.google.com/maps?q=184F+Cape+Road+Opp+Kavimani+School+Near+Abinash+Bakery+Kottar+Nagercoil+629002&output=embed',
  mapLink:
    'https://www.google.com/maps/search/?api=1&query=184F+Cape+Road+Opp+Kavimani+School+Near+Abinash+Bakery+Kottar+Nagercoil+629002',
}

export function buildWhatsAppBookingUrl({ name, phone, date, time, message }) {
  const text =
    `Hello Wellcare Advanced Laboratory, I would like to book an appointment.\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Preferred Date: ${date}\n` +
    `Preferred Time: ${time}\n` +
    `Message: ${message || '-'}`

  return `https://wa.me/${SITE.whatsappNumberRaw}?text=${encodeURIComponent(text)}`
}

export function buildCallUrl() {
  return `tel:${SITE.callNumberRaw}`
}

export function buildWhatsAppDirectUrl() {
  const text = `Hello Wellcare Advanced Laboratory, I would like to know more about your services.`
  return `https://wa.me/${SITE.whatsappNumberRaw}?text=${encodeURIComponent(text)}`
}
