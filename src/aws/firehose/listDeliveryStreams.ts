import { AWSError } from 'aws-sdk';
import { AWS_FIREHOSE, AWS_FIREHOSE_STREAM_NAME } from '../../constants';

export default function listDeliveryStreams(): Promise<any> {
  return new Promise( resolve => {
    AWS_FIREHOSE.listDeliveryStreams({}, (err: AWSError, data: any) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data.DeliveryStreamNames?.filter( (stream: string) => stream === AWS_FIREHOSE_STREAM_NAME));
    });
  });
}
