// import remap func
import { useEffect, useState } from 'react';
import remap from '../remap';

export default function Chart() {
  const [uptimeData, setUptimeData] = useState([]);
  // query the db x times
  // remap the queried data
  // display
  useEffect(() => {
    // First query
    (async () => {
      const res = await fetch(
        '/api/query',
        { method: 'POST', body: JSON.stringify({ query: 'SELECT * FROM DendroTimestreamDB.nginxAccessLogs LIMIT 10' }) }
      );

      const { data: fetchedData } = await res.json();
      setUptimeData(remap(fetchedData));
    })();

    // SECOND QUERY
    // (async () => {
    //   const res = await fetch(
    //     '/api/query',
    //     { method: 'POST', body: JSON.stringify({ query: 'SELECT * FROM DendroTimestreamDB.postgres-metrics LIMIT 10' }) }
    //   );

    //   const { data: fetchedData } = await res.json();
    //   setData(fetchedData);
    // })();

    // THIRD QUERY
    // (async () => {
    //   const res = await fetch(
    //     '/api/query',
    //     { method: 'POST', body: JSON.stringify({ query: 'SELECT * FROM DendroTimestreamDB.postgres-metrics LIMIT 10' }) }
    //   );

    //   const { data: fetchedData } = await res.json();
    //   setData(fetchedData);
    // })();

    // FOURTH QUERY
    // (async () => {
    //   const res = await fetch(
    //     '/api/query',
    //     { method: 'POST', body: JSON.stringify({ query: 'SELECT * FROM DendroTimestreamDB.postgres-metrics LIMIT 10' }) }
    //   );

    //   const { data: fetchedData } = await res.json();
    //   setData(fetchedData);
    // })();
  }, []);

  return <h1>{ JSON.stringify(uptimeData) }</h1>;
}
