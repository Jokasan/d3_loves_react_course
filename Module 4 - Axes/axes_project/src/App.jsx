// Import libraries and define constants:
import { scaleLinear } from "d3";

// Define the margins and dimensions of the SVG canvas:
const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };
const TICK_LENGTH = 8;

const width = 700;
const height = 200;

// Define the App component:
export default function App() {
  // Calculate the width of the area where the axis will be drawn, accounting for margins:
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  // Create a linear scale for the x-axis, mapping the domain [0, 100] to the range of pixel values corresponding to the bounds width:
  const xScale = scaleLinear().domain([0, 100]).range([0, boundsWidth]);

  return (
    // Render the SVG canvas and the x-axis:
    <svg width={width} height={height}>
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        {/* Main horizontal line */}
        <line
          x1={0}
          x2={boundsWidth}
          y1={0}
          y2={0}
          stroke="black"
          strokeWidth={0.5}
        />

        {/* Ticks and Labels */}
        {xScale.ticks(10).map((value) => (
          <g key={value} transform={`translate(${xScale(value)}, 0)`}>
            <line y2={TICK_LENGTH} stroke="currentColor" />
            <text
              style={{
                fontSize: "10px",
                textAnchor: "middle",
                transform: "translateY(20px)",
              }}
            >
              {value}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
