import type { FC } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

interface InputFieldProps extends FieldWrapperPassThroughProps {
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
  type?: 'text' | 'email' | 'password';
}

export const InputField: FC<InputFieldProps> = ({
  error,
  label,
  placeholder,
  registration,
  type = 'text',
}) => (
  <FieldWrapper label={label} error={error}>
    <input
      type={type}
      className="mt-1 block w-full rounded-md border-gray-900 text-gray-800 shadow-sm placeholder:text-gray-800 placeholder:text-opacity-50"
      placeholder={placeholder}
      {...registration}
    />
  </FieldWrapper>
);
