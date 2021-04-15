const AWSWrapper = require('../aws');

const DELIVERY_STREAM_NAME = 'dendroflumechuck-stream2';
const NEW_BUCKET_NAME = 'dendrodefaultbucket';

function setupFirehose( newRole ) {
  return new Promise(resolve => {
    // TODO don't do this
      new Promise(r => setTimeout(r, 10000)).then( () => {
        AWSWrapper.createDeliveryStream(DELIVERY_STREAM_NAME, NEW_BUCKET_NAME, newRole.Role.Arn).then(() => {
          resolve();
        });
      }); 
  });
}

module.exports = setupFirehose;