import React from 'react';
import './TableInfor.scss';
import { useSelector } from 'react-redux';
import avt from '../../assests/user.png';
import { Link } from 'react-router-dom';
export default function TableInfor({ user }) {
    return (
        <aside className="table_infor">
            <img src={user?.avatar || avt} alt="" />
            <h3>{user?.name}</h3>
            <Link target="_blank" to={`tel:${user?.phone}`} className="phone">
                <i></i>
                {user?.phone}
            </Link>
            <Link target="_blank" to={`https://zalo.me/${user?.zalo}`} className="zalo">
                <i></i>
                Nhắn zalo
            </Link>
        </aside>
    );
}
