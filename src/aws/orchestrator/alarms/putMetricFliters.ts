import { AWS_CLOUDWATCH_LOG_GROUP_NAME } from '../../../constants';
import putMetricFilter from '../../cloudwatch/putMetricFilter';

const apacheParams: any = {
  filterName: 'Apache', /* required */
  filterPattern: '"[APACHE]"', /* required */
  logGroupName: AWS_CLOUDWATCH_LOG_GROUP_NAME, /* required */
  metricTransformations: [ /* required */
    {
      metricName: 'DendroApache', /* required */
      metricNamespace: 'Dendro', /* required */
      metricValue: '1', /* required */
    },
  ]
};

const customAppParams: any = {
  filterName: 'CustomApp', /* required */
  filterPattern: '"[CUSTOMAPP]"', /* required */
  logGroupName: AWS_CLOUDWATCH_LOG_GROUP_NAME, /* required */
  metricTransformations: [ /* required */
    {
      metricName: 'DendroCustomApp', /* required */
      metricNamespace: 'Dendro', /* required */
      metricValue: '1', /* required */
    },
  ]
};

const hostParams: any = {
  filterName: 'Host', /* required */
  filterPattern: '"[HOST]"', /* required */
  logGroupName: AWS_CLOUDWATCH_LOG_GROUP_NAME, /* required */
  metricTransformations: [ /* required */
    {
      metricName: 'DendroHost', /* required */
      metricNamespace: 'Dendro', /* required */
      metricValue: '1', /* required */
    },
  ]
};

const mongoParams: any = {
  filterName: 'Mongo', /* required */
  filterPattern: '"[MONGO]"', /* required */
  logGroupName: AWS_CLOUDWATCH_LOG_GROUP_NAME, /* required */
  metricTransformations: [ /* required */
    {
      metricName: 'DendroMongo', /* required */
      metricNamespace: 'Dendro', /* required */
      metricValue: '1', /* required */
    },
  ]
};

const nginxParams: any = {
  filterName: 'Ngninx', /* required */
  filterPattern: '"[NGINX]"', /* required */
  logGroupName: AWS_CLOUDWATCH_LOG_GROUP_NAME, /* required */
  metricTransformations: [ /* required */
    {
      metricName: 'DendroNginx', /* required */
      metricNamespace: 'Dendro', /* required */
      metricValue: '1', /* required */
    },
  ]
};

const postgresParams: any = {
  filterName: 'Postgres', /* required */
  filterPattern: '"[POSTGRES]"', /* required */
  logGroupName: AWS_CLOUDWATCH_LOG_GROUP_NAME, /* required */
  metricTransformations: [ /* required */
    {
      metricName: 'DendroPostgres', /* required */
      metricNamespace: 'Dendro', /* required */
      metricValue: '1', /* required */
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
  return new Promise(async (resolve, reject) => {
    try {
      const promises: Promise<any>[] = [];

      allParams.forEach(param => promises.push(putMetricFilter(param)));
      await Promise.all(promises);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
