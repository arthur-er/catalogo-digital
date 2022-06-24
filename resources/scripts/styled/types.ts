import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
} from 'react'

export type UnknownObject = Record<string, unknown>

export type ExtractVariants<Schema extends UnknownObject> = 'variants' extends keyof Schema
  ? {
      [Name in keyof Schema['variants']]?: keyof Schema['variants'][Name]
    }
  : undefined

export type ExtractSchema<Schema extends UnknownObject> = {
  className?: string
  variants?: {
    [Name in string]: {
      [Variant in string]: string
    }
  }
  compoundVariants?: 'variants' extends keyof Schema
    ? (ExtractVariants<Schema> & { classes: string })[]
    : undefined
  defaultVariants?: 'variants' extends keyof Schema ? ExtractVariants<Schema> : undefined
}

export type Builder<Schema extends UnknownObject> = (options: ExtractVariants<Schema>) => {
  className: string
  props: any
}

// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
export type PropsOf<C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
  JSX.LibraryManagedAttributes<C, ComponentPropsWithoutRef<C>>

type AsProp<C extends ElementType> = {
  as?: C
}

export type ExtendableProps<ExtendedProps = {}, OverrideProps = {}> = OverrideProps &
  Omit<ExtendedProps, keyof OverrideProps>

export type InheritableElementProps<C extends ElementType, Props = {}> = ExtendableProps<
  PropsOf<C>,
  Props
>

export type PolymorphicComponentProps<C extends ElementType, Props = {}> = InheritableElementProps<
  C,
  Props & AsProp<C>
>

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref']

export type PolymorphicComponentPropsWithRef<
  C extends ElementType,
  Props = {}
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> }

export type StyledComponentProps<
  C extends ElementType,
  S extends UnknownObject
> = PolymorphicComponentPropsWithRef<C, ExtractVariants<S>> & { children?: ReactNode }

export type StyledComponent<DefaultComponent extends ElementType, Schema extends UnknownObject> = <
  C extends ElementType = DefaultComponent,
  S extends UnknownObject = Schema
>(
  props: StyledComponentProps<C, S>
) => ReactElement | null
