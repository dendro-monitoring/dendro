import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';

import store from '../../store';

AWS.config.update({ region: 'us-east-1' });
const timestreamquery = new AWS.TimestreamQuery();

export default function query(QueryString: string): Promise<any> {
  return new Promise(resolve => {
    const params = {
      QueryString, 
      NextToken: store.AWS.Timestream.NextToken
    };
    timestreamquery.query(params as unknown as any, function(err: AWSError, data) {
      if (err) throw new Error(String(err)); // an error occurred
      else { 
        store.AWS.Timestream.NextToken = data.NextToken || '';
        resolve(data);  
      }
    });
  });
}
