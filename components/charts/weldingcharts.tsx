"use client";
import React from "react";
import { Line, Scatter, Radar } from "react-chartjs-2";
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
  RadialLinearScale
);

const Weldingcharts = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const timestamps = data.map((item) =>
    new Date(item.timestamp).toLocaleTimeString()
  );

  const lineData = {
    labels: timestamps,
    datasets: [
      {
        label: "Weld Temperature",
        data: data.map((item) => item?.weld_temperature || 0),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
      {
        label: "Weld Voltage",
        data: data.map((item) => item?.weld_voltage || 0),
        borderColor: "rgba(54,162,235,1)",
        fill: false,
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: "Weld Strength vs Weld Time",
        data: data.map((item) => ({
          x: item?.weld_time || 0,
          y: item?.weld_strength_estimate || 0,
        })),
        backgroundColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const radarData = {
    labels: ["Temperature", "Voltage", "Flow Rate", "Power", "Vibration"],
    datasets: [
      {
        label: "Machine Performance",
        data: [
          data[0]?.weld_temperature || 0,
          data[0]?.weld_voltage || 0,
          data[0]?.gas_flow_rate || 0,
          data[0]?.power_consumption || 0,
          data[0]?.vibration_level || 0,
        ],
        backgroundColor: "rgba(255,206,86,0.2)",
        borderColor: "rgba(255,206,86,1)",
        pointBackgroundColor: "rgba(255,206,86,1)",
      },
    ],
  };

  return (
    <div>
      <h2>Weld Metrics Over Time</h2>
      <Line data={lineData} />

      <h2>Weld Strength vs Weld Time</h2>
      <Scatter data={scatterData} />

      <h2>Machine Performance Radar</h2>
      <Radar data={radarData} />
    </div>
  );
};

export default Weldingcharts;
