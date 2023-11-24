import React from 'react';
import './SelectAddress.scss';
export default function SelectAddress({ label, options, value, setValue }) {
    return (
        <div className="select_add">
            <label htmlFor="select-address">{label}</label>
            <select
                name=""
                id="select-address"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            >
                <option value="">{`-- Chon ${label?.toLowerCase()} --`}</option>
                {options?.map((item, index) => (
                    <option key={index} value={item?.name || item?.code}>
                        {item?.name || item?.value}
                    </option>
                ))}
            </select>
        </div>
    );
}
