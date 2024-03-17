import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {BsFillEyeFill} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import './MyMail.css'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import {getBrokerMails, deleteBrokerMail} from '../../services/inbox-services'
import Pagination from '../../../common component/Pagination'
const BrokerMessageCenter = () => {
  const [loader, setLoader] = useState(false)
  const [allBrokerMails, setAllBrokerMails] = useState([])
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
    getAllBrokerMails()
  }, [])
  const getAllBrokerMails = async (page = 1) => {
    try {
      setLoader(false)
      const result = await getBrokerMails(accessToken, page)

      if (result.status === true) {
        setAllBrokerMails(result.brokerRequest.data)
        setLoader(true)
        setLastPage(result.brokerRequest.last_page)
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

  const removeBrokerMail = async (id) => {
    try {
      const resultRemove = await Swal.fire({
        text: 'Are you sure you want to delete this contacted list?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7e8299',
        confirmButtonText: 'Yes',
        reverseButtons: true,
      })
      if (resultRemove.isConfirmed) {
        const result = await deleteBrokerMail(accessToken, id)
        if (result.status === true) {
          let businessArray = [...allBrokerMails]
          Toast.fire({
            icon: 'success',
            title: 'Message delete successfully',
          })
          businessArray.map((item, index) => {
            if (item.id === id) {
              businessArray.splice(index, 1)
            }
          })

          setAllBrokerMails(businessArray)
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
    await getAllBrokerMails(page)
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
      <div
        className='dashboard-bg py-0'
        style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}
        onClick={() => handleClick()}
      >
        <div className='container p-0 p-md-10'>
          <div className='row rounded'>
            <KTCard>
              <div className='card-header border-1 border-bottom pt-6'>
                <div className='card-title'>
                  <div className='d-flex align-items-center position-relative my-1'>
                    <h3>My Contacts</h3>
                  </div>
                  {/* <div className='d-flex align-items-center position-relative my-1'>
                    <h3 className=' d-inline bizOwner-inner-heading mb-0 align-items-center'>
                      Location Management
                    </h3>
                  </div> */}
                </div>
              </div>
              <KTCardBody className='py-4 mb-4'>
                <div className='table-responsive mb-5'>
                  {loader ? (
                    allBrokerMails.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='min-w-100px'>Name</th>
                            <th className='text-center min-w-100px'>Email</th>
                            {/* <th className='text-center min-w-100px'>Phone</th> */}
                            <th className='text-center min-w-100px'>Type</th>
                            <th className='text-center min-w-100px'>Date</th>
                            <th className='text-center min-w-100px'>Action</th>
                          </tr>
                        </thead>

                        <tbody className='text-gray-600 fw-bold'>
                          {allBrokerMails?.map((item, index) => (
                            <tr key={index}>
                              <td className=' min-w-125px'>
                                <div className='d-flex align-items-center'>
                                  <div className='d-flex flex-column'>
                                    {/* <Link
                              to='#'
                              onClick={() => myFunction(item)}
                              className='text-gray-800 text-hover-primary mb-1 ms-2 font-style'
                            > */}
                                    {item?.full_name ?? 'No Name'}
                                    {/* </Link> */}
                                  </div>
                                </div>
                              </td>

                              <td className='text-center min-w-100px mail-box-table-subject'>
                                {item.email ?? 'NO Email'}
                              </td>
                              {/* <td className='text-center min-w-100px mail-box-table-subject'>
                        {item.phone ?? 'No Phone'}
                      </td> */}
                              <td className='text-center min-w-100px mail-box-table-subject'>
                                {item.looking ?? 'No Type'}
                              </td>
                              <td className='text-center min-w-100px mail-box-table-subject'>
                                {dateFormateHandler(item?.created_at) ?? 'NO Date'}
                              </td>
                              <td className='text-center min-w-100px'>
                                <BsFillEyeFill
                                  size={22}
                                  className='text-primary cursor-pointer me-3'
                                  onClick={() => myFunction(item)}
                                />
                                <MdDelete
                                  size={22}
                                  color='gray'
                                  className='cursor-pointer '
                                  onClick={() => removeBrokerMail(item.id)}
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
              </KTCardBody>
            </KTCard>
          </div>
        </div>
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
            <h6 className='modal-title'>Name</h6>
          </div>
          <div className='col-8'>
            <span className='mb-1'> {showData?.full_name}</span>
          </div>
        </div>

        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Email</h6>
          </div>
          <div className='col-8'>
            <a href={`mailto:${showData?.email}`} target='_blank'>
              {showData?.email}
            </a>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Looking</h6>
          </div>
          <div className='col-8'>
            <span className='mb-1 text-start'> {showData?.looking ?? 'NO Type'}</span>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Phone</h6>
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

export default BrokerMessageCenter
