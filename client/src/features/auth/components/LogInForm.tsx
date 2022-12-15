import type { FC } from 'react';
import * as z from 'zod';
import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useLogIn } from '../api/logIn';

const schema = z.object({
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

type LogInValues = {
  email: string;
  password: string;
};

interface LogInFormProps {
  onSuccess: (id: string) => void;
}

export const LogInForm: FC<LogInFormProps> = ({ onSuccess }) => {
  const { logIn } = useLogIn();

  return (
    <div className="p-20">
      <Form<LogInValues, typeof schema>
        onSubmit={async (values) => {
          const user = await logIn(values);
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
