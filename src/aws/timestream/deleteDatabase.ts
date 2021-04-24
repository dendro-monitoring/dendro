import { AWS_TIMESTREAM_WRITE } from '../../constants';

export default function deleteDatabase(DatabaseName: string): Promise<any> {
  return new Promise(resolve => {
    const params = {
      DatabaseName
    };

    AWS_TIMESTREAM_WRITE.deleteDatabase(params, function (err, data) {
      if (err && err.code === 'ResourceNotFoundException') {
        resolve(null);
        return;
      }
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
