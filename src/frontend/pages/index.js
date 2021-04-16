import Head from 'next/head';
import Sidebar from '../components/sidebar';
import TrafficList from "../components/traffic";
import ConfigList from "../components/ConfigList";

export default function Home() {
  return (
    <div className="App h-screen flex overflow-hidden bg-gray-100">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
        
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
            Performance Snapshot
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <TrafficList />
            </div>
          </div>
        </div>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
            Protected Endpoints
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <ConfigList />
            </div>
          </div>
        </div>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Activity Log</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              {/* <EventsList /> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
