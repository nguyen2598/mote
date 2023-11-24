import React from 'react';
import moment from 'moment';
import './RelatedItem.scss';
import { Link } from 'react-router-dom';
import formatVietNamToString from '../../ultils/formatVietNamToString';
require('moment/locale/vi');
export default function RelatedItem({ title, price, image, createdAt, id }) {
    return (
        <div className="relate_item">
            <span className="relate_image">
                <img src={image} alt="image" />
            </span>
            <span className="relate_item_content">
                <Link to={`/chi-tiet/${formatVietNamToString(title)}/${id}`} className="relate_item_title">{`${
                    title?.length > 49 ? title?.slice(0, 46) + '...' : title
                }`}</Link>
                <div className="relate_item_footer">
                    <span className="relate_price">{price}</span>
                    <span className="relate_time">{moment(createdAt).fromNow()}</span>
                </div>
            </span>
        </div>
    );
}
