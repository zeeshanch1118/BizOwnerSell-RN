import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {KTCard} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {BsFillEyeFill} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import './MyMail.css'
import Pagination from '../../../common component/Pagination'
import {getFranchiseMails, deleteFranchiseMail} from '../../services/inbox-services'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
const FranchiseMessageCenter = () => {
  const [loader, setLoader] = useState(false)
  const [allFranchiseMails, setAllFranchiseMails] = useState([])
  const [lastPage, setLastPage] = useState([])
  const [showData, setShowData] = useState([])
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
    getAllFranchiseMails()
  }, [])
  /////////////////// Get All Data /////////////////////
  const getAllFranchiseMails = async (page = 1) => {
    try {
      // setLoadingState(true)
      const result = await getFranchiseMails(accessToken, page)

      if (result.status === true) {
        setLoader(true)
        setAllFranchiseMails(result.franchise.data)

        setLastPage(result.franchise.last_page)

        // setLoadingState(false)
      } else {
        setLoader(false)
      }
    } catch (err) {
      // setLoadingState(false)
    }
  }
  /////////////////// Remove Data /////////////////////
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
  const removeFranchiseMail = async (id) => {
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
        const result = await deleteFranchiseMail(accessToken, id)

        if (result.status === true) {
          Toast.fire({
            icon: 'success',
            title: 'Message delete successfully',
          })
          let franchiseArray = [...allFranchiseMails]

          franchiseArray.map((item, index) => {
            if (item.id === id) {
              franchiseArray.splice(index, 1)
            }
          })

          setAllFranchiseMails(franchiseArray)
        }
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
    await getAllFranchiseMails(page)
  }

  const dateFormateHandler = (createdAt) => {
    let today = new Date(createdAt)
    let date = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
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
      <div className='table-responsive mb-5' onClick={() => handleClick()}>
        {loader ? (
          allFranchiseMails.length > 0 ? (
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
                {allFranchiseMails?.map((item, index) => (
                  <tr key={index}>
                    <td className=' min-w-125px'>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex flex-column'>
                          {`${item.franchise.franchise_user.first_name} ${item.franchise.franchise_user.last_name}`}
                        </div>
                      </div>
                    </td>
                    <td className=' min-w-125px'>
                      <div className='d-flex align-items-center flex-wrap'>
                        <Link
                          to={`/franchise/${item.franchise.slug}/${item.franchise.id}`}
                          target='_blank'
                          className='text-primary mb-1 ms-2 mail-box-table-subject '
                        >
                          {`Ad# ${item.franchise.id}`}
                        </Link>
                        <Link
                          to='#'
                          className='text-gray-800 text-hover-primary mb-1 ms-1 mail-box-table-subject'
                          onClick={() => myFunction(item)}
                        >
                          {item.franchise.title}
                        </Link>
                      </div>
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
                        onClick={() => removeFranchiseMail(item.id)}
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
            <p className='mb-1 text-start'> {showData?.franchise?.title}</p>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Sender Name</h6>
          </div>
          <div className='col-8'>
            <p className='mb-1'>
              {`${showData?.sender?.first_name} ${showData?.sender?.last_name}`}
            </p>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Sender Email</h6>
          </div>
          <div className='col-8'>
            <a href={`mailto:${showData?.sender?.email}`} target='_blank'>
              {showData?.sender?.email}
            </a>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Sender Phone</h6>
          </div>
          <div className='col-8'>
            <a href={`tel:${showData?.sender?.phone_no}`} className='mb-1' type='tel'>
              {showData?.sender?.phone_no}
            </a>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Sender Zip Code</h6>
          </div>
          <div className='col-8'>
            <p className='mb-1'> {showData?.sender?.zip_code}</p>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Sender Capital</h6>
          </div>
          <div className='col-8'>
            <p className='mb-1'> {showData?.sender?.capital}</p>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Sender Time Frame</h6>
          </div>
          <div className='col-8'>
            <p className='mb-1'> {showData?.sender?.time_frame}</p>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Sender State</h6>
          </div>
          <div className='col-8'>
            <p className='mb-1'> {showData?.sender?.deserve_locations}</p>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Receiver Name</h6>
          </div>
          <div className='col-8'>
            <p className='mb-1'>
              {`${showData?.franchise?.franchise_user?.first_name} ${showData?.franchise?.franchise_user?.last_name}`}
            </p>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Receiver Email</h6>
          </div>
          <div className='col-8'>
            <a href={`mailto:${showData?.franchise?.franchise_user?.email}`} target='_blank'>
              {showData?.franchise?.franchise_user?.email}
            </a>
          </div>
        </div>
        <div className='row mt-5 border-1 border-bottom'>
          <div className='col-4'>
            <h6 className='modal-title'>Receiver Phone</h6>
          </div>
          <div className='col-8'>
            <a
              href={`tel:${showData?.franchise?.franchise_user?.phone}`}
              className='mb-1'
              type='tel'
            >
              {showData?.franchise?.franchise_user?.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default FranchiseMessageCenter
