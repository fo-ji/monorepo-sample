import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Link } from '@/components/Elements/Link';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

const SignUp: NextPage = () => {
  const router = useRouter();

  return (
    <div className="p-10">
      <h1 className="text-center text-gray-800">SignUp</h1>
      <Link href="/">Back</Link>
      <RegisterForm
        onSuccess={async (id: string) => await router.push(`/mypage/${id}`)}
      />
    </div>
  );
};

export default SignUp;
