import { ChartDataPoint } from '../../../constants/frontendTypes';
import ChartCard from '../ChartCard';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from 'victory';
import formatTSQueryResult from '../formatTSQueryResult';
import { useEffect, useState } from 'react';

export default function Chart({ name }: { name: string }) {
  const [rpsData, setRpsData] = useState([]);

  useEffect(() => {
    // First query
    (async () => {
      const res = await fetch(
        '/api/query',
        {
          method: 'POST',
          body: JSON.stringify({
            query: 'SELECT BIN(time, 1s) AS x, COUNT(*) AS y \
                   FROM DendroTimestreamDB.postgresMetrics \
                   GROUP BY BIN(time, 1s) \
                   ORDER BY x ASC'
          })
        }
      );

      const { data: fetchedData } = await res.json();
      const formattedResult = formatTSQueryResult(fetchedData);
      setRpsData(formattedResult);
    })();
  }, []);

  console.log(rpsData)
  const chartData1: ChartDataPoint[] = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 }
  ];

  return (
    <>
      <h1 className="text-3xl font-semibold">{name}</h1>
      <ChartCard name={name}>
        {/* Child 1 */}
        <>
          {/* Chart 1 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            theme={VictoryTheme.material}
            key="hi"
          >
            <VictoryLabel text={'Average Query Duration (s)'} x={180} y={30} textAnchor="middle" />
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
              data={chartData1}
            />
          </VictoryChart>

          {/* Chart 2 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            theme={VictoryTheme.material}
            key="hi"
          >
            <VictoryLabel text={'Average Query Duration (s)'} x={180} y={30} textAnchor="middle" />
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
              data={chartData1}
            />
          </VictoryChart>
        </>

        {/* Child 2 */}
        <>
          {/* Chart 3 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            theme={VictoryTheme.material}
            key="hi"
          >
            <VictoryLabel text={'Average Query Duration (s)'} x={180} y={30} textAnchor="middle" />
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
              data={chartData1}
            />
          </VictoryChart>

          {/* Chart 4 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            theme={VictoryTheme.material}
            key="hi"
          >
            <VictoryLabel text={'Average Query Duration (s)'} x={180} y={30} textAnchor="middle" />
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
              data={chartData1}
            />
          </VictoryChart>
        </>
      </ChartCard>
    </>
  );
}
