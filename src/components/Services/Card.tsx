import Link from 'next/link';
import { MonitoredService } from '../../constants/frontendTypes';

const COLORS = {
  "apache-metrics": "red-600",
  "apache-logs": "red-600",
  "custom-application": "pink-600",
  "host-metrics": "yellow-600",
  "mongo-metrics": "purple-600",
  "mongo-logs": "purple-600",
  "nginx-metrics": "green-600",
  "nginx-logs": "green-600",
  "postgres-metrics": "indigo-600",
  "postgres-logs": "indigo-600",
};

const Card = ({ service }: { service: MonitoredService }) => {
  // const backgroundColors = [
  //   "bg-pink-600",
  //   "bg-purple-600",
  //   "bg-yellow-600",
  //   "bg-green-600",
  //   "bg-blue-600",
  //   "bg-red-600",
  //   "bg-indigo-600",
  // ];

  const initials = service.name.split("-")
    .slice(0, 2)
    .map((i) => i[0])
    .join("")
    .toUpperCase();

  return (
    <Link href={`/services/${service.name}`}>
      <a>
        <li className="col-span-1 flex shadow-sm hover:shadow-md rounded-md">
          <div
            className={`flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md bg-${COLORS[service.name]}`}
          >
            {initials}
          </div>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <p className="text-gray-900 font-medium">
                {service.name}
              </p>
              <p className={`text-${COLORS[service.name]}`}>{' '}</p>
            </div>
          </div>
        </li>
      </a>
    </Link>
  );
};

export default Card;
