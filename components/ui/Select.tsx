import { type SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', id, ...props }, ref) => {
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
        <select
          ref={ref}
          id={inputId}
          className={[
            'w-full px-4 py-3 rounded-sm text-sm font-inter',
            'bg-muzo-negro border border-muzo-dorado/30',
            'text-muzo-marfil',
            'focus:outline-none focus:ring-2 focus:ring-muzo-verde focus:border-muzo-verde',
            'transition-colors duration-200',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            'appearance-none cursor-pointer',
            error ? 'border-red-500 focus:ring-red-500' : '',
            className,
          ].join(' ')}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-muzo-negro text-muzo-marfil"
            >
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-red-400 font-inter">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
export default Select
