import Header from "./components/header"
import {Outlet} from 'react-router-dom';
import './pages/css/_layout.css';

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