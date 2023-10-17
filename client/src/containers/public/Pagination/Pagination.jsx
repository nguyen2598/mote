import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './Pagination.scss';

export default function Pagination({ itemsPerPage }) {
    const { count } = useSelector((state) => state.post);
    const pageCount = Math.ceil(count / itemsPerPage);
    const navigate = useNavigate();
    const location = useLocation();
    const [paramsSearch] = useSearchParams();
    let entries = paramsSearch.entries();

    const handlePageClick = (data) => {
        let params = [];
        paramsSearch.append('page', data.selected + 1);
        for (let entry of entries) {
            params.push(entry);
        }
        let search = {};
        // params?.map((i) => {
        //     a = { ...a, [i[0]]: i[1] };
        // });
        params?.forEach((i) => {
            if (Object.keys(search)?.some((item) => item === i[0] && i[0] !== 'page')) {
                search[i[0]] = [...search[i[0]], i[1]];
            } else {
                search = { ...search, [i[0]]: [i[1]] };
            }
        });
        navigate({
            pathname: location?.pathname,
            search: createSearchParams(search).toString(),
        });
    };

    return (
        <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            forcePage={paramsSearch.get('page') === null ? 0 : +paramsSearch.get('page') - 1}
        />
    );
}
