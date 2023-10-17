import React from 'react';
import moment from 'moment';
import './RelatedItem.scss';
require('moment/locale/vi');
export default function RelatedItem({ title, price, image, createdAt }) {
    return (
        <div className="relate_item">
            <span className="relate_image">
                <img src={image} alt="image" />
            </span>
            <span>
                <h4>{`${title?.length > 43 ? title?.slice(0, 40) + '...' : title}`}</h4>
                <div>
                    <span className="relate_price">{price}</span>
                    <span className="relate_time">{moment(createdAt).fromNow()}</span>
                </div>
            </span>
        </div>
    );
}
