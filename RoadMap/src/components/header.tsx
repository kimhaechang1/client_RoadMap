import './css/header.css';

const Header = () =>{
    return (
        <div className="header-frame">
            <div className="header-list">
                <div className="header-leftSide-list">
                    <div className="header-title">로드맵</div>
                    <div className="header-leftSide-menu thin">Tour</div>
                </div>
                <div className="header-rightSide-list thin">
                    <img className="searchIcon" src="./search.png"></img>
                    <div className="header-rightSide-menu btn">로그인</div>
                    <div className="header-rightSide-menu btn">회원가입</div>
                </div>
            </div>
        </div>
    )
}

export default Header;