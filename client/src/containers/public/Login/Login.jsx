import React, { useEffect, useRef, useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../services/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Register, LoginApi } from '../../../app/slice/authSlice';
export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isRegister, setIsRegister] = useState(false);
    const [dataSubmit, setDataSubmit] = useState({
        name: '',
        phone: '',
        password: '',
    });
    const { isLoggedIn } = useSelector((state) => state.auth);
    // ('isLoggedIn', isLoggedIn);
    const [confimpass, setConfimpass] = useState('');
    const { name, password, phone } = dataSubmit;
    const [invalidFields, setInvalidFields] = useState([]);
    let BlurRef = useRef(null);
    useEffect(() => {
        isLoggedIn && navigate('/');
    }, [isLoggedIn]);
    const onChangeForm = (e) => {
        setDataSubmit({
            ...dataSubmit,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        isRegister ? dispatch(Register({ name, password, phone })) : dispatch(LoginApi({ password, phone }));
    };
    const Blur = (id, value) => {
        value = value.trim();
        if (value.length > 0) {
            if (id === 'phone') {
                var filter = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                //  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!value.match(filter)) {
                    document.querySelector('#phone').parentNode.querySelector('span').innerText = 'Sai định dạng gmail';
                } else {
                    document.querySelector('#phone').parentNode.querySelector('span').innerText = '';
                }
            } else if (id === 'comfimpass') {
                if (!(confimpass === password)) {
                    document.querySelector('#comfimpass').parentNode.querySelector('span').innerText = 'sai mat khau';
                } else {
                    document.querySelector('#comfimpass').parentNode.querySelector('span').innerText = '    ';
                }
            } else {
                document.querySelector(`#${id}`).parentNode.querySelector('span').innerText = '    ';
            }
        } else {
            document.querySelector(`#${id}`).parentNode.querySelector('span').innerText =
                'Không được để trống dòng này';
        }
    };

    return (
        <div className="login">
            <h3>Đăng nhập</h3>
            <form action="" className="login-form">
                <div className="form-group">
                    {/* <label htmlFor="phone">Mail</label> */}

                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        defaultValue={phone}
                        placeholder="phone"
                        onChange={onChangeForm}
                        onBlur={() => Blur('phone', phone)}
                    />
                    <span> </span>
                </div>
                {isRegister ? (
                    <div className="form-group">
                        {/* <label htmlFor="name">Họ và tên</label> */}

                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={name}
                            placeholder="Tên đăng  nhập"
                            onChange={onChangeForm}
                            onBlur={() => Blur('name', name)}
                        />
                        <span> </span>
                    </div>
                ) : (
                    ''
                )}
                <div className="form-group">
                    {/* <label htmlFor="pass">Mật khẩu</label> */}

                    <input
                        type="password"
                        id="pass"
                        name="password"
                        defaultValue={password}
                        placeholder="mật khẩu"
                        onChange={onChangeForm}
                        onBlur={() => Blur('pass', password)}
                    />
                    <span> </span>
                </div>
                {isRegister ? (
                    <div className="form-group">
                        {/* <label htmlFor="comfimpass">Xác nhận MK</label> */}

                        <input
                            type="password"
                            id="comfimpass"
                            name="comfimpass"
                            defaultValue={confimpass}
                            placeholder="xác nhận mật khẩu"
                            onChange={(e) => setConfimpass(e.target.value)}
                            onBlur={() => Blur('comfimpass', confimpass)}
                        />
                        <span> </span>
                    </div>
                ) : (
                    ''
                )}
                <button type="submit" onClick={handleSubmit} className="login-button">
                    {!isRegister ? 'Đăng nhập' : 'Đăng ký'}
                </button>
            </form>
            <div className="login-footer">
                {isRegister ? (
                    <small>
                        Đã có tài khoản ?{' '}
                        <span className="isLogin" onClick={() => setIsRegister(false)}>
                            Đăng nhập ngay
                        </span>
                    </small>
                ) : (
                    <>
                        <small>Quên mật khẩu</small>
                        <small onClick={() => setIsRegister(true)}>
                            {/* <Link to="/register"> */}
                            Tạo tài khoản
                            {/* </Link> */}
                        </small>
                    </>
                )}
            </div>
        </div>
    );
}
