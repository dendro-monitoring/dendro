import { AWSError } from 'aws-sdk';
import AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });
const firehose = new AWS.Firehose();

export default function listDeliveryStreams(): Promise<any> {
  return new Promise( resolve => {
    firehose.listDeliveryStreams({}, (err: AWSError, data: any) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data);
    });
  });
}
