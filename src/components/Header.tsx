import { useTheme } from '../lib/useTheme'

interface Props {
  toggle: ReturnType<typeof useTheme>['toggle']
}

export default function Header({ toggle }: Props) {
  return (
    <header className="top">
      <a className="mark" href="#top" aria-label="NDT — Naman Deep Tripathi, back to top">
        NDT
      </a>
      <nav aria-label="Sections">
        <a className="nl" href="#about">About</a>
        <a className="nl" href="#work">Work</a>
        <a className="nl" href="#stack">Stack</a>
        <a className="nl" href="#contact">Contact</a>
        <button
          className="toggle"
          id="theme"
          type="button"
          aria-label="Switch light and dark theme"
          onClick={toggle}
        >
          ◐
        </button>
      </nav>
    </header>
  )
}
