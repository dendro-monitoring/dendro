// import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from 'victory';
// import { ChartData } from '../../constants/frontendTypes';

interface Props {
  name: string;
  children: JSX.Element[]
}

export default function ChartCard({ name: camelCaseName, children }: Props) {

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
      <div className="bg-gray-50 shadow rounded mt-2">
        {children.map((child, idx) => (
          <div
            className="max-w-7xl mx-auto lg:flex lg:items-center lg:justify-center"
            key={idx}
          >
            {child}
          </div>
        ))}
      </div>

    </>
  );
}
