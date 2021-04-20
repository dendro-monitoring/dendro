import moment from "moment";
import { useEffect } from "react";
import {
  fetchConfigurations
} from "../configs/ConfigurationsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";

export default function ConfigCard({ endpointId }) {
  const dispatch = useDispatch();
  const configStatus = useSelector((state) => state.configurations.status);
  const config = useSelector(
    (state) => state.configurations.entities[endpointId]
  );

  useEffect(() => {
    if (configStatus === "idle") {
      dispatch(fetchConfigurations());
    }
  }, [configStatus, dispatch]);

  function capitalize(str) {
    return str[0] + str.slice(1).toLowerCase();
  }

  if (configStatus === "done") {
    const state = config.CIRCUIT_STATE;
    let pillColor;

    if (state === 'CLOSED') {
      pillColor = 'bg-green-500';
    } else if (state === 'OPEN' || state === 'FORCED-OPEN') {
      pillColor = 'bg-red-500';
    } else if (state === 'HALF-OPEN') {
      pillColor = 'bg-yellow-500';
    }

    return (
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {config.NAME}
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">{endpointId}</p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">Current State</dt>
                <dd class="mt-1 text-m text-gray-900 sm:mt-0 sm:col-span-2">
                  <div class={"rounded-full h-6 w-1/3 mt-2 py-1 text-center font-semibold text-xs text-white " + pillColor}>{capitalize(state)}</div>
                </dd>
              </div>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">
                  Breaker State Last Updated
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {moment(config.UPDATED_TIME).fromNow()}
                </dd>
              </div>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">Error Timeout</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {config.ERROR_TIMEOUT} sec
                </dd>
              </div>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">Max Latency</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {config.MAX_LATENCY} ms
                </dd>
              </div>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">
                Network Failure Threshold
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {config.NETWORK_FAILURE_THRESHOLD}
                </dd>
              </div>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">
                Service Failure Threshold
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {config.SERVICE_FAILURE_THRESHOLD}
                </dd>
              </div>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">
                  Half-Open Request Percentage
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {config.PERCENT_OF_REQUESTS}%
                </dd>
              </div>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">
                  # of Successes to Re-Close Circuit
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {config.SUCCESS_THRESHOLD}
                </dd>
              </div>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">
                  Request Tracking Timespan
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {config.TIMESPAN} sec
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}
