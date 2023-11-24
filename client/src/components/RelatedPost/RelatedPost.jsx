import React, { useEffect } from 'react';
import RelatedItem from '../RelatedItem/RelatedItem';
import { useDispatch, useSelector } from 'react-redux';
import { getNewPosts } from '../../app/slice/postSlice';
import './RelatePost.scss';
export default function RelatedPost() {
    const dispatch = useDispatch();
    const { newPosts } = useSelector((state) => state.post);
    useEffect(() => {
        dispatch(getNewPosts());
    }, []);
    return (
        <div className="related_post">
            <h3>Tin mới đăng</h3>
            <div className="related_post_item">
                {newPosts?.map((item, index) => (
                    <RelatedItem
                        image={JSON.parse(item?.images?.image)?.[0]}
                        key={index}
                        title={item?.title}
                        price={item?.attributes?.price}
                        createdAt={item?.createdAt}
                        id={item?.id}
                    />
                ))}
            </div>
        </div>
    );
}
