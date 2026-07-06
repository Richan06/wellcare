import { useState, useEffect } from "react";
import "./WorkingHoursCard.css";

const schedule = [
  { day: "Monday",    hours: "6:00 AM – 7:00 PM" },
  { day: "Tuesday",   hours: "6:00 AM – 7:00 PM" },
  { day: "Wednesday", hours: "6:00 AM – 7:00 PM" },
  { day: "Thursday",  hours: "6:00 AM – 7:00 PM" },
  { day: "Friday",    hours: "6:00 AM – 7:00 PM" },
  { day: "Saturday",  hours: "6:00 AM – 7:00 PM" },
  { day: "Sunday",    hours: "6:00 AM – 7:00 PM"             },
];

const features = [
  "Certified Lab Experts",
  "Fast & Accurate Reports",
  "Modern Diagnostic Equipment",
  "Patient Friendly Support",
];

function getTodayStatus() {
  const now = new Date();
  const day = now.getDay();          // 0 = Sun, 1 = Mon … 6 = Sat
  const hm  = now.getHours() * 60 + now.getMinutes();

  // 6:00 AM = 360 mins | 7:00 PM = 1140 mins
  // Since every day has the same hours, we only need one time check
  const isOpen = hm >= 360 && hm < 1140; 

  // Map Date.getDay() to your array index (Mon=0, Tue=1 ... Sun=6)
  const index = day === 0 ? 6 : day - 1;

  return { open: isOpen, todayIndex: index };
}

export default function WorkingHoursCard() {
  const [visible, setVisible]   = useState(false);
  const { open, todayIndex }    = getTodayStatus();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`whc-section${visible ? " whc-visible" : ""}`}>
      {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
      <div className="whc-left">
        <span className="whc-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="currentColor"/>
          </svg>
          Trusted Diagnostic Care
        </span>

        <h2 className="whc-heading">
          Flexible Working Hours
          <span className="whc-heading-accent"> For Your Convenience</span>
        </h2>

        <p className="whc-description">
          We are committed to providing accurate diagnostics and exceptional patient care. Visit our laboratory during our operating hours or contact us for assistance.
        </p>

        <ul className="whc-features" aria-label="Key features">
          {features.map((f, i) => (
            <li key={f} className="whc-feature" style={{ "--i": i }}>
              <span className="whc-check" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>

      </div>

      {/* ── RIGHT COLUMN ────────────────────────────────────────── */}
      <div className="whc-right">
        {/* gradient glow rings */}
        <div className="whc-glow whc-glow-1" aria-hidden="true"/>
        <div className="whc-glow whc-glow-2" aria-hidden="true"/>

        <div className="whc-card">
          <div className="whc-card-header">
            <div className="whc-card-title-group">
              <div className="whc-card-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="whc-card-eyebrow">Wellcare Advanced Laboratory</p>
                <h3 className="whc-card-title">Business Hours</h3>
              </div>
            </div>
            <span className={`whc-status-badge${open ? " whc-status-open" : " whc-status-closed"}`}>
              <span className="whc-status-dot" aria-hidden="true"/>
              {open ? "Open Now" : "Closed"}
            </span>
          </div>

          <div className="whc-divider" aria-hidden="true"/>

          <ul className="whc-schedule" role="list">
            {schedule.map(({ day, hours }, i) => {
              const isToday  = i === todayIndex;
              const isClosed = hours === "Closed";
              return (
                <li key={day} className={`whc-row${isToday ? " whc-row-today" : ""}${isClosed ? " whc-row-closed" : ""}`} style={{ "--ri": i }}>
                  <span className="whc-row-day">
                    {isToday && <span className="whc-today-pip" aria-label="today" />}
                    {day}
                  </span>
                  <span className="whc-row-hours">{hours}</span>
                </li>
              );
            })}
          </ul>

 
        </div>
      </div>
    </section>
  );
}