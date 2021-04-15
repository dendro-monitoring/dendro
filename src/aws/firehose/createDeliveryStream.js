const AWS = require('aws-sdk')

const firehose = new AWS.Firehose()

function createDeliveryStream(DeliveryStreamName, BucketName, RoleARN) {
  return new Promise(resolve => {
    const params = {
      DeliveryStreamName, /* required */
      DeliveryStreamType: 'DirectPut',
      ExtendedS3DestinationConfiguration: {
        BucketARN: `arn:aws:s3:::${BucketName}`, /* required */
        RoleARN,
        BufferingHints: {
          IntervalInSeconds: '60',
        },
        CompressionFormat: 'GZIP',
      },
    }
    firehose.createDeliveryStream(params, (err, data) => {
      if (err) throw new Error(err) // an error occurred
      else resolve(data)     // successful response
    })
  })
}

module.exports = createDeliveryStream
