export default function asyncRetry(numberOfRetries: number, callback: (input: string) => boolean, finished: boolean, timeToWait: number = 1000): Promise<void> {
  return new Promise(async resolve => {
    let retriesArray = Array(numberOfRetries).fill(true);
    for (let item in retriesArray) {
      finished = await callback(item);
      if (finished) return resolve();
      await new Promise((resolve) => setTimeout(resolve, timeToWait));
      timeToWait *= 2;
    }
    return resolve();
  });
}
