import React from 'react';
import { text } from '../../ultils/dataContact';
export default function Contact() {
    return (
        <div className="contact">
            <img src={text?.image} alt="image la toi" />
            <p>{text?.content}</p>
            <div>
                {text?.contacts?.map((item, index) => (
                    <div key={index}>
                        <span>{item?.text}</span>
                        <span>{item?.phone}</span>
                        <span>{item?.zalo}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
