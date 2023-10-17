import React from 'react';
import './SearchItem.scss';
export default function SearchItem({ LeftIcon, RightIcon, text }) {
    return (
        <div className="search_item">
            {LeftIcon}
            <span>{text}</span>
            {RightIcon}
        </div>
    );
}
