import { AWSError } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import { AWS_REGION } from '../../constants';

AWS.config.update({ region: AWS_REGION });
const firehose = new AWS.Firehose();

export default function listDeliveryStreams(): Promise<any> {
  return new Promise( resolve => {
    firehose.listDeliveryStreams({}, (err: AWSError, data: any) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data);
    });
  });
}
