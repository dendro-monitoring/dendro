export default function TrafficList() {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
          Last 24 hours
      </h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        <div>
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">
                Total Successful Requests
            </dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {/* {totalSuccessRequests} */}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  {/* out of {totalRequests.length} */}
                    out of 100
                </span>
              </div>

              <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
                <svg
                  className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Increased by</span>
                {/* {percentSuccess}% */}
                  50%
              </div>
            </dd>
          </div>
        </div>

        <div>
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">
                Average Request Time
            </dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {/* {averageTime} ms */}
                  100ms
              </div>
            </dd>
          </div>
        </div>

        <div>
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">
                Total Failures
            </dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {/* {totalRequests.length - totalSuccessRequests} */}
                  5
              </div>
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
}
