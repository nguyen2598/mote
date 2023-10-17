import React from 'react';
import { useSelector } from 'react-redux';
import { RelatedPost, Search, SiderBarItem } from '../../../components';
import { getNumber } from '../../../ultils/formatNumber';
import List from '../List/List';
import Pagination from '../Pagination/Pagination';
import { useLocation } from 'react-router-dom';
export default function SearchDetail() {
    const { prices, areas } = useSelector((state) => state.category);
    const location = useLocation();
    console.log('location', location);
    return (
        <div className="rental_apartment">
            <Search />
            <h4>{location?.state?.titleSearch}</h4>
            <div className="homePageContent">
                <div className="list_container">
                    <List />
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
