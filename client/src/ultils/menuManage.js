import { FcEditImage, FcManager, FcInfo } from 'react-icons/fc';
const menuManage = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        icon: <FcEditImage />,
        path: '/he-thong/tao-moi-tin-dang',
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        icon: <FcManager />,
        path: '/he-thong/quan-ly-bai-dang',
    },

    {
        id: 4,
        text: 'Thông tin tài khoản',
        icon: <FcInfo />,
        path: '/he-thong/thong-tin-tai-khoan',
    },
];
export default menuManage;
