import ApacheLogsCharts from './ApacheLogs/Charts';
import ApacheAccessLogsCharts from './ApacheAccessLogs/Charts';
import ApacheMetricsCharts from './ApacheMetrics/Charts';

import CustomApplicationCharts from './CustomApplication/Charts';

import HostMetricsCharts from './HostMetrics/Charts';

import MongoLogsCharts from './MongoLogs/Charts';
import MongoMetricsCharts from './MongoMetrics/Charts';

import NginxLogsCharts from './NginxLogs/Charts';
import NginxMetricsCharts from './NginxMetrics/Charts';

import PostgresLogsCharts from './PostgresLogs/Charts';
import PostgresMetricsCharts from './PostgresMetrics/Charts';

import Error from './Error';

interface Props {
  name: string
}

export default function ChartSwitcher({ name: camelCaseName }: Props) {
  /**
   * Convert `apacheAccessLogs` to `Apache Access Logs`
   */
  const name = camelCaseName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map((i) => i[0].toUpperCase() + i.slice(1))
    .join(' ');

  switch (camelCaseName) {
    case 'apache-logs':
      return <ApacheLogsCharts />;
    case 'apacheAccessLogs':
      return <ApacheAccessLogsCharts name={name} />;
    case 'apache-metrics':
      return <ApacheMetricsCharts />;
    case 'custom-application':
      return <CustomApplicationCharts />;
    case 'hostMetrics':
      return <HostMetricsCharts />;
    case 'mongo-logs':
      return <MongoLogsCharts />;
    case 'mongo-metrics':
      return <MongoMetricsCharts />;
    case 'nginx-logs':
      return <NginxLogsCharts />;
    case 'nginx-metrics':
      return <NginxMetricsCharts />;
    case 'postgres-logs':
      return <PostgresLogsCharts />;
    case 'postgres-metrics':
      return <PostgresMetricsCharts />;
    default:
      return <Error />;
  }
}
