import { AWSError } from 'aws-sdk';
import { AWS_SNS } from '../../constants';
import store from '../../store';

export default function subscribe(Endpoint: string, Protocol = 'email'): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const params = {
      Protocol,
      TopicArn: store.AWS.SNS.TopicArn,
      Endpoint,
      ReturnSubscriptionArn: true
    };

    AWS_SNS.subscribe(params as any, function(err: AWSError, data: any) {
      if (err) return reject(err);

      store.AWS.SNS.SubscriptionArn = data.SubscriptionArn;
      resolve(data);
    });
  });
}
