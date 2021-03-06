import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import '../css/accordion.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [services, setServices] = useState([]);

  useEffect(()=> {
    (async () => {
      const res = await fetch('/api/tables');
      const { data } = await res.json();
      setServices(data);
    })();
  }, []);

  pageProps.services = services;

  return (
    <>
      <Head>
        <title>Dendro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="App h-screen flex overflow-hidden bg-gray-100">
        <Sidebar />

        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp;
