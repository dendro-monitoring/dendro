import AWS = require('aws-sdk');
import { AWS_REGION } from '../../constants';

export default function deleteDatabase(DatabaseName: string, region: string = AWS_REGION): Promise<any> {
  AWS.config.update({ region });
  const timestreamwrite = new AWS.TimestreamWrite();

  return new Promise(resolve => {
    const params = {
      DatabaseName
    };

    timestreamwrite.deleteDatabase(params, function(err, data) {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
