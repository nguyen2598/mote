import React, { useEffect, useState } from 'react';
import { Contact, GoToTop, Header, Intro, Navigation } from '../../../components';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAreas, getPrices, getProvinces } from '../../../app/slice/appSlice';
import user from '../../../services/user';
import { getCurrent } from '../../../app/slice/userSlice';
import Footer from '../../../components/Footer/Footer';

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleScroll = () => {
        // Kiểm tra nếu người dùng đã cuộn xuống một khoảng cách cụ thể (ví dụ: 100px)
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    return (
        <div>
            <Header />
            <Navigation />
            <div className="home-content">
                <Outlet />
            </div>
            <Intro />
            <Contact />
            <Footer />
            {isVisible && <GoToTop />}
        </div>
    );
}
