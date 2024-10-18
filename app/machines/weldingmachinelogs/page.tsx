import React from "react";
import Image from "next/image";
import weldingimage from "@/public/images/weldingimage.svg";
import view from "@/public/images/view.svg";

const Page = () => {
  return (
    <div className=" bg-[#F5F6FA] p-5">
      <div className="flex">
        <Image alt="agvs logs" src={weldingimage} />
        <div>
          <p className=" text-3xl font-bold">welding robots</p>
          <p>machineId : welding_robot_006</p>
          <p>machineType : automated robot</p>
          <p>
            Welding robots are responsible for joining metal components of a car
            using various welding techniques such as spot welding or arc
            welding. They are precise, fast, and ensure strong, high-quality
            welds in the car assembly process. Here’s an expanded view of the
            sensor data for welding robots:
          </p>
          <p className=" text-[#996127]">
            Critical: Welding Robot Power Consumption is too high!
          </p>
        </div>
      </div>
      <div>
        <button className=" bg-[#815EEA] text-white capitalize rounded-lg p-3">
          <p>view</p>
          <div className=" flex">
            <p> real time metrics</p>
            <Image alt="view" src={view} />
          </div>
        </button>

        <button className=" bg-[#CFEDDA] text-[#518B66] capitalize rounded-lg p-3">
          <p>download</p>
          <div className=" flex">
            <p> reports</p>
            <Image alt="view" src={view} />
          </div>
        </button>

        <button className=" bg-[#815EEA] text-white capitalize rounded-lg p-3">
          <p>view</p>
          <div className=" flex">
            <p> real time metrics</p>
            <Image alt="view" src={view} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Page;
