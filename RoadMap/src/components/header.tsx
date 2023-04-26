import { Link } from 'react-router-dom';
import './css/header.css';
import { useState } from 'react';

const Header = () =>{

    const [dropdownShown, setDropDownShown] = useState(false);

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
                    <Link to="/login"><div className="header-rightSide-menu btn">로그인</div></Link>
                    <Link to="/login"><div className="header-rightSide-menu btn">회원가입</div></Link>
                </div>
                <div className="header-mobile-Frame">
                    <img onClick={dropdownMenuToggle} className="header-mobile-icon" src="/hamberger_WHITE.png"></img>
                    {dropdownShown ? <div className="dropDownMenuFrame">
                        <div className="dropDownMenuList">
                            <Link to="/search"><div className="dropDownMenu">검색하기</div></Link>
                            <Link to="/login"><div className="dropDownMenu">로그인</div></Link>
                            <Link to="/tour"><div className="dropDownMenu">Tour</div></Link>
                            <Link to="/login"><div className="dropDownMenu">회원가입</div></Link>
                        </div> 
                    </div>: null}
                </div>
            </div>
        </div>
    )
}

export default Header;