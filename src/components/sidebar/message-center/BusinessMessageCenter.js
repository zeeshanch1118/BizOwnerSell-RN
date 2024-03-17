import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {KTSVG, KTCardBody, KTCard} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {BsFillEyeFill} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import './MyMail.css'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import {getBusinessesMails, deleteBusinessesMail} from '../../services/inbox-services'
import Pagination from '../../../common component/Pagination'
const BusinessMessageCenter = () => {
  const [loader, setLoader] = useState(false)
  const [allBusinessMails, setAllBusinessMails] = useState([])
  const [showData, setShowData] = useState([])
  const [lastPage, setLastPage] = useState([])
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const {accessToken} = transformedData
  /////////////////// model funtion start///////////////////
  const [style, setStyle] = useState('sideMenu')
  const [menuStatus, setMenuStatus] = useState('open')
  const myFunction = (data) => {
    setShowData(data)
    switch (menuStatus) {
      case 'open':
        setMenuStatus('close')
        setStyle('sideMenu activeSideMenu')
        break
      // case 'close':
      //   setMenuStatus('open')
      //   setStyle('sideMenu')
      //   break
    }
  }

  useEffect(() => {
    getAllBusinessMails()
  }, [])
  const getAllBusinessMails = async (page = 1) => {
    try {
      // setLoadingState(true)
      const result = await getBusinessesMails(accessToken, page)
      if (result.status === true) {
        setAllBusinessMails(result.business.data)
        setLoader(true)
        setLastPage(result.business.last_page)

        // setLoadingState(false)
      } else {
        setLoader(false)
      }
    } catch (err) {
      // setLoadingState(false)
    }
  }
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })

  const removeBusinessesMail = async (id) => {
    try {
      const resultRemove = await Swal.fire({
        text: 'Are you sure you want to delete this mail?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7e8299',
        confirmButtonText: 'Yes',
        reverseButtons: true,
      })
      if (resultRemove.isConfirmed) {
        const result = await deleteBusinessesMail(accessToken, id)
        if (result.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'Message delete successfully',
          })
          let businessArray = [...allBusinessMails]

          businessArray.map((item, index) => {
            if (item.id === id) {
              businessArray.splice(index, 1)
            }
          })

          setAllBusinessMails(businessArray)
        }
      } else if (resultRemove.isDismissed) {
        // console.log('isDenied')
      }
    } catch (e) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }
  // Pagination
  let pageCount = lastPage
  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getAllBusinessMails(page)
  }

  const dateFormateHandler = (createdAt) => {
    let today = new Date(createdAt)
    let date = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
    }).format(today)
    return date
  }
  const handleClick = () => {
    if (menuStatus == 'close') {
      // setStyle('sideMenu activeSideMenu')
      setStyle('sideMenu')
      setMenuStatus('open')
    }
  }
  return (
    <>
      {/* Header Start */}

      <div className='table-responsive mb-5' onClick={() => handleClick()}>
        {loader ? (
          allBusinessMails.length > 0 ? (
            <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
              <thead>
                <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                  <th className='min-w-100px'>To</th>
                  <th className='text-start min-w-100px'>Subject</th>
                  <th className='text-center min-w-100px'>Date</th>
                  <th className='text-center min-w-100px'>Action</th>
                </tr>
              </thead>

              <tbody className='text-gray-600 fw-bold'>
                {allBusinessMails?.map((item, index) => (
                  <tr key={index}>
                    <td className=' min-w-125px'>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex flex-column'>
                          {`${item.reciver_first_name} ${item.reciver_last_name}`}
                        </div>
                      </div>
                    </td>
                    <td className=' min-w-125px'>
                      <div className='d-flex align-items-center flex-wrap'>
                        <Link
                          className='text-primary mb-1 ms-2 mail-box-table-subject '
                          to={`/businesses/${item.slug}/${item.business_id}`}
                          target='_blank'
                        >
                          {`Ad# ${item.business}`}
                        </Link>
                        <Link
                          to='#'
                          className='text-gray-800 text-hover-primary mb-1 ms-1 mail-box-table-subject text-truncate'
                          onClick={() => myFunction(item)}
                        >
                          {item.businesses_title}
                        </Link>
                      </div>
                    </td>
                    <td className='text-center min-w-100px mail-box-table-subject'>
                      {dateFormateHandler(item?.created_at) ?? 'NO Date'}
                    </td>
                    <td className='text-center min-w-100px'>
                      <BsFillEyeFill
                        size={22}
                        className='text-primary cursor-pointer me-2'
                        onClick={() => myFunction(item)}
                      />
                      <MdDelete
                        size={22}
                        color='gray'
                        className='cursor-pointer '
                        onClick={() => removeBusinessesMail(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              className='d-flex  justify-content-center  align-items-center'
              style={{height: '80vh', width: '100%'}}
            >
              <div>
                <h1>RECORD NOT FOUND</h1>
              </div>
            </div>
          )
        ) : (
          <div
            className='d-flex justify-content-center align-items-center'
            style={{height: '100vh'}}
          >
            <div>
              <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
            </div>
          </div>
        )}
      </div>
      {lastPage > 1 && <Pagination pageCount={pageCount} paginate={paginate} />}

      {/* //////////////////////Side Model start/////////////// */}

      <div className={`${style} shadow-sm p-5 pb-20`}>
        <div className='d-flex justify-content-between align-items-center '>
          <div></div>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Close'
            onClick={() => {
              setMenuStatus('open')
              setStyle('sideMenu')
            }}
          ></button>
        </div>

        <div className='row mt-5  border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Title</h6>
          </div>
          <div className='col-8'>
            <span className='mb-1 text-start'> {showData?.businesses_title}</span>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Sender Name</h6>
          </div>
          <div className='col-8'>
            <p className='mb-1'> {showData?.full_name}</p>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Sender Email</h6>
          </div>
          <div className='col-8'>
            <a href={`mailto:${showData?.email}`} target='_blank'>
              {showData?.email}
            </a>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Sender Phone</h6>
          </div>
          <div className='col-8'>
            <a href={`tel:${showData?.phone_no}`} className='mb-1' type='tel'>
              {showData?.phone_no}
            </a>
          </div>
        </div>
        <div className='row mt-5 '>
          <div className='col-4'>
            <h6 className='modal-title'>Message</h6>
          </div>
          <div className='col-8'>
            <p className='mb-1 text-start'> {showData?.message}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessMessageCenter
