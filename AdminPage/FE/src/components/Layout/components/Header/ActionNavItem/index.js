import classNames from "classnames/bind";
import style from './ActionNavItem.module.scss'
import Message from "./Message";
import MessageUser from "./MessageUser";
import { useState, useEffect } from 'react';
import { BellIcon } from "../../../../../icon";
import DayOfWeek from "./Date";
import * as services from '../../../../../apiServices/searchCountHoclai'
import LogoImg from './../../../../../Image/daihocsaodo.jpg'
const cx = classNames.bind(style)

function ActionNavItem() {
    const [messageResult, setMessageResult] = useState({})
    const [bellNotif, setBellNotif] = useState(false)
    const handleBellNotif = (data) => {
      setBellNotif(data)  
    }
    useEffect(() => {
        const formData = new FormData()
        formData.append('user',localStorage.getItem('user'));
        formData.append('type','Home');
        const fetchData = async () => {
            const result = await services.searchCountHoclai(formData);
            setMessageResult(result);
          };
          fetchData(); 
        }, []);
    return ( 
        <div className={cx('action')}>
            {
                Object.keys(messageResult).length > 0  &&
                <>
                <DayOfWeek/>
                <Message data={messageResult.hoclai.length > 0 ? messageResult.hoclai : 0} sendDataToParent={handleBellNotif}>
                        <button className={cx('button-bell')}>
                                <BellIcon classsName={cx('icon')}/>
                                { messageResult.hoclai.length > 0 && !bellNotif  && <span className={cx('button-badge')}>{messageResult.hoclai.length}</span> }
                        </button>
                </Message>
                <MessageUser data={messageResult.tenGv}>
                    <div className={cx('button-bell')}>
                        {messageResult.tenGv.length > 0 && <img alt="Img" className={cx('user')} src={LogoImg}/>}
                    </div>
                </MessageUser>
            
                </>
            }   
        </div>
     );
}

export default ActionNavItem;