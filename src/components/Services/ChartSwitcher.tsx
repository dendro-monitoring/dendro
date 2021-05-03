import ApacheLogsCharts from './ApacheLogs/Charts';
import ApacheAccessLogsCharts from './ApacheAccessLogs/Charts';
import ApacheMetricsCharts from './ApacheMetrics/Charts';

import CustomApplicationCharts from './CustomApplication/Charts';

import HostMetricsCharts from './HostMetrics/Charts';

import MongoLogsCharts from './MongoLogs/Charts';
import MongoMetricsCharts from './MongoMetrics/Charts';

import NginxAccessLogsCharts from './NginxAccessLogs/Charts';
import NginxErrorLogsCharts from './NginxErrorLogs/Charts';
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
    case 'apacheAccessLogs':
      return <ApacheAccessLogsCharts name={name} />;
    case 'ApacheLogs':
      return <ApacheLogsCharts />;
    case 'apacheMetrics':
      return <ApacheMetricsCharts />;
    case 'customApplication':
      return <CustomApplicationCharts />;
    case 'hostMetrics':
      return <HostMetricsCharts />;
    case 'mongoLogs':
      return <MongoLogsCharts />;
    case 'mongoMetrics':
      return <MongoMetricsCharts name={name} />;
    case 'nginxMetrics':
      return <NginxMetricsCharts />;
    case 'nginxAccessLogs':
      return <NginxAccessLogsCharts name={name} />;
    case 'postgresLogs':
      return <PostgresLogsCharts />;
    case 'postgresMetrics':
      return <PostgresMetricsCharts name={name} />;
    default:
      return <Error />;
  }
}
