import React from 'react';
import { useSelector } from 'react-redux';
import { RelatedPost, Search, SiderBarItem } from '../../../components';
import { getNumber } from '../../../ultils/formatNumber';
import List from '../List/List';
import Pagination from '../Pagination/Pagination';
import { useLocation } from 'react-router-dom';
import './SearchDetail.scss';
export default function SearchDetail() {
    const { prices, areas } = useSelector((state) => state.category);
    const location = useLocation();
    return (
        <div className="rental_apartment">
            <Search />
            <div className="rental_apartment_heading">
                <h4 className="rental_apartment_h4">{location?.state?.titleSearch}</h4>
                <p className="rental_apartment_p">
                    Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp
                    mới nhất năm 2023. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.
                </p>
            </div>
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
