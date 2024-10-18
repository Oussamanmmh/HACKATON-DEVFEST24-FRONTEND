"use client";
import React from "react";
import { Line, Bar, Scatter, Radar, Pie } from "react-chartjs-2";
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
  RadialLinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

const StampingPresschart = ({ data }) => {
  const timestamps = data.map((item) =>
    new Date(item.timestamp).toLocaleTimeString()
  );

  // Line Chart - Force Applied and Temperature Over Time
  const lineData = {
    labels: timestamps,
    datasets: [
      {
        label: "Force Applied (N)",
        data: data.map((item) => item.force_applied || 0),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
      {
        label: "Temperature (°C)",
        data: data.map((item) => item.temperature || 0),
        borderColor: "rgba(54,162,235,1)",
        fill: false,
      },
    ],
  };

  // Bar Chart - Oil Pressure and Lubrication Flow Rate
  const barData = {
    labels: timestamps,
    datasets: [
      {
        label: "Oil Pressure",
        data: data.map((item) => item.oil_pressure || 0),
        backgroundColor: "rgba(153,102,255,0.6)",
      },
      {
        label: "Lubrication Flow Rate",
        data: data.map((item) => item.lubrication_flow_rate || 0),
        backgroundColor: "rgba(255,159,64,0.6)",
      },
    ],
  };

  // Scatter Chart - Cycle Time vs Cycle Count
  const scatterData = {
    datasets: [
      {
        label: "Cycle Time vs Cycle Count",
        data: data.map((item) => ({
          x: item.cycle_time || 0,
          y: item.cycle_count || 0,
        })),
        backgroundColor: "rgba(75,192,192,1)",
      },
    ],
  };

  // Radar Chart - Machine Performance Metrics
  const radarData = {
    labels: [
      "Vibration Level",
      "Power Consumption",
      "Noise Level",
      "Sheet Thickness",
    ],
    datasets: [
      {
        label: "Performance Metrics",
        data: [
          data[0].vibration_level || 0,
          data[0].power_consumption || 0,
          data[0].noise_level || 0,
          data[0].sheet_thickness || 0,
        ],
        backgroundColor: "rgba(255,206,86,0.2)",
        borderColor: "rgba(255,206,86,1)",
        pointBackgroundColor: "rgba(255,206,86,1)",
      },
    ],
  };

  // Pie Chart - Die Alignment Status
  const alignmentCounts = data.reduce(
    (acc, item) => {
      acc[item.die_alignment === "aligned" ? 0 : 1]++;
      return acc;
    },
    [0, 0] // [aligned, misaligned]
  );

  const pieData = {
    labels: ["Aligned", "Misaligned"],
    datasets: [
      {
        label: "Die Alignment Status",
        data: alignmentCounts,
        backgroundColor: ["rgba(54,162,235,0.6)", "rgba(255,99,132,0.6)"],
      },
    ],
  };

  return (
    <div>
      <h2>Force Applied and Temperature Over Time</h2>
      <Line data={lineData} />

      <h2>Oil Pressure and Lubrication Flow Rate</h2>
      <Bar data={barData} />

      <h2>Cycle Time vs Cycle Count</h2>
      <Scatter data={scatterData} />

      <h2>Performance Metrics Radar</h2>
      <Radar data={radarData} />

      <h2>Die Alignment Status</h2>
      <Pie data={pieData} />
    </div>
  );
};

export default StampingPresschart;
