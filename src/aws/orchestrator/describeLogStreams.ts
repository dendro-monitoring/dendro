import describeStreams from '../cloudwatch/describeLogStreams';

import store from '../../store';

export default function describeLogStreams(logGroupName: string): Promise<Array<any>> {
  return new Promise(async (resolve) => {
    let results: Array<any> = [];
    do {
      const groups: Array<any> = await describeStreams(logGroupName) as any;
      results = [...results, ...groups];
    } while (store.AWS.Cloudwatch.NextToken);

    resolve(results);
  });
}
