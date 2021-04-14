const AWS = require('aws-sdk')

function createTimestreamTable({
  DatabaseName,
  TableName,
  MagneticStoreRetentionPeriodInDays = '30',
  MemoryStoreRetentionPeriodInHours = '720',
  Tags = [],
  region = 'us-east-1',
}) {
  return new Promise(resolve => {
    AWS.config.update({region})

    const Timestream = new AWS.TimestreamWrite()

    const params = {
      DatabaseName, /* required */
      TableName, /* required */
      RetentionProperties: {
        MagneticStoreRetentionPeriodInDays, /* required */
        MemoryStoreRetentionPeriodInHours, /* required */
      },
      Tags,
    }
    Timestream.createTable(params, (err, data) => {
      resolve([err, data])
    })
  })
}

module.exports = createTimestreamTable
