import {
  AWS_FIREHOSE_STREAM_NAME,
  AWS_S3_BUCKET_NAME,
  AWS_TIMESTREAM_DATABASE_NAME,
  AWS_IAM_ROLE_NAME,
  AWS_LAMBDA_NAME
} from '../../constants';
import AWSWrapper from '../../aws';

export default async function getItemsToDelete(): Promise<any> {
  const roles = await AWSWrapper.listRoles();
  const streams = await AWSWrapper.listDeliveryStreams();
  const buckets = await AWSWrapper.listBuckets();
  const lambdas = await AWSWrapper.listFunctions();
  return new Promise(resolve => {
    const list = {
      roles,
      streams,
      buckets,
      lambdas,
    };
    resolve(list);
  });
}
