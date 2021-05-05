import ApacheLogsCharts from './ApacheLogs/Charts';
import HostMetricsCharts from './HostMetrics/Charts';
import MongoMetricsCharts from './MongoMetrics/Charts';
import NginxLogsCharts from './NginxLogs/Charts';
import PostgresMetricsCharts from './PostgresMetrics/Charts';

interface Props {
  name: string
}

export default function ChartSwitcher({ name: camelCaseName }: Props) {
  const name = camelCaseName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map((i) => i[0].toUpperCase() + i.slice(1))
    .join(' ');

  switch (camelCaseName) {
    case 'apacheAccessLogs':
      return <ApacheLogsCharts name={name} />;
    case 'nginxAccessLogs':
      return <NginxLogsCharts name={name} />;
    case 'mongoMetrics':
      return <MongoMetricsCharts />;
    case 'postgresLogs':
      return <PostgresMetricsCharts />;
    case 'hostMetrics':
      return <HostMetricsCharts />;
    default:
      return null;
  }
}
