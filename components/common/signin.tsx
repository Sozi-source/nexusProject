import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '@/firebase/auth';
import { useRouter } from 'next/router';

const SignIn:React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading]= useState(false)
    const [error, setError]= useState<string|null>(null)
    const {signIn}= useAuth()

    const router= useRouter();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await signIn(email.trim(), password)
            const redirectPath = (router.query.redirect as string) ||"/profile";
            router.push(redirectPath);
            console.log("Signed in successfully")

        // clear the form
        setEmail("");
        setPassword("");

        } catch (error:unknown) {
            if(error instanceof Error){
             setError(error.message||"Failed to sign in")
            }
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className=''>
             <h2 className='text-center text-2xl font-bold text-gray-800'>Welcome Back</h2>
                <p className='mt-2 text-center text-sm text-gray-600'> 
                     Sign in to your <span className="text-yellow-500 font-semibold">eco-DUKA</span> Account.
                </p>
        
         <form onSubmit={handleSubmit} className='mt-4 space-y-5 mt-6'>
           
            <div>
                <label htmlFor="email"
                className='block text-sm font-medium text-gray-700'>Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className='mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none'/>
            </div>
            <div>
                <label htmlFor="password"
                className='block text-sm font-medium text-gray-700'>Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className='mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none'
                />
            </div>

            
                <label className='flex items-center text-sm text-gray-600'>
                  <input 
                    type="checkbox" 
                    className='mr-2 h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500'/>
                    Remember me
                </label>

                <Link href='#'
                className='text-sm font-medium text-yellow-500 hover:underline'>     
                Forgot password ?
                </Link>

                {/* error */}
                {error && (
                    <p className='text-sm text-red-500 mt-2 text-center'>{error}</p>
                )}

                <button 
                type='submit' 
                className='w-full rounded-lg bg-yellow-500 py-3 font-semibold text-white transition hover:bg-yellow-600'>{loading ? "Signing in..." : "Sign In"}
                </button>
        </form>
        </div>
    );
};

export default SignIn;