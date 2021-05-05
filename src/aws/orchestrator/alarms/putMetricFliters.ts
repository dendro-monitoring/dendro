import { AWS_CLOUDWATCH_LOG_GROUP_NAME } from '../../../constants';
import putMetricFilter from '../../cloudwatch/putMetricFilter';

const metricNamespace = 'Dendro';
const metricValue = '1';

const apacheParams: any = {
  filterName: 'Apache',
  filterPattern: '"[APACHE]"',
  logGroupName: AWS_CLOUDWATCH_LOG_GROUP_NAME,
  metricTransformations: [
    {
      metricName: 'DendroApache',
      metricNamespace,
      metricValue,
    },
  ]
};

const customAppParams: any = {
  filterName: 'CustomApp',
  filterPattern: '"[CUSTOMAPP]"',
  logGroupName: AWS_CLOUDWATCH_LOG_GROUP_NAME,
  metricTransformations: [
    {
      metricName: 'DendroCustomApp',
      metricNamespace,
      metricValue,
    },
  ]
};

const hostParams: any = {
  filterName: 'Host',
  filterPattern: '"[HOST]"',
  logGroupName: AWS_CLOUDWATCH_LOG_GROUP_NAME,
  metricTransformations: [
    {
      metricName: 'DendroHost',
      metricNamespace,
      metricValue,
    },
  ]
};

const mongoParams: any = {
  filterName: 'Mongo',
  filterPattern: '"[MONGO]"',
  logGroupName: AWS_CLOUDWATCH_LOG_GROUP_NAME,
  metricTransformations: [
    {
      metricName: 'DendroMongo',
      metricNamespace,
      metricValue,
    },
  ]
};

const nginxParams: any = {
  filterName: 'Nginx',
  filterPattern: '"[NGINX]"',
  logGroupName: AWS_CLOUDWATCH_LOG_GROUP_NAME,
  metricTransformations: [
    {
      metricName: 'DendroNginx',
      metricNamespace,
      metricValue,
    },
  ]
};

const postgresParams: any = {
  filterName: 'Postgres',
  filterPattern: '"[POSTGRES]"',
  logGroupName: AWS_CLOUDWATCH_LOG_GROUP_NAME,
  metricTransformations: [
    {
      metricName: 'DendroPostgres',
      metricNamespace,
      metricValue,
    },
  ]
};

const allParams = [
  apacheParams,
  customAppParams,
  hostParams,
  mongoParams,
  nginxParams,
  postgresParams
];

/**
 * Adds the neccessary alarms to the users Lambda
 */
export default async function putMetricFilters(): Promise<void> {
  const promises: Promise<any>[] = [];

  allParams.forEach(param => promises.push(putMetricFilter(param)));
  await Promise.all(promises);
}
