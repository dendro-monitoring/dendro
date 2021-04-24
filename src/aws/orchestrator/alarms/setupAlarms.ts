import createAlarms from './createAlarms';
import createTopic from '../../sns/createTopic';
import putMetricFilters from './putMetricFliters';
import { createSubscriptions } from './createSubscriptions';

/**
 * Adds the neccessary alarms to the users Lambda
 */
export default async function setupAlarms(): Promise<void> {
  await createTopic();
  await createSubscriptions();
  await putMetricFilters();
  await createAlarms();
}
