import { zodResolver } from '@hookform/resolvers/zod'
import { usePage } from '@inertiajs/inertia-react'
import { PropsWithoutRef, useEffect } from 'react'
import { FormProvider, useForm, UseFormProps } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

import Button from '@/views/components/Button'

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  submitText?: string
  className?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult> | void | OnSubmitResult
  initialValues?: UseFormProps<z.infer<S>>['defaultValues']
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = 'FORM_ERROR'

export function Form<Schema extends z.ZodType<any, any>>({
  schema,
  initialValues,
  onSubmit,
  children,
  submitText = 'Enviar',
  className,
  ...props
}: FormProps<Schema>) {
  const ctx = useForm({
    mode: 'all',
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })

  const { errors } = usePage().props

  useEffect(() => {
    if (errors) {
      for (const [key, value] of Object.entries(errors)) {
        if (key === FORM_ERROR) continue

        ctx.setError(key as any, {
          type: 'submit',
          message: value,
        })
      }
    }
  }, [errors])

  return (
    <FormProvider {...ctx}>
      <form
        className={twMerge('flex w-full flex-col space-y-4', className)}
        onSubmit={ctx.handleSubmit(onSubmit)}
        {...props}
      >
        {children}

        {errors && errors[FORM_ERROR] && (
          <div className="rounded border border-red-500 bg-red-200 p-4 text-red-700" role="alert">
            {errors[FORM_ERROR]}
          </div>
        )}

        <Button
          disabled={ctx.formState.isSubmitting || !ctx.formState.isValid}
          type="submit"
          role="submit"
        >
          {ctx.formState.isSubmitting ? 'Enviando...' : submitText}
        </Button>
      </form>
    </FormProvider>
  )
}

export default Form
