import SignIn from '@/components/common/signin';
import SignUp from '@/components/common/signup';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/firebase/auth';

type Authmode = "signin" | "signup"

const AuthPage: React.FC = () => {
    const [mode, setMode]= useState<Authmode>("signin")
    const router = useRouter();
    const {user, loading}= useAuth();

   useEffect(()=>{
     if(!loading && user){
        const redirect= (router.query.redirect as string) || "/";
        router.push(redirect)
    }
   },[user, router,loading])

 
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 mt-10'>
           <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-lg'>
             <h1 className='text-center text-2xl font-bold text-gray-800 mb-4'>
                {mode==="signin"? "Sign In": "Sign Up"} 
            </h1>
                
                {mode === "signin"? <SignIn/> : <SignUp/>}

            <p onClick={()=> setMode(mode==="signin"? "signup": "signin")}>

                <p className='mt-6 text-center text-sm text-gray-600'>
                    {mode==="signin"? (
                        <>
                        Don&apos;t have an account?
                        <span onClick={()=>setMode("signup")}
                        className='cursor-pointer font-semibold text-yellow-600 hover:underline'>
                         Create one 
                        </span>
                        </>
                    ):(
                        <>
                        Already have an account?
                        <span onClick={()=>setMode("signin")} 
                        className='cursor-pointer font-semibold text-yellow-600 hover:underline'>
                            Sign In
                        </span>
                        </>
                    )}     
                </p>

            </p>
           </div>
      
        </div>
    );
};

export default AuthPage;