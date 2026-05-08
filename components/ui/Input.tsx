import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-inter text-muzo-dorado/80 tracking-wide"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'w-full px-4 py-3 rounded-sm text-sm font-inter',
            'bg-white/5 border border-muzo-dorado/30',
            'text-muzo-marfil placeholder:text-muzo-marfil/30',
            'focus:outline-none focus:ring-2 focus:ring-muzo-verde focus:border-muzo-verde',
            'transition-colors duration-200',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            error ? 'border-red-500 focus:ring-red-500' : '',
            className,
          ].join(' ')}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 font-inter">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
