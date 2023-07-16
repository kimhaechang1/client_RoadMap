import Layout from './_layout';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import TourEditPage from './pages/tour/edit';
import SearchResultPage from './pages/result';
import SearchPage from './pages/search';
import TourPage from './pages/tour';
import TourItemPage from './pages/tour/[id]';
import TourWritePage from './pages/tour/write';
import NotFoundPage from './pages/NotFound';
import MyPageLayout from './pages/mypage';
import KakaoAuth from './pages/login/kakaoAuth';
import RegisterPage from './pages/login/register';

export const routes = [
    {
        path : '/',
        element : <Layout/>,
        children : [
            {path : '/', element : <MainPage/>, index:true},
            {path : '/login', element : <LoginPage/>, index:true},
            {path : '/mypage/:menuId', element : <MyPageLayout/>, index:true},
            {path : '/tour/edit/:id', element :<TourEditPage/>, index:true },
            {path : '/search', element : <SearchPage/>, index:true},
            {path : '/result', element : <SearchResultPage/>, index:true},
            {path : '/tour', element : <TourPage/>, index:true},
            {path : '/tour/:id', element : <TourItemPage/>},
            {path : '/tour/write', element : <TourWritePage/>, index:true},
            {path : '/login/oauth2/code/kakao', element : <KakaoAuth/>},
            {path : '*', element : <NotFoundPage/>, index: true},
            {path : '/login/register', element : <RegisterPage/>}
        ]
    },
    
]