import { AWSError } from 'aws-sdk';
import { AWS_SNS } from '../../constants';
import store from '../../store';

export default function deleteTopic(TopicArn?: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const params = {
      TopicArn: TopicArn || store.AWS.SNS.TopicArn!
    };

    return AWS_SNS.deleteTopic(params as any, (err: AWSError, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
