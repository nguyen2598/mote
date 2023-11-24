import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../assests/user.png';
import './ListItem.scss';
import formatVietNamToString from '../../ultils/formatVietNamToString';
import moment from 'moment';
require('moment/locale/vi');
export default function ListItem({
    image = 'https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2023/09/05/25cea973-37ef-4b5c-b255-17d16fc18a1d_1693880813.jpg',

    heart_ful,
    heart,
    link_Add = '/phongtro',
    title = 'PHÒNG TRỌ MỚI RẤT ĐẸP SỐ 373/1/2A ĐƯỜNG LÝ THƯỜNG KIỆT, QUẬN TÂN BÌNH',
    link_location = '/phong',
    price = '100000',
    acreage = '24',
    location = 'Quận Tân Bình, Hồ Chí Minh',
    description = 'PHÒNG TRỌ MỚI, ĐẸP SỐ 373/1/2a LÝ THƯỜNG KIỆT, GẦN ĐH BÁCH KHOA- Phòng nằm ngay trung tâm quận Tân Bình (xem hình thật). HẼM THÔNG, HẼM TO cách ĐƯỜNG LÝ…',
    avt,
    author = 'Be Home',
    id,
    createdAt,
}) {
    const navigate = useNavigate();
    const [isHoverHeart, setIsHoverHeart] = useState(false);
    return (
        <div className="list_item">
            <div className="list_item_image">
                <Link to={`/chi-tiet/${formatVietNamToString(title)}/${id}`} className="image_review">
                    <img src={image?.[0]} alt="review" />
                </Link>
                <span className="images_number">{image?.length} ảnh</span>
                <span className="post_save" onClick={() => setIsHoverHeart((prev) => !prev)}>
                    {!isHoverHeart ? heart : heart_ful}
                </span>
            </div>
            <div className="list_item_content">
                <div className="post_item_top">
                    <h3 className="post_title">
                        <Link to={`/chi-tiet/${formatVietNamToString(title)}/${id}`}>
                            <span className="star"></span>
                            {title}
                        </Link>
                    </h3>
                    <div className="post_meta">
                        <span className="post_meta_price">{price}</span>
                        <span className="post_meta_acreage">
                            {acreage?.match(/\d+/g)[0]}m<sup>2</sup>
                        </span>
                        <span className="post_meta_location">
                            <Link to={link_location}>{location?.split(', ')?.slice(-2).join(', ')}</Link>
                        </span>
                    </div>
                    <div className="post_meta">
                        <p className="post_meta_summary">{description}</p>
                    </div>
                </div>
                <div className="post_meta post_meta_footer">
                    <div className="post_meta_author">
                        <img src={avt || avatar} alt="" />
                        <span className="meta_author_name">{author}</span>
                    </div>
                    <div className="post_meta_time">{moment(createdAt).fromNow()}</div>
                </div>
            </div>
        </div>
    );
}
