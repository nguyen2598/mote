import React, { memo, useEffect, useState } from 'react';
import SelectAddress from '../SelectAddress/SelectAddress';
import app from '../../services/app';
import './Address.scss';
import { useSelector } from 'react-redux';
export default memo(function Address({ setPayload }) {
    const { dataEdit } = useSelector((state) => state.post);
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    useEffect(() => {
        let addressArr = dataEdit?.address?.split(',');
        let foundProvince =
            provinces?.length > 0
                ? provinces?.find((item) => item?.name?.trim() === addressArr?.[addressArr?.length - 1]?.trim())
                : null;
        setProvince(foundProvince ? foundProvince?.name : '');
        setDistrict(addressArr?.[0] || '');
    }, [provinces]);
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const res = await app.getPublicProvinceApi();
            setProvinces(res?.data);
        };
        fetchPublicProvince();
    }, []);
    // useEffect(() => {
    //     setDistrict('');
    // }, [province]);
    useEffect(() => {
        setPayload((prev) => ({
            ...prev,
            address: `${
                district?.length > 0 && province?.length > 0 ? district + ', ' + province : district + province
            }`,
            province: province,
        }));
    }, [province, district]);
    return (
        <div className="address">
            <h4>Địa chỉ cho thuê</h4>
            <div className="address_content">
                <div className="address_inp">
                    <SelectAddress
                        type="province"
                        value={province}
                        setValue={setProvince}
                        options={provinces}
                        label="Tỉnh thành phố"
                    />
                    <SelectAddress
                        type="district"
                        value={district}
                        setValue={setDistrict}
                        options={provinces?.find((item) => item?.name === province)?.districts}
                        label="Quận huyện"
                    />
                </div>
                <div className="address_text">
                    <label htmlFor="exactly-address">Điạ chỉ chính xác</label>
                    <input
                        required
                        type="text"
                        id="exactly-address"
                        readOnly
                        value={`${
                            district?.length > 0 && province?.length > 0
                                ? district + ', ' + province
                                : district + province
                        }`}
                    />
                </div>
            </div>
        </div>
    );
});
