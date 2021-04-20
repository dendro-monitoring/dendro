import AWS = require('aws-sdk');
import arePoliciesAttached from '../iam/arePoliciesAttached';

function asyncForEach(array, callback): Promise<void> {
  return new Promise(resolve => {
    (async () => {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
      resolve();
    })();
  });
}

export default function ensureRolePoliciesAreAttached() {
  return new Promise(resolve => {
    let isAttached = false;
    asyncForEach([1,2,3], async () => {
      if (!isAttached) {
        isAttached = await arePoliciesAttached();
        if (isAttached) resolve(isAttached);
      }
    }).then(() => {
      if (!isAttached) {
        throw new Error("Couldn't attach role policies, try again later");
      }
    });

  });

}
