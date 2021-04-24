import createAlarms from './createAlarms';
import createTopic from '../../sns/createTopic';
import subscribe from '../../sns/subscribe';
import putMetricFilters from './putMetricFliters';

/**
 * Adds the neccessary alarms to the users Lambda
 */
export default async function setupAlarms(): Promise<void> {
  await createTopic();
  await subscribe('awcrotwell@gmail.com');
  await putMetricFilters();
  await createAlarms();
}
