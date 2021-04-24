import AWSWrapper from '../../aws';

export default async function getItemsToDelete(): Promise<any> {
  const roles = await AWSWrapper.listRoles();
  const streams = await AWSWrapper.listDeliveryStreams();
  const buckets = await AWSWrapper.listBuckets();
  const lambdas = await AWSWrapper.listFunctions();
  const timestreams = await AWSWrapper.listDatabases();
  return new Promise(resolve => {
    const list = {
      roles,
      streams,
      buckets,
      lambdas,
      timestreams,
    };
    resolve(list);
  });
}
