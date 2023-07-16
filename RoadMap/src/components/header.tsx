import { Link, useNavigate } from 'react-router-dom';
import './css/header.css';
import { useState, useEffect, useContext } from 'react';
import { useIsLogin } from '../hooks/useIsLogin';
import { CurrentUserAuthContext } from '../pages/CurrentUserAuthContext';
const Header = () =>{
    
    const navigate = useNavigate();
    const context = useContext(CurrentUserAuthContext);
    const [dropdownShown, setDropDownShown] = useState(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    useEffect(()=>{
        const result = useIsLogin();
        result.then((data)=>{
            console.log("헤더인데용");
            console.log("isLogin=", isLogin);
            if(data.isLogin){
                context?.setAuth(data.auth);
            }
            setIsLogin(data.isLogin);
        })
    },[])
    

    const dropdownMenuToggle = () =>{
        dropdownShown ? setDropDownShown(false) : setDropDownShown(true);
    }

    return (
        <div id ="header"className="header-frame">
            <div className="header-list">
                <div className="header-leftSide-list">
                    <Link to="/"><div className="header-title">로드맵</div></Link>
                    <Link to="/tour"><div className="header-leftSide-menu thin">Tour</div></Link>
                </div>
                <div className="header-rightSide-list thin">
                     
                    <Link to="/search"><img className="searchIcon" src="/search.png"></img></Link>
                    { isLogin ?
                    <Link to="/mypage"><div className="header-rightSide-menu btn">마이페이지</div></Link>
                    : ""}
                    <Link to="/login"><div className="header-rightSide-menu btn">로그인</div></Link>
                </div>
                <div className="header-mobile-Frame">
                    <img onClick={dropdownMenuToggle} className="header-mobile-icon" src="/hamberger_WHITE.png"></img>
                    {dropdownShown ? <div className="dropDownMenuFrame">
                        <div className="dropDownMenuList">
                            <Link to="/search"><div className="dropDownMenu">검색하기</div></Link>
                            <Link to="/login"><div className="dropDownMenu">로그인</div></Link>
                            <Link to="/tour"><div className="dropDownMenu">Tour</div></Link>
                            { isLogin ? 
                                <Link to="/mypage"><div className="dropDownMenu">마이페이지</div></Link>
                                :
                                ""
                            }
                        </div> 
                    </div>: null}
                </div>
            </div>
        </div>
    )
}

export default Header;