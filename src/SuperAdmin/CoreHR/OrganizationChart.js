import React, { useState } from "react";
import Tree from "react-d3-tree";

// Sample data for the organization chart with Indian names
const orgData = {
  name: "Admin",
  title: "Admin",
  children: [
    {
      name: "Rajesh Kumar",
      title: "Manager",
      children: [
        {
          name: "Amit Verma",
          title: "Team Leader",
          children: [
            { name: "Suman Sharma", title: "Employee" },
            { name: "Priya Mehta", title: "Employee" },
          ],
        },
        {
          name: "Vikram Patel",
          title: "Team Leader",
          children: [
            { name: "Ravi Singh", title: "Employee" },
            { name: "Neha Reddy", title: "Employee" },
          ],
        },
      ],
    },
    {
      name: "Anjali Gupta",
      title: "Manager",
      children: [
        {
          name: "Shruti Joshi",
          title: "Team Leader",
          children: [
            { name: "Karan Shah", title: "Employee" },
            { name: "Deepika Chauhan", title: "Employee" },
          ],
        },
      ],
    },
  ],
};

// Render node function with centered text and simple box styling
const renderNode = ({ nodeDatum }) => (
  <g>
    {/* Background rectangle */}
    <rect
      width="120"
      height="50"
      x="-60"
      y="-25"
      fill="#e0e0e0"
      stroke="#4CAF50"
      strokeWidth="2"
      rx="10"
      ry="10"
    />
    {/* Name Text */}
    <text fontSize="12" letterSpacing={1} textAnchor="middle" y="-5">
      {nodeDatum.name}
    </text>
    {/* Title Text */}
    <text
      fontSize="10"
      fontFamily="arial"
      letterSpacing={1}
      textAnchor="middle"
      y="15"
    >
      {nodeDatum.title}
    </text>
  </g>
);

const OrganizationChart = () => {
  const [translate] = useState({ x: 500, y: 50 });
  const [zoom] = useState(0.6); // Set initial zoom level

  return (
    <div style={{ backgroundColor: "white", padding: "20px", height: "100%" }}>
      <h2 style={{ textAlign: "center", color: "#4CAF50" }}>
        Organization Chart
      </h2>
      <div style={{ width: "100%", height: "600px" }}>
        <Tree
          data={orgData}
          renderCustomNodeElement={renderNode}
          orientation="vertical"
          pathFunc="step"
          translate={translate} // Fixed position for center alignment
          zoomable={true} // Enable zoom
          zoom={zoom} // Initial zoom level
          scaleExtent={{ min: 0.5, max: 2 }} // Limit zoom range
          collapsible={false}
        />
      </div>
    </div>
  );
};

export default OrganizationChart;
