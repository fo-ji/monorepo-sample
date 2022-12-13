import { FC } from 'react';
import { usePosts } from '../api/getPosts';

export const PostsList: FC = () => {
  const postsQuery = usePosts();

  if (postsQuery?.data?.length === undefined) {
    return <div>記事がありません</div>;
  }

  return (
    <ul className="flex flex-col space-y-3">
      {postsQuery.data.map((post) => (
        <li key={post.id} className="w-full bg-white p-4 shadow-sm">
          <div>
            <span className="text-xs font-semibold">{post.title}</span>
          </div>
          <div>{post.createdAt.toString()}</div>
          <div>{post.text}</div>
        </li>
      ))}
    </ul>
  );
};
