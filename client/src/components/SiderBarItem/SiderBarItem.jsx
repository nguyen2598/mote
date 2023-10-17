import React, { memo } from 'react';
import { GrPrevious } from 'react-icons/gr';
import { Link, createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import formatVietNamToString from '../../ultils/formatVietNamToString';
import './SiderBarItem.scss';
export default memo(function SiderBarItem({ title, content, isDouble, type }) {
    const location = useLocation();
    const navigate = useNavigate();
    const handleFilterPosts = (code) => {
        //     pathname: location?.pathname,
        //     search: createSearchParams({
        //         ['type']: code,
        //     }).toString(),
        // });
        // dispatch(getPostsLimit({ [type]: code }));
        navigate({
            pathname: location?.pathname,
            search: createSearchParams({
                [type]: code,
            }).toString(),
        });
    };
    return (
        <div className="sider_bar_item">
            <h3 className="bar_item_h3">{title}</h3>
            <div className="bar_item_list">
                {content?.map((item, index) =>
                    isDouble ? (
                        <div
                            onClick={() => handleFilterPosts(item?.code)}
                            // to={!isDouble ? formatVietNamToString(item?.value) : '/123'}
                            className={`item_list_item isDouble`}
                            key={index}
                        >
                            <GrPrevious size={10} />
                            <p>{item?.value}</p>
                        </div>
                    ) : (
                        <Link to={formatVietNamToString(item?.value)} className={`item_list_item  `} key={index}>
                            <GrPrevious size={10} />
                            <p>{item?.value}</p>
                        </Link>
                    ),
                )}
            </div>
        </div>
    );
});
