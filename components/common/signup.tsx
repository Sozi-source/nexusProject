import { useAuth } from '@/firebase/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const SignUp:React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const[loading, setLoading]= useState(false)

    const {signUp}= useAuth();
    const router = useRouter()


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !password || !name) {
            setError('All fields are required.');
            return;
        }
        setError('');
        setLoading(true)

        try {
            await signUp(email.trim(), password, name.trim())
            router.push("/")
        } catch (err:unknown) {
            if(err instanceof Error){
                setError(err.message || "Failed to signup")
            }
            
        }finally{
            setLoading(false)
        }
        
        alert('Sign up successful!');
        setEmail('');
        setPassword('');
        setName('');
    };
        if(loading) return <p>Loading...</p>
    return (
             <form onSubmit={handleSubmit} className='mt-4 space-y-5'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} className='mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none' />
                    </label>
                
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className='mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none'
                        />
                    </label>
                
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className='mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none'
                         />
                    </label>
                
                </div>
                {error && <div>{error}</div>}
                <button type="submit"
                className='w-full rounded-lg bg-yellow-500 py-3 font-semibold text-white transition hover:bg-yellow-600'>Sign Up</button>
            </form>
    );
};

export default SignUp;