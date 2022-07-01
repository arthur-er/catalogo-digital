import clsx from 'clsx'
import React, { ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

import classListBuilder from './classListBuilder'
import {
  ExtractSchema,
  PolymorphicRef,
  StyledComponent,
  StyledComponentProps,
  UnknownObject,
} from './types'

export default function styled<
  DefaultElement extends ElementType,
  Schema extends Record<string, unknown>
>(
  defaultElement: DefaultElement,
  schema: Schema & ExtractSchema<Schema>
): StyledComponent<DefaultElement, Schema> {
  const builder = classListBuilder(schema)

  const StyledComponent: StyledComponent<DefaultElement, Schema> = React.forwardRef(
    <C extends React.ElementType = DefaultElement, S extends UnknownObject = Schema>(
      { as, children, ...props }: StyledComponentProps<C, S>,
      ref?: PolymorphicRef<C>
    ) => {
      const { className, props: forwardProps } = builder(props as any)
      const Component = as || defaultElement

      return (
        <Component
          {...forwardProps}
          className={twMerge(clsx(className, forwardProps.className))}
          ref={ref}
        >
          {children}
        </Component>
      )
    }
  )

  return StyledComponent
}
