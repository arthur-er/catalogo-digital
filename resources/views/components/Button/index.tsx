import styled from '@/scripts/styled'

const Button = styled('button', {
  className:
    'rounded-lg transition font-medium text-sm flex px-6 items-center justify-center space-x-4 focus:outline-none',
  variants: {
    variant: {
      text: 'hover:underline',
    },
    size: {
      lg: 'py-3 px-8',
      base: 'py-2 px-6',
      sm: 'py-1 px-2',
      xs: 'py-0 px-0',
    },
    text: {
      primary: 'text-primary-500',
      secondary: 'text-gray-900 disabled:text-gray-500',
      danger: 'text-red-500',
      white: 'text-white',
    },
    border: {
      primary: 'border border-primary-500',
      secondary: 'border border-gray-300 hover:border-gray-900 disabled:hover:border-gray-300',
      danger: 'border border-red-500',
    },
    bg: {
      primary: 'bg-primary-500 hover:bg-primary-700 disabled:bg-opacity-50',
      secondary: 'bg-gray-500 hover:bg-gray-700 disabled:bg-opacity-50',
      danger: 'bg-red-500 hover:bg-red-700 disabled:bg-opacity-50',
      transparent: 'bg-transparent',
    },
  },
  compoundVariants: [
    {
      text: 'secondary',
      border: 'secondary',
      bg: 'transparent',
      classes: 'disabled:bg-gray-300 disabled:hover:no-underline',
    },
  ],
  defaultVariants: {
    size: 'base',
    text: 'white',
    bg: 'primary',
  },
})

export default Button
