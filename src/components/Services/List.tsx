import Card from './Card';
import { MonitoredService } from '../../constants/frontendTypes';

const List = () => {
  const services: MonitoredService[] = [
    { name: 'postgres-metrics' },
    { name: 'nginx-logs' },
    { name: 'custom-application' },
    { name: 'apache-logs' },
    { name: 'mongo-metrics' },
    { name: 'host-metrics' },
  ];

  return (
    <div>
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
          Services Monitored by Dendro
      </h2>

      <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => <Card service={service} key={service.name} />)}
      </ul>
    </div>
  );
};

export default List;
