import { AWSError } from 'aws-sdk';
import { AWS_SNS, AWS_SNS_TOPIC_NAME } from '../../constants';

export default function listTopics(Name?: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const params = {
      NextToken: ''
    };

    return AWS_SNS.listTopics(params, (err: AWSError, data) => {
      if (err) return reject(err);
      if (data.Topics && data.Topics.length > 0) {
        resolve(data.Topics.filter(topic => {
          const splitArn = topic.TopicArn?.split(":");
          if (splitArn) {
            return splitArn[splitArn.length - 1] === AWS_SNS_TOPIC_NAME;
          } else return false;
        }).map(topic => topic.TopicArn));
      } else resolve(data.Topics);
    });
  });
}
