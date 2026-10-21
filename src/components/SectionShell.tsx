import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLElement> {
  id: string
  label: ReactNode
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
const SectionShell = forwardRef<HTMLElement, Props>(function SectionShell(
  {
    id,
    label,
    children,
    first,
    className = '',
    adornment,
    style,
    ...rest
  },
  ref
) {
  return (
    <section
      ref={ref}
      className={`sec ${className}`.trim()}
      id={id}
      style={{
        ...(first ? { paddingTop: 'clamp(48px, 7vw, 96px)' } : {}),
        ...style,
      }}
      {...rest}
    >
      <h2 className="label mono">{label}</h2>
      <div>{children}</div>
      {adornment}
    </section>
  )
})

export default SectionShell

