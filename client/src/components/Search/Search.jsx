import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import icons from '../../ultils/icon';
import { path } from '../../ultils/path';
import { ModalSearch, SearchItem } from '../index';
import './Search.scss';
const { IcHome, IcDelete, IcSearch } = icons;
export default function Search() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isShowModal, setIsShowModal] = useState(false);
    const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [queries, setQueries] = useState({});
    const { provinces, areas, prices, categories } = useSelector((state) => state.category);
    const [texts, setTexts] = useState({
        categories: '',
        provinces: '',
        prices: '',
        areas: '',
    });
    useEffect(() => {
        if (!location.pathname.includes('tim-kiem')) {
            setArrayMinMax({});
            setQueries({});
        }
    }, [location.pathname]);
    const [arrMinMax, setArrayMinMax] = useState({});
    const handleShowModal = (content, name) => {
        setContent(content);
        setName(name);
        setIsShowModal(true);
    };
    const handleSubmit = (query, arrMinMax) => {
        setQueries((prev) => ({ ...prev, ...query }));
        setIsShowModal(false);
        arrMinMax && setArrayMinMax((prev) => ({ ...prev, ...arrMinMax }));
    };
    const handleSearch = () => {
        const queryCode = Object.entries(queries)
            .filter((item) => item[0].includes('Number') || item[0].includes('Code'))
            .filter((item) => item[1]);
        let queryObject = {};
        queryCode.forEach((item) => {
            queryObject[item[0]] = item[1];
        });
        const queryText = Object.entries(queries).filter((item) => !item[0].includes('Number'));
        let queryTextObj = {};
        queryText.forEach((item) => {
            queryTextObj[item[0]] = item[1];
        });
        let titleSearch = `${queryTextObj.category ? queryTextObj.category : 'Cho thuê tất cả'} ${
            queryTextObj.province ? 'tỉnh  ' + queryTextObj.province : ''
        }
        ${queryTextObj.price ? 'giá ' + queryTextObj.price + ' triệu' : ''} ${
            queryTextObj.area ? 'diện tích  ' + queryTextObj.area + 'm2' : ''
        }`.replace(/[\s\r?\n]+/g, ' ');
        navigate(
            {
                pathname: `/${path.SEARCH}`,
                search: createSearchParams(queryObject).toString(),
            },
            { state: { titleSearch } },
        );
    };
    return (
        <>
            <div className="search">
                <div className="search_container_item" onClick={() => handleShowModal(categories, 'category')}>
                    <SearchItem
                        name={name}
                        LeftIcon={<IcHome />}
                        text={queries?.category?.length > 0 ? queries.category : 'Phòng trọ, nhà trọ'}
                        RightIcon={<IcDelete />}
                    />
                </div>
                <div className="search_container_item" onClick={() => handleShowModal(provinces, 'province')}>
                    <SearchItem
                        name={name}
                        LeftIcon={<IcHome />}
                        text={queries?.province?.length > 0 ? queries.province : 'Toàn quốc'}
                        RightIcon={<IcDelete />}
                    />
                </div>
                <div className="search_container_item" onClick={() => handleShowModal(prices, 'price')}>
                    <SearchItem
                        name={name}
                        LeftIcon={<IcHome />}
                        text={queries?.price?.length > 0 ? queries.price + 'Triệu' : 'Chọn giá'}
                        RightIcon={<IcDelete />}
                    />
                </div>
                <div className="search_container_item" onClick={() => handleShowModal(areas, 'area')}>
                    <SearchItem
                        name={name}
                        LeftIcon={<IcHome />}
                        text={queries?.area?.length > 0 ? queries.area + 'm2' : 'Chọn diện tích'}
                        RightIcon={<IcDelete />}
                    />
                </div>
                <div className="search_container_item" onClick={handleSearch}>
                    <SearchItem name={name} LeftIcon={<IcSearch />} text={'Tìm kiếm'} />
                </div>
            </div>
            {isShowModal && (
                <ModalSearch
                    setIsShowModal={setIsShowModal}
                    name={name}
                    content={content}
                    code={queries}
                    handleSubmit={handleSubmit}
                    arrMinMax={arrMinMax}
                />
            )}
        </>
    );
}
