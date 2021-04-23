import store from '../../store';
import { AWS_TIMESTREAM_DATABASE_NAME, AWS_TIMESTREAM_WRITE } from '../../constants';

export default async function listTables(): Promise<any> {
  return new Promise((resolve, reject) => {
    const params = {
      DatabaseName: AWS_TIMESTREAM_DATABASE_NAME,
      NextToken: store.AWS.Timestream.NextToken
    };

    AWS_TIMESTREAM_WRITE.listTables(params, function(err, data) {
      if (err) {
        reject(err);
        return;
      }

      store.AWS.Timestream.NextToken = data.NextToken;
      resolve(data);
    });
  });
}
