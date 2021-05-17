import store from '../../store';
import { AWS_TIMESTREAM_DATABASE_NAME, AWS_TIMESTREAM_WRITE } from '../../constants';

export default async function listTables(DatabaseName: string = AWS_TIMESTREAM_DATABASE_NAME): Promise<any> {
  return new Promise((resolve, reject) => {
    const params = {
      DatabaseName,
      NextToken: store.AWS.Timestream.NextToken
    };

    AWS_TIMESTREAM_WRITE.listTables(params, function (err, data) {
      if (data) {
        store.AWS.Timestream.NextToken = data.NextToken;
      }

      if (err) {
        reject(err);
        return;
      }

      resolve(data.Tables);
    });
  });
}
