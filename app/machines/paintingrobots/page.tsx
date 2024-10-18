"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PaintingRobotchart from "@/components/charts/paintingrobotscharts";

const Page = () => {
  const [paintingrobotsdata, setpaintingrobotsdata] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/webhook-v1/painting-robot"
      );
      console.log("response : ", response.data);
      setpaintingrobotsdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      paintingrobotsmachinepage
      {paintingrobotsdata.length > 0 ? ( // Conditional rendering
        <PaintingRobotchart data={paintingrobotsdata} />
      ) : (
        <p>No paintingrobots data available.</p>
      )}
    </div>
  );
};

export default Page;
