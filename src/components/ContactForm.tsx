import { useState, useRef, useCallback } from 'react'

interface Props {
  email: string
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error' | 'not-connected'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TIMEOUT_MS = 15000

export default function ContactForm({ email }: Props) {
  const [name, setName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<FormErrors>({})
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [copyLabel, setCopyLabel] = useState('Copy')

  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const isSubmittingRef = useRef(false)

  const validateField = (field: 'name' | 'email' | 'message', value: string): string | undefined => {
    const trimmed = value.trim()
    if (field === 'name') {
      if (!trimmed) return 'Name is required.'
    } else if (field === 'email') {
      if (!trimmed) return 'Email is required.'
      if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address.'
    } else if (field === 'message') {
      if (!trimmed) return 'Message is required.'
      if (trimmed.length < 10) return 'Message must be at least 10 characters.'
    }
    return undefined
  }

  const validateAll = (): FormErrors => {
    const errs: FormErrors = {}
    const nameErr = validateField('name', name)
    const emailErr = validateField('email', userEmail)
    const msgErr = validateField('message', message)

    if (nameErr) errs.name = nameErr
    if (emailErr) errs.email = emailErr
    if (msgErr) errs.message = msgErr

    return errs
  }

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    if (!hasSubmitted) return
    const value = field === 'name' ? name : field === 'email' ? userEmail : message
    const err = validateField(field, value)
    setErrors((prev) => ({
      ...prev,
      [field]: err,
    }))
  }

  const handleCopyEmail = useCallback(() => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        setCopyLabel('Copied')
        clearTimeout(copyTimerRef.current)
        copyTimerRef.current = setTimeout(() => setCopyLabel('Copy'), 1800)
      })
    }
  }, [email])

  const handleReset = () => {
    setStatus('idle')
    setName('')
    setUserEmail('')
    setMessage('')
    setHoneypot('')
    setErrors({})
    setHasSubmitted(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Prevent double submits
    if (isSubmittingRef.current || status === 'sending') return

    setHasSubmitted(true)
    const errs = validateAll()
    setErrors(errs)

    if (Object.keys(errs).length > 0) {
      // Focus first field with error
      if (errs.name) {
        document.getElementById('contact-name')?.focus()
      } else if (errs.email) {
        document.getElementById('contact-email')?.focus()
      } else if (errs.message) {
        document.getElementById('contact-message')?.focus()
      }
      return
    }

    // Spam honeypot protection: if filled, pretend success without sending
    if (honeypot.trim() !== '') {
      setStatus('success')
      setName('')
      setUserEmail('')
      setMessage('')
      setHoneypot('')
      setErrors({})
      setHasSubmitted(false)
      return
    }

    const formspreeId = (import.meta.env.VITE_FORMSPREE_ID || '').trim()

    // If VITE_FORMSPREE_ID is not configured
    if (!formspreeId) {
      setStatus('not-connected')
      return
    }

    isSubmittingRef.current = true
    setStatus('sending')

    const controller = new AbortController()
    const timer = setTimeout(() => {
      controller.abort()
    }, TIMEOUT_MS)

    try {
      const formData = new FormData()
      formData.append('name', name.trim())
      formData.append('email', userEmail.trim())
      formData.append('message', message.trim())

      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
        signal: controller.signal,
      })

      clearTimeout(timer)

      if (response.ok) {
        setStatus('success')
        setName('')
        setUserEmail('')
        setMessage('')
        setErrors({})
        setHasSubmitted(false)
      } else {
        setStatus('error')
      }
    } catch {
      clearTimeout(timer)
      setStatus('error')
    } finally {
      isSubmittingRef.current = false
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-status-card contact-success-card" role="status" aria-live="polite">
        <p className="contact-status-message">Thanks, your message is on its way.</p>
        <button
          type="button"
          onClick={handleReset}
          className="contact-text-btn mono"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <div className="contact-form-container">
      {status === 'not-connected' && (
        <div
          className="contact-status-card contact-info-card"
          role="status"
          aria-live="polite"
        >
          <p className="contact-status-message">
            Contact form is not connected yet. Please email me directly:
          </p>
          <div className="contact-status-email-row">
            <span className="mail mono">{email}</span>
            <button
              type="button"
              className="copy"
              onClick={handleCopyEmail}
            >
              {copyLabel}
            </button>
            <a className="lnk" href={`mailto:${email}`}>
              Write an email ↗
            </a>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div
          className="contact-status-card contact-error-card"
          role="status"
          aria-live="polite"
        >
          <p className="contact-status-message">
            Something went wrong. You can also email me directly:
          </p>
          <div className="contact-status-email-row">
            <span className="mail mono">{email}</span>
            <button
              type="button"
              className="copy"
              onClick={handleCopyEmail}
            >
              {copyLabel}
            </button>
            <a className="lnk" href={`mailto:${email}`}>
              Write an email ↗
            </a>
          </div>
        </div>
      )}

      <form
        className="contact-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Send a message"
      >
        {/* Spam protection honeypot */}
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="contact-hp">Leave this empty</label>
          <input
            id="contact-hp"
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="contact-field">
          <label htmlFor="contact-name" className="contact-label mono">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            className="contact-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (hasSubmitted && errors.name) {
                setErrors((prev) => ({ ...prev, name: validateField('name', e.target.value) }))
              }
            }}
            onBlur={() => handleBlur('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name && (
            <span id="contact-name-error" className="contact-error mono" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="contact-email" className="contact-label mono">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            className="contact-input"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value)
              if (hasSubmitted && errors.email) {
                setErrors((prev) => ({ ...prev, email: validateField('email', e.target.value) }))
              }
            }}
            onBlur={() => handleBlur('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email && (
            <span id="contact-email-error" className="contact-error mono" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="contact-message" className="contact-label mono">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            className="contact-input contact-textarea"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              if (hasSubmitted && errors.message) {
                setErrors((prev) => ({ ...prev, message: validateField('message', e.target.value) }))
              }
            }}
            onBlur={() => handleBlur('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
          />
          {errors.message && (
            <span id="contact-message-error" className="contact-error mono" role="alert">
              {errors.message}
            </span>
          )}
        </div>

        <div className="contact-action">
          <button
            type="submit"
            className="btn contact-submit-btn"
            disabled={status === 'sending'}
            aria-busy={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>
        </div>
      </form>
    </div>
  )
}
