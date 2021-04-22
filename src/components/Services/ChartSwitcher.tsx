import ApacheLogsCharts from './ApacheLogs/Charts';
import ApacheMetricsCharts from './ApacheMetrics/Charts';

import CustomApplicationCharts from './CustomApplication/Charts';

import HostMetricsCharts from './HostMetrics/Charts';

import MongoLogsCharts from './MongoLogs/Charts';
import MongoMetricsCharts from './MongoMetrics/Charts';

import NginxLogsCharts from './NginxLogs/Charts';
import NginxMetricsCharts from './NginxMetrics/Charts';

import PostgresLogsCharts from './PostgresLogs/Charts';
// import PostgresMetricsCharts from './PostgresMetrics/Charts';

import Error from './Error';

interface Props {
  slug: string | string[]
}

export default function ChartSwitcher({ slug }: Props) {
  switch (slug) {
    case "apache-logs":
      return <ApacheLogsCharts />;
    case "apache-metrics":
      return <ApacheMetricsCharts />;
    case "custom-application":
      return <CustomApplicationCharts />;
    case "host-metrics":
      return <HostMetricsCharts />;
    case "mongo-logs":
      return <MongoLogsCharts />;
    case "mongo-metrics":
      return <MongoMetricsCharts />;
    case "nginx-logs":
      return <NginxLogsCharts />;
    case "nginx-metrics":
      return <NginxMetricsCharts />;
    case "postgres-logs":
      return <PostgresLogsCharts />;
    case "postgres-metrics":
      return <PostgresLogsCharts />;
    default:
      return <Error />;
  }
}
