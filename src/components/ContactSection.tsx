import SectionShell from './SectionShell'
import CopyEmailButton from './CopyEmailButton'
import ContactForm from './ContactForm'
import { profile, contactRows } from '../data'

/**
 * Editorial Contact Section:
 * - Refined display headline with balanced visual hierarchy
 * - Short, natural invitation to connect on backend & AI/ML opportunities
 * - Prominent email address with 1-click Copy and Write Email mailto actions
 * - Cohesive 2-column grid integrating the form and direct channels
 * - Truthful submission feedback and accessible keyboard navigation
 */
export default function ContactSection() {
  return (
    <SectionShell id="contact" label="Contact" className="contact-section">
      <div className="contact-content">
        {/* Contact Introduction */}
        <div className="contact-intro">
          <h2 className="contact-headline">
            Have something worth <em>building?</em>
          </h2>
          <p className="contact-prose">
            Open to software engineering and AI/ML opportunities. Have a project or role in mind? Let’s talk.
          </p>
          <CopyEmailButton email={profile.email} />
        </div>

        {/* Cohesive Contact Grid: Form on left, Direct Channels on right */}
        <div className="contact-grid">
          <div className="contact-form-column">
            <ContactForm email={profile.email} />
          </div>

          <aside className="contact-channels-panel" aria-label="Direct contact channels and details">
            <h3 className="channels-kicker mono">Direct Channels</h3>
            <ul className="channels-list">
              {contactRows.map((row) => (
                <li key={row.label} className="channel-item">
                  <span className="channel-label mono">{row.label}</span>
                  <span className="channel-value mono">
                    {row.url ? (
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener"
                        className="channel-link"
                      >
                        {row.value} ↗
                      </a>
                    ) : (
                      row.value
                    )}
                  </span>
                </li>
              ))}
              {profile.resume?.available && (
                <li className="channel-item">
                  <span className="channel-label mono">Resume</span>
                  <span className="channel-value mono">
                    <a
                      href={profile.resume.url}
                      target="_blank"
                      rel="noopener"
                      className="channel-link"
                      aria-label="Download resume (PDF)"
                    >
                      Download resume ↗
                    </a>
                  </span>
                </li>
              )}
            </ul>
          </aside>
        </div>
      </div>
    </SectionShell>
  )
}
