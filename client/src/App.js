import { Route, Routes } from 'react-router-dom';
import { path } from './ultils/path';
import { DetalPost, Home, HomePage, Login, Rental, SearchDetail } from './containers/public';
import './App.css';
import System from './containers/private/System/System';
import { CreatePost } from './containers/private';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrent } from './app/slice/userSlice';
function App() {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            isLoggedIn && dispatch(getCurrent());
        }, 1000);
        return () => {
            clearTimeout(timeOut);
        };
    }, [isLoggedIn]);
    return (
        <div className="App">
            <Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path="/*" element={<HomePage />} />
                    <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
                    <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />

                    <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
                    <Route path={path.CHO_THUE_NHA} element={<Rental />} />

                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.DETAL_POST_TITLE_ID} element={<DetalPost />} />
                    <Route path={path.SEARCH} element={<SearchDetail />} />
                </Route>
                <Route path={path.SYSTEM} element={<System />}>
                    <Route path={path.CREATE_POST} element={<CreatePost />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
