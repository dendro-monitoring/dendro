import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';

const firehose = new AWS.Firehose();

export default function updateDestination(): Promise<any> { // TODO Finish
  return new Promise(resolve => {
    const params = {
      CurrentDeliveryStreamVersionId: 'STRING_VALUE', /* required */
      DeliveryStreamName: 'STRING_VALUE', /* required */
      DestinationId: 'STRING_VALUE', /* required */
      ExtendedS3DestinationUpdate: {
        BucketARN: 'STRING_VALUE',
        // BufferingHints: {
        //   IntervalInSeconds: 'NUMBER_VALUE',
        //   SizeInMBs: 'NUMBER_VALUE',
        // },
        CloudWatchLoggingOptions: {
          Enabled: true,
        },
        CompressionFormat: 'GZIP',

      },
    };
    firehose.updateDestination(params, function (err: AWSError, data) {
      if (err) throw new Error(String(err)); // an error occurred
      else resolve(data);         // successful response
    });
  });
}
