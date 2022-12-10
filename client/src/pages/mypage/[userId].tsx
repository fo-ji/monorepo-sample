import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Button } from '@/components/Elements/Button';
import { Link } from '@/components/Elements/Link';
import { useLogOut } from '@/features/auth/api/logOut';
import { useAuth } from '@/lib/auth';

const MyPage: NextPage = () => {
  const { user } = useAuth();
  const { logOut } = useLogOut();
  const router = useRouter();

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
    </div>
  );
};

export default MyPage;
