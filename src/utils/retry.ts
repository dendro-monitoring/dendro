export default function asyncRetry(numberOfRetries: number, callback: (input: string) => void, finished: boolean, timeToWait: number = 1000): Promise<void> {
  return new Promise(async resolve => {
    let retriesArray = Array(numberOfRetries).fill(true);
    for (let item in retriesArray) {
      if (finished) return resolve();
      await callback(item);
      await new Promise((resolve) => setTimeout(resolve, timeToWait));
    }
    resolve();
  });
}