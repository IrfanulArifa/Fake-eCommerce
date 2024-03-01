import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoot = ({
    isAllowed, 
    redirectTo = '/',
    children,
}) => {
    if ( !isAllowed ) {
        return <Navigate to={redirectTo} />
    }

    return (
        <>
            {
                isAllowed ? children : <Outlet/>
            }
        </>
    );
}

export default ProtectedRoot;
