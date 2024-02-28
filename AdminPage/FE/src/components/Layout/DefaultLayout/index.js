import classNames from "classnames/bind";
import style from './DefaultLayout.module.scss'
import Header from "../components/Header";
import SidebarMain from "../components/Sidebar";

const cx = classNames.bind(style)

function DefaultLayout({ children }) {
    return ( 
        <div className={cx('wrapper')}>
            <SidebarMain/>
            <div className={cx('container')}>
                <Header/>   
                <div className={cx('content')}>
                    { children }
                </div>
            </div>
        </div>
     );
}

export default DefaultLayout;