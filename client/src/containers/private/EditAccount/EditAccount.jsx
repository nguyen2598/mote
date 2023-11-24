import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import avt from '../../../assests/user.png';
import { FaCamera } from 'react-icons/fa';
import './EditAccount.scss';
import app from '../../../services/app';
import user from '../../../services/user';
import Swal from 'sweetalert2';
import { getCurrent } from '../../../app/slice/userSlice';
export default function EditAccount() {
    const dispatch = useDispatch();
    const { currentData } = useSelector((state) => state.user);
    const [payload, setpayload] = useState({
        name: currentData?.name || '',
        phone: currentData?.phone || '',
        zalo: currentData?.zalo || '',
        fbUrl: currentData?.fbUrl || '',
        avatar: currentData?.avatar,
    });
    useEffect(() => {
        setpayload({
            name: currentData?.name || '',
            phone: currentData?.phone || '',
            zalo: currentData?.zalo || '',
            fbUrl: currentData?.fbUrl || '',
            avatar: currentData?.avatar,
        });
    }, [currentData]);
    const handleSubmit = async () => {
        const response = await user.updateUser(payload);
        if (response?.data?.err === 0) {
            Swal.fire('Done', 'Chỉnh sửa thành công', 'success').then(() => {
                dispatch(getCurrent());
            });
        } else {
            Swal.fire('Opps!', 'Chỉnh sửa không thành công', 'error');
        }
    };
    const handleSetValue = (e) => {
        setpayload((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleFile = async (e) => {
        // setIsLoading(true);
        e.stopPropagation();
        e.preventDefault();
        let image = e.target.files[0];
        let formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME);
        const res = await app.getUploadImages(formData);
        if (res.status === 200) {
            setpayload((prev) => ({
                ...prev,
                avatar: res?.data?.secure_url,
            }));
        }
    };
    return (
        <div className="edit_acc">
            <h1 className="edit_acc_heading">Chỉnh sửa thông tin cá nhân</h1>
            <div className="edit_acc_form">
                <div className="edit_acc_group">
                    <label htmlFor="">Mã thành viên</label>
                    <div className="input_div">
                        <input
                            onChange={handleSetValue}
                            style={{ border: '1px solid #ccc', padding: '8px 12px', fontSize: '18px' }}
                            type="text"
                            readOnly
                            defaultValue={currentData?.id || ''}
                        />
                    </div>
                </div>
                <div className="edit_acc_group">
                    <label htmlFor="">Số điện thoại</label>
                    <div className="input_div">
                        <input
                            name="phone"
                            onChange={handleSetValue}
                            style={{ border: '1px solid #ccc', padding: '8px 12px', fontSize: '18px' }}
                            type="text"
                            defaultValue={payload?.phone}
                        />
                        <small className="small">Đổi số điện thoại</small>
                    </div>
                </div>
                <div className="edit_acc_group">
                    <label htmlFor="">Tên hiển thị</label>

                    <div className="input_div">
                        <input
                            name="name"
                            onChange={handleSetValue}
                            style={{ border: '1px solid #ccc', padding: '8px 12px', fontSize: '18px' }}
                            type="text"
                            defaultValue={payload?.name}
                        />
                        <small className="small">Đổi tên</small>
                    </div>
                </div>
                <div className="edit_acc_group">
                    <label htmlFor="">Email</label>
                    <div className="input_div">
                        <input
                            name="email"
                            onChange={handleSetValue}
                            style={{ border: '1px solid #ccc', padding: '8px 12px', fontSize: '18px' }}
                            type="text"
                        />
                    </div>
                </div>
                <div className="edit_acc_group">
                    <label htmlFor="">Zalo</label>
                    <div className="input_div">
                        <input
                            name="zalo"
                            onChange={handleSetValue}
                            style={{ border: '1px solid #ccc', padding: '8px 12px', fontSize: '18px' }}
                            type="text"
                            defaultValue={payload?.zalo}
                        />
                        <small className="small">Cập nhật zalo</small>
                    </div>
                </div>
                <div className="edit_acc_group">
                    <label htmlFor="">Facebook</label>
                    <div className="input_div">
                        <input
                            name="fbUrl"
                            onChange={handleSetValue}
                            style={{ border: '1px solid #ccc', padding: '8px 12px', fontSize: '18px' }}
                            type="text"
                            defaultValue={payload?.fbUrl}
                        />
                        <small className="small">Cập nhật facebook</small>
                    </div>
                </div>
                <div className="edit_acc_group">
                    <label htmlFor="">Mật khẩu</label>
                    <small className="small">Đổi mật khẩu</small>
                </div>
                <div className="edit_acc_group">
                    <label htmlFor="">Ảnh đại diện</label>
                    <div>
                        <label htmlFor="edit_avt_file" className="edit_avt_file">
                            <div className="FaCamera">
                                <FaCamera />
                            </div>
                            <img
                                src={payload.avatar || avt}
                                alt=""
                                style={{ width: '60px', height: '60px', borderRadius: '50%', border: '1px solid #ccc' }}
                            />
                        </label>
                        <input type="file" hidden name="" id="edit_avt_file" onChange={handleFile} />
                    </div>
                </div>
                <button className="edit_acc_btn" onClick={handleSubmit}>
                    Cập nhật thông tin
                </button>
            </div>
        </div>
    );
}
