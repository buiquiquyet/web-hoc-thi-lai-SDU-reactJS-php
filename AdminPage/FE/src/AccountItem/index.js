import classNames from "classnames/bind";
import styles from './AccountItem.module.scss'
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)
function AccountItem({ data }) {
    return ( 
        <Link to={'/duyet'} className={cx('wrapper')} >
            {/* <img alt="Img" className={cx('user')} src='https://upload.wikimedia.org/wikipedia/vi/4/49/Logo_dhsaodo_moi.PNG'/> */}
            <div className={cx('content')}>
                <div className={cx('name')}>
                    <span>{data.hodem + ' ' + data.ten}</span>
                </div>
                <div className={cx('info')}>
                    <span className={cx('text')}>
                        {data.tendangnhap}
                    </span>
                </div>
            </div>
            <div className={cx('content contentSm')}>
                <div className={cx('name')}>
                    <span>Trạng thái</span>
                </div>
                <div className={cx('info')}>
                    <span className={cx('textTrangthai')} >
                    {(data.check_giaovien === '0' && 'Chờ duyệt') || (data.check_giaovien === '1' && 'Đã duyệt') || (data.check_giaovien === '2' && 'Không duyệt') }
                    </span>
                </div>             
            </div>
            
        </Link>
     );
}

export default AccountItem;