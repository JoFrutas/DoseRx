interface LogoMarkProps {
  size?: 'small' | 'large'
}

export function LogoMark({ size = 'small' }: LogoMarkProps) {
  return (
    <span className={`logo-mark logo-mark--${size}`} aria-hidden="true">
      <img className="logo-mark__source" src="/doserx-logo.png" alt="" />
    </span>
  )
}
