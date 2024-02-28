import classNames from "classnames/bind";
import styles from './Table.module.scss'
import { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react";
import { useContext, useMemo } from "react";
import { MyContext } from "../../../App";
import * as services from "../../../apiServices/hoclai";
import * as servicesFilter from "../../../apiServices/searchAllDataTable"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ReactPaginate from "react-paginate";
import * as XLSX from 'xlsx';

const cx = classNames.bind(styles)
function Table({data, loaihoc, khoa, typeSidebar}) {
    const [checkedList, setCheckedList] = useState([])
    const [result, setResult] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const selectRef = useRef()
    const [totalData, setTotalData] = useState([])//tổng dữ liệu được hiển thị lên
    // const [file, setFile] = useState(null); import
    const type = useContext(MyContext)
    const handleChecked = (item) => {
        setCheckedList(prev => {
            const isChecked = prev.includes(item)
            if(isChecked) {
                return prev.filter(value => value !== item)
            } else {
                return [...prev, item]
            }
        })    
    }
    const handleCheckedAll = () => {
        if( result.length === 0 ) {
            return
        }else {
            setCheckedList(prev => {
                const isChecked = prev.length === (type === 'Home' ? result.filter(item => item.check_truongkhoa !== '1')
                                                                            .map(item => item.id).length 
                                                                : result.length)
                const dataId = (type === 'Home' ? result.filter(item => item.check_truongkhoa !== '1')
                                                .map(item => item.id)
                                                :result.map(item => item.id))
                if(isChecked) {
                    return []
                } else {
                    return [...dataId]
                }
            })
        }
    }
    //xét color cột duyệt
    function getColorClass(checkGiaovien) {
        switch (checkGiaovien) {
          case '1':
            return 'da-duyet';
          case '2':
            return 'khong-duyet'; 
          default:
            return '';
        }
      }
      
    //import
    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     setFile(selectedFile);
    // }
    // const handlImport = () => {
    //     const formData = new FormData()
    //     formData.append('excelFile', file);
    //     const fecthApiImportExcel = async () => {
    //         const results = await servicesFile.importExcel(formData)
    //         if(results === 'ok') {
    //           console.log('ok')
                
    //         }else {
    //             console.log('lỗi')
    //         }
           
    //     }
    //     // console.log(file)
    //     fecthApiImportExcel() 
    // }
    //exportExcel
    const handleExport =  () => {
        try {
            const wb = XLSX.utils.book_new();
            const exportData = totalData
            // .filter(item => item.check_truongkhoa === "1")
            .map(item => [
                item.tenhocphan,
                item.sotin,
                loaihoc === '2' ? 'thi lại' : item.loai === '1' ? 'Cải thiện' : 'Học lại',
                `${item.hodem} ${item.ten}`,
                item.nhom_id,
                item.name_khoa,
                item.ky,
                item.thoigian,
                item.ghichu,
            ]);
            const ws = XLSX.utils.aoa_to_sheet([["Tên học phần", "Số tín", "Loại", "Tên sinh viên","Lớp", "Khoa", "Kỳ học", "Năm học", "Ghi chú"], ...exportData]);
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, "data.xlsx", { bookType: 'xlsx', bookSST: false, type: 'base64', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          } catch (error) {
            NotificationManager.error('Xuất file excel thành công', 'Lỗi', 2000);
            console.error("Error exporting Excel:", error);
            return
          }
       
       
    }
    //đếm số lượng phần tử có trong table
    const handletotalData = () => {
        const arr = []
        if(totalData) {
            totalData.map((item) => (
                arr.push(item.id)
            ))
            return arr
        }
    }
     //formMain Home
    const formData = useMemo(() => {
        const dataForm = new FormData()
        dataForm.append('user',localStorage.getItem('user'));
        dataForm.append('duyet', '')
        dataForm.append('trangthai',  '' )
        dataForm.append('type', type)
        dataForm.append('typeSidebar', typeSidebar)
        return dataForm
    }, [data, type, typeSidebar]) 
    //fecthAll
    const fecthApiHome = async () => {
            const results = await services.hoclaiPostApi(formData)
            // console.log(results);
            if(results.update === 'Thành công') {
                NotificationManager.success('Duyệt thành công', 'Thành công', 2000);
                setCheckedList([])
            } else if(results.update === 'Lỗi') {
                NotificationManager.error('Duyệt không thành công', 'Lỗi', 2000);
                setCheckedList([])
            }
            if(results.hoclai) {    
                setTotalPage(results.totalPage)
                setTotalData(results.totalData)
                setResult(results.hoclai)
  
                
            } else {
                NotificationManager.error('Không có dữ liệu', 'Lỗi', 2000);
                setCheckedList([])
            }
    }
    const fecthApiFilter = async () => {
        const results = await  servicesFilter.searchAllDataTableApiPost(formData)
        // console.log(results);
        if(results.hoclai) {    
            setTotalPage(results.totalPage)
            setTotalData(results.totalData)
            setResult(results.hoclai)
            
        } else {
            NotificationManager.error('Không có dữ liệu', 'Lỗi', 2000);
            setCheckedList([])
        }
    }
    useEffect(() => {
        setCheckedList([])
        if(data.hoclai && data.hoclai.length > 0 ) { 
            if(formData.get('checkDataToDuyet',0)) {
                formData.set('checkDataToDuyet',0)
                if(type === 'Home' || type === 'Department') {
                    fecthApiHome() 
                }else {
                    formData.set('loaiHoc',loaihoc === '' ? "1" : loaihoc)
                    formData.set('totalData', [] )
                    fecthApiFilter()
                }    
            } else { 
                formData.set('checkDataToDuyet',1) 
                setTotalPage(data.totalPage)
                setTotalData(data.totalData)
                setResult(data.hoclai) 
            }
        } else { 
            formData.set('checkDataToDuyet',0)
            if(type === 'Home' || type === 'Department') {
                fecthApiHome() 
            }else if (type === 'Filter') {
                formData.set('loaiHoc',loaihoc === '' ? "1" : loaihoc)
                formData.set('khoa', khoa !== null ? khoa.value : '')
                formData.set('totalData', [] )   
                fecthApiFilter()  
            } 
        }  
    }, [data, type, loaihoc, khoa, typeSidebar])
    const handleDuyet = () => {
        if(selectRef.current.value === '3') {
            NotificationManager.warning('Chọn trạng thái muốn duyệt', 'Cảnh báo', 2000);
        } else {
            if(checkedList.length <= 0) {
                NotificationManager.warning('Chọn hàng muốn duyệt', 'Cảnh báo', 2000);
                
            } else {
                formData.set('duyet', JSON.stringify(checkedList))
                formData.set('trangthai',  selectRef.current.value )
                formData.set('totalData',  JSON.stringify(handletotalData()) )
                fecthApiHome()
                formData.set('trangthai', '')
            }
        }
    }
   
    const handleFillter = () => {
        if(selectRef.current.value === '3') {
            NotificationManager.warning('Chọn trạng thái lọc', 'Cảnh báo', 2000);
       } else {  
            formData.set('duyet',[])
            formData.set('trangthai',   selectRef.current.value )
            formData.set('typeTable','filter')
            if(formData.get('checkDataToDuyet') === '1' ) {
                formData.set('totalData',  JSON.stringify(handletotalData()) )
                
            } else {
                formData.set('totalData', [])
            }
            fecthApiHome()
           
            
       }
    }
    // //phân trang
    const handlePageClick = (event) => {
        if(type === 'Home' || type === 'Department') {
            formData.set('page', +event.selected + 1)
            formData.set('totalData',  JSON.stringify(handletotalData()) )
            fecthApiHome() 
        } else {
            formData.set('page', +event.selected + 1)
            formData.set('totalData',  JSON.stringify(handletotalData()) )
            formData.set('loaiHoc',loaihoc === '' ? "1" : loaihoc)
            fecthApiFilter()
        }
    }
    return (  
         <>
         
         { <NotificationContainer  />}
            <div>  
                  <div className={cx('app')}>
                    <table className={cx('wrapper')}>
                        <thead>
                            <tr className={cx('header-tr')}>
                                { (type === 'Home' || type ==='Department') &&  
                                <th>
                                    <Tippy
                                        content='CheckAll'
                                    >
                                        <input type="checkbox" className={cx('lable-checkbox')} 
                                            checked={typeof result !== 'undefined' 
                                                        && ( checkedList.length === (type === 'Home' ? result.filter(item => item.check_truongkhoa !== '1')
                                                                                                    .map(item => item.id).length
                                                                                                    : result.length )
                                                                        )
                                                        && checkedList.length > 0}
                                            onChange={handleCheckedAll}
                                        />
                                    </Tippy>
                                </th> }
                                <th>STT</th>
                                <th>Tên Môn Học</th>
                                <th>Số TC</th>
                                <th> Tên SV</th>
                                <th>Lớp</th>
                                <th>Kỳ học</th>
                                {/* <th>File</th> */}
                                <th>Ghi Chú</th>
                                {loaihoc !== '2' && 
                                <th>Trạng Thái</th>}
                            </tr>
                        </thead>
                        <tbody className={cx('body')}>
                            {   data && result.map((item, index) => (
                                <tr key={item.id} className={cx('body-tr')}>
                                    { (type === 'Home' || type ==='Department') &&  
                                    <td>
                                        <input type="checkbox" disabled={type === 'Home' && (item.check_truongkhoa === '1' || item.check_truongkhoa === '2') } 
                                            className={cx('lable-checkbox')}
                                            checked={!(type === 'Home' && item.check_truongkhoa === '1') ? checkedList.includes(item.id) : false}
                                            onChange={() => handleChecked(item.id)}/>
                                    </td> }
                                    <td>{index + 1}</td>
                                    <td>{item.tenhocphan}</td>
                                    <td>{item.sotin}</td>
                                    <td>{item.hodem + ' ' +  item.ten}  </td>
                                    <td>{item.nhom_id}</td>
                                    <td>{item.ky}</td>
                                    {/* <td>{item.fileupload}</td> */}
                                    <td>{item.ghichu}</td>
                                   {loaihoc !== '2' && 
                                   <td className=
                                        {type === 'Home' ? 
                                            cx(getColorClass(item.check_giaovien)) 
                                            : cx(getColorClass(item.check_truongkhoa)) } style={{fontWeight:'bold'}} 
                                            >
                                        {type === 'Home' ? 
                                            (item.check_giaovien === '0' && 'Chờ duyệt') || (item.check_giaovien === '1' && 'Đã duyệt') || (item.check_giaovien === '2' && 'Không duyệt') 
                                            : (item.check_truongkhoa === '0' && 'Chờ duyệt') || (item.check_truongkhoa === '1' && 'Đã duyệt') || (item.check_truongkhoa === '2' && 'Không duyệt') 
                                        }
                                    </td>}
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!data && <div className={cx('noData')}>Không có  dữ liệu sinh viên đăng ký thi(học) lại!</div>}
                  </div>
                
                <div className={cx('button-table')}>
                   
                    <div>
                        { (type === 'Home' || type === 'Department') && 
                       <>
                            <button onClick={ handleDuyet}>Duyệt</button>       
                            <select className={cx('button-select')} ref={selectRef}>
                                <option value={3}>
                                    --Trạng Thái--
                                </option>
                                <option value={1}>
                                    Đã duyệt
                                </option>
                                <option value={0}>
                                    Chờ duyệt
                                </option>
                                <option value={2}>
                                    Không duyệt
                                </option>
                            </select> 
                            <button onClick={handleFillter} style={{marginRight: '8px'}}>Lọc</button>
                       </>
                        }
                        {/* <input type="file" onChange={handleFileChange} /> */}
                        <button onClick={handleExport} style={{backgroundColor: 'green'}}> Xuất Excel</button>
                    </div>
                   
                    <div className={cx('page')}>
                        <ReactPaginate
                            pageCount={totalPage} // Số trang
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            onPageChange={handlePageClick}
                            previousLabel="<<"
                            nextLabel=">>"
                            breakLabel="..."
                            containerClassName={cx('pagination')}
                            pageClassName={cx('page-item')}
                            pageLinkClassName={cx('page-link')}
                            previousClassName={cx('page-item')}
                            previousLinkClassName={cx('page-link')}
                            nextClassName={cx('page-item')}
                            nextLinkClassName={cx('page-link')}
                            breakClassName={cx('page-item')}
                            breakLinkClassName={cx('page-link')}
                            activeClassName={cx('active')}
                        />
                   </div>
                </div>
            </div>
         </>
        
     );
}

export default Table;