// Imports and constants set ups:

import * as d3 from 'd3';

// Plot settings:
const width = 500;
const height = 300;
const BAR_PADDING = 0.4;

// Data:
const data = [
  { count: 6, name: "Hantavirus" },
  { count: 7, name: "Tularemia" },
  { count: 7, name: "Dengue" },
  { count: 9, name: "Ebola" },
  { count: 11, name: "E. coli" },
  { count: 15, name: "Tuberculosis" },
  { count: 17, name: "Salmonella" },
  { count: 18, name: "Vaccinia" },
  { count: 54, name: "Brucella" },
];


export const Barplot = ({ width, height, data }) => {
  const groups = data.map((d) => d.name).reverse();
  const yScale = d3
    .scaleBand()
    .domain(groups)
    .range([0, height])
    .paddingInner(BAR_PADDING)
    .paddingOuter(0.1);

  const xScale = d3.scaleLinear().domain([0, 55]).range([0, width]);

  const allRects = data.map((d, i) => {
    const y = yScale(d.name);

    if (y === undefined) {
      return null;
    }

    return (
      <g key={i}>
        <rect
          x={0}
          y={yScale(d.name)}
          width={xScale(d.count)}
          height={yScale.bandwidth()}
          opacity={1}
          stroke="#076fa2"
          fill="#076fa2"
        />
        {d.count > 7 ? (
          <text
            x={xScale(0) + 7}
            y={y + yScale.bandwidth() / 2}
            textAnchor="start"
            alignmentBaseline="central"
            fontSize={14}
            fill="white"
            fillOpacity={0.9}
          >
            {d.name}
          </text>
        ) : (
          <text
            x={xScale(d.count) + 7}
            y={y + yScale.bandwidth() / 2}
            textAnchor="start"
            alignmentBaseline="central"
            fontSize={14}
            fill="#076fa2"
          >
            {d.name}
          </text>
        )}
      </g>
    );
  }); 

  const grid = xScale
    .ticks(10)
    .slice(1)
    .map((count, i) => (
      <g key={i}>
        <line
          x1={xScale(count)}
          x2={xScale(count)}
          y1={0}
          y2={height}
          stroke="#808080"
          opacity={0.2}
        />
        <text
          x={xScale(count)}
          y={-10}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={12}
          fill="#808080"
          opacity={1}
        >
          {count}
        </text>
      </g>
    ));

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ width: 60, height: 6, backgroundColor: '#e3120b', marginBottom: 8 }} />
      <div style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 4 }}>Escape artists</div>
      <div style={{ fontSize: 14, color: '#444', marginBottom: 16 }}>
        Number of laboratory-acquired infections, 1970-2021
      </div>
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        {grid}
        {allRects}
        <g>
          <line
            x1={xScale(0)}
            x2={xScale(0)}
            y1={0}
            y2={height}
            stroke="black"
            opacity={0.8}
          />
          <text
            x={xScale(0)}
            y={-10}
            textAnchor="middle"
            alignmentBaseline="central"
            fontSize={12}
            fill="#808080"
            opacity={1}
          >
            {0}
          </text>
        </g>
      </svg>
      <div style={{ fontSize: 12, color: '#666', marginTop: 16 }}>
        <div>Sources: Laboratory-Acquired Infection Database; American Biological Safety Association</div>
        <div>The Economist</div>
      </div>
    </div>
  );
};

export default function App() {
  return <Barplot width={width} height={height} data={data} />;
}
