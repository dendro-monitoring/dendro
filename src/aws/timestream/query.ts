import { AWSError } from 'aws-sdk';

import store from '../../store';
import { timestreamQuery } from '../singletons';

export default function query(QueryString: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const params = {
      QueryString,
      NextToken: store.AWS.Timestream.NextToken
    };
    timestreamQuery.query(params as unknown as any, function(err: AWSError, data) {
      if (err) {
        reject(err);
        return;
      }

      store.AWS.Timestream.NextToken = data.NextToken || '';
      resolve(data);
    });
  });
}
