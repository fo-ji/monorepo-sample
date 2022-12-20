import { FC } from 'react';
import { Pagination } from '@/components/Pagination';
import { usePosts } from '../api/getPosts';
import { usePaginate } from '@/hooks/usePaginate';

export const PostsList: FC = () => {
  const { page } = usePaginate();
  const postsQuery = usePosts({ page });

  // TODO: ページネーションコンポーネントを更新した後にどのように再フェッチさせるか

  if (postsQuery?.data?.length === 0) <div>記事がありません</div>;

  return (
    <ul className="flex flex-col space-y-3">
      {postsQuery?.data?.map((post) => (
        <li key={post.id} className="w-full bg-white p-4 shadow-sm">
          <div>
            <span className="text-xs font-semibold">{post.title}</span>
          </div>
          <div>{post.createdAt.toString()}</div>
          <div>{post.text}</div>
        </li>
      ))}
      <div className="p-5 text-center">
        {postsQuery.data != null && <Pagination data={postsQuery.data} />}
      </div>
    </ul>
  );
};
