import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { Post } from 'prisma/prisma-client';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export type UpdatePostDTO = {
  data: {
    title: string;
    text: string;
  };
  postId: string;
};

export const updatePost = async ({
  data,
  postId,
}: UpdatePostDTO): Promise<Post> => {
  return await axios.patch(`/posts/${postId}`, data);
};

type UseUpdatePostOptions = {
  config?: MutationConfig<typeof updatePost>;
};

export const useUpdatePost = ({
  config,
}: UseUpdatePostOptions = {}): UseMutationResult<
  Post,
  AxiosError,
  UpdatePostDTO,
  unknown
> => {
  return useMutation({
    onMutate: async (updatingPost) => {
      await queryClient.cancelQueries(['post', updatingPost.postId]);

      const previousPost = queryClient.getQueryData<Post>([
        'post',
        updatingPost.postId,
      ]);

      queryClient.setQueryData(['post', updatingPost.postId], {
        id: updatingPost.postId,
        ...updatingPost,
        ...previousPost,
      });

      return { previousPost };
    },
    onError: (_, __, context: any) => {
      /* eslint-disable */
      if (context?.previousPost !== undefined) {
        queryClient.setQueryData(
          ['post', context.previousPost.id],
          context.previousPost
        );
      }
      /* eslint-enable */
    },
    onSuccess: async (data) => {
      await queryClient.refetchQueries(['post', data.id]);
      alert('success!');
    },
    ...config,
    mutationFn: updatePost,
  });
};
