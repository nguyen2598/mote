import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { path } from '../../../ultils/path';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './System.scss';
import { Header, Navigation } from '../../../components';
export default function System() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    if (isLoggedIn)
        return (
            <div className="system">
                <Header />
                <Navigation />
                <div className="system_content">
                    <div className="system_sidebar">
                        <Sidebar />
                    </div>
                    <div className="system_outlet">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    else return <Navigate to={`/${path.LOGIN}`} replace={true} />;
}
