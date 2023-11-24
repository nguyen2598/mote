import React from 'react';
import { useSelector } from 'react-redux';
import { RelatedPost, Search, SiderBarItem } from '../../../components';
import { getNumber } from '../../../ultils/formatNumber';
import List from '../List/List';
import Pagination from '../Pagination/Pagination';
import './HomePage.scss';

export default function HomePage() {
    const { categories, prices, areas } = useSelector((state) => state.category);

    return (
        <div>
            <Search />
            <div className="homePageContent">
                <div className="list_container">
                    <List />
                    <Pagination itemsPerPage={10} />
                </div>
                <div className="sider_bar_container">
                    <SiderBarItem content={categories} title="Danh sách cho thuê" />
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
