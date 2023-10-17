import React, { useEffect, useRef, useState } from 'react';
import { GrLinkPrevious } from 'react-icons/gr';
import './ModalSearch.scss';
import { getCodeArea, getCodes, getCodesArea } from '../../ultils/getCodes';
export default function ModalSearch({ setIsShowModal, content, name, handleSubmit, code, arrMinMax }) {
    const trackRef = useRef(null);
    const [persent1, setPersent1] = useState(arrMinMax[`${name}Arr`]?.[0] || 0);
    const [persent2, setPersent2] = useState(arrMinMax[`${name}Arr`]?.[1] || 100);
    useEffect(() => {
        const activeTrackEl = document.getElementById('track');
        let per1 = +persent1 < +persent2 ? +persent1 : +persent2;
        let per2 = +persent2 < +persent1 ? 100 - +persent1 : 100 - +persent2;
        if (activeTrackEl) {
            activeTrackEl.style.left = `${per1}%`;
            activeTrackEl.style.right = `${per2}%`;
        }
    }, [persent1, persent2]);

    const handleClickTrack = (e, valuePersent) => {
        e.stopPropagation();
        // const activeTrackEl = document.getElementById('track');

        const track = trackRef.current;
        const trackLength = track.getBoundingClientRect();
        const leftPercent =
            valuePersent !== undefined
                ? valuePersent
                : Math.round(((+e.clientX - +trackLength.left) / +trackLength.width) * 100);
        if (Math.abs(leftPercent - persent1) <= Math.abs(leftPercent - persent2)) {
            setPersent1(+leftPercent);
        } else {
            setPersent2(+leftPercent);
        }
    };
    const convert100ToTarget = (persent) => {
        let target = name === 'price' ? 1.5 : name === 'area' ? 9 : 1;
        let result = (Math.ceil(Math.round(persent * target) / 5) * 5) / 10;
        return result;
    };
    const convert15To100 = (persent) => {
        let target = name === 'price' ? 1.5 : name === 'area' ? 9 : 1;

        let result = (persent * 100) / (target * 10);
        return result;
    };
    const getNumbers = (string) => {
        return string.match(/[0-9]+/g);
    };
    const handleActive = (prices) => {
        let arr = getNumbers(prices);
        if (arr.length == 1) {
            if (arr[0] === '1' || arr[0] === '20') {
                setPersent1(0);
                name === 'price' ? setPersent2(6) : setPersent2(22);
            }
            if (arr[0] === '15' || arr[0] === '90') {
                setPersent1(100);
                setPersent2(100);
            }
        } else {
            setPersent1(convert15To100(+arr[0]));
            setPersent2(convert15To100(+arr[1]));
        }
    };
    // const handleSubmit = (e) => {
    // };
    const handleBeforeSubmit = () => {
        // const gaps =
        //     name === 'price'
        //         ? getCodes(
        //               [
        //                   convert100ToTarget(+persent1 < +persent2 ? +persent1 : +persent2),
        //                   convert100ToTarget(+persent1 > +persent2 ? +persent1 : +persent2),
        //               ],
        //               content,
        //           )
        //         : name === 'area'
        //         ? getCodesArea(
        //               [
        //                   convert100ToTarget(+persent1 < +persent2 ? +persent1 : +persent2),
        //                   convert100ToTarget(+persent1 > +persent2 ? +persent1 : +persent2),
        //               ],
        //               content,
        //           )
        //         : [];

        handleSubmit(
            {
                [`${name}Number`]: [
                    convert100ToTarget(+persent1 < +persent2 ? +persent1 : +persent2),
                    convert100ToTarget(+persent1 > +persent2 ? +persent1 : +persent2),
                ],
                [name]: `Từ ${convert100ToTarget(+persent1 < +persent2 ? +persent1 : +persent2)} - ${convert100ToTarget(
                    +persent1 > +persent2 ? +persent1 : +persent2,
                )}`,
            },
            {
                [`${name}Arr`]: [
                    +persent1 < +persent2 ? +persent1 : +persent2,
                    +persent1 > +persent2 ? +persent1 : +persent2,
                ],
            },
        );
    };
    return (
        <div className="modal_search">
            <div
                className="modal_search_overlay"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsShowModal(false);
                }}
            ></div>
            <div className="modal_search_content">
                <header className="modal_header">
                    <span className="modal_header_span">
                        <GrLinkPrevious size={28} />
                    </span>
                </header>
                {name === 'category' || name === 'province' ? (
                    <div className="modal_content">
                        {content?.map((item, index) => (
                            <span key={index} className="modal_content_item">
                                <input
                                    type="radio"
                                    defaultChecked={item.code === code[`${name}Code`] ? true : false}
                                    name={name}
                                    id={item?.code}
                                    value={item?.code}
                                    onClick={() =>
                                        handleSubmit({
                                            [name]: item.value,
                                            [`${name}Code`]: item.code,
                                        })
                                    }
                                />
                                <label htmlFor={item?.code}>{item?.value}</label>
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="modal_content">
                        <div className="modal_content_value">
                            {+persent1 === 100 && +persent2 === 100
                                ? `${'Trên ' + convert100ToTarget(persent1)}+`
                                : `${
                                      persent1 <= persent2
                                          ? convert100ToTarget(persent1) + '-' + convert100ToTarget(persent2)
                                          : convert100ToTarget(persent2) + '-' + convert100ToTarget(persent1)
                                  } ${name === 'price' ? 'Triệu' : 'm2'}`}

                            {/* {`${
                                persent1 == 100 && persent1 == 100
                                    ? 'Trên ' + convert100ToTarget(persent1)
                                    : persent1 <= persent2
                                    ? convert100ToTarget(persent1) + '-' + convert100ToTarget(persent2)
                                    : convert100ToTarget(persent2) + '-' + convert100ToTarget(persent1)
                            } ${name === 'prices' ? 'Triệu' : 'm2'}`} */}
                        </div>
                        <div className="modal_input">
                            <div className="modal_input_track" ref={trackRef} onClick={handleClickTrack}></div>
                            <div id="track" className="modal_input_active" onClick={handleClickTrack}></div>
                            <input
                                type="range"
                                name=""
                                id=""
                                value={persent1}
                                max={100}
                                min={0}
                                step={0}
                                onChange={(e) => setPersent1(e.target.value)}
                            />
                            <input
                                type="range"
                                name=""
                                id=""
                                value={persent2}
                                max={100}
                                min={0}
                                step={0}
                                onChange={(e) => setPersent2(e.target.value)}
                            />
                        </div>
                        <div className="value_range">
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClickTrack(e, 0);
                                }}
                            >
                                0
                            </span>
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClickTrack(e, 100);
                                }}
                            >
                                {name === 'price' ? '15 triệu +' : ' Trên 90m2'}
                            </span>
                        </div>
                        <div className="modal_content_content">
                            <h4>Chọn nhanh</h4>
                            <div className="modal_content_span">
                                {content?.map((item, index) => (
                                    <span key={index} onClick={() => handleActive(item.value)}>
                                        {item.value}
                                    </span>
                                ))}
                            </div>
                            {(name === 'price' || name === 'area') && (
                                <button className="sub" onClick={handleBeforeSubmit}>
                                    xác nhận
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
