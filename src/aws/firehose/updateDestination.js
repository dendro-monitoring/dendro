const AWS = require('aws-sdk')
const firehose = new AWS.Firehose()

function updateDestination() { // TODO Finish
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
    }
    firehose.updateDestination(params, function (err, data) {
      if (err) throw new Error(err) // an error occurred
      else resolve(data)         // successful response
    })
  })
}

module.exports = updateDestination
