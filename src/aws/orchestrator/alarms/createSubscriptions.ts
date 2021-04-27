import store from '../../../store';
import subscribe from '../../sns/subscribe';

export async function createSubscriptions(): Promise<void> {
  const promises: Promise<any>[] = [];

  store.AWS.SNS.Emails.forEach(email => promises.push(subscribe(email)));
  await Promise.all(promises);
}
