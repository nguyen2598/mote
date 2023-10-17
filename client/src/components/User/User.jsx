import React from 'react';
import './User.scss';
import { useSelector } from 'react-redux';
import userLogo from '../../assests/user.png';
export default function User() {
    const { currentData } = useSelector((state) => state.user);
    console.log({ currentData });
    return (
        <div className="user">
            <img src={currentData?.avatar || userLogo} alt="user" className="user_img" />
            <div className="user_content">
                {currentData?.name && (
                    <>
                        <span>
                            Xin chào, <span className="fweight">{currentData?.name}</span>
                        </span>
                        <span>
                            Số điện thoại: <span className="fweight">{currentData?.phone}</span>
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}
