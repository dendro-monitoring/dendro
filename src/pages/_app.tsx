import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import Sidebar from '../components/sidebar';
import { MonitoredService } from '../constants/frontendTypes';

function MyApp({ Component, pageProps }: AppProps) {
  // TODO: Fetch database tables
  const services: MonitoredService[] = [
    { name: 'postgres-metrics' },
    { name: 'nginx-logs' },
    { name: 'custom-application' },
    { name: 'apache-logs' },
    { name: 'mongo-metrics' },
    { name: 'host-metrics' },
  ];

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
