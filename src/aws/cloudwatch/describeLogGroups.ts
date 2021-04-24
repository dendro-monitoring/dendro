import store from '../../store/';
import { AWS_CLOUDWATCH } from '../../constants';

export default function describeLogGroups(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const params = {
      nextToken: store.AWS.Cloudwatch.NextToken
    };
    AWS_CLOUDWATCH.describeLogGroups(params as unknown as any, function(err, data) {
      if (err) reject(err);
      else {
        store.AWS.Cloudwatch.NextToken = data.nextToken;
        resolve(data.logGroups);
      }
    });
  });
}
