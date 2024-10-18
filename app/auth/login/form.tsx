"use client"
import axios from 'axios';
import { useState } from 'react';
import './form.css'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../context/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type FormValues = {
    email: string;
    password: string;
};


export default function LoginForm() {

    const { register, handleSubmit, reset,formState: { errors } } = useForm<FormValues>();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {setUser} = useAuth();
    const router = useRouter();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        try {
            console.log('submitted', data);
             const response = await axios.post('http://localhost:5000/auth/login', data );
             localStorage.setItem('user',JSON.stringify(response.data.accessToken.token) );
             console.log(response.data);
            setUser(response.data.accessToken.token);
            
            router.push('/dashboard');
            console.log();
            
            reset();
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className="flex flex-col  gap-5  bg-white rounded-2xl px-10 py-5  w-1/2" onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-5xl font-bold text-center'>Login</h1>
                <p className='text-lg font-semibold text-center'>Please enter your personnel infos to continue</p>

                <label htmlFor="email" >Email :</label>
                <input
                    type="text"
                    placeholder="Email"
                    className='outline-none bg-gray-200 px-2 py-3'
                    {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <span>{errors.email.message}</span>}

               
                
               <div className='flex flex-row gap-2 items-center justify-between'>
                        <label htmlFor="password">Password :</label>
                        <Link href='/forgotpassword' className='text-gray-600 '>Forget Password ?</Link>
                </div>
                <input
                    type="password"
                    placeholder="Password"
                    className='outline-none bg-gray-200 px-2 py-3'
                    {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <span>{errors.password.message}</span>}
                <div className='flex items-center'>
                        <input type="checkbox" className='mr-2'/>
                        <label htmlFor="remember" >I accept terms and conditions .</label>
                </div>
                
                  <div className='flex flex-col gap-2 px-10'>
                        <button
                            type="submit"
                            className="bg-purple-700 text-white rounded-md px-4 py-3 text-xl font-semibold"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                        {error && <span>{error}</span>}
                        <Link href='/signup' className='text-gray-600 text-center mt-5'>Don't have account ?</Link>
                        <button className='border border-purple-600 text-purple-600 rounded-md px-4 py-3 text-xl font-semibold'>Sign Up</button>
                </div>
            </form>
        </>
    );
}