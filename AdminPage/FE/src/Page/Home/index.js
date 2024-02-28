import classNames from "classnames/bind";
import styles from './Home.module.scss'
import { useContext, useRef  } from "react";
import { useParams } from 'react-router-dom';
import { MyContext } from "../../App"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { DateIcon, Peoples, UserIcon } from "../../icon";
import Table from "./Table";
import { useState, useEffect, useMemo } from "react";
import * as services from '../../apiServices/accountSVGV'
import * as servicesSearch from '../../apiServices/searchCountHoclai'
import * as servicesSreachAll from '../../apiServices/searchAll'
import * as servicesSearchAllData from "../../apiServices/searchAllDataTable"
import * as servicesSearchClassGv from "../../apiServices/getClassGv"
import Select from 'react-select';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const cx = classNames.bind(styles)
const years = [];
    for (let year = 2020; year <= 2025; year++) {
      years.push(year);
    }
function Home() {
    const type = useContext(MyContext);
    const { typeSidebar } = useParams()
    const [result, setResult] = useState([])
    const [dataSearch, setDataSearch] = useState(true)
    const [loaiHoc, setLoaiHoc] = useState('')
    
    //khoa
    const [khoa, setKhoa] = useState(null)
    const [optionsKhoa, setOptionsKhoa] = useState([]);
    //combobox input and select
    const [options, setOptions] = useState([]); 
    const [selectedOption, setSelectedOption] = useState(null);
    const selectLoaiHoc = useRef(null)
    const selectKyRef = useRef(null)
    const selectNamRef = useRef(null)
    const formData = useMemo(() => {
        const formData = new FormData()
        formData.append('user',localStorage.getItem('user'))
        formData.append('nhom_id',localStorage.getItem('nhom_id'))
        formData.append('selectNameClass',  selectedOption ?  selectedOption.value : '')
        formData.append('typeSidebar', typeSidebar)
        return formData;
      }, [selectedOption, typeSidebar]);
    useEffect(() => {
        setDataSearch([])
    }, [type,typeSidebar])
    useEffect(() => { 
        if(type === 'Home' || type === 'Department') {
            const fecthApi = async () => {
                const results = await services.accountSVGVApiPost(formData)
                if(results) {
                    setResult(results)
                } 
            }
            fecthApi()  
        } else {
            const fecthApi = async () => {
                const results = await servicesSreachAll.searchAllApiPost(formData)
                if(results) {
                    setResult(results)
                    if(options.length <= 0) {
                        const newOptions = results.accountNhom.map(item => ({
                            value: item.nhom_id,
                            label: item.nhom_id,
                          }));
                        setOptions(newOptions);
                    }
                    const newOptionsKhoa = results.khoa.map(item => ({
                        value:item.id_khoa,
                        label: item.name_khoa
                    }) )  
                    setOptionsKhoa(newOptionsKhoa)
                    
                } 
            }
            fecthApi() 
        }
    },[formData, type,typeSidebar, options])
    const handleSearch = () => {
       if(type === 'Home'|| type === 'Department') {
            formData.set('ky', selectKyRef.current.value)
            formData.set('nam', selectNamRef.current.value)
            formData.set('type', type)
             formData.set('typeSidebar', typeSidebar)

            const fecthApi = async () => {
                const results = await servicesSearch.searchCountHoclai(formData)

                if(results) {
                    
                    if(results.hoclai.length === 0) {
                        setDataSearch(false)
                    }else {
                        setDataSearch(results)
                    }
                } 
            }
            fecthApi()
       }else {
            if(selectedOption === null) {
                NotificationManager.warning('Chọn lớp cần xem ', 'Cảnh báo', 2000);
            }else {
                formData.set('selectNameClass',selectedOption.value)
                formData.set('loaihoc',selectLoaiHoc.current.value )
                formData.set('khoa', khoa != null ? khoa.value : '' )
                formData.set('ky',selectKyRef.current.value )
                formData.set('nam',selectNamRef.current.value )

                const fecthApi = async () => {
                    const results = await servicesSearchAllData.searchAllDataTableApiPost(formData)
                    if(results) {
                        if(results.hoclai.length === 0) {
                            setDataSearch(false)
                        }else {
                            setDataSearch(results)
                        }
                    } 
                }
               
                fecthApi()
            } 
       }
    }
    // console.log(selectedOption);
    // console.log(inputNameGvRef);

    const handleSelectKhoa= async (selectedOption) => {
        const formData = new FormData()
        formData.append('idKhoa', selectedOption.value)
        const results = await servicesSearchClassGv.getClassGvSearchFilter(formData)
        const newOptionsClass = results.class.map(item => ({
            value:item.nhom_id,
            label: item.nhom_id
        }) )  
        setSelectedOption(null)
        setOptions(newOptionsClass);
        setKhoa(selectedOption);
        setDataSearch(true)
       
      };
    const handleSelectLoaiHoc = () => {
        setLoaiHoc(selectLoaiHoc.current.value)
        setDataSearch(true)
        setKhoa(null)
    }
    const handleSelectChange = selectedOption => {
        
        setSelectedOption(selectedOption);
       
      };
    return ( 
        <>
        { <NotificationContainer  />}
        {Object.keys(result).length > 0  && <div className={cx('wrapper')}>
            <div className={cx('search')}>
                {  type ==='Home' || type === 'Department' ? 
                <></>
                :
                <div className={cx('search-row')}>
                    <div className={cx('search-fillter')} >
                        <span className={cx('lable-fillter')}>Tìm kiếm theo:</span>
                        <select onChange={handleSelectLoaiHoc} ref={selectLoaiHoc} className={cx('select-fillter')}>
                            <option value={1}>Đăng kí học lại</option>
                            <option value={2}>Đăng kí thi lại</option>
                        </select>
                        
                    </div>
                    <div className={cx('search-fillter')} style={{border: 'none'}} >
                        <span className={cx('lable-fillter')}>Khoa:</span>
                        <Select
                            value={khoa}
                            onChange={handleSelectKhoa}
                            options={optionsKhoa}
                            isSearchable
                            placeholder="Nhập tên khoa"
                            className={cx('selectFrame')}
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    height:'100%',
                                    marginLeft:'10px',
                                    width: '250px', 
                                    cursor:'pointer',
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    width: '250px', 
                                }),
                            }}
                        />
                    </div>
                </div>
                }
                <div className={cx('search-app')}>
                    { type === 'Home' || type === 'Department' ? 
                    <>
                        <div className={cx('search-content')}>
                            <div className={cx('selected-lable')}>
                                <Peoples classsName={cx('selected-icon')} />Lớp
                            </div>
                            { type === 'Home' ?
                                    <strong className={cx('selected-info')}>
                                        {result.accountNhomAdmin.length > 0 && result.accountNhomAdmin[0].nhom_id}
                                    </strong>
                                :
                                    <strong className={cx('selected-info')}>
                                        {result.tenKhoa && result.tenKhoa[0].name_khoa}
                                    </strong>
                            }
                        </div>
                        { type === 'Home' ? 
                            <div className={cx('search-content')}>
                                <div className={cx('selected-lable')}>
                                    <UserIcon classsName={cx('selected-icon')}/> Họ và Tên
                                </div>
                                <strong className={cx('selected-info')}>
                                    {result.account[0].hodem + ' ' + result.account[0].ten}
                                </strong>
                            </div>  
                            : <></>  
                        }
                    </> :
                    <> 
                        <div className={cx('search-content')}>
                            <div className={cx('selected-lable')}>
                                <Peoples classsName={cx('selected-icon')} />Lớp
                            </div>
                            <Select
                                value={selectedOption}
                                onChange={handleSelectChange}
                                options={options}
                                isSearchable
                                placeholder="Nhập tên lớp"
                                className={cx('selectFrame')}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        height:'100%',
                                        border: 'none',
                                        cursor:'pointer',
                                      })
                                }}
                            />
                        </div>
                        <div className={cx('search-content')}>
                            <div className={cx('selected-lable')}>
                                <UserIcon classsName={cx('selected-icon')}/> Họ và Tên
                            </div>
                            <strong className={cx('selected-info')} >
                                {(result.tenGv && result.tenGv.length !== 0)  && result.tenGv[0].hodem + ' ' + result.tenGv[0].ten}
                            </strong>
                        </div>
                    </> 
                    }
                    <div className={cx('search-content')}>
                        <div className={cx('selected')} >
                            <div className={cx('selected-lable')}>
                                <DateIcon  classsName={cx('search-icon')}/>    
                                <span>Kỳ học</span>
                            </div>
                            <select className={cx('selected-chosse')} ref={selectKyRef} >
                                <option className={cx('search-option')} value={1}> 1</option>
                                <option className={cx('search-option')} value={2}> 2</option>
                            </select>
                        </div>
                        <div className={cx('selected')}>
                            <div className={cx('selected-lable')}>
                                <DateIcon classsName={cx('search-icon')}/>    
                                <span>Năm</span>
                            </div>
                            <select style={{width:'110px'}} className={cx('selected-chosse')} ref={selectNamRef} >
                                {years.map((item, index) => (
                                    <option  key={index} className={cx('search-option')}>
                                        {item + '-' +  Number(item + 1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleSearch} className={cx('button-search')}>
                            <FontAwesomeIcon style={{color: 'white'}} icon={faMagnifyingGlass}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('content-lable')}>
                    <Table  data={dataSearch} loaihoc={loaiHoc} khoa ={khoa} typeSidebar={typeSidebar} /> 
                </div>
                
            </div>
        </div>}
        
        </>
     );
}

export default Home;