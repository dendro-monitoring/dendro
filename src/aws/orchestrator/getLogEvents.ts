import store from '../../store';
import getEvents from '../cloudwatch/getLogEvents';

export default function getLogEvents(): Promise<any> {
  return new Promise(async resolve => {
    let results: Array<any> = [];
    do {
      const { events } = await getEvents('/aws/lambda/_deployableLambdaFunction', '2021/04/15/[$LATEST]a197409bd49f4acf883d9e13444d3127');

      results = [...results, ...events];
    } while (store.AWS.Cloudwatch.NextToken);

    resolve(results);
  });
}
