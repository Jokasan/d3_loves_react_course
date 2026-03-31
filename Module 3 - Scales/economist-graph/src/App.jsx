// Imports and constants set ups:

import * as d3 from "d3";

// Plot settings:
const width = 500;
const height = 300;
const BAR_PADDING = 0.4; // This specifies the space between the bars.

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

// We define some constants outside of the app, to avoid repetition ang be reusable:
export const Barplot = ({ width, height, data }) => {
  // The barplot constant is a React component that takes in width, height, and data as props. It will render a bar plot based on the provided data and dimensions.
  const groups = data.map((d) => d.name).reverse(); // This line creates an array of group names by mapping over the data and extracting the "name" property from each data point. The .reverse() method is used to reverse the order of the group names, which will affect the vertical positioning of the bars in the plot.
  const yScale = d3 // Here we define the yScale using D3's scaleBand function, which is suitable for categorical data. The domain of the scale is set to the array of group names, and the range is set to the height of the plot. The paddingInner and paddingOuter properties are used to control the spacing between the bars and the edges of the plot.
    .scaleBand()
    .domain(groups)
    .range([0, height])
    .paddingInner(BAR_PADDING)
    .paddingOuter(0.1);

  const xScale = d3.scaleLinear().domain([0, 55]).range([0, width]); // We define the xScale using D3's scaleLinear function, which is suitable for numerical data. The domain of the scale is set from 0 to 55 (the maximum count in the data), and the range is set to the width of the plot. This scale will be used to determine the width of each bar based on the count values.

  const allRects = data.map((d, i) => {
    // We use this for the bars of the plot. We map over the data array and for each data point, we calculate the y position using the yScale based on the group name. If the y position is undefined (which can happen if the group name is not in the yScale domain), we return null to skip rendering that bar.
    // Otherwise, we return a <g> element containing a <rect> for the bar and a <text> element for the label. The width of the bar is determined by the xScale based on the count value, and the height is determined by the bandwidth of the yScale. The text color and position are adjusted based on whether the count is greater than 7 to ensure readability.
    // Basically the bottom three parts of the bar chart.
    const y = yScale(d.name);

    if (y === undefined) {
      return null;
    }

    return (
      // The <g> element is a container for grouping SVG elements together. In this case, it groups the <rect> and <text> elements for each bar in the bar plot. The <rect> element represents the bar itself, with its position and dimensions determined by the xScale and yScale. The <text> element displays the name of the group, with its position and color
      // adjusted based on the count value to ensure readability against the bar's background color.
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

  const grid = xScale // The grid lines and labels are created using the xScale. We generate an array of tick values using the .ticks() method, slice off the first tick (which is 0), and then map over the remaining ticks to create <g> elements containing a <line> and <text> element for each tick. The line represents the grid line, and the text represents the tick label.
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
    // Finally, we return the JSX for the bar plot. This includes a container <div> with some styling, a title and subtitle, the SVG element containing the grid lines and bars, and a footer with source information. The SVG element has its width and height set based on the props passed to the Barplot component, and it contains the grid lines and bars generated from the data.
    <div style={{ fontFamily: "sans-serif" }}>
      <div
        style={{
          width: 60,
          height: 6,
          backgroundColor: "#e3120b",
          marginBottom: 8,
        }}
      />
      <div style={{ fontSize: 22, fontWeight: "bold", marginBottom: 4 }}>
        Escape artists
      </div>
      <div style={{ fontSize: 14, color: "#444", marginBottom: 16 }}>
        Number of laboratory-acquired infections, 1970-2021
      </div>
      <svg width={width} height={height} style={{ overflow: "visible" }}>
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
      <div style={{ fontSize: 12, color: "#666", marginTop: 16 }}>
        <div>
          Sources: Laboratory-Acquired Infection Database; American Biological
          Safety Association
        </div>
        <div>The Economist</div>
      </div>
    </div>
  );
};

export default function App() {
  // Finally, we export the App component, which simply renders the Barplot component with the specified width, height, and data. This is the main entry point of the application, and it will display the bar plot when rendered.
  return <Barplot width={width} height={height} data={data} />;
}
