import React from 'react';
import { CreatePost } from '../../containers/private';
import './UpdatePost.scss';
export default function UpdatePost({ setIsEdit }) {
    return (
        <div className="update_post">
            <div className="overflow" onClick={() => setIsEdit(false)}></div>
            <div className="update_post_content">
                <CreatePost isEdit />
            </div>
        </div>
    );
}
