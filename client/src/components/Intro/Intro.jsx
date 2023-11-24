import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { text } from '../../ultils/dataIntro';
import { Link } from 'react-router-dom';
import formatVietNamToString from '../../ultils/formatVietNamToString';
import './Intro.scss';
export default memo(function Intro() {
    const { categories } = useSelector((state) => state.category);
    return (
        <div className="intro">
            <div className="intro_content">
                <h3>{text.title}</h3>
                <p>
                    {`${text.description}`}
                    <span>
                        {categories?.map((item, index) => (
                            <Link key={index} to={`${formatVietNamToString(item?.value)}`}>
                                {`${item?.value?.toLowerCase()}, `}
                            </Link>
                        ))}
                    </span>
                    {`${text.description2}`}
                </p>

                <div className="plus">
                    {text?.statistic?.map((item, index) => (
                        <div key={index} className="plus_item">
                            <h4>{item.value}</h4>
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
                <h3>{text.price}</h3>
                <p className="intro_content_desc">{text.comment}</p>
                <span>{text.author}</span>
                <h3 className="intro_title">{text.question}</h3>
                <p>{text.answer}</p>
            </div>
        </div>
    );
});
