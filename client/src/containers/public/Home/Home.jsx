import React, { useEffect } from 'react';
import { Contact, Header, Intro, Navigation } from '../../../components';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAreas, getPrices, getProvinces } from '../../../app/slice/appSlice';
import user from '../../../services/user';
import { getCurrent } from '../../../app/slice/userSlice';

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPrices());
        dispatch(getAreas());
        dispatch(getProvinces()); //@ts-ignore
    }, []);

    return (
        <div>
            <Header />
            <Navigation />
            <div className="home-content">
                <Outlet />
            </div>
            <Intro />
            <Contact />
        </div>
    );
}
