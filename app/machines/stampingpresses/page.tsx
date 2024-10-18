"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import StampingPresschart from "@/components/charts/stampingpressescharts";

const Page = () => {
  const [stampingpressesdata, setstampingpressesdata] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/webhook-v1/stamping-press"
      );
      console.log("response : ", response.data);
      setstampingpressesdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      stampingpressesmachinepage
      {stampingpressesdata.length > 0 ? ( // Conditional rendering
        <StampingPresschart data={stampingpressesdata} />
      ) : (
        <p>No stampingpresses data available.</p>
      )}
    </div>
  );
};

export default Page;
