import React from 'react';

export default function InputForm({ label, value, setValue, name, invalidFields, setInvalidFields, type }) {
    const validate = (id, value) => {
        if (id === 'email') {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(value)) {
                // alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
                // email.focus;
                // return false;
                document.querySelector('#email').parentNode.querySelector('span').innerText = 'Sai định dạng gmail';
            } else {
                alert('OK roi day, Email nay hop le.');
            }
        }
        if (id === 'email') {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(value)) {
                // alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
                // email.focus;
                // return false;
                document.querySelector('#email').parentNode.querySelector('span').innerText = 'Sai định dạng gmail';
            } else {
                alert('OK roi day, Email nay hop le.');
            }
        }
        if (id === 'email') {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(value)) {
                // alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
                // email.focus;
                // return false;
                document.querySelector('#email').parentNode.querySelector('span').innerText = 'Sai định dạng gmail';
            } else {
                alert('OK roi day, Email nay hop le.');
            }
        }
    };
    return (
        <div>
            <label htmlFor={name} className="text-xs">
                {label}
            </label>
            <input
                type={type || 'text'}
                id={name}
                className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
                value={value}
                onChange={(e) => setValue((prev) => ({ ...prev, [name]: e.target.value }))}
                onFocus={() => setInvalidFields([])}
            />
            {invalidFields.length > 0 && invalidFields.some((i) => i.name === name) && (
                <small className="text-red-500 italic">{invalidFields.find((i) => i.name === name)?.message}</small>
            )}
        </div>
    );
}
