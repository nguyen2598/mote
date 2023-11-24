import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';
import { getPostsLimit } from '../../../app/slice/postSlice';
import { ListItem } from '../../../components';
import icons from '../../../ultils/icon';
import './List.scss';
const { IcHeartFul, IcHeart } = icons;
// import {}
export default function List({ categoryCode }) {
    const dispatch = useDispatch();
    const { posts, count } = useSelector((state) => state.post);
    const [searchParams] = useSearchParams();
    console.log({ posts });
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
        dispatch(getPostsLimit({ ...search }));
    }, [searchParams, categoryCode]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [posts]);
    return (
        <div className="list">
            <div className="list_header">
                <h4 className="list_header_title">Danh sách tin đăng</h4>
                <span className="list_header_count">Tổng {count} kết quả </span>
            </div>
            {/* <div className="list_navigate">
                <span>Sắp xếp</span>
                <NavLink to="?orderby=moi-nhat">moi nhat</NavLink>
                <NavLink to="?orderby=mac-dinh">mac dinh</NavLink>
                <NavLink to="?orderby=co-video">co video</NavLink>
            </div> */}
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
                        createdAt={item?.createdAt}
                    />
                ))}
            </div>
        </div>
    );
}
