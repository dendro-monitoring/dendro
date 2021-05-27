export default function asyncRetry(numberOfRetries: number, callback: (input: string) => boolean, finished: boolean, timeToWait: number = 1000): Promise<void> {
  return new Promise(async resolve => {
    let retriesArray = Array(numberOfRetries).fill(true);
    for (let item in retriesArray) {
      finished = await callback(item);
      console.log("finished: ", finished)
      console.log("time to wait: ", timeToWait);
      if (finished) return resolve();
      console.log("waiting after return resolve before setTimeout...")
      await new Promise((resolve) => setTimeout(resolve, timeToWait));
      timeToWait *= 2;
    }
    return resolve();
  });
}