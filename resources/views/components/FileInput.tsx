import { ExclamationCircleIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import React, { PropsWithoutRef } from 'react'
import { useController, useFormContext } from 'react-hook-form'

export interface FileInputProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  name: string
  label: string
  tooltip?: string
}

const FileInput: React.FC<FileInputProps> = ({
  name,
  tooltip,
  label,
  multiple = false,
  ...props
}) => {
  const {
    formState: { isSubmitting, errors },
    control,
  } = useFormContext()

  const {
    field: { onChange },
  } = useController({ name, control })
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
            'file:bg-primary-500 file:outline-none file:border-0 file:rounded-full file:px-4 file:text-white file:text-sm file:font-medium file:hover:cursor-pointer file:py-1',
            error !== undefined
              ? 'border-red-300 pr-10 text-red-900 placeholder-red-300  focus:border-red-500 focus:ring-red-500'
              : 'focus:border-primary-500 focus:ring-primary-500'
          )}
          id={name}
          type="file"
          aria-invalid={error !== undefined}
          aria-describedby={error ? `${name}-error` : tooltip ? `${name}-description` : undefined}
          disabled={isSubmitting}
          onChange={({ target }) =>
            multiple ? onChange(Array.from(target.files)) : onChange(target.files[0])
          }
          {...props}
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

export default FileInput
