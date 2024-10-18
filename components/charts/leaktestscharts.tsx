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

const LeakTestchart = ({ data }) => {
  const timestamps = data.map((item) =>
    new Date(item.timestamp).toLocaleTimeString()
  );

  // Line Chart - Pressure and Temperature over Time
  const lineData = {
    labels: timestamps,
    datasets: [
      {
        label: "Test Pressure",
        data: data.map((item) => item.test_pressure || 0),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
      {
        label: "Temperature",
        data: data.map((item) => item.temperature || 0),
        borderColor: "rgba(54,162,235,1)",
        fill: false,
      },
    ],
  };

  // Bar Chart - Test Duration and Leak Rate
  const barData = {
    labels: timestamps,
    datasets: [
      {
        label: "Test Duration",
        data: data.map((item) => item.test_duration || 0),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
      {
        label: "Leak Rate",
        data: data.map((item) => item.leak_rate || 0),
        backgroundColor: "rgba(255,159,64,0.6)",
      },
    ],
  };

  // Pie Chart - Seal Condition Status
  const sealData = {
    labels: ["Pass", "Fail"],
    datasets: [
      {
        label: "Seal Condition",
        data: [
          data.filter((item) => item.seal_condition === "pass").length,
          data.filter((item) => item.seal_condition === "fail").length,
        ],
        backgroundColor: ["rgba(75,192,192,1)", "rgba(255,99,132,1)"],
      },
    ],
  };

  // Radar Chart - Performance Metrics
  const radarData = {
    labels: ["Pressure Drop", "Leak Rate", "Test Duration", "Temperature"],
    datasets: [
      {
        label: "Test Performance",
        data:  [
          data[0].pressure_drop || 0,
          data[0].leak_rate || 0,
          data[0].test_duration || 0,
          data[0].temperature || 0,
        ],
        backgroundColor: "rgba(153,102,255,0.4)",
        borderColor: "rgba(153,102,255,1)",
        pointBackgroundColor: "rgba(153,102,255,1)",
      },
    ],
  };

  return (
    <div>
      <h2>Pressure and Temperature Over Time</h2>
      <Line data={lineData} />

      <h2>Test Duration and Leak Rate</h2>
      <Bar data={barData} />

      <h2>Seal Condition Status</h2>
      <Pie data={sealData} />

      <h2>Test Performance Radar</h2>
      <Radar data={radarData} />
    </div>
  );
};

export default LeakTestchart;
