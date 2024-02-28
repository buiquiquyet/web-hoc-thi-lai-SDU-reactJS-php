import classNames from "classnames/bind";
import styles from './User.module.scss'
import { useRef, useState } from "react";
import { useEffect } from "react";
import * as services from '../../apiServices/userHoSo'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const cx = classNames.bind(styles)
function User() {
    const [result, setResult] = useState([])
    const [dataUser, setDataUser] = useState({})
    const [reLoad, setReLoad] = useState(false)
    const modalRef = useRef()
    const handleInput = (e) => {
        const { name, value } = e.target;
        setDataUser({
            ...dataUser,
            [name]: value,
          });
    }
    const handleUpdateUser = () => {
        const updateData = new FormData()
        updateData.append('tendangnhap', dataUser.tendangnhap)
        updateData.append('hodem', dataUser.hodem)
        updateData.append('ten', dataUser.ten)
        updateData.append('ngaysinh', dataUser.ngaysinh)
        updateData.append('dienthoai', dataUser.dienthoai)
        updateData.append('email', dataUser.email)
        updateData.append('diachi', dataUser.diachi)
        const fecthApiUpdate = async () => {
            const results = await services.userApiPostHoSo(updateData)
            if(results === 'success') {
                setReLoad(!reLoad)
                NotificationManager.success('Cập nhật thành công', 'Thành công', 2000)
                modalRef.current.style.display = 'none'    
            } else {
                NotificationManager.error('Cập nhật không thành công', 'Lỗi', 2000)
            }    
        }
        fecthApiUpdate() 
    }
    const handleOpenModal = () => {
        modalRef.current.style.display = 'flex'
    }
    const handleModal = () => {
        modalRef.current.style.display = 'none'
    }
    useEffect(() => {
        const formData = new FormData()
        formData.append('data',localStorage.getItem('user'));
        const fecthApi = async () => {
            const results = await services.userApiPostHoSo(formData)
            setResult(results.account[0])
            setDataUser(results.account[0])
        }
        fecthApi() 
    },[reLoad])
    return ( 
        <>
            { <NotificationContainer/>}
            <div className={cx('wrapper')}>
                {Object.keys(result).length > 0 && <>
                
                <div className={cx('profileUser')}>
                    <img className={cx('profileIcon')} src="https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg" alt=""/>
                    <span className={cx('profileName')}>
                        {result.hodem + ' ' + result.ten}
                    </span>
                    <span className={cx('profileId')}>
                        {result.tendangnhap }
                    </span>
                
                </div>
                <div className={cx('profileContent')}>
                    <p className={cx('title')}>Thông tin cá nhân</p>
                    <div className={cx('profileInfoText')}>
                        <span className={cx('profileLable')}><span>Họ tên</span><span>:</span> </span>
                        <span className={cx('profileData')}>{`${result.hodem} ${result.ten} `}</span>
                    </div>
                    <div className={cx('profileInfoText')}>
                        <span className={cx('profileLable')}><span>Ngày sinh</span><span>:</span> </span>
                        <span className={cx('profileData')}>{result.ngaysinh ? result.ngaysinh : 'Không có' }</span>
                    </div>
                    <div className={cx('profileInfoText')}>
                        <span className={cx('profileLable')}><span>Số điện thoại</span><span>:</span>  </span>
                        <span className={cx('profileData')}>{result.dienthoai ? result.dienthoai : 'Không có' }</span>
                    </div>
                    <div className={cx('profileInfoText')}>
                        <span className={cx('profileLable')}><span>Email</span><span>:</span> </span>
                        <span className={cx('profileData')}>{result.email ? result.email : 'Không có' }</span>
                    </div>
                    <div className={cx('profileInfoText')}>
                        <span className={cx('profileLable')}><span>Địa chỉ</span><span>:</span>  </span>
                        <span className={cx('profileData')}>{result.diachi ? result.diachi : 'Không có' }</span>
                    </div>
                    <div className={cx('profileButton')}>
                            <button onClick={handleOpenModal} style={{backgroundColor:'green'}}>Cập nhật</button>
                        </div>
                
                </div>
                <div ref={modalRef} className={cx('modal')} >
                    <div onClick={handleModal} className={cx('overflow')}></div>
                    <div className={cx('madalContent')}>
                        <p className={cx('title')}>Tùy chỉnh cá nhân</p>
                        <div className={cx('profileInfoName')}>
                            <div className={cx('firstName')}>
                                <label>Họ Đệm</label>
                                <input placeholder="Họ đệm..."
                                    name="hodem"
                                    value={dataUser.hodem}
                                    onChange={handleInput}   
                                />
                            </div>
                            <div className={cx('lastName')}>
                                <label>Tên</label>
                                <input placeholder="Tên..."
                                    name="ten"
                                    value={dataUser.ten}
                                    onChange={handleInput}   
                                />
                            </div>
                        </div>
                        <div className={cx('profileInfo')}>
                            <label>Ngày sinh</label>
                            <input   placeholder="Ngày sinh..."
                                onChange={handleInput} 
                                value={dataUser.ngaysinh}
                                name="ngaysinh" 
                                type="date"   
                            />
                        </div>
                        <div className={cx('profileInfo')}>
                            <label>Điện thoại</label>
                            <input placeholder="Số điện thoại..." 
                                name="dienthoai"
                                value={dataUser.dienthoai}
                                onChange={handleInput}   
                            />
                        </div>
                        <div className={cx('profileInfo')}>
                            <label>Email</label>
                            <input   placeholder="Email..."
                                onChange={handleInput} 
                                value={dataUser.email}
                                name="email"  
                            />
                        </div>
                        <div className={cx('profileInfo')}>
                            <label>Địa chỉ</label>
                            <input placeholder="Địa chỉ..."
                                onChange={handleInput} 
                                value={dataUser.diachi}  
                                name="diachi"
                            />
                        </div>
                        
                        <div className={cx('profileButton')}>
                            <button onClick={handleUpdateUser}>Lưu</button>
                        </div>
                    </div>
                </div>
                </>}
            </div>
        </>
     );
}

export default User;