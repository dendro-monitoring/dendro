import Link from 'next/link';
import { MonitoredService } from '../../constants/frontendTypes';

const COLORS = {
  'apacheMetrics': 'red-600',
  'apacheAccessLogs': 'red-600',
  'apacheErrorLogs': 'red-600',
  'customApplication': 'pink-600',
  'hostMetrics': 'yellow-600',
  'mongoMetrics': 'purple-600',
  'mongoLogs': 'purple-600',
  'nginxMetrics': 'green-600',
  'nginxAccessLogs': 'green-600',
  'nginxErrorLogs': 'green-600',
  'postgresMetrics': 'indigo-600',
  'postgresLogs': 'indigo-600',
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

  const name = service.name.replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map((i) => i[0].toUpperCase() + i.slice(1))
    .join(' ');

  return (
    <Link href={`/metrics#${service.name}`}>
      <a>
        <li className="col-span-1 flex shadow-sm hover:shadow-md rounded-md">
          <div
            className={`flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md bg-${COLORS[service.name]}`}
          >
            {name[0]}
          </div>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <p className="text-gray-900 font-medium">
                {name}
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
