"use client";
import React from "react";
import { Line, Scatter, Pie, Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const CNCDatachart = ({ data }) => {
  const timestamps = data.map((item) =>
    new Date(item.timestamp || Date.now()).toLocaleTimeString()
  );

  const spindleSpeedData = {
    labels: timestamps,
    datasets: [
      {
        label: "Spindle Speed (RPM)",
        data: data.map((item) => item.spindle_speed || 0),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  const toolWearData = {
    labels: timestamps,
    datasets: [
      {
        label: "Tool Wear Level (%)",
        data: data.map((item) => item.tool_wear_level || 0),
        backgroundColor: "rgba(255,99,132,0.6)",
      },
    ],
  };

  const feedCutData = {
    datasets: [
      {
        label: "Feed Rate vs Cut Depth",
        data: data.map((item) => ({
          x: item.cut_depth || 0,
          y: item.feed_rate || 0,
        })),
        backgroundColor: "rgba(54,162,235,1)",
      },
    ],
  };

  const vibrationData = {
    labels: timestamps,
    datasets: [
      {
        label: "Vibration Level (g)",
        data: data.map((item) => item.vibration_level || 0),
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
    ],
  };

  const coolantData = {
    labels: timestamps,
    datasets: [
      {
        data: data.map((item) => item.coolant_flow_rate || 0),
        backgroundColor: [
          "rgba(255,99,132,0.6)",
          "rgba(54,162,235,0.6)",
          "rgba(255,206,86,0.6)",
        ],
      },
    ],
  };

  const performanceData = {
    labels: [
      "Spindle Speed",
      "Tool Wear",
      "Feed Rate",
      "Vibration Level",
      "Power Consumption",
    ],
    datasets: [
      {
        label: "Machine Performance Metrics",
        data:  [
          data[0]?.spindle_speed || 0,
          data[0]?.tool_wear_level || 0,
          data[0]?.feed_rate || 0,
          data[0]?.vibration_level || 0,
          data[0]?.power_consumption || 0,
        ],
        backgroundColor: "rgba(255,206,86,0.2)",
        borderColor: "rgba(255,206,86,1)",
        pointBackgroundColor: "rgba(255,206,86,1)",
      },
    ],
  };

  return (
    <div>
      <>
        <h2>Spindle Speed Over Time</h2>
        <Line data={spindleSpeedData} />

        <h2>Tool Wear Level</h2>
        <Bar data={toolWearData} />

        <h2>Feed Rate vs Cut Depth</h2>
        <Scatter data={feedCutData} />

        <h2>Vibration Level Over Time</h2>
        <Line data={vibrationData} />

        <h2>Coolant Flow Rate Distribution</h2>
        <Pie data={coolantData} />

        <h2>Machine Performance Metrics</h2>
        <Radar data={performanceData} />
      </>
    </div>
  );
};

export default CNCDatachart;
