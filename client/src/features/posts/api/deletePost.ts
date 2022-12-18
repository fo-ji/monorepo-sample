import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { Post } from 'prisma/prisma-client';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export type DeletePostDTO = {
  postId: string;
};

export const deletePost = async ({ postId }: DeletePostDTO): Promise<void> => {
  return await axios.delete(`/posts/${postId}`);
};

type UseDeletePostOptions = {
  userId: string;
  config?: MutationConfig<typeof deletePost>;
};

export const useDeletePost = ({
  userId,
  config,
}: UseDeletePostOptions): UseMutationResult<
  unknown,
  AxiosError,
  DeletePostDTO,
  unknown
> => {
  return useMutation({
    onMutate: async (deletePost) => {
      await queryClient.cancelQueries(['myPosts', userId]);

      const previousPosts = queryClient.getQueryData<Post[]>([
        'myPosts',
        userId,
      ]);

      queryClient.setQueriesData(
        ['myPosts', userId],
        previousPosts?.filter((post) => post.id !== deletePost.postId)
      );

      return { previousPosts };
    },
    /* eslint-disable */
    onError: (_, __, context: any) => {
      if (context?.previousPosts !== undefined) {
        queryClient.setQueriesData(['myPosts', userId], context.previousPosts);
      }
      /* eslint-enable */
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['myPosts', userId]);
    },
    ...config,
    mutationFn: deletePost,
  });
};
