import { Post } from '@prisma/client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export const getPost = async ({
  postId,
}: {
  postId: string;
}): Promise<Post> => {
  return await axios.get(`/posts/${postId}`);
};

type QueryFnType = typeof getPost;

type UsePostOptions = {
  postId: string;
  config?: QueryConfig<QueryFnType>;
};

export const usePost = ({
  postId,
  config,
}: UsePostOptions): UseQueryResult<Post, unknown> => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['post', postId],
    queryFn: async () => await getPost({ postId }),
  });
};
