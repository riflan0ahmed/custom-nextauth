import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { data: session } = useSession() as any;

  // return (
  //   <>
  //     <Head>
  //       <title>Custom Next-Auth</title>
  //       <meta name="description" content="Generated by create next app" />
  //       <meta name="viewport" content="width=device-width, initial-scale=1" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>
  //     <main></main>
  //   </>
  // );

  if (session) {
    console.log("session", session);
    return (
      <>
        <Head>
          <title>Custom Next-Auth</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main></main>

        <h1 className=" text-4xl text-black">
          Signed in as {session.user.name}
        </h1>
        <br />
        <img src={session.user.image} alt="" height={200} width={200} />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Custom Next-Auth</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
