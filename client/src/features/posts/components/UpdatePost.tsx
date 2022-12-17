import { FC } from 'react';
import { useRouter } from 'next/router';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField, TextAreaField } from '@/components/Form';

import { usePost } from '../api/getPost';
import { useUpdatePost } from '../api/updatePost';
import type { UpdatePostDTO } from '../api/updatePost';

const schema = z.object({
  title: z.string().min(1, { message: '必須項目です' }),
  text: z.string().min(1, { message: '必須項目です' }),
});

interface UpdatePostProps {
  postId: string;
}

export const UpdatePost: FC<UpdatePostProps> = ({ postId }) => {
  const postQuery = usePost({ postId });
  const updatePostMutation = useUpdatePost();
  const router = useRouter();

  if (postQuery.data === undefined) return null;

  return (
    <Form<UpdatePostDTO['data'], typeof schema>
      onSubmit={async (values) => {
        await updatePostMutation.mutateAsync({ data: values, postId });
        router.back();
      }}
      options={{
        defaultValues: {
          title: postQuery.data?.title,
          text: postQuery.data?.text,
        },
      }}
      schema={schema}
    >
      {({ register, formState }) => (
        <>
          <InputField
            type="text"
            label="title"
            error={formState.errors.title}
            registration={register('title')}
          />
          <TextAreaField
            label="text"
            error={formState.errors.text}
            registration={register('text')}
          />
          <div className="text-center">
            <Button type="submit">Submit</Button>
          </div>
        </>
      )}
    </Form>
  );
};
