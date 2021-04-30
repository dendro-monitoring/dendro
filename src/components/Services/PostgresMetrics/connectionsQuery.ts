const Series = require("time-series-data-generator");

export default function connectionsQuery(setConnectionsData: Dispatch<SetStateAction<never[]>>) {
  const d = new Date();
  const until = new Date(Date.now()).toISOString(); // today
  const from = new Date(d.setDate(d.getDate() - 7)).toISOString(); // a week ago
  const interval = 15;
  const keyName = 'y';

  const connectionsSeries = new Series({ from, until, interval, keyName, type: "random" });
  const connectionsWeights = {
    100: 50,
    125: 10,
    115: 10,
    105: 10,
    95: 20,
    130: 3,
    120: 1,
  }
  setConnectionsData((() => {
    let newData: any = [];
    for (let count = 1; count <= 50; count++) {
      newData = newData.concat(connectionsSeries.ratio(connectionsWeights).map(record => {
        const newRecord = {};
        newRecord.x = new Date(record.timestamp).valueOf();
        newRecord.y = Number(record.y);
        return newRecord;
      }))
    }
    return newData;
  }
  )());
}