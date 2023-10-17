import React from 'react';
import { Address, Overview } from '../../../components';

export default function CreatePost() {
    return (
        <div>
            <h1>Dang tin moi</h1>
            <div>
                <div>
                    <Address />
                    <Overview />
                </div>
                <div>map</div>
            </div>
        </div>
    );
}
