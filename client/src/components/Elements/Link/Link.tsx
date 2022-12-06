import type { FC, PropsWithChildren } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

interface LinkProps extends NextLinkProps, PropsWithChildren {
  className?: string;
  target?: string;
}

export const Link: FC<LinkProps> = ({
  children,
  className = 'text-blue-600 underline hover:opacity-40',
  target = '_self',
  ...props
}) => (
  <NextLink
    className={className}
    target={target}
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </NextLink>
);
