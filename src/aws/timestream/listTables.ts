import * as AWS from 'aws-sdk';
import store from '../../store';
import { AWS_REGION, AWS_TIMESTREAM_DATABASE_NAME } from '../../constants';

AWS.config.update({ region: AWS_REGION });

const timestreamwrite = new AWS.TimestreamWrite();
export default async function listTables(DatabaseName: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const params = {
      DatabaseName: AWS_TIMESTREAM_DATABASE_NAME,
      NextToken: store.AWS.Timestream.NextToken
    };

    timestreamwrite.listTables(params, function(err, data) {
      if (err && err.code === "ResourceNotFoundException") {
        resolve(err);
        return;
      }
      if (err) {
        reject(err);
        return;
      }

      store.AWS.Timestream.NextToken = data.NextToken;
      resolve(data);
    });
  });
}
