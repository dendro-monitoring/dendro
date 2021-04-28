import ApacheLogsCharts from './ApacheLogs/Charts';
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
  slug: string | string[]
}

export default function ChartSwitcher({ slug }: Props) {
  switch (slug) {
    case 'apacheLogs':
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
      return <MongoMetricsCharts />;
    case 'nginxAccessLogs':
      return <NginxAccessLogsCharts />;
    case 'nginxErrorLogs':
      return <NginxErrorLogsCharts />;
    case 'nginxMetrics':
      return <NginxMetricsCharts />;
    case 'postgresLogs':
      return <PostgresLogsCharts />;
    case 'postgresLogs':
      return <PostgresMetricsCharts />;
    default:
      return <Error />;
  }
}
