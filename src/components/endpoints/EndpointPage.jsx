import { useLocation } from "react-router-dom";
import EventsList from "../Event/List";
import TrafficList from "../traffic/TrafficList";
import EndpointChart from "./EndpointChart";
import EndpointHeader from "./EndpointHeader";
import ConfigCard from "./ConfigCard";

export default function EndpointPage() {
  const endpointId = useLocation().search.slice(4);
  return (
    <div>
      <EndpointHeader endpointId={endpointId}/>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Service Configuration
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <ConfigCard endpointId={endpointId} />
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Performance Snapshot
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <TrafficList endpointId={endpointId} />
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Traffic</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <EndpointChart endpointId={endpointId} />
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Activity Log</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <EventsList endpointId={endpointId} />
          </div>
        </div>
      </div>
    </div>
  );
}
