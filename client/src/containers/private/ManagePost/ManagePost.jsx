import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/vi';
import { editData, getPostsAdmin } from '../../../app/slice/postSlice';
import { UpdatePost } from '../../../components';
import './ManagePsot.scss';
import { BsTrash } from 'react-icons/bs';
import post from '../../../services/post';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
export default memo(function ManagePost() {
    const notify = (log, message) => toast?.[log](`${message}`);
    const dispatch = useDispatch();
    const { postOfCurrent } = useSelector((state) => state.post);
    const [isEdit, setIsEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [listIdDelete, setListIdDelete] = useState([]);
    const [status, setStatus] = useState('0');
    const [dataPost, setDataPost] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    function compareISODateStrings(dateString1, dateString2) {
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        const date1 = new Date(dateString1);
        const date2 = new Date(dateString2);

        // So sánh các đối tượng Date
        if (date1 > date2) {
            return 1;
        } else if (date1 < date2) {
            return -1;
        } else {
            return 0;
        }
    }
    // sort by ?

    // theo tên
    const compareName = (a, b) => {
        if (a?.title === null && b?.title !== null) {
            return 1;
        } else if (a?.title !== null && b?.title === null) {
            return -1;
        }
        return a?.title?.localeCompare(b?.title);
    };

    // thoe giá
    const comparePrice = (a, b) => {
        return a?.priceNumber - b?.priceNumber;
    };

    // // theo diện tích
    // const compareAcres = (a, b) => {
    //     return a?.title?.localeCompare(b?.title);
    // };
    // theo ngày cập nhật
    const compareCreate = (a, b) => {
        return compareISODateStrings(a?.overviews?.created, b?.overviews?.created);
    };
    //

    useEffect(() => {
        dispatch(getPostsAdmin());
    }, []);
    useEffect(() => {
        setDataPost(postOfCurrent);
    }, [postOfCurrent]);
    useEffect(() => {
        listIdDelete?.length > 0 ? setIsDelete(true) : setIsDelete(false);
    }, [listIdDelete]);
    const checkStatus = (dateString) => {
        let today = new Date().toDateString();
        return moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(today);
    };
    const handleFilterPost = (value) => {
        if (+value === 1) {
            setStatus('1');
            setDataPost([...postOfCurrent]?.sort(compareCreate));
        } else if (+value === 2) {
            setStatus('2');
            setDataPost([...postOfCurrent]?.sort(compareCreate)?.reverse());
        } else if (+value === 3) {
            setStatus('3');
            setDataPost([...postOfCurrent]?.sort(comparePrice));
        } else if (+value === 4) {
            setStatus('4');
            setDataPost([...postOfCurrent]?.sort(comparePrice)?.reverse());
        } else if (+value === 5) {
            setStatus('5');
            setDataPost([...postOfCurrent]?.sort(compareName));
        } else if (+value === 6) {
            setStatus('6');
            setDataPost([...postOfCurrent]?.sort(compareName)?.reverse());
        } else {
            setStatus('0');
            setDataPost([...postOfCurrent]);
        }
    };
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            // Nếu checkbox được chọn, thêm giá trị vào mảng checkedItems
            setListIdDelete((prevCheckedItems) => [...prevCheckedItems, value]);
        } else {
            // Nếu checkbox bị bỏ chọn, loại bỏ giá trị khỏi mảng checkedItems
            setListIdDelete((prevCheckedItems) => prevCheckedItems?.filter((item) => item !== value));
        }
    };

    const handleDelete = async (listId) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy bỏ',
        });

        if (result.isConfirmed) {
            try {
                // Thực hiện xóa khi  xác nhận
                const response = await post.deletePost({ listId });
                if (response?.data?.err === 0) {
                    window.location.reload();
                    notify('success', 'Thành công');
                } else {
                    notify('error', 'Thất bại!');
                }
            } catch (error) {
                // Xử lý lỗi khi xóa
                Swal.fire('Lỗi', 'Đã xảy ra lỗi khi xóa', 'error');
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Xử lý khi chọn "Hủy bỏ"
        }
    };
    const converDate = (date) => {
        let arrDate = date?.split('-');
        return `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`;
    };
    return (
        <div className="manage_post">
            <ToastContainer />
            <div className="manage_post_header">
                <h1 className="manage_post_search">
                    <input type="text" placeholder="Nhập tin cần tìm" />
                </h1>
                <select
                    name=""
                    id=""
                    value={status}
                    onChange={(e) => handleFilterPost(e.target.value)}
                    style={{ border: '1px solid #ccc' }}
                >
                    <option value="0"> Lọc theo trạng thái</option>
                    <option value="5">Từ A-Z</option>
                    <option value="6">Từ Z-A</option>
                    <option value="1">Ngày đăng tăng</option>
                    <option value="2">Ngày đăng giảm</option>
                    <option value="3">Giá tăng dần</option>
                    <option value="4">Giá giảm dần</option>
                </select>
            </div>
            <div className="bin">
                <div className="bin_icon">
                    {isDelete ? <BsTrash onClick={() => handleDelete(listIdDelete)} /> : ''}{' '}
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Mã tin</th>
                        <th>Ảnh đại diện</th>
                        <th>Tiêu đề</th>
                        <th>Giá</th>
                        <th>Ngày tạo</th>
                        <th>Trạng thái</th>
                        <th>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {!(dataPost?.length > 0) ? (
                        <tr>
                            <td style={{ paddingTop: '20px' }} colSpan={9}>
                                Bạn chưa có tin nào
                            </td>
                        </tr>
                    ) : (
                        dataPost?.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value={item?.id}
                                        onChange={handleCheckboxChange}
                                    />
                                </td>
                                <td className="td_center">{item?.overviews?.code}</td>
                                <td className="td_center">
                                    <img
                                        src={JSON.parse(item?.images?.image)?.[0]}
                                        style={{ width: '40px', height: '40px' }}
                                        alt=""
                                    />
                                </td>
                                <td className="td_center">{item?.title}</td>
                                <td className="td_center">{item?.attributes?.price}</td>
                                <td className="td_center">{converDate(item?.createdAt?.slice(0, 10))}</td>
                                <td className="td_center">
                                    {checkStatus(item?.overviews?.expired?.splice(' ')[3])
                                        ? 'Đang hoạt động'
                                        : 'Đã hết hạn'}
                                </td>
                                <td className="td_center">
                                    <button
                                        onClick={() => {
                                            setIsEdit(true);
                                            dispatch(editData(item));
                                        }}
                                    >
                                        Sửa
                                    </button>
                                    <button>Xóa</button>
                                </td>
                                {/* <td>{new Date(item?.overviews?.expired?.splice(' ')[3])?.getTime()}</td> */}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
        </div>
    );
});
