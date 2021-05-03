import { APACHE_ALARM, HOST_ALARM, MONGO_ALARM, NGINX_ALARM, POSTGRES_ALARM } from '../../../constants';
import store from '../../../store';
import createAlarm from '../../cloudwatch/createAlarm';

export default async function createAlarms(): Promise<void> {
  /**
   * Unlike `putMetricFilters`, these need to be inside the function
   * body. `AlarmActions` needs to access `store.AWS.SNS.TopicArn`
   * AFTER it has been set.
   */
  const baseParams: any = {
    ComparisonOperator: 'GreaterThanOrEqualToThreshold',
    EvaluationPeriods: '1',
    ActionsEnabled: true,
    AlarmActions: [
      store.AWS.SNS.TopicArn as string,
    ],
    AlarmDescription: 'Email subscribers when errors occur',
    Namespace: 'Dendro',
    Period: '300', // seconds
    Statistic: 'Sum',
    Threshold: '1',
  };

  const apacheParams = {
    ...baseParams,
    AlarmName: APACHE_ALARM,
    MetricName: 'DendroApache',
  };

  // const customAppParams = {
  //   ...baseParams,
  //   AlarmName: 'DendroApacheAlarm',
  //   MetricName: 'DendroApache',
  // };

  const hostParams = {
    ...baseParams,
    AlarmName: HOST_ALARM,
    MetricName: 'DendroHost',
  };

  const mongoParams = {
    ...baseParams,
    AlarmName: MONGO_ALARM,
    MetricName: 'DendroMongo',
  };

  const nginxParams = {
    ...baseParams,
    AlarmName: NGINX_ALARM,
    MetricName: 'DendroNginx',
  };

  const postgresParams = {
    ...baseParams,
    AlarmName: POSTGRES_ALARM,
    MetricName: 'DendroPostgres',
  };

  const allParams = [
    apacheParams,
    hostParams,
    mongoParams,
    nginxParams,
    postgresParams
  ];

  const promises: Promise<any>[] = [];

  allParams.forEach((params) => promises.push(createAlarm(params)));
  await Promise.all(promises);
}
