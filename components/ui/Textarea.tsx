import { type TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
        <textarea
          ref={ref}
          id={inputId}
          className={[
            'w-full px-4 py-3 rounded-sm text-sm font-inter resize-none',
            'bg-white/5 border border-muzo-dorado/30',
            'text-muzo-marfil placeholder:text-muzo-marfil/30',
            'focus:outline-none focus:ring-2 focus:ring-muzo-verde focus:border-muzo-verde',
            'transition-colors duration-200',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            error ? 'border-red-500 focus:ring-red-500' : '',
            className,
          ].join(' ')}
          rows={4}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 font-inter">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
export default Textarea
