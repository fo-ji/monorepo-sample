import type { FC, PropsWithChildren } from 'react';
import type { FieldError } from 'react-hook-form';

export interface FieldWrapperPassThroughProps {
  error?: FieldError | undefined;
  label?: string;
}

interface FieldWrapperProps
  extends FieldWrapperPassThroughProps,
    PropsWithChildren {}

export const FieldWrapper: FC<FieldWrapperProps> = ({
  children,
  error,
  label,
}) => (
  <div>
    <label className="block">
      <span className="text-gray-800">{label}</span>
      {children}
    </label>
    <div
      role="alert"
      className="h-8 py-1 text-right text-xs font-semibold text-red-500 sm:py-2 sm:text-sm"
    >
      {error?.message}
    </div>
  </div>
);
