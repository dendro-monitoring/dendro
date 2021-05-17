import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const active =
    'group flex items-center px-2 py-2 text-base font-medium rounded-md text-white bg-gray-900';
  const inactive =
    'group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700';

  return (
    <div className="flex flex-shrink-0 h-full">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img className="w-auto text-white" src="/logo_white.png" alt="Dendro" />
            </div>
            <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
              <Link href="/">

                <a className={router.pathname === '/' ? active : inactive}>
                  <svg
                    className="mr-3 h-6 w-6 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />

                  </svg>
                  Home
                </a>
              </Link>

              <Link href="/metrics">
                <a className={router.pathname === '/metrics' ? active : inactive}>
                  <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Charts
                </a>
              </Link>

              <Link href="/query">
                <a className={router.pathname === '/query' ? active : inactive}>
                  <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Query
                </a>
              </Link>

              {/* {services.map((service) => <Service
                service={service}
                key={service.name}
                active={active}
                inactive={inactive}
              />)} */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
