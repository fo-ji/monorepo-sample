import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = 'rounded bg-gray-500 py-2 px-4 font-bold text-white hover:opacity-75',
      type = 'button',
      ...props
    },
    ref
  ) => (
    <button ref={ref} className={className} type={type} {...props}>
      {children}
    </button>
  )
);
