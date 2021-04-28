import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from 'victory';
import { ChartData } from '../../constants/frontendTypes';

interface Props {
  name: string;
  charts: ChartData[]
}

export default function ChartCard({ name: camelCaseName, charts }: Props) {

  /**
   * Convert `apacheAccessLogs` to `Apache Access Logs`
   */
  const name = camelCaseName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map((i) => i[0].toUpperCase() + i.slice(1))
    .join(' ');

  return (
    <>
      <h1 className="text-3xl font-semibold">{name}</h1>

      <div className="bg-gray-50 shadow rounded mt-2">
        <div className="max-w-7xl mx-auto lg:flex lg:items-center lg:justify-center">
          {charts.map(({ labelText, dataPoints }) => (
            <VictoryChart
              style={{ parent: { maxWidth: '50%', height: '300px' } }}
              theme={VictoryTheme.material}
              key="hi"
            >
              <VictoryLabel text={labelText} x={180} y={30} textAnchor="middle"/>
              <VictoryLine
                style={{
                  data: { stroke: '#c43a31' },
                  parent: { border: '1px solid #ccc' }
                }}
                data={dataPoints}
              />
            </VictoryChart>
          ))}
        </div>
      </div>
    </>
  );
}
