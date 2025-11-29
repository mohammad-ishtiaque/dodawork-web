import React from 'react';
import { RequestServiceProvider } from './context';

const Layout = ({ children }) => {
    return (
        <RequestServiceProvider>
            <div className="min-h-screen bg-gray-50">
                {children}
            </div>
        </RequestServiceProvider>
    );
};

export default Layout;
