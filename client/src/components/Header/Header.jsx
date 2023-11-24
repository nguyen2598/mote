import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assests/logo.svg';
import { path } from '../../ultils/path';
import icons from '../../ultils/icon';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/slice/authSlice';
import { getLogout } from '../../app/slice/userSlice';
import menuManage from '../../ultils/menuManage';
import User from '../User/User';
import './Header.scss';
const { IcPlus, IcUserPlus, BiLogOut, AiFillCaretDown } = icons;
export default function Header() {
    const [isShowmenu, setIsShowmenu] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    return (
        <div id="header">
            <div className="header_container">
                <Link to="/" className="header-logo">
                    <img src={logo} alt="home-melody" />
                </Link>
                {/* <div className="header-center">
                    <small> Phong tro abc xin chào bạn</small>
                </div> */}
                <div className="header-right">
                    <>
                        {!isLoggedIn ? (
                            <button onClick={() => navigate(path.LOGIN)} className="header-login">
                                <IcUserPlus />
                                Dang nhap
                            </button>
                        ) : (
                            <div className="header-right_item">
                                {/* <small>{currentData?.name}</small> */}
                                <User />
                                <button className="header-login" onClick={() => setIsShowmenu((prev) => !prev)}>
                                    {/* <IcUserPlus /> */}
                                    Quản lý tài khoản
                                    <AiFillCaretDown size={24} />
                                </button>
                                {isShowmenu ? (
                                    <div className="item_modal">
                                        {menuManage.map((item, index) => (
                                            <Link key={index} to={item?.path} className="item_modal_item">
                                                {item.icon}
                                                {item.text}
                                            </Link>
                                        ))}
                                        <span
                                            className="item_modal_item"
                                            onClick={() => {
                                                dispatch(logout());

                                                dispatch(getLogout());
                                                setIsShowmenu(false);
                                            }}
                                        >
                                            <BiLogOut />
                                            Đăng xuất
                                        </span>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        )}
                    </>
                    <Link to="/he-thong/tao-moi-tin-dang">
                        <button className="header-create">
                            Đăng bài
                            <IcPlus />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
