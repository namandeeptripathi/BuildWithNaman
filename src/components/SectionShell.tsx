import type { ReactNode } from 'react'

interface Props {
  id: string
  label: string
  children: ReactNode
  /** Override the default padding-top collapse from .sec + .sec */
  first?: boolean
  className?: string
  adornment?: ReactNode
}

/**
 * Two-column editorial section shell:
 * left column = mono uppercase label (brass), right column = content.
 * Stacks on ≤ 820 px via CSS.
 */
export default function SectionShell({
  id,
  label,
  children,
  first,
  className = '',
  adornment,
}: Props) {
  return (
    <section
      className={`sec ${className}`.trim()}
      id={id}
      style={first ? { paddingTop: 'clamp(48px, 7vw, 96px)' } : undefined}
    >
      <h2 className="label mono">{label}</h2>
      <div>{children}</div>
      {adornment}
    </section>
  )
}

