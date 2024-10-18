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

const PaintingRobotchart = ({ data }) => {
  const timestamps = data.map((item) =>
    new Date(item.timestamp).toLocaleTimeString()
  );

  // Line Chart - Spray Pressure and Paint Thickness Over Time
  const lineData = {
    labels: timestamps,
    datasets: [
      {
        label: "Spray Pressure",
        data: data.map((item) => item.spray_pressure || 0),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Paint Thickness",
        data: data.map((item) => item.paint_thickness || 0),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
    ],
  };

  // Bar Chart - Temperature and Humidity
  const barData = {
    labels: timestamps,
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.map((item) => item.temperature || 0),
        backgroundColor: "rgba(54,162,235,0.6)",
      },
      {
        label: "Humidity (%)",
        data: data.map((item) => item.humidity || 0),
        backgroundColor: "rgba(255,206,86,0.6)",
      },
    ],
  };

  // Scatter Chart - Atomizer Speed vs Paint Flow Rate
  const scatterData = {
    datasets: [
      {
        label: "Atomizer Speed vs Paint Flow Rate",
        data: data.map((item) => ({
          x: item.atomizer_speed || 0,
          y: item.paint_flow_rate || 0,
        })),
        backgroundColor: "rgba(153,102,255,1)",
      },
    ],
  };

  // Radar Chart - Performance Metrics
  const radarData = {
    labels: [
      "Spray Pressure",
      "Overspray Efficiency",
      "Airflow Velocity",
      "Solvent Concentration",
      "Paint Volume Used",
    ],
    datasets: [
      {
        label: "Performance Metrics",
        data: [
          data[0].spray_pressure || 0,
          data[0].overspray_capture_efficiency || 0,
          data[0].booth_airflow_velocity || 0,
          data[0].solvent_concentration || 0,
          data[0].paint_volume_used || 0,
        ],
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        pointBackgroundColor: "rgba(255,99,132,1)",
      },
    ],
  };

  return (
    <div>
      <h2>Spray Pressure and Paint Thickness Over Time</h2>
      <Line data={lineData} />

      <h2>Temperature and Humidity</h2>
      <Bar data={barData} />

      <h2>Atomizer Speed vs Paint Flow Rate</h2>
      <Scatter data={scatterData} />

      <h2>Performance Metrics Radar</h2>
      <Radar data={radarData} />
    </div>
  );
};

export default PaintingRobotchart;
