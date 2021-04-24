import describeGroups from '../../cloudwatch/describeLogGroups';

import store from '../../../store';

export default function describeLogGroups(): Promise<Array<any>> {
  return new Promise(async (resolve) => {
    let results: Array<any> = [];
    do {
      const groups: Array<any> = await describeGroups() as any;
      results = [...results, ...groups];
    } while (store.AWS.Cloudwatch.NextToken);

    resolve(results);
  });
}
