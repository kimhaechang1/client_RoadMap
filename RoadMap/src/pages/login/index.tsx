import './../css/login.css'
import { CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, GRANT_TYPE } from '../auth/kakaoKey';
import { useEffect, useState } from 'react';
import { fetcher } from '../../hooks/queryClient';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../../components/common/button';
import { useIsLogin } from '../../hooks/useIsLogin';


const LoginPage = () =>{
    
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState<boolean>(true);

    useEffect(()=>{
        const result = useIsLogin();
        result.then((data)=>{
            setIsLogin(data.isLogin);
        })
    },[])
    
    const onLogoutHandler = () =>{
        document.cookie = "id=; domain=localhost; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        alert("로그아웃 되었습니다.")
        location.reload();
    }
    
    return (
        <div className="contentsOuterFrame">
            <div className="contentsInnerFrame loginGap">
                <div className="loginTitleGroup">
                    <div className="loginTitle">로드맵</div>
                    <div className="loginSubtitle">로드맵은 개발자를 위한 로드맵 정보 플렛폼입니다.</div>
                </div>

                <div className="SnsLoginGroup">
                    {!isLogin ? <div className="SnsTitle">SNS 로그인</div>
                    : <>
                        <div className="SnsTitle">로그인 된 상태입니다.</div>
                        <div className="SnsTitle">다른 계정으로 로그인 하려면</div>
                        <div className="SnsTitle">로그아웃을 먼저 해주세요!</div>
                    </>}
                    { !isLogin? 
                    <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}><img className="KakaoLoginBtn" src={"/kakao_login_large_narrow.png"}></img></a>
                    :
                    <CommonButton handler={onLogoutHandler} title={"로그아웃"} style={"border reject"}/>}
                </div>
                <div className="contentsGroupFrame">
                    
                </div>
            </div>
        </div>
    )
}
export default LoginPage;