"use client"
import axios from 'axios';
import React from 'react'
import Danger from './warnings/danger';
import Warning from './warnings/warning';
import Normal from './warnings/normal';

interface NotifyProps {
    machine_id: string;
    status: string; // or the appropriate type for status
    warnings: string[]; // or the appropriate type for warnings

}

export default function Notify({
    machine_id ,
    status,
    warnings ,

}: NotifyProps) {
    const [showText, setShowText] = React.useState(false);

    
    return (
        <div className={`bg-[#F3EDED] border-0 border-b-[1px] border-gray-400 py-5 px-4`}>
            <div className='flex items-center justify-between font-semibold'>
                <div className='flex items-center gap-6'>
                            <input
                                type="checkbox"
                                className="h-5 w-5 accent-[#333333]"
                            />
                            <div className='flex items-center justify-between text-start w-32 mr-6 '>
                                {machine_id}
                            </div>
                           {
                                 status === 'danger' ? <Danger/> : status === 'warning' ? <Warning/> : <Normal/>
                           }
                </div>
             
                <div className='flex items-center gap-4'>
                    <p>({warnings.length}) Warnings</p>
                    <button onClick={() => setShowText(!showText)} className='flex items-center justify-center'>
                            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.1117 10.1492L1.08829 2.96991C0.383037 1.96458 1.10237 0.583328 2.32979 0.583328H11.6703C12.8977 0.583328 13.617 1.96458 12.9129 2.96991L7.88729 10.1492C7.78738 10.2918 7.65458 10.4082 7.50014 10.4885C7.34569 10.5689 7.17415 10.6109 7.00004 10.6109C6.82593 10.6109 6.65438 10.5689 6.49994 10.4885C6.34549 10.4082 6.21161 10.2918 6.1117 10.1492Z" fill="#333333"/>
                            </svg>
                    </button>

                 </div>
            </div>
            <p className={`${showText ? 'block' : 'hidden'} px-10 pt-6 pb-4 text-balance text-sm translate-x-10 space-y-2`}>
                { 
                 warnings.length === 0 ? <p className='text-center font-semibold '> No warnings </p> :
                    warnings.map((warning, index) => (
                        <p key={index} className={`${status === 'danger' ? "text-[#B60031]" : status ==='normal'? "text-[#005BB6]":"text-[#E18E3A]" }`}>{warning}</p>
                    ))
                }
            </p>
        </div>
    );
}
