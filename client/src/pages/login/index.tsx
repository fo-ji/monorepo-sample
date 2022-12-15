import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Link } from '@/components/Elements';

import { LogInForm } from '@/features/auth/components';

const LogIn: NextPage = () => {
  const router = useRouter();

  return (
    <div className="p-10">
      <h1 className="text-center text-gray-800">LogIn</h1>
      <Link href="/">Back</Link>
      <LogInForm
        onSuccess={async (id: string) => await router.push(`/mypage/${id}`)}
      />
    </div>
  );
};

export default LogIn;
