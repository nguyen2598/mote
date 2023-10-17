import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import category from '../../services/category';
import formatVietNamToString from '../../ultils/formatVietNamToString';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../app/slice/appSlice';
const item = [];
export default function Navigation({ isAdmin }) {
    const { categories } = useSelector((state) => state.category);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, []);

    return (
        <div id="navigation">
            <div className="navigation--content">
                <NavLink className="navigation-item" to={`/`}>
                    Trang chủ
                </NavLink>
                {categories?.map((item, index) => (
                    <NavLink key={index} className="navigation-item" to={`${formatVietNamToString(item.value)}`}>
                        {item.value}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
