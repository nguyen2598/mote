import React, { memo, useState } from 'react';
import { Address, Loading, Overview } from '../../../components';
import './CreatePost.scss';
import app from '../../../services/app';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCameraFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { getCodes, getCodesArea } from '../../../ultils/getCodes';
import Swal from 'sweetalert2';
import post from '../../../services/post';
export default memo(function CreatePost({ isEdit }) {
    const { prices, areas, categories, provinces } = useSelector((state) => state.category);
    const { dataEdit } = useSelector((state) => state.post);
    const { currentData } = useSelector((state) => state.user);
    const [payload, setPayload] = useState(() => ({
        categoryCode: (isEdit && dataEdit?.categoryCode) || '',
        title: (isEdit && dataEdit?.title) || '',
        priceNumber: (isEdit && dataEdit?.priceNumber * 1000000) || 0,
        areaNumber: (isEdit && dataEdit?.areaNumber) || 0,
        images: (isEdit && dataEdit?.images?.image && JSON.parse(dataEdit?.images?.image)) || '',
        address: (isEdit && dataEdit?.address) || '',
        priceCode: (isEdit && dataEdit?.priceCode) || '',
        areaCode: (isEdit && dataEdit?.areaCode) || '',
        description: (isEdit && dataEdit?.description) || '',
        province: (isEdit && dataEdit?.province) || '',
    }));
    const [imagesPreview, setImagesPreview] = useState(
        (isEdit && dataEdit?.images?.image && JSON.parse(dataEdit?.images?.image)) || [],
    );
    const [isLoading, setIsLoading] = useState(false);
    const handleFile = async (e) => {
        setIsLoading(true);
        e.stopPropagation();
        e.preventDefault();
        let images = [];
        let files = e.target.files;
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            formData.append('file', file);
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME);
            const res = await app.getUploadImages(formData);
            // formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME);
            // const res = await app.getUploadImages(images);
            if (res.status === 200) images = [...images, res?.data?.secure_url];
        }
        setImagesPreview((prev) => [...prev, ...images]);
        setPayload((prev) => ({ ...prev, images: [...prev.images, ...images] }));
        setIsLoading(false);
    };
    const handleDeleteImage = (index) => {
        setImagesPreview((prev) => [...prev?.slice(0, index), ...prev?.slice(index + 1)]);
        setPayload((prev) => ({
            ...prev,
            images: [...payload.images?.slice(0, index), ...payload.images?.slice(index + 1)],
        }));
    };
    const handleSubmit = async () => {
        let priceCode = getCodes(+payload.priceNumber, prices)?.[0]?.code;
        let areaCode = getCodesArea(+payload.areaNumber, areas)?.[0]?.code;
        let finalPayload = {
            ...payload,
            priceCode,
            areaCode,
            images: payload?.images?.filter((image) => image !== null),
            userId: currentData?.id,
            priceNumber: payload.priceNumber / 1000000,
            label: `${categories?.find((item) => item.code === payload?.categoryCode)?.value} ${
                payload?.address?.split(',')[0]
            }`,
        };
        let bug = 0;
        let bugsName = [];
        for (const key in finalPayload) {
            if (finalPayload[key] !== 'priceNumber' || finalPayload[key] == 'areaNumber') {
                if (finalPayload[key]?.length < 1) {
                    bug++;
                }
            } else {
                if (+finalPayload[key] < 1) bug++;
            }
        }
        if (bug > 0) {
            Swal.fire('Oops!', 'Nhập thiếu thông tin vui lòng nhập đủ', 'error');
            return;
        }
        const response = await post.createPost(finalPayload);
        if (response?.data?.err === 0) {
            Swal.fire('Thành công', 'Đã thêm bài đăng mới', 'success').then(() => {
                setIsLoading({
                    categoryCode: '',
                    title: '',
                    priceNumber: 0,
                    areaNumber: 0,
                    images: '',
                    address: '',
                    priceCode: '',
                    areaCode: '',
                    description: '',
                    province: '',
                });
            });
        } else {
            Swal.fire('Oops!', 'Thêm  thất bại', 'error');
        }
    };
    return (
        <div className="create_post">
            <h1>{isEdit ? 'Chỉnh sửa tin đăng' : 'Đăng tin mới'}</h1>
            <div className="create_post_content">
                <div className="create_post_write">
                    <Address payload={payload} setPayload={setPayload} />
                    <Overview payload={payload} setPayload={setPayload} />
                    <div className="create_post_image">
                        <h2>Hình ảnh</h2>
                        <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
                        <div className="image_up">
                            <label htmlFor="file">
                                {isLoading ? (
                                    <Loading />
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <BsCameraFill color="blue" size={50} />
                                        Thêm ảnh
                                    </div>
                                )}
                            </label>
                            <input hidden type="file" id="file" multiple onChange={handleFile} />
                            <div>
                                <h3> </h3>
                                <div className="image_preview">
                                    {imagesPreview?.map((item, index) => (
                                        <div key={index} className="prevew">
                                            <img
                                                src={item}
                                                alt="preview"
                                                style={{ width: '160px', height: '160px', objectFit: 'cover' }}
                                            />
                                            <span
                                                onClick={() => handleDeleteImage(index)}
                                                className="image_prevew_close"
                                            >
                                                <AiOutlineClose size={28} />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sub_new_post">
                        <button onClick={handleSubmit}>Tạo mới</button>
                    </div>
                </div>
                {/* <div className="create_post_map">
                    <Loading />
                </div> */}
            </div>
        </div>
    );
});
