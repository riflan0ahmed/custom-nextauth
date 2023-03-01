import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken, getSession, signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  username: string;
  password: string;
};

export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (formData, e) => {
    await signIn('credentials', { ...formData });
  };

  return (
    <form className="container mx-auto flex justify-center items-center h-screen" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 items-center">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className=" border"
            {...register('username', {
              value: 'riflan0ahmed@gmail.com',
              required: { value: true, message: 'Email must be required' },
            })}
          />

          {errors.username ? <span className="text-xs text-red-500">{errors.username.message}</span> : null}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className=" border"
            {...register('password', {
              value: '12345678',
              required: { value: true, message: 'Password must be required' },
              minLength: {
                value: 8,
                message: 'Email must be minimum of 8 characters',
              },
            })}
          />
          {errors.password ? <span className="text-xs text-red-500">{errors.password.message}</span> : null}
        </div>

        <button type="submit" className="bg-green-500 capitalize w-40 text-white font-semibold p-2 rounded-md">
          Sign in
        </button>
      </div>
    </form>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return;
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
