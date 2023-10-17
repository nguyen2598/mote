import React from 'react';
import { Navigation } from '../../../components';

export default function Header() {
    return (
        <div>
            <div>Phongtro</div>
            <div>
                <Navigation isAdmin={true} />
            </div>
            Header
        </div>
    );
}
