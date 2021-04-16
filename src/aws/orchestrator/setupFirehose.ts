import AWSWrapper from '..';

const DELIVERY_STREAM_NAME = 'dendroflumechuck-stream3';
const NEW_BUCKET_NAME = 'dendrodefaultbucket';

export default function setupFirehose( newRole: { Role: { Arn: string }} ): Promise<any> {
  return new Promise(resolve => {
    // TODO don't do this
      new Promise(r => setTimeout(r, 10000)).then( () => {
        AWSWrapper.createDeliveryStream(DELIVERY_STREAM_NAME, NEW_BUCKET_NAME, newRole.Role.Arn).then((firehoseData) => {
          resolve(firehoseData);
        });
      }); 
  });
}

