"use client"
import Image from 'next/image'
import axios from 'axios';
import trash from '@/public/images/trash.svg';
import React from 'react';

export default function Header() {
  
  

  return (
    <div className='mb-14'>
        <h1 className="h1 font-bold text-3xl mb-5">Reports</h1>
        {/* <div className="flex justify-between px-4 border border-gray-400 rounded-xl w-56 items-center text-center">
                <p className="text-[#5D2EEA] text-center translate-x-5"> 4 Selected</p>
                <button
                className="flex items-center justify-center border-0 border-l-2 py-2 px-3"
               
                >
                <Image height={50} width={50} src={trash} alt="trash" className="size-6" />
                </button>
         </div>   */}
    </div>
  );
}
