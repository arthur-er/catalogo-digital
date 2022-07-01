import clsx from 'clsx'

import { Builder, ExtractSchema, ExtractVariants, UnknownObject } from './types'

const isBoolean = (maybeBoolean) => typeof maybeBoolean === 'boolean'
const toStringIfBoolean = (value) => (isBoolean(value) ? String(value) : value)
const isSimpleSubset = (a, b) => Object.entries(a).every(([key, value]) => b[key] === value)

export default function classListBuilder<Schema extends UnknownObject>(
  schema: ExtractSchema<Schema> = {}
): Builder<Schema> {
  return function builder(options: ExtractVariants<Schema> | {} = {}) {
    const { className, defaultVariants = {}, variants = {}, compoundVariants = [] } = schema

    const optionsWithUndefinedsRemoved = Object.entries(options).reduce((acc, [key, value]) => {
      if (value === undefined) {
        return acc
      }

      acc[key] = value
      return acc
    }, {})

    const currentOptions = {
      ...defaultVariants,
      ...optionsWithUndefinedsRemoved,
    }

    const classes = clsx([
      className,
      Object.keys(variants).map(
        (variantName) =>
          variants[variantName][
            toStringIfBoolean(options[variantName]) || defaultVariants[variantName]
          ]
      ),
      // @ts-expect-error
      compoundVariants.reduce<string[]>((list, { classes, ...compoundVariantOptions }) => {
        if (isSimpleSubset(compoundVariantOptions, currentOptions)) {
          // @ts-expect-error
          list.push(classes)
        }
        return list
      }, []),
    ])

    const props: Record<string, unknown> = {}

    for (const prop in options as any) {
      if (variants[prop] === undefined) {
        props[prop] = options[prop]
      }
    }

    return { className: classes, props }
  }
}
