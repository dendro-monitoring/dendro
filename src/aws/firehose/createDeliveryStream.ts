import { AWSError } from 'aws-sdk';
import { AWS_FIREHOSE } from '../../constants';

export default function createDeliveryStream(DeliveryStreamName: string, BucketName: string, RoleARN: string): Promise<any> {
  return new Promise((resolve, reject) => {
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
        },
      },
    };
    AWS_FIREHOSE.createDeliveryStream(params, (err: AWSError, data) => {
      if (err && err.code !== 'ResourceInUseException') return reject(err);
      else resolve(data);
    });
  });
}

