import { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import menuList from "./menuList";
import '../css/mypage.css';

const MyPageLayout = () =>{
    const { menuId } = useParams(); 
    const navigate = useNavigate();
    const [component, setComponent] = useState<ReactElement>()
    useEffect(()=>{ 
        const isMenu = Object.keys(menuList).find((element)=>{
            return element === menuId;
        })
        if(isMenu === undefined){
            navigate("/404");
        }else{
            setComponent(menuList[isMenu]);
        }
        
    },[menuId])
    
    return(
        <div className="mypageFrame">
            <div className="flexCol menuListFrame">
                <div className="menuListTitle">마이페이지</div>
                <div className="menuListContents">
                    {Object.keys(menuList).map((menu,i)=>{
                        return(
                            <Link className="LinkTag" to={`/mypage/${menu}`}>
                                <div className={"menu border "+(menu === menuId ? "clicked" : "")} key={i}>{menu}</div>
                            </Link>
                        )
                    })}                    
                </div>
            </div>
            <div className="contentFrame">
                {component}    
            </div>
        </div>
    )
}

export default MyPageLayout;