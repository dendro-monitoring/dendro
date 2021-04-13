const AWS = require('aws-sdk')

function createTimestreamTable(
  DatabaseName, 
  TableName, 
  MagneticStoreRetentionPeriodInDays = "30", 
  MemoryStoreRetentionPeriodInHours = "720",
  Tags = [],
  callback,
  region = "us-east-1"
) {
  AWS.config.update({region});
  
  const Timestream = new AWS.TimestreamWrite()
  
  var params = {
    DatabaseName, /* required */
    TableName, /* required */
    RetentionProperties: {
      MagneticStoreRetentionPeriodInDays, /* required */
      MemoryStoreRetentionPeriodInHours /* required */
    },
    Tags
  };
  Timestream.createTable(params, callback);
}

module.exports = createTimestreamTable