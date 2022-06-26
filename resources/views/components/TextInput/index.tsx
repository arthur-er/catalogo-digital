import { ExclamationCircleIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import React, { PropsWithoutRef } from 'react'
import { useFormContext } from 'react-hook-form'

export interface TextInputProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  name: string
  label: string
  tooltip?: string
}

const TextInput: React.FC<TextInputProps> = ({ name, tooltip, label, type = 'text', ...props }) => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext()
  const error = Array.isArray(errors[name])
    ? errors[name].join(', ')
    : errors[name]?.message || errors[name]

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative mt-1">
        <input
          className={clsx(
            'block w-full rounded-md border-gray-300 focus:outline-none sm:text-sm',
            error !== undefined
              ? 'border-red-300 pr-10 text-red-900 placeholder-red-300  focus:border-red-500 focus:ring-red-500'
              : 'focus:border-primary-500 focus:ring-primary-500'
          )}
          id={name}
          type={type}
          aria-invalid={error !== undefined}
          aria-describedby={error ? `${name}-error` : tooltip ? `${name}-description` : undefined}
          disabled={isSubmitting}
          {...register(name)}
          {...props}
          {...register(name, { valueAsNumber: type === 'number' })}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
      {tooltip && !error && (
        <p className="mt-2 text-sm text-gray-500" id={`${name}-description`}>
          {tooltip}
        </p>
      )}
    </div>
  )
}

export default TextInput
