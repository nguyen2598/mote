import React, { memo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderCustom.scss';
export default memo(function SliderCustom({ images }) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="slide_custom" style={{ width: '100%' }}>
            <Slider {...settings}>
                {images?.map((item, index) => (
                    <div
                        key={index}
                        className="tad_index"
                        style={{ backgroundColor: '#000', display: 'flex', justifyContent: 'center', height: '320px' }}
                    >
                        <img src={item} alt="" style={{ display: 'block', height: '320px', objectFit: 'contain' }} />
                    </div>
                ))}
            </Slider>
        </div>
    );
});
