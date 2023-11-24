import React, { useEffect, useState } from 'react';
import { TbCircleArrowUp } from 'react-icons/tb';
import './GoToTop.scss';
const handleGoToTop = () => {};
export default function GoToTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Hiệu ứng cuộn mượt
        });
    };
    return (
        <div className="go_to_top" onClick={scrollToTop}>
            <TbCircleArrowUp size={40} />
        </div>
    );
}
