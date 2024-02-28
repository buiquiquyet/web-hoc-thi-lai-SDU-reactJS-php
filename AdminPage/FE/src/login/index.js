
import classNames from "classnames/bind";
import styles from './login.module.scss'
import {  useRef } from "react";
import * as services from './../apiServices/login'
const cx = classNames.bind(styles)
function Login() {
    
    const inputUser = useRef()
    const inputPass = useRef()
    const warning = useRef()
    
    const handleLogin = () => {
       
        if(inputUser.current.value ==='' || inputPass.current.value === '') {
            warning.current.innerHTML = 'Vui lòng nhập đẩy đủ thông tin trước khi đăng nhập'
            warning.current.style.display = 'block'
        } else {
            const formData = new FormData()
            formData.append('user',inputUser.current.value)
            formData.append('pass',inputPass.current.value)
            const fecthApi = async () => {
                const results = await services.userApiPostLogin(formData)
                console.log(results.account);
                if(results.account.length > 0) {
                    localStorage.setItem('user', inputUser.current.value)
                    localStorage.setItem('nhom_id', results.account[0].nhom_id)
                    localStorage.setItem('userTime', new Date().getTime())
                    window.location.href = '/';

                }else {
                    warning.current.innerHTML = 'Tên truy cập hoặc mật khẩu không chính xác'
                    warning.current.style.display = 'block'
                }
            }
            fecthApi()
        }
    }

    return ( 
    <div className={cx('wrapper')}>
        <div className={cx('form')}>
            <img className={cx('form-img')} alt="img" src="	http://esdu.saodo.edu.vn//templates/saodo/images/logo.png"/>
            <span className={cx('fomr-title')}>ĐĂNG NHẬP HỆ THỐNG</span>
            <div className={cx('form-info')}>
                <div className={cx('user-box')}>
                    <input ref={inputUser} required className={cx('form-input')} type="text" />
                    <label>Tên đăng nhập</label>
                </div>
                <div className={cx('user-box')}>
                    <input ref={inputPass}  required className={cx('form-input')} type="password" />
                    <label>Mật khẩu</label>
                </div>

            </div>
            <div ref={warning} className={cx('warning')}></div>
            <div className={cx('form-button')}>
                <button onClick={handleLogin} className={cx('button')}>ĐĂNG NHẬP</button>
            </div>
        </div>
    </div>
     );
}

export default Login;