import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';

import store from '../../store';

export default function createTimestreamDatabase(DatabaseName: string): Promise<any> {
  return new Promise(resolve => {
    AWS.config.update({ region: store.AWS.region });

    const Timestream = new AWS.TimestreamWrite();

    const params = {
      DatabaseName,
    };

    Timestream.createDatabase(params, (err: AWSError, data) => {
      if (err && err.code !== 'ConflictException') throw new Error(String(err));
      else resolve(data);
    });
  });
}
