import { AWSError } from 'aws-sdk';
import { AWS_FIREHOSE } from '../../constants';

export default function listDeliveryStreams(): Promise<any> {
  return new Promise( resolve => {
    AWS_FIREHOSE.listDeliveryStreams({}, (err: AWSError, data: any) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data);
    });
  });
}
