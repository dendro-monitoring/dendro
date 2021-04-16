import Link from 'next/link';
const Sidebar = () => {
  // const dispatch = useDispatch();
  // const configurationsStatus = useSelector(
  //   (state) => state.configurations.status
  // );
  // const configurations = useSelector((state) => {
  //   return state.configurations.ids.map(
  //     (id) => state.configurations.entities[id]
  //   );
  // });
  // const path = useLocation().pathname;
  // const search = useLocation().search;
  const path = "/";

  const active =
    "group flex items-center px-2 py-2 text-base font-medium rounded-md text-white bg-gray-900";
  const inactive =
    "group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700";

  return (
    <div>
      <div className="hidden md:flex md:flex-shrink-0 h-full">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img className="h-8 w-auto text-white" src="" alt="Dendro" />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
                <Link href="/">
                  
                  <a className={path === "/" ? active : inactive}>
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
                    </svg>Dashboard</a>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
        <button className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
