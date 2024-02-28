import classNames from "classnames/bind";
import style from './Header.module.scss'
import 'tippy.js/dist/tippy.css'; // optional
import ActionNavItem from "./ActionNavItem";
const cx = classNames.bind(style)

function Header() {

    return (
        <div className={cx('wrapper')}>
            <ActionNavItem/>
        </div>
    );
}
export default Header;