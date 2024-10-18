import React from "react";
import Image from "next/image";
import humanresources from "@/public/images/hr.svg";
import path from "@/public/images/path.svg";
import pathdown from "@/public/images/pathdown.svg";
import totalorder from "@/public/images/totalorder.svg";
import totalsales from "@/public/images/totalsales.svg";
import opi from "@/public/images/opi.svg";

const Page = () => {
  const myarray = [
    {
      id: 0,
      name: "Human Resources",
      image: humanresources,
      amount: "$ 40689",
      percentage: "8.5%",
      text: "Up from yesterday",
      sign: path,
      color: "text-green-500",
    },
    {
      id: 1,
      name: "Total Order",
      image: totalorder,
      amount: "$ 1023",
      percentage: "1.3%",
      text: "Up from past week",
      sign: path,
      color: "text-green-500",
    },
    {
      id: 2,
      name: "Total Sales",
      image: totalsales,
      amount: "$ 89000",
      percentage: "4.3%",
      text: "Down from yesterday",
      sign: pathdown,
      color: "text-red-500",
    },
    {
      id: 3,
      name: "OPI",
      image: opi,
      amount: "$ 2040",
      percentage: "1.8%",
      text: "Up from yesterday",
      sign: path,
      color: "text-green-500",
    },
  ];
  return (
    <div className=" bg-[#F5F6FA] p-5">
      <p className="text-3xl font-bold capitalize mb-10">dashboard</p>
      <section className=" flex flex-wrap place-content-around">
        {myarray.map((item) => {
          return (
            <div
              key={item.id}
              className=" flex flex-col bg-white w-fit rounded-lg m-3 px-5 py-5 shadow-2xl"
            >
              <div className=" flex items-start place-content-between">
                <div className=" flex flex-col">
                  <p className=" capitalize text-xl font-semibold mr-3 text-[#202224]">
                    {item.name}
                  </p>
                  <p className=" text-3xl font-bold my-5">{item.amount}</p>
                </div>
                <Image alt="human resources" src={item.image} />
              </div>

              <div className=" flex">
                <Image alt="path" src={item.sign} className=" mr-2" />
                <p className={` ${item.color}  mr-2`}>{item.percentage}</p>
                <p className=" ">{item.text} </p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Page;
