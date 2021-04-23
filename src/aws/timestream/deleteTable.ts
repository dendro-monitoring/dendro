import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';
import { AWS_REGION } from '../../constants';

export default function deleteTable(DatabaseName: string, TableName: string, region: string = AWS_REGION): Promise<any> {
  return new Promise(async resolve => {
    AWS.config.update({ region });
    const timestreamwrite = new AWS.TimestreamWrite();

    const params = {
      DatabaseName,
      TableName
    };
    timestreamwrite.deleteTable(params, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}