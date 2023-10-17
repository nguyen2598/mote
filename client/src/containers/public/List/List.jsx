import React, { useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import icons from '../../../ultils/icon';
import './List.scss';
import { ListItem } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getPostsLimit } from '../../../app/slice/postSlice';
import Pagination from '../Pagination/Pagination';
const { IcHeartFul, IcHeart } = icons;
// import {}
export default function List({ categoryCode }) {
    const dispatch = useDispatch();
    const { posts, count } = useSelector((state) => state.post);
    const [searchParams] = useSearchParams();
    useEffect(() => {
        // let page = searchParams.get('page') || 1;
        // let priceCode = searchParams.get('priceCode');
        let params = [];
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let search = {};
        params?.forEach((i) => {
            if (Object.keys(search)?.some((item) => item === i[0])) {
                search[i[0]] = [...search[i[0]], i[1]];
            } else {
                search = { ...search, [i[0]]: [i[1]] };
            }
        });
        if (categoryCode) search.categoryCode = categoryCode;
        console.log('ws', search);
        dispatch(getPostsLimit({ ...search }));
    }, [searchParams, categoryCode]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [posts]);
    return (
        <div className="list">
            <div className="list_header">
                <h4>Danh sách tin đăng</h4>
                <span>Cập nhật: </span>
            </div>
            <div className="list_navigate">
                <span>Sắp xếp</span>
                <NavLink to="?orderby=moi-nhat">moi nhat</NavLink>
                <NavLink to="?orderby=mac-dinh">mac dinh</NavLink>
                <NavLink to="?orderby=co-video">co video</NavLink>
            </div>
            <div className="list_content">
                {posts?.map((item, index) => (
                    <ListItem
                        key={index}
                        heart_ful={<IcHeartFul size={24} />}
                        heart={<IcHeart size={24} />}
                        image={JSON.parse(item?.images?.image)}
                        link_Add
                        title={item?.title}
                        link_location
                        price={item?.attributes?.price}
                        acreage={item?.attributes?.acreage}
                        location={item?.address}
                        description={JSON.parse(item?.description)}
                        avt={item?.user?.avatar}
                        author={item?.user?.name}
                        id={item?.id}
                    />
                ))}
            </div>
        </div>
    );
}
