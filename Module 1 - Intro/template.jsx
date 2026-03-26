import * as d3 from "d3";

// The data (often passed as prop)
const data = [{ x: 10, y: 20 }, { x: 40, y: 90 }, ...];

// The chart dimensions (often passed as prop too)
const width = 500;
const height = 400;

// Initialize React Component
export const Barplot = () => {

  // 1️⃣ Do some math with D3
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.x)])
    .range([0, width]);

  // 2️⃣ Render with React (JSX!) using the D3 maths
  return (
    <div
      style={{
        position: "absolute",
        left: xScale(12)
      }}
    />
  );
}