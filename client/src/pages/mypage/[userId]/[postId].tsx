import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { UpdatePost } from '@/features/posts/components';
import { useAuth } from '@/lib/auth';

const MyPost: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  // TODO: login redirect
  if (router.query.userId !== user?.id) return <div>unAuth..</div>;

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-blue-500">一覧</h2>
      {/* TODO: これで良いのか */}
      {router.query.postId !== undefined && (
        <UpdatePost postId={router.query.postId as string} />
      )}
    </div>
  );
};

export default MyPost;
