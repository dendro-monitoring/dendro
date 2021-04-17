import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';
const timestream = new AWS.TimestreamWrite();

export default function listDatabases(): Promise<any> {
  return new Promise(resolve => {
    timestream.listDatabases({}, (err: AWSError, data: any) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data);
    });
  });
}
