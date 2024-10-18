"use client";
import React from "react";
import { Line, Scatter, Pie, Bar } from "react-chartjs-2";
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
  ArcElement
);

const Agvchart = ({ data }) => {
  // Prepare timestamps for line charts
  const timestamps = data.map((item) =>
    new Date(item.timestamp).toLocaleTimeString()
  );

  // Line chart for battery level
  const batteryData = {
    labels: timestamps,
    datasets: [
      {
        label: "Battery Level (%)",
        data: data.map((item) => item.battery_level || 0),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  // Scatter chart for load weight vs speed
  const loadSpeedData = {
    datasets: [
      {
        label: "Load Weight vs Speed",
        data: data.map((item) => ({
          x: item.load_weight,
          y: item.speed,
        })),
        backgroundColor: "rgba(75,192,192,1)",
      },
    ],
  };

  // Line chart for distance traveled
  const distanceData = {
    labels: timestamps,
    datasets: [
      {
        label: "Distance Traveled (m)",
        data: data.map((item) => item.distance_traveled || 0),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
    ],
  };

  // Pie chart for obstacle detection status
  const obstacleCounts = data.reduce(
    (acc, item) => {
      if (item.obstacle_detection === "yes") acc.yes++;
      else acc.no++;
      return acc;
    },
    { yes: 0, no: 0 }
  );

  const obstacleData = {
    labels: ["Yes", "No"],
    datasets: [
      {
        data: [obstacleCounts.yes, obstacleCounts.no],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  // Bar chart for navigation status
  const navigationCounts = data.reduce((acc, item) => {
    acc[item.navigation_status] = (acc[item.navigation_status] || 0) + 1;
    return acc;
  }, {});

  const navigationData = {
    labels: Object.keys(navigationCounts),
    datasets: [
      {
        label: "Navigation Status",
        data: Object.values(navigationCounts),
        backgroundColor: "rgba(54,162,235,0.6)",
      },
    ],
  };

  // Line chart for vibration level over time
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

  return (
    <div>
      <h2>Battery Level Over Time</h2>
      <Line data={batteryData} />

      <h2>Load Weight vs Speed</h2>
      <Scatter data={loadSpeedData} />

      <h2>Distance Traveled Over Time</h2>
      <Line data={distanceData} />

      <h2>Obstacle Detection Status</h2>
      <Pie data={obstacleData} />

      <h2>Navigation Status</h2>
      <Bar data={navigationData} />

      <h2>Vibration Level Over Time</h2>
      <Line data={vibrationData} />
    </div>
  );
};

export default Agvchart;