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
    AlarmName: 'DendroApacheAlarm',
    MetricName: 'DendroApache',
  };

  // const customAppParams = {
  //   ...baseParams,
  //   AlarmName: 'DendroApacheAlarm',
  //   MetricName: 'DendroApache',
  // };

  const hostParams = {
    ...baseParams,
    AlarmName: 'DendroHostAlarm',
    MetricName: 'DendroHost',
  };

  const mongoParams = {
    ...baseParams,
    AlarmName: 'DendroMongoAlarm',
    MetricName: 'DendroMongo',
  };

  const nginxParams = {
    ...baseParams,
    AlarmName: 'DendroNginxAlarm',
    MetricName: 'DendroNginx',
  };

  const postgresParams = {
    ...baseParams,
    AlarmName: 'DendroPostgresAlarm',
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
