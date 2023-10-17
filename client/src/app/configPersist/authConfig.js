import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const authConfig = {
    key: 'auth', // key để xác định lưu trữ dữ liệu
    storage,
    whitelist: ['isLoggedIn', 'token'],
    // stateReconciler: autoMergeLevel2, //trong redux-toolkit thi ko cần vì nó có tích hợp sẵn r
    // Các tùy chọn khác của Redux Persist
};

export default authConfig;
