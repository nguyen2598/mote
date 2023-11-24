import React from 'react';
import avatar from '../../../assests/user.png';
import { useDispatch, useSelector } from 'react-redux';
import menuSidebar from '../../../ultils/menuSidebar';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../../app/slice/authSlice';
import { getLogout } from '../../../app/slice/userSlice';
import { BiLogOut } from 'react-icons/bi';

import './Sidebar.scss';
export default function Sidebar() {
    const { currentData } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    return (
        <div className="sider_bar">
            <div className="sider_bar_header">
                <div className="sider_bar_profile">
                    <img src={currentData?.avatar || avatar} alt="" />{' '}
                    <div>
                        <span>{currentData?.name}</span>
                        <small>{currentData?.phone} </small>
                    </div>
                </div>
                <span>
                    ma thanh vien: <small>{`${currentData?.id?.replace(/\D+/g, '').slice(0, 6) || ''}`}</small>
                </span>
            </div>
            <div className="sider_bar_content">
                {menuSidebar.map((item, index) => (
                    <NavLink key={index} to={item?.path} className="item_modal_item">
                        {item.icon}
                        {item.text}
                    </NavLink>
                ))}
                <span
                    className="item_modal_item"
                    onClick={() => {
                        dispatch(logout());

                        dispatch(getLogout());
                    }}
                >
                    <BiLogOut />
                    Đăng xuất
                </span>
            </div>
        </div>
    );
}
