import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { path } from '../../../ultils/path';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
export default function System() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    if (isLoggedIn)
        return (
            <div>
                <Header />
                <div>
                    <Sidebar />
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    else return <Navigate to={`/${path.LOGIN}`} replace={true} />;
}
