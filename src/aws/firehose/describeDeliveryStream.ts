import { AWS_FIREHOSE, AWS_FIREHOSE_STREAM_NAME } from '../../constants';

export default function describeDeliveryStream(DeliveryStreamName: string = AWS_FIREHOSE_STREAM_NAME): Promise<any> {
  return new Promise((resolve, reject) => {
    const params = {
      DeliveryStreamName,
    };
    AWS_FIREHOSE.describeDeliveryStream(params, function(err, data) {
      if (err && err.code === 'ResourceNotFoundException') return resolve(null);
      else if (err) reject(err);
      else resolve(data);
    });
  });
}
