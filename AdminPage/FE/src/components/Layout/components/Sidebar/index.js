import classNames from "classnames/bind";
import style from './Sidebar.module.scss'
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { RightIcon, SearchIcon } from "../../../../icon";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faBarsStaggered} from "@fortawesome/free-solid-svg-icons";
import LogoImg from './../../../../Image/daihocsaodo.jpg'
const cx = classNames.bind(style)

function SidebarMain() {
    const [backgroundItem, setBackgroundItem ] = useState('')
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const handleChangLink = (item) => {
        // window.location.reload();
        setBackgroundItem(item)
    }
    return (
        <div className={cx('wrapper')}>
            <FontAwesomeIcon icon={faBarsStaggered} onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={cx('icon')}/>
            <Sidebar collapsed={sidebarCollapsed} >
                <Link to={'/'} onClick={() => handleChangLink('')} className={cx('title')}>
                    <img className={cx('imgLogo')} src={LogoImg} alt="img"/>
                    Đại Học Sao Đỏ
                </Link>
                <Menu className={cx('menu')}
                     menuItemStyles={{
                        button: ({ level }) => {
                        if (level === 0) {
                            return {
                            "&:hover": {
                                backgroundColor: "#c15b3e !important",
                                color: "white !important",
                                fontWeight: "bold !important" }, }; }},}}
                >
                    <SubMenu className={cx('submenu')}  label="Duyệt học lại" style={{fontWeight:'bold'}} >
                        { (localStorage.getItem('nhom_id') === 'TKGV' || localStorage.getItem('nhom_id') === 'GVCN')  && 
                            <MenuItem onClick={() =>  handleChangLink('item1')}  component={<Link to="/duyet/hoclai" />}  icon={<RightIcon/>} className={cx('menuItem', {'selected': backgroundItem === 'item1'})}>
                                Giáo viên duyệt
                            </MenuItem>
                        }
                        { (localStorage.getItem('nhom_id') === 'TK' || localStorage.getItem('nhom_id') === 'TKGV')  && 
                            <MenuItem onClick={() => handleChangLink('item3')}  component={<Link to="/duyetKhoa/hoclai" />}  icon={<RightIcon/>} className={cx('menuItem', {'selected': backgroundItem === 'item3'})}>
                                Trưởng khoa duyệt
                            </MenuItem>
                        }
                       
                    </SubMenu>
                    <SubMenu className={cx('submenu')}  label="Duyệt thi lại" style={{fontWeight:'bold'}}>
                        { (localStorage.getItem('nhom_id') === 'TKGV' || localStorage.getItem('nhom_id') === 'GVCN')  && 
                            <MenuItem onClick={() =>  handleChangLink('item4')}  component={<Link to="/duyet/thilai" />}  icon={<RightIcon/>} className={cx('menuItem', {'selected': backgroundItem === 'item4'})}>
                                Giáo viên duyệt
                            </MenuItem>
                        }
                        { (localStorage.getItem('nhom_id') === 'TK' || localStorage.getItem('nhom_id') === 'TKGV')  && 
                            <MenuItem onClick={() => handleChangLink('item5')}  component={<Link to="/duyetKhoa/thilai" />}  icon={<RightIcon/>} className={cx('menuItem', {'selected': backgroundItem === 'item5'})}>
                                Trưởng khoa duyệt
                            </MenuItem>
                        }
                        
                    </SubMenu>
                    <MenuItem style={{fontWeight:'bold', borderTop: '1px solid #ccc'}} onClick={() => handleChangLink('item2')}  component={<Link to="/filter" />}  icon={<SearchIcon/>} className={cx('menuItem search', {'selected': backgroundItem === 'item2'})}>
                            Tìm kiếm
                    </MenuItem>
                </Menu>
            </Sidebar>
        </div>
           
    );
}

export default SidebarMain;