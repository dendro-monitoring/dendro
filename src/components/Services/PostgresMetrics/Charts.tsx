import React from 'react';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from 'victory';

export default function Chart() {
  return <VictoryChart
    style={{ parent: { maxWidth: "50%" } }}
    theme={VictoryTheme.material}
  >
    <VictoryLabel text="Average Query Duration (s)" x={180} y={30} textAnchor="middle"/>
    <VictoryLine
      style={{
        data: { stroke: "#c43a31" },
        parent: { border: "1px solid #ccc" }
      }}
      data={[
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 7 }
      ]}
    />
  </VictoryChart>;
}