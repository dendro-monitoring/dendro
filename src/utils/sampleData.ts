const Series = require('time-series-data-generator');

export default function generateGaussianData(interval: number, mean: number, variance: number) {
  const d = new Date();
  const until = new Date(Date.now()).toISOString(); // today
  const from = new Date(d.setDate(d.getDate() - 7)).toISOString(); // a week ago
  const keyName = 'y';
  const series = new Series({ from, until, interval, keyName });

  const data = series.gaussian({ mean, variance }).map((record: { x: number, y: number, timestamp: string}) => {
    const newRecord = { } as any;
    newRecord.x = new Date(record.timestamp).valueOf(); // convert ISO string to a date and get UNIX time
    newRecord.y = record.y;
    return newRecord;
  });

  return data;
}
