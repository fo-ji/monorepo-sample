import type { FC } from 'react';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {}

export const Button: FC<ButtonProps> = ({
  children,
  className = 'rounded bg-gray-500 py-2 px-4 font-bold text-white hover:opacity-75',
  type = 'button',
  ...props
}) => (
  <button className={className} type={type} {...props}>
    {children}
  </button>
);
