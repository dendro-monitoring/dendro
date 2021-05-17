import { AWSError } from 'aws-sdk';
import { AWS_FIREHOSE } from '../../constants';
import retry from '../../utils/retry';

export default function createDeliveryStream(DeliveryStreamName: string, BucketName: string, RoleARN: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const params = {
      DeliveryStreamName, /* required */
      DeliveryStreamType: 'DirectPut',
      ExtendedS3DestinationConfiguration: {
        BucketARN: `arn:aws:s3:::${BucketName}`, /* required */
        RoleARN,
        BufferingHints: {
          IntervalInSeconds: 60,
        },
        CloudWatchLoggingOptions: {
          Enabled: true,
          LogGroupName: 'test-logger',
          LogStreamName: 'firehose-test-logger'
        },
      },
    };
    let finished = false;
    await retry(13, () => {
      AWS_FIREHOSE.createDeliveryStream(params, (err: AWSError, data) => {
        if (err && err.code !== 'ResourceInUseException' && err.code !== 'InvalidArgumentException') {
          return reject(err);
        }
        else if (data) {
          finished = true;
          resolve(data);
        }
      })
    }, finished);

    if (!finished) {
      throw new Error('Could not create Firehose Delivery Stream');
    }
  });
}

