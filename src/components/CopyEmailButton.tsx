import { useCallback, useRef, useState } from 'react'

interface Props {
  email: string
}

export default function CopyEmailButton({ email }: Props) {
  const [label, setLabel] = useState('Copy')
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const emailRef = useRef<HTMLSpanElement>(null)

  const flash = useCallback((text: string) => {
    setLabel(text)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setLabel('Copy'), 1800)
  }, [])

  const selectEmail = useCallback(() => {
    const el = emailRef.current
    if (!el) return
    const range = document.createRange()
    range.selectNodeContents(el)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
    flash('Selected')
  }, [flash])

  const handleCopy = useCallback(() => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(
        () => flash('Copied'),
        () => selectEmail(),
      )
    } else {
      selectEmail()
    }
  }, [email, flash, selectEmail])

  return (
    <div className="mailrow" aria-label="Direct email contact">
      <span className="mail mono" ref={emailRef} id="email">
        {email}
      </span>
      <button
        className="copy"
        id="copy"
        type="button"
        onClick={handleCopy}
        aria-label={`Copy email address ${email}`}
      >
        {label}
      </button>
      <a
        className="lnk"
        href={`mailto:${email}`}
        aria-label={`Write an email to ${email}`}
      >
        Write an email ↗
      </a>
    </div>
  )
}
