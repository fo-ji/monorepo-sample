import { FC } from 'react';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField, TextAreaField } from '@/components/Form';

import { CreatePostDTO, useCreatePost } from '../api/createPost';

const schema = z.object({
  title: z.string().min(1, { message: '必須項目です' }),
  text: z.string().min(1, { message: '必須項目です' }),
});

interface CreatePostProps {
  userId: string;
}

export const CreatePost: FC<CreatePostProps> = ({ userId }) => {
  const createPostMutation = useCreatePost({ userId });

  return (
    <Form<CreatePostDTO, typeof schema>
      onSubmit={async (values) => {
        await createPostMutation.mutateAsync(values);
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
