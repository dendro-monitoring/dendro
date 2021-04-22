import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { AWS_FIREHOSE_STREAM_NAME } from '../../constants';

const firehose = new AWS.Firehose();

export default function deleteDeliveryStream(): Promise<any> {
  return new Promise(resolve => {
    const params = {
      DeliveryStreamName: AWS_FIREHOSE_STREAM_NAME, /* required */
    };
    firehose.deleteDeliveryStream(params, (err: AWSError) => {
      if (err && err.code === "ResourceNotFoundException") {
        resolve(err);
      } else if (err) throw new Error(String(err)); // an error occurred
      else resolve(null);     // successful response
    });
  });
}

