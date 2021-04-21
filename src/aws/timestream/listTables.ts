import * as AWS from 'aws-sdk';
import store from '../../store';
import { AWS_REGION, AWS_TIMESTREAM_DATABASE_NAME } from '../../constants';

AWS.config.update({ region: AWS_REGION });

const timestreamwrite = new AWS.TimestreamWrite();
export default async function listTables(): Promise<any> {
  return new Promise(resolve => {
    const params = {
      DatabaseName: AWS_TIMESTREAM_DATABASE_NAME,
      NextToken: store.AWS.Timestream.NextToken
    };

    timestreamwrite.listTables(params, function(err, data) {
      if (err) {
        throw new Error(String(err));
      }

      store.AWS.Timestream.NextToken = data.NextToken;
      resolve(data);
    });
  });
}
