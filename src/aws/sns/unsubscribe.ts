import { AWSError } from 'aws-sdk';
import { AWS_SNS } from '../../constants';

export default function unsubscribe(SubscriptionArn: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const params = {
      SubscriptionArn
    };

    AWS_SNS.unsubscribe(params as any, function(err: AWSError, data: any) {
      if (err) return reject(err);

      resolve(data);
    });
  });
}
