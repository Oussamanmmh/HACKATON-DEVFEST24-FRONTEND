"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Agvchart from "@/components/charts/agvcharts";


const Page = () => {
  const [agvsdata, setagvsdata] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/webhook-v1/agv");
      console.log("response : ", response.data);
      setagvsdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      agvsmachinepage
      {agvsdata.length > 0 ? ( // Conditional rendering
        <Agvchart data={agvsdata} />
      ) : (
        <p>No agvs data available.</p>
      )}
    </div>
  );
};

export default Page;
