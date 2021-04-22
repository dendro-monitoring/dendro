import * as AWS from 'aws-sdk';
import store from '../../store';
import { AWS_REGION } from '../../constants';

AWS.config.update({ region: AWS_REGION });

const timestreamwrite = new AWS.TimestreamWrite();
export default async function listTables(DatabaseName: string): Promise<any> {
  return new Promise(resolve => {
    const params = {
      DatabaseName,
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
