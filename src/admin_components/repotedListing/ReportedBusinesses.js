import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {KTSVG, KTCardBody, KTCard} from '../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
import {RiDeleteBack2Line} from 'react-icons/ri'
import './ReportedListing.css'
import {padding} from '@mui/system'
import {AiOutlinePlus} from 'react-icons/ai'
import activeBusiness from '../../assets/activeBusinessIcon.svg'
import inactiveBusiness from '../../assets/inactiveBusinessIcon.svg'
import franchiseIcon from '../../assets/icons/Branch-icon-06.svg'
import franchiseIconBlue from '../../assets/icons/Branch-icon-blue.svg'
import {MdOutlineBusinessCenter} from 'react-icons/md'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
import {
  createReasons,
  deleteReason,
  getBusinessReportListing,
  updateReportStatus,
} from '../../components/services/admin-services/manage-reported-listing'
import Pagination from '../../common component/Pagination'
import {BsFillEyeFill} from 'react-icons/bs'
const ReportedBusinesses = () => {
  const [loader, setLoader] = useState(false)
  const [showData, setShowData] = useState([])
  const [lastPage, setLastPage] = useState(1)
  const [allBusinessReportListing, setAllBusinessReportListing] = useState([])

  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData

  /////////////////// model funtion start///////////////////
  const [style, setStyle] = useState('sideMenu')
  const [menuStatus, setMenuStatus] = useState('open')
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')
  const handleSlideBar = (data) => {
    setShowData(data)
    switch (menuStatus) {
      case 'open':
        setStyle('sideMenu activeSideMenu')
        break
    }
  }
  ///////////// model funtion end///////////////////

  useEffect(() => {
    getAllBusinessReportListing()
  }, [])

  const getAllBusinessReportListing = async (page) => {
    try {
      setLoader(false)
      const result = await getBusinessReportListing(accessToken, page)
      if (result.status === true) {
        setLastPage(result?.business_report_listing?.last_page)
        setLoader(true)
        setAllBusinessReportListing(result?.business_report_listing?.data)
      } else {
        setLoader(true)
      }
    } catch (err) {
      setLoader(true)
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
  const updateStatus = async (id, status, statusDB) => {
    try {
      const resultBusiness = await Swal.fire({
        // title: 'Are you sure?',
        text: `Are you sure you want to ${status} this reported list?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        reverseButtons: true,
      })
      if (resultBusiness.isConfirmed) {
        const result = await updateReportStatus(id, statusDB, accessToken)
        if (result.status === true) {
          Toast.fire({
            icon: 'success',
            title: `Status ${status} successfully`,
          })
          let businessReportArray = [...allBusinessReportListing]
          businessReportArray.map((item, index) => {
            if (item?.id === result?.report?.id) {
              businessReportArray[index].status = result?.report?.status
            }
          })
          setAllBusinessReportListing(businessReportArray)
        } else {
        }
      } else if (resultBusiness.isDismissed) {
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Please try again',
      })
    }
  }

  let pageCount = lastPage

  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getAllBusinessReportListing(page)
  }
  const closeSideModal = async (e) => {
    if (e.target.name !== 'report_title') {
      setMenuStatus('open')
      setStyle('sideMenu')
    }
  }
  return (
    <>
      <div className='table-responsive mb-5 pb-3' onClick={(e) => closeSideModal(e)}>
        {loader ? (
          allBusinessReportListing.length > 0 ? (
            <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
              <thead>
                <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                  <th className='text-start min-w-125px'>Listings</th>
                  <th className='text-center min-w-125px'>Reported Reason</th>
                  <th className='text-center min-w-125px'>Reported by</th>
                  <th className='text-center min-w-125px'>Status</th>
                  <th className='text-end min-w-125px'>Action (Ignore/Deactivate)</th>
                </tr>
              </thead>

              <tbody className='text-gray-600 fw-bold'>
                {allBusinessReportListing?.map((item, index) => (
                  <tr key={index}>
                    <td className='text-start min-w-125px'>
                      <div className='d-flex align-items-center'>
                        <Link
                          className='text-primary mb-1 ms-2 '
                          to={`/businesses/${item?.business?.slug}/${item?.business?.id}`}
                          target='_blank'
                        >
                          {`Ad# ${item?.business?.id}`}
                        </Link>
                      </div>
                    </td>
                    <td className='text-center min-w-125px'>
                      <Link
                        to='#'
                        className='text-gray-800 text-hover-primary mb-1 ms-2 font-style'
                        name='report_title'
                        onClick={() => handleSlideBar(item)}
                      >
                        {item?.report_reason?.title ?? 'No Report'}
                      </Link>
                    </td>
                    <td className='text-center min-w-125px'>
                      <div className='d-flex flex-column'>
                        <Link to='#' className='text-gray-800 mb-1 ms-2'>
                          {item?.created_by === 'anonymous'
                            ? `${item?.full_name}(${item.created_by})`
                            : item?.created_by === 'login'
                            ? `${item?.report_user?.username} (Register user)`
                            : 'no user'}
                        </Link>
                        <span>
                          {item?.created_by === 'anonymous'
                            ? `${item?.email}`
                            : item?.created_by === 'login'
                            ? `${item?.report_user?.email}`
                            : 'no email'}
                        </span>
                      </div>
                    </td>

                    <td className='text-center min-w-125px'>
                      <div>
                        {item.status === 'active' ? (
                          <span className='badge badge-success'>Ignored</span>
                        ) : item.status === 'pending' ? (
                          <span className='badge badge-warning me-1 mb-1'>Pending</span>
                        ) : item.status === 'inactive' ? (
                          <span className='badge badge-danger me-1'>Deactivated</span>
                        ) : (
                          ''
                        )}
                      </div>
                    </td>

                    <td className='text-end  min-w-100px'>
                      <div className='d-flex justify-content-end'>
                        <BsFillEyeFill
                          size={21}
                          title='View'
                          className='text-primary cursor-pointer me-2 '
                          onClick={() => {
                            setMessage(item?.description)

                            setReason(item?.report_reason?.title)
                          }}
                          data-bs-toggle='modal'
                          data-bs-target={`#kt_modal_report`}
                          style={{marginTop: '5px'}}
                        />
                        {item.status === 'active' ? (
                          <img
                            src={inactiveBusiness}
                            title='Deactivate'
                            className='cursor-pointer img-fluid w-25px h-25px'
                            alt='inactiveBusiness'
                            onClick={() => updateStatus(item?.id, 'deactivate', 'inactive')}
                          />
                        ) : item.status === 'inactive' ? (
                          <img
                            src={activeBusiness}
                            title='active'
                            className='cursor-pointer img-fluid w-25px h-25px'
                            alt='activeBusiness'
                            onClick={() => updateStatus(item?.id, 'active', 'active')}
                          />
                        ) : item.status === 'pending' ? (
                          <>
                            <img
                              src={activeBusiness}
                              title='Ignore'
                              className='cursor-pointer img-fluid me-2 w-25px h-25px'
                              alt='activeBusiness'
                              onClick={() => updateStatus(item?.id, 'ignore', 'active')}
                            />

                            <img
                              src={inactiveBusiness}
                              title='Deactivate'
                              className='cursor-pointer img-fluid w-25px h-25px'
                              alt='inactiveBusiness'
                              onClick={() => updateStatus(item?.id, 'deactivate', 'inactive')}
                            />
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              className='d-flex  justify-content-center  align-items-center'
              style={{height: '70vh', width: '100%'}}
            >
              <div>
                <h1>RECORD NOT FOUND</h1>
              </div>
            </div>
          )
        ) : (
          <div
            className='d-flex justify-content-center align-items-center'
            style={{height: '70vh'}}
          >
            <div>
              <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
            </div>
          </div>
        )}
        {lastPage > 1 && <Pagination pageCount={pageCount} paginate={paginate} />}
      </div>
      <>
        <div className={`${style} p-5 shadow-sm pb-20`}>
          <div className='d-flex justify-content-between align-items-center'>
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
              <p className='modal-title fw-bolder text-start'>Business Title</p>
            </div>
            <div className='col-8'>
              <span className='mb-1 text-start'> {showData?.business?.title}</span>
            </div>
          </div>
          <div className='row mt-5 border-1 border-bottom'>
            <div className='col-4'>
              <p className='modal-title fw-bolder'>Name</p>
            </div>
            <div className='col-8'>
              <p className='mb-1 text-start'>
                {showData?.created_by === 'anonymous'
                  ? `${showData?.full_name}(${showData.created_by})`
                  : showData?.created_by === 'login'
                  ? `${showData?.report_user?.username}(${showData.created_by})`
                  : 'no user'}
              </p>
            </div>
          </div>
          <div className='row mt-5 border-1 border-bottom'>
            <div className='col-4'>
              <p className='modal-title fw-bolder'>Email</p>
            </div>
            <div className='col-8'>
              <a
                className='text-start'
                href={
                  showData?.created_by === 'anonymous'
                    ? `mailto:${showData?.email}`
                    : showData?.created_by === 'login'
                    ? `mailto:${showData?.report_user?.email}`
                    : 'no email'
                }
              >
                {showData?.created_by === 'anonymous'
                  ? `${showData?.email}`
                  : showData?.created_by === 'login'
                  ? `${showData?.report_user?.email}`
                  : 'no email'}
              </a>
            </div>
          </div>

          <div className='row mt-5 '>
            <div className='col-4'>
              <p className='modal-title fw-bolder'>Description</p>
            </div>
            <div className='col-8'>
              <p className='mb-1 text-start'> {showData?.description}</p>
            </div>
          </div>
        </div>
      </>
      <div className='modal fade' tabIndex={-1} id={`kt_modal_report`}>
        <div className='modal-dialog modal-md modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header p-3'>
              <h5 className='modal-title ps-2 pe-5 fs-3 bizOwner-line--contact-header'>
                Reported Reason
              </h5>

              <button
                type='button'
                className='btn-close me-1'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body pb-3'>
              <div className='row pb-8'>
                <div className='col-12 mx-auto fw-bolder'>Reason</div>
                <div className='col-12 mx-auto'>{reason}</div>
                <div className='col-12 mx-auto mt-4 fw-bolder'>Additional Information</div>
                <div className='col-12 mx-auto' style={{maxHeight: '200px', overflowY: 'scroll'}}>
                  {message}
                </div>
              </div>
            </div>

            <div className=' text-end me-4 pb-3'>
              <div>
                <button
                  type='button'
                  className='btn btn-primary mb-4 ms-auto'
                  data-bs-dismiss='modal'
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportedBusinesses
