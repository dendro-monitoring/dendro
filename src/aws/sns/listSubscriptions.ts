import { AWSError } from 'aws-sdk';
import { AWS_SNS } from '../../constants';

export default function unsubscribe(TopicArn: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const params = { TopicArn };

    AWS_SNS.listSubscriptionsByTopic(params, function(err: AWSError, data: any) {
      if (err) return reject(err);

      resolve(data);
    });
  });
}
