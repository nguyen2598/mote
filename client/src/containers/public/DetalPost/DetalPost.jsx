import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostsLimit } from '../../../app/slice/postSlice';
import { RelatedPost, SliderCustom, TableInfor } from '../../../components';
import './DetalPost.scss';
import { GiPriceTag } from 'react-icons/gi';
import { FaCropSimple, FaLocationDot } from 'react-icons/fa6';
import { IoTimeOutline } from 'react-icons/io5';
import { CiHashtag } from 'react-icons/ci';

export default function DetalPost() {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.post);
    useEffect(() => {
        console.log('co get dl');
        postId && dispatch(getPostsLimit({ id: postId }));
        window.scrollTo(0, 0);
    }, [postId]);
    console.log({ posts: posts?.[0]?.description.slice(1, posts?.[0]?.description?.length - 1)?.split('\\n'), postId });
    return (
        <div className="detail_post">
            <div className="detail_post_left">
                <SliderCustom images={posts?.[0] && JSON.parse(posts?.[0]?.images?.image)} />
                <div className="detail_post_content">
                    <h1>{posts?.[0]?.title}</h1>
                    <small>Chuyên mục: {}</small>
                    <address className="detail_post_address">
                        <FaLocationDot />
                        {posts?.[0]?.address}
                    </address>
                    <div className="detail_post_attributes">
                        <div className="item price">
                            <GiPriceTag size={24} />
                            {posts?.[0]?.attributes?.price}
                        </div>
                        <div className="item acreage">
                            <FaCropSimple size={24} />
                            35m2
                        </div>
                        <div className="item published">
                            <IoTimeOutline size={24} />
                        </div>
                        <div className="item hashtag">
                            <CiHashtag size={24} />
                        </div>
                    </div>

                    <section className="detail_post_infor">
                        <h4>Thông tin mô tả</h4>
                        {posts?.length > 0 &&
                        posts?.[0]?.description &&
                        Array.isArray(JSON.parse(posts?.[0]?.description))
                            ? JSON.parse(posts?.[0]?.description)?.map((item, index) => <span key={index}>{item}</span>)
                            : posts?.[0]?.description
                                  .slice(1, posts?.[0]?.description?.length - 1)
                                  ?.split('\\n')
                                  ?.map((item, index) => <span key={index}>{item}</span>)}
                    </section>
                    <section className="detail_post_overview">
                        <h4>Đặc điểm tin đăng</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ width: '25%' }}>Mã tin</td>
                                    <td>{posts?.[0]?.overviews?.code}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '25%' }}>Khu vực</td>
                                    <td>{posts?.[0]?.overviews?.area}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '25%' }}>Loại tin</td>
                                    <td>{posts?.[0]?.overviews?.bonus}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '25%' }}>Đối tượng thuê</td>
                                    <td>{posts?.[0]?.overviews?.target}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '25%' }}>ngày đăng</td>
                                    <td>{posts?.[0]?.overviews?.createdAt?.slice(0, 10)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section className="detail_post_contact">
                        <h4>Thông tin liên hệ</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ width: '25%' }}>Liên hệ</td>
                                    <td>{posts?.[0]?.user?.name}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '25%' }}>Điện thoại</td>
                                    <td>{posts?.[0]?.user?.phone}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '25%' }}>Zalo</td>
                                    <td>{posts?.[0]?.user?.zalo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section className="detail_post_map">
                        <h4>Bản đồ</h4>
                        <address>{posts?.[0]?.address}</address>
                    </section>
                </div>
            </div>
            <div className="detail_post_right">
                <TableInfor user={posts?.[0]?.user} />
                <RelatedPost />
            </div>
        </div>
    );
}
