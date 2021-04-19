import { useEffect } from "react";
import {
  fetchSubdomain
} from "../subdomain/SubdomainSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";

export default function EndpointHeader({ endpointId }) {
  const dispatch = useDispatch();
  const subdomainStatus = useSelector((state) => state.subdomain.status);
  const subdomain = useSelector((state) => state.subdomain.subdomain);

  useEffect(() => {
    if (subdomainStatus === "idle") {
      dispatch(fetchSubdomain());
    }
  }, [subdomainStatus, dispatch]);

  if (subdomainStatus === "done") {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
              Campion Endpoint
              </h3>
              <div className="mt-5">
                <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                  <h4 className="sr-only">Protected</h4>
                  <div className="sm:flex sm:items-start">
                    <svg class="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div className="mt-3 sm:mt-0 sm:ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Protected
                      </div>
                      <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                        <a class="text-indigo-600 hover:text-indigo-500" href={subdomain + endpointId}>
                          {subdomain + endpointId} <span aria-hidden="true">&rarr;</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <Loader />
  }
}
