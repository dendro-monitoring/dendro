import { AWSError } from 'aws-sdk';
import { AWS_SNS, AWS_SNS_TOPIC_NAME } from '../../constants';
import store from '../../store';

export default function createTopic(Name?: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const params = {
      Name: Name || AWS_SNS_TOPIC_NAME,
    };

    return AWS_SNS.createTopic(params, (err: AWSError, data) => {
      if (err) return reject(err);

      store.AWS.SNS.TopicArn = data.TopicArn;
      resolve(data);
    });
  });
}
