import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { AWS_FIREHOSE_STREAM_NAME } from '../../constants';

const firehose = new AWS.Firehose();

export default function deleteDeliveryStream(): Promise<void> {
  return new Promise(resolve => {
    const params = {
      DeliveryStreamName: AWS_FIREHOSE_STREAM_NAME, /* required */
    };
    firehose.deleteDeliveryStream(params, (err: AWSError, data) => {
      if (err && err.code !== 'ResourceInUseException') throw new Error(String(err)); // an error occurred
      console.log(data);
      resolve();     // successful response
    });
  });
}

