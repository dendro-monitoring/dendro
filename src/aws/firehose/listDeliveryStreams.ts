import { AWSError } from 'aws-sdk';
import AWS = require('aws-sdk');

import store from '../../store';

AWS.config.update({ region: store.AWS.region });
const firehose = new AWS.Firehose();

export default function listDeliveryStreams(): Promise<any> {
  return new Promise( resolve => {
    firehose.listDeliveryStreams({}, (err: AWSError, data: any) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data);
    });
  });
}
