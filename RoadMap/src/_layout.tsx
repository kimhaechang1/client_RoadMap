import Header from "./components/header"
import {Outlet} from 'react-router-dom';
import './pages/css/_layout.css';
import { useContext, useEffect } from "react";
import { CurrentUserAuthContext } from "./pages/CurrentUserAuthContext";

const Layout = () =>{
    return(
        <div className="common">
            <Header/>
            <div className="common-body">
                
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout;