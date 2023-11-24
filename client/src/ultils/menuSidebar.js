import { FcEditImage, FcManager, FcInfo, FcAssistant } from 'react-icons/fc';
const menuSidebar = [
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
        id: 3,
        text: 'Sửa thông tin cá nhân ',
        icon: <FcInfo />,
        path: '/he-thong/thong-tin-tai-khoan',
    },
    {
        id: 4,
        text: 'Liên hệ',
        icon: <FcAssistant />,
        path: '/he-thong/lien-he',
    },
];
export default menuSidebar;
