import { AWSError } from 'aws-sdk';
import { AWS_TIMESTREAM_QUERY } from '../../constants';

import store from '../../store';

export default function query(QueryString: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const params = {
      QueryString,
      NextToken: store.AWS.Timestream.NextToken
    };
    AWS_TIMESTREAM_QUERY.query(params as unknown as any, function(err: AWSError, data) {
      store.AWS.Timestream.NextToken = data.NextToken || '';

      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}
