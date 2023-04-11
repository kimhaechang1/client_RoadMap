import { Link } from 'react-router-dom';
import './css/header.css';

const Header = () =>{
    return (
        <div className="header-frame">
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
            </div>
        </div>
    )
}

export default Header;