import Login from '@/ui/main/login';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Send and receive Koicoin!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  );
}
