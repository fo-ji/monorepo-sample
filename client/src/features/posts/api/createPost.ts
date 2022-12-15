import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { Post } from 'prisma/prisma-client';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export type CreatePostDTO = {
  title: string;
  text: string;
};

export const createPost = async (data: CreatePostDTO): Promise<Post> => {
  return await axios.post('/posts/new', data);
};

type UseCreatePostOptions = {
  userId: string;
  config?: MutationConfig<typeof createPost>;
};

export const useCreatePost = ({
  userId,
  config,
}: UseCreatePostOptions): UseMutationResult<
  Post,
  AxiosError,
  CreatePostDTO,
  unknown
> => {
  return useMutation({
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(['myPosts', userId]);

      const previousPosts = queryClient.getQueryData<Post[]>([
        'myPosts',
        userId,
      ]);

      queryClient.setQueriesData(
        ['myPosts', userId],
        [...(previousPosts ?? []), newPost] // MEMO: DTOのフィールドしか存在しないので注意
      );

      return { previousPosts };
    },
    onError: (_, __, context: any) => {
      /* eslint-disable */
      if (context?.previousPosts !== undefined) {
        queryClient.setQueriesData(['myPosts', userId], context.previousPosts);
      }
      /* eslint-enable */
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['myPosts', userId]);
      alert('success!');
    },
    ...config,
    mutationFn: createPost,
  });
};
