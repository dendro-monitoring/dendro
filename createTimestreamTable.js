const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-1'});

const Timestream = new AWS.TimestreamWrite()

const DatabaseName = process.argv[2]
const TableName = process.argv[3]

var params = {
  DatabaseName, /* required */
  TableName, /* required */
  RetentionProperties: {
    MagneticStoreRetentionPeriodInDays: '30', /* required */
    MemoryStoreRetentionPeriodInHours: '720' /* required */
  },
  Tags: [
    {
      Key: 'example_key_1', /* required */
      Value: 'example_key_2' /* required */
    },
  ]
};
Timestream.createTable(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});