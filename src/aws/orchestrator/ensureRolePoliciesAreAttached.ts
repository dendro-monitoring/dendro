import arePoliciesAttached from '../iam/arePoliciesAttached';

function asyncRetry(count: number, shortCircuit: boolean, callback: () => void): Promise<void> {
  return new Promise(resolve => {
    (async () => {
      if (shortCircuit) return;
      for (let index = 0; index < count; index++) {
        await callback();
      }
      resolve();
    })();
  });
}

export default function ensureRolePoliciesAreAttached(): Promise<boolean> {
  return new Promise(resolve => {
    let isAttached = false;
    asyncRetry(5, isAttached, async () => {
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
