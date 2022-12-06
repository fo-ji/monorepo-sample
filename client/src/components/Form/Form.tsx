import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { ZodType, ZodTypeDef } from 'zod';

interface FormProps<TFormValues extends FieldValues, Schema> {
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  onSubmit: SubmitHandler<TFormValues>;
  options?: UseFormProps<TFormValues>;
  schema?: Schema;
}

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >
>({
  children,
  onSubmit,
  options,
  schema,
}: FormProps<TFormValues, Schema>): JSX.Element => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema != null ? zodResolver(schema) : undefined,
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
  );
};
