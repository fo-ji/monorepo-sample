import type { FC } from 'react';
import * as z from 'zod';
import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useLogIn } from '../api/logIn';
import { useRegister } from '../api/register';

const schema = z.object({
  name: z
    .string()
    .min(1, { message: '必須項目です' })
    .max(50, { message: '50文字以内で入力してください' }),
  email: z
    .string()
    .min(1, { message: '必須項目です' })
    .email({ message: 'メールアドレスの形式で入力してください' }),
  password: z
    .string()
    .min(6, { message: '6文字以上で入力してください' })
    .max(32, { message: '32文字以内で入力してください' })
    .regex(/^[A-Za-z0-9]*$/, { message: '半角英数字で入力してください' }),
});

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

interface RegisterFormProps {
  onSuccess: (id: string) => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register } = useRegister();
  const { logIn } = useLogIn();

  return (
    <div className="p-20">
      <Form<RegisterValues, typeof schema>
        onSubmit={async (values) => {
          // MEMO: 自動ログイン これで良いのか
          // const user = await register(values);
          await register(values);
          const user = await logIn({
            email: values.email,
            password: values.password,
          });
          onSuccess(user.id);
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="email"
              label="email"
              error={formState.errors.email}
              registration={register('email')}
            />
            <InputField
              type="text"
              label="name"
              error={formState.errors.name}
              registration={register('name')}
            />
            <InputField
              type="password"
              label="password"
              error={formState.errors.password}
              registration={register('password')}
            />
            <div className="text-center">
              <Button type="submit">Submit</Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
