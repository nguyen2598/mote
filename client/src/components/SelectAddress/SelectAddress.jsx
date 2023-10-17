import React from 'react';

export default function SelectAddress({ label }) {
    return (
        <div>
            <label htmlFor="select-address">{label}</label>
            <select name="" id="select-address">
                <option value="">-- Chon tinh/TP --</option>
            </select>
        </div>
    );
}
