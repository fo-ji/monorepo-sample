import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Button, Link, SearchInput } from '@/components/Elements';
import { useLogOut } from '@/features/auth/api/logOut';
import { CreatePost, MyPostsList } from '@/features/posts/components';
import { useSearchKeyword } from '@/hooks/useSearchKeyword';
import { useAuth } from '@/lib/auth';

const MyPage: NextPage = () => {
  const { user } = useAuth();
  const { logOut } = useLogOut();
  const { keyword, search } = useSearchKeyword();
  const router = useRouter();

  // TODO: login redirect
  if (router.query.userId !== user?.id) return <div>unAuth..</div>;

  return (
    <div className="p-10">
      <h1 className="text-center text-gray-800">MyPage</h1>
      <div className="text-right">
        <p>
          <span>ユーザー名：</span>
          <span>{user?.name}</span>
        </p>
      </div>
      <div className="flex gap-10">
        <Link href="/">Top</Link>
        <Button
          onClick={async () => {
            await logOut();
            await router.push('/');
          }}
        >
          LogOut
        </Button>
      </div>

      {user !== undefined && (
        <div className="flex flex-col gap-10">
          <div className="text-center">
            <SearchInput keyword={keyword} onChange={search} />
            <h2 className="text-xl font-bold text-blue-500">一覧</h2>
            <MyPostsList userId={user.id} keyword={keyword} />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-blue-500">新規作成</h2>
            <CreatePost userId={user.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
