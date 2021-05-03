import deleteAlarm from '../../cloudwatch/deleteAlarms';
import deleteTopic from '../../sns/deleteTopic';
import listSubscriptions from '../../sns/listSubscriptions';
import { APACHE_ALARM, HOST_ALARM, MONGO_ALARM, NGINX_ALARM, POSTGRES_ALARM } from '../../../constants';
import unsubscribe from '../../sns/unsubscribe';

const alarmParams = {
  AlarmNames: [
    APACHE_ALARM,
    HOST_ALARM,
    MONGO_ALARM,
    NGINX_ALARM,
    POSTGRES_ALARM
  ]
};

/**
 * Adds the neccessary alarms to the users Lambda
 */
export default async function deleteAlarms(TopicArn: string): Promise<void> {
  const { Subscriptions } = await listSubscriptions(TopicArn);
  const promises: Promise<any>[] = [];
  Subscriptions.forEach((sub: any) => {
    if (sub.SubscriptionArn !== 'PendingConfirmation') {
      promises.concat(unsubscribe(sub.SubscriptionArn));
    }
  });
  await Promise.all(promises);

  await deleteTopic(TopicArn);
  await deleteAlarm(alarmParams);
}
