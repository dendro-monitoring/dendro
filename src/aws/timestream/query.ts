import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { AWS_REGION } from '../../constants';

import store from '../../store';

AWS.config.update({ region: AWS_REGION });
const timestreamquery = new AWS.TimestreamQuery();

export default function query(QueryString: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const params = {
      QueryString,
      NextToken: store.AWS.Timestream.NextToken
    };
    timestreamquery.query(params as unknown as any, function(err: AWSError, data) {
      if (err) {
        reject(err);
        return;
      }

      store.AWS.Timestream.NextToken = data.NextToken || '';
      resolve(data);
    });
  });
}
