import { AWS_CLOUDWATCH } from '../../constants';

export default async function putMetricFilter(params: any): Promise<any> {
  return new Promise((resolve, reject) => {
    AWS_CLOUDWATCH.putMetricFilter(params, function(err, data) {
      if (err) reject(err);

      resolve(data);
    });
  });
}
