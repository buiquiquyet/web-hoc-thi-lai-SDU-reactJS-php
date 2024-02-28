
import HeadelessTippy from '@tippyjs/react/headless';
import classNames from "classnames/bind";
import style from './Message.module.scss'
import { Wrapper } from '../../../../../../Poper';
import AccountItem from '../../../../../../AccountItem';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/dist/tippy.css'; // Import CSS
import 'tippy.js/animations/scale.css'; // Import CSS for animations
const cx = classNames.bind(style)
function Message({ children, data, sendDataToParent }) {
    return ( 
        <HeadelessTippy
            render={attrs => (
                <div className={cx('info-result')} tabIndex="-1" {...attrs}>
                    <Wrapper>
                        <h4 className={cx('info-title')}>
                            Bạn có {data.length > 0 ? data.length : data} thông báo
                        </h4>
                        {data.length > 0 && data.map((item, index) => (
                            <AccountItem key={index}  data={item}/>  
                        ))}
                    </Wrapper>
                </div>
            )}
            interactive   
            placement="top"
            trigger='click'
            onShow={() => {
                // Tooltip đã hiển thị
                sendDataToParent(true)
              }}
            
        >
            {children}
        </HeadelessTippy>
     );
}

export default Message;