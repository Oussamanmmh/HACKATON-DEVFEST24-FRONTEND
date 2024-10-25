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
interface ChartData {
  timestamp: string;
  // Add other properties of your data items here
}

interface ChartStampProps {
  data: ChartData[];
}

export default function ChartWelding({ data }: ChartStampProps) {
    const timestamps = data.map((item) =>
        new Date(item.Timestamp).toLocaleTimeString()
      );
      const stampData = {
        labels: timestamps,
        datasets: [
          {
            label: "Welding Robot Efficiency",
            data: data.map((item) => item?.KPI_Value|| 0),
            borderColor: "rgba(75,192,192,1)",
            fill: false,
          },
        ],
      };
      return(
        <div>
            <Line data={stampData} />
        </div>
      )
    }


