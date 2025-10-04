import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-gray-800 border-t mt-auto">
            <div className="container mx-auto py-6 px-4">
                <div className="flex justify-between items-center">
                    <p className="text-white text-sm">
                        &copy; {new Date().getFullYear()} eDuka. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <Link href="/contactUs" className='text-white text-sm font-bold'>Contact Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};