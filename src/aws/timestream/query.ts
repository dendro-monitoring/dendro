import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });
const timestreamquery = new AWS.TimestreamQuery();

export default function query(QueryString: string): Promise<any> {
  return new Promise(resolve => {
    const params = {
      QueryString, /* required */
      // MaxRows: 'NUMBER_VALUE',
      // NextToken: 'STRING_VALUE'
    };
    timestreamquery.query(params as unknown as any, function(err: AWSError, data) {
      if (err) throw new Error(String(err)); // an error occurred
      else resolve(data);         // successful response
    });
  });
}
