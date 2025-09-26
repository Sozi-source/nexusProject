import React, { useEffect } from 'react';
import { useRouter } from 'next/router';


interface ProtectedRouteProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
    loading?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated, loading }) => {
    const router = useRouter();

    useEffect(() => {
        if(loading) return;

        if (!isAuthenticated) {
            router.replace(`/authPage?redirect=${router.asPath}`);
        }
    }, [isAuthenticated, loading, router]);

    if(loading){
        return <p>Loading...</p>
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;