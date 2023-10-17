import React from 'react';
import SelectAddress from '../SelectAddress/SelectAddress';

export default function Address() {
    return (
        <div>
            <h2>Dia chi cho thue</h2>
            <div>
                <div>
                    <SelectAddress label="Tỉnh thành phố" />
                    <SelectAddress label="Quận huyện" />
                </div>
                <div>
                    <input type="text" readOnly />
                </div>
            </div>
        </div>
    );
}
