import { AWSError } from 'aws-sdk';
import { firehose } from '../singletons';

export default function listDeliveryStreams(): Promise<any> {
  return new Promise( resolve => {
    firehose.listDeliveryStreams({}, (err: AWSError, data: any) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data);
    });
  });
}
