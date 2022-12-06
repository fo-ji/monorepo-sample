// import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { Link } from '@/components/Elements/Link';

// TODO: SSRの実装
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { userId } = ctx.params;
//   const { user } = await getUser(userId);

//   if (!user) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { user },
//   };
// };

// TODO: ログアウトの実装
const MyPage: NextPage = () => {
  // const MyPage: NextPage = ({ user }) => {
  // console.log({ user });

  return (
    <div className="p-10">
      <h1 className="text-center text-gray-800">MyPage</h1>
      <div>{/* <p>{user.name}</p> */}</div>
      <Link href="/">Top</Link>
    </div>
  );
};

export default MyPage;
