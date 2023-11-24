import React from 'react';
import { text } from '../../ultils/dataContact';
import './Contact.scss';
export default function Contact() {
    return (
        <div className="contact">
            <div className="contact_content">
                <img src={text?.image} alt="image la toi" />
                <p className="list-support-title">{text?.content}</p>
                <div className="contact_infor">
                    {text?.contacts?.map((item, index) => (
                        <div key={index} className="contact_infor_item">
                            <span className="co_red">{item?.text}</span>
                            <span>{item?.phone}</span>
                            <span>{item?.zalo}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
