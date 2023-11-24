import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SelectAddress from '../SelectAddress/SelectAddress';
import './Overview.scss';
export default function Overview({ payload, setPayload }) {
    const { categories } = useSelector((state) => state.category);
    const { currentData } = useSelector((state) => state.user);
    const [categoryCode, setCategory] = useState(payload?.categoryCode || '');
    useEffect(() => {
        setPayload((prev) => ({
            ...prev,
            categoryCode: categoryCode,
        }));
    }, [categoryCode]);
    return (
        <div className="overview">
            <h2>Thông tin liên hệ</h2>
            <div>
                <div>
                    <SelectAddress
                        label="Loại chuyên mục"
                        options={categories}
                        value={categoryCode}
                        setValue={setCategory}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="title">Tiêu đề</label>
                    <input
                        type="text"
                        id="title"
                        placeholder=""
                        style={{ border: '1px solid #ccc', padding: '4px 8px', fontSize: '18px' }}
                        value={payload?.title}
                        onChange={(e) => setPayload((prev) => ({ ...prev, title: e.target.value }))}
                    />
                </div>
                <div>
                    <label htmlFor="title">Nội dung mô tả</label>
                    <textarea
                        type="text"
                        id="title"
                        cols={'30'}
                        rows="10"
                        style={{ resize: 'none', width: '100%', padding: '4px 8px' }}
                        value={payload?.description || ''}
                        onChange={(e) => setPayload((prev) => ({ ...prev, description: e.target.value }))}
                    />
                </div>
                <div className="address_text">
                    <label htmlFor="exactly-address">Thông tin liên hệ</label>
                    <input type="text" id="exactly-address" defaultValue={currentData?.name} readOnly />
                </div>
                <div className="address_text">
                    <label htmlFor="exactly-address">Điện thoại</label>
                    <input type="text" id="exactly-address" defaultValue={currentData?.phone} readOnly />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }} className="only_button">
                    <label htmlFor="title">Giá thuê</label>
                    <div className="only_button_inp">
                        <input
                            type="number"
                            id="title"
                            placeholder=""
                            min="0"
                            style={{ border: '1px solid #ccc', padding: '4px 8px', fontSize: '18px' }}
                            value={payload?.priceNumber || ''}
                            onChange={(e) => setPayload((prev) => ({ ...prev, priceNumber: +e.target.value }))}
                        />
                        <span>đồng</span>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }} className="only_button">
                    <label htmlFor="title">Diện tích</label>
                    <div className="only_button_inp">
                        <input
                            type="number"
                            id="title"
                            min="0"
                            placeholder=""
                            style={{ border: '1px solid #ccc', padding: '4px 8px', fontSize: '18px' }}
                            value={payload?.areaNumber || ''}
                            onChange={(e) => setPayload((prev) => ({ ...prev, areaNumber: +e.target.value }))}
                        />
                        <span>
                            m<sup>2</sup>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
