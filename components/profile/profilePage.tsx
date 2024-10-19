"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import logout  from '@/public/images/logouticon.svg';
import ProfileInfo from './profileinfo';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';

export default function ProfilePage({show , setShow}) {
    const [user , setUser] = React.useState({})
    const[error , setError] = React.useState(null);
    const[loading , setLoading] = React.useState(true);
    useEffect(()=>{
        const fetch = async () => {

            const userInfo = JSON.parse(localStorage.getItem('user'));
            console.log(userInfo);
             try{
              const response = await axios.get(`http://localhost:4000/users/users/${userInfo.userId}` ,
              {headers: {
                Authorization: `Bearer ${userInfo.token}`
              }}
              );

              setUser(response.data);
              setLoading(false);
              console.log(response.data);
             }
              catch(err){
                console.log(err);
              }}
                fetch();
            },[])

    if(loading){
        return <div>
            <h1>Loading...</h1>
        </div>
    }

  return (
        <section className={`fixed z-50 right-0 top-0 h-full bg-white w-[350px] flex flex-col justify-evenly ${show ? "block":"hidden"}`}>
                <div className='w-full flex justify-start p-4'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='hover:cursor-pointer' onClick={()=>setShow(false)}>
                            <path d="M2.66732 23.6667L0.333984 21.3333L9.66732 12L0.333984 2.66668L2.66732 0.333344L12.0007 9.66668L21.334 0.333344L23.6673 2.66668L14.334 12L23.6673 21.3333L21.334 23.6667L12.0007 14.3333L2.66732 23.6667Z" fill="#333333"/>
                            </svg>

                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                         { user.profileImage ? <Image src={user.profileImage} alt='profile' width={100} height={100} className='rounded-full size-52 object-cover '/> : <FiUser size={70} className="text-white bg-gray-400 rounded-full p-2" />                        }
                         <h1 className='text-2xl font-bold uppercase'>{user.name}</h1>
                         <div className={`font-semibold text-xl px-4 py-1 rounded-xl border-[1px] ${user.role ==='manager' ? "border-[#BE7F44] bg-[#F7DFC8] text-[#BE7F44]" : "border-[#3E50BC] text-[#3E50BC] bg-[#E3E6FA]"}  text-center uppercase`}>
                            {user.role}
                         </div>
'
                </div>

                <ProfileInfo email={user.email} phone={user.phoneNumber} name={user.name} role={user.role}/>

               <div className='flex justify-center'>
                    <button className='flex items-center gap-4 font-bold ' >
                            <p>Log Out</p>
                            <Image src={logout} alt='logout' width={20} height={20}/>
                     </button>
               </div>
        </section>
  )
}
