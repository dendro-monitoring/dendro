import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  const [services, setServices] = useState([]);

  useEffect(()=> {
    (async () => {
      console.log('hit');
      const res = await fetch("/api/tables");
      const { tableNames } = await res.json();
      setServices(tableNames);
    })();
  }, []);

  pageProps.services = services;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="App h-screen flex overflow-hidden bg-gray-100">
        <Sidebar services={services} />

        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp;
