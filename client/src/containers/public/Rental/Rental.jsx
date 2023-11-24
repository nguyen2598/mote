import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RelatedPost, Search, SiderBarItem } from '../../../components';
import List from '../List/List';
import Pagination from '../Pagination/Pagination';
import { getNumber } from '../../../ultils/formatNumber';
import { useLocation } from 'react-router-dom';
import formatVietNamToString from '../../../ultils/formatVietNamToString';
export default function RentalApartment() {
    const { prices, areas, categories } = useSelector((state) => state.category);
    const location = useLocation();
    const [categoryCode, setCategoryCode] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        const category = categories?.find((item) => `/${formatVietNamToString(item?.value)}` === location.pathname);
        if (category) {
            setCategoryCode(category.code);
        }
    }, [location, categories]);
    return (
        <div className="rental_apartment">
            <Search />
            <div className="homePageContent">
                <div className="list_container">
                    <List categoryCode={categoryCode} />
                    <Pagination itemsPerPage={10} />
                </div>
                <div className="sider_bar_container">
                    <SiderBarItem
                        content={[...prices]?.sort((a, b) => getNumber(a?.value) - getNumber(b?.value))}
                        title="Xem theo giá"
                        isDouble
                        type="priceCode"
                    />
                    <SiderBarItem content={areas} title="Xem theo diện tích" type="areaCode" isDouble />
                    <RelatedPost />
                </div>
            </div>
        </div>
    );
}
