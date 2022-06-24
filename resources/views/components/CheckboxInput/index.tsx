import React, { PropsWithoutRef } from 'react'
import { useFormContext } from 'react-hook-form'

export interface CheckboxInputProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  name: string
  label: string
  tooltip?: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  name,
  tooltip,
  outerProps,
  label,
  ...props
}) => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext()
  const error = Array.isArray(errors[name])
    ? errors[name].join(', ')
    : errors[name]?.message || errors[name]

  return (
    <div {...outerProps}>
      <label className="flex items-center space-x-2">
        <input
          className="rounded text-primary-500"
          type="checkbox"
          disabled={isSubmitting}
          aria-invalid={error !== undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          {...register(name)}
          {...props}
        />
        <span>{label}</span>
      </label>

      {error && (
        <div role="alert" id={`${name}-error`} className="text-xs italic text-red-500">
          {error}
        </div>
      )}

      {tooltip && !error && (
        <p className="mt-2 text-sm text-gray-500" id={`${name}-description`}>
          {tooltip}
        </p>
      )}
    </div>
  )
}

export default CheckboxInput
