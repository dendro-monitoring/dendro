import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';

function createTimestreamDatabase(DatabaseName: string, region = 'us-east-1'): Promise<{}> {
  return new Promise(resolve => {
    AWS.config.update({ region });

    const Timestream = new AWS.TimestreamWrite();

    const params = {
      DatabaseName,
    };

    Timestream.createDatabase(params, (err: AWSError, data: {}) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}

module.exports = createTimestreamDatabase;
