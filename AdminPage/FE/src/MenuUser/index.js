import classNames from "classnames/bind";
import styles from './MenuUser.module.scss'
import { Link } from "react-router-dom";
import {  SignOutIcon, UserIcon } from "../icon";

const cx = classNames.bind(styles)
function MenuUser({ data }) {
    const logOut = () => {
        localStorage.removeItem('user');
    }
    return ( 
        <div to={''} className={cx('wrapper')} > 
            <div className={cx('content')}>
                <div className={cx('name')}>
                    {  <span>{data[0].hodem +' ' + data[0].ten} </span>}
                </div>
                <div className={cx('nickname')}>
                {  <span>{data[0].tendangnhap}</span>}
                </div>
            </div>
            <div className={cx('user-item')}>
                <Link to={'/user'} className={cx('item')} href="/">
                    <UserIcon/>
                    <span className={cx('item-text')}>Cá nhân</span>
                </Link>
                <Link to={'/login'} className={cx('item')} href="/">
                    <SignOutIcon classsName={'icon'}/>
                    <span onClick={logOut} className={cx('item-text')}>Thoát</span>
                </Link>
            </div>
            
        </div>
     );
}

export default MenuUser;