import * as d3 from "d3";

const data = [
  { country: "United States", students: 68 },
  { country: "France", students: 21 },
  { country: "United Kingdom", students: 21 },
  { country: "Germany", students: 20 },
  { country: "Switzerland", students: 13 },
  { country: "Spain", students: 10 },
  { country: "Netherlands", students: 9 },
  { country: "India", students: 9 },
  { country: "Singapore", students: 8 },
  { country: "Ireland", students: 8 },
  { country: "Sweden", students: 7 },
  { country: "Australia", students: 7 },
  { country: "Canada", students: 6 },
  { country: "Finland", students: 5 },
  { country: "Mexico", students: 4 },
  { country: "Brazil", students: 4 },
  { country: "Saudi Arabia", students: 3 },
  { country: "Romania", students: 3 },
  { country: "Philippines", students: 3 },
  { country: "New Zealand", students: 3 },
].sort((a, b) => b.students - a.students);

const MARGIN = { top: 20, right: 30, bottom: 20, left: 120 };

function App() {
  const width = 600;
  const height = 400;

  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students)])
    .range([0, boundsWidth]);

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, boundsHeight])
    .padding(0.2);

  const xTicks = xScale.ticks(5).map((tick) => (
    <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
      <line y2={boundsHeight} stroke="#e0e0e0" />
      <text y={boundsHeight + 15} textAnchor="middle" fontSize={11} fill="#666">
        {tick}
      </text>
    </g>
  ));

  const bars = data.map((d) => (
    <g key={d.country}>
      <rect
        x={0}
        y={yScale(d.country)}
        width={xScale(d.students)}
        height={yScale.bandwidth()}
        fill="steelblue"
        opacity={0.8}
      />
      <text
        x={xScale(d.students) + 5}
        y={yScale(d.country) + yScale.bandwidth() / 2}
        dominantBaseline="middle"
        fontSize={11}
        fill="#333"
      >
        {d.students}
      </text>
    </g>
  ));

  const yLabels = data.map((d) => (
    <text
      key={d.country}
      x={-8}
      y={yScale(d.country) + yScale.bandwidth() / 2}
      textAnchor="end"
      dominantBaseline="middle"
      fontSize={11}
      fill="#333"
    >
      {d.country}
    </text>
  ));

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        {xTicks}
        {bars}
        {yLabels}
      </g>
    </svg>
  );
}

export default App;