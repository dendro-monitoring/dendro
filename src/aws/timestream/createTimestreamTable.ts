import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';

function createTimestreamTable({
  DatabaseName,
  TableName,
  MagneticStoreRetentionPeriodInDays = '30',
  MemoryStoreRetentionPeriodInHours = '720',
  region = 'us-east-1',
}: any): Promise<{}> {
  return new Promise(resolve => {
    AWS.config.update({ region });

    const Timestream = new AWS.TimestreamWrite();

    const params = {
      DatabaseName, /* required */
      TableName, /* required */
      RetentionProperties: {
        MagneticStoreRetentionPeriodInDays, /* required */
        MemoryStoreRetentionPeriodInHours, /* required */
      },
    };
    Timestream.createTable(params, (err: AWSError, data: {}) => {
      if (err) throw new Error(String(err));
      else resolve([err, data]);
    });
  });
}

module.exports = createTimestreamTable;
