import React, {useEffect, useState} from 'react'
import {KTSVG, KTCardBody, KTCard} from '../../_metronic/helpers'
import profileImage from '../../assets/profile/Bob-House.jpg'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate'
import {MdModeEdit} from 'react-icons/md'
import activeIcon from '../../assets/active-user-icon.svg'
import inactiveIcon from '../../assets/inactive-user-icon.svg'

import {getBrokers, updateStatus} from '../../components/services/admin-services/manage-users'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'

import Pagination from '../../common component/Pagination'
const ManageBroker = () => {
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData

  const [loader, setLoader] = useState('')

  const [allBrokers, setAllBrokers] = useState([])

  const [lastPage, setLastPage] = useState([])

  ///////////////////////
  useEffect(() => {
    getAllBrokers()
  }, [])

  const getAllBrokers = async (page) => {
    try {
      setLoader(false)
      const result = await getBrokers(accessToken, page)
      console.log(result, 'ASda')
      if (result.status === true) {
        setLoader(true)
        setAllBrokers(result.brokers.data)
        setLastPage(result.brokers.last_page)
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

  let pageCount = lastPage

  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getAllBrokers(page)
  }
  const changeStatusHandler = async (id, cstatus) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You want to ${cstatus} status!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    })
    if (result.isConfirmed) {
      const statusResult = await updateStatus(id, cstatus, accessToken)
      if (statusResult.status === true) {
        Toast.fire({
          icon: 'success',
          title: `User ${cstatus} successfully`,
        })
        let usersArray = [...allBrokers]

        usersArray.map((item, index) => {
          if (item.id === statusResult.user.id) {
            usersArray[index].status = statusResult.user.status
          }
        })
        setAllBrokers(usersArray)
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Please try again',
        })
      }
    } else if (result.isDismissed) {
    }
  }
  return (
    <>
      {/* Header Start */}

      <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='container p-0 p-md-10'>
          <div className='row  rounded'>
            <KTCard>
              <div className='card-header border-1 border-bottom pt-6'>
                <div className='card-title'>
                  <div className='d-flex align-items-center position-relative my-1'>
                    <h3>Manage Brokers</h3>
                  </div>
                </div>
              </div>

              {/* Header End */}
              {/* Table Start */}
              <KTCardBody className='py-4 mb-4'>
                <div className='table-responsive mb-5'>
                  {loader ? (
                    allBrokers?.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='text-start min-w-100px'>Username</th>
                            <th className='text-center min-w-100px'>Email</th>
                            <th className='text-center min-w-100px'>Phone</th>
                            <th className='text-center min-w-100px'>Status</th>
                            <th className='text-end me-9 min-w-100px'>Action</th>
                          </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold'>
                          {allBrokers?.map((item, index) => (
                            <tr key={index}>
                              <td className='text-start min-w-100px'>
                                {item?.username ?? 'No user'}
                              </td>
                              <td className='text-center min-w-100px'>
                                {item?.email ?? 'No Email'}
                              </td>
                              <td className='text-center min-w-100px'>
                                {item?.phone == null ? 'No phone' : item?.phone}
                              </td>
                              <td className='text-center min-w-100px'>
                                {' '}
                                <div>
                                  {item.status === 'active' ? (
                                    <span className='badge badge-success'>Active</span>
                                  ) : item.status === 'inactive' ? (
                                    <span className='badge badge-danger me-1 mb-1'>Inactive</span>
                                  ) : (
                                    'No Status'
                                  )}
                                </div>
                              </td>

                              <td className='text-end min-w-100px'>
                                {item.status === 'inactive' ? (
                                  <img
                                    src={activeIcon}
                                    alt=''
                                    className='me-3 cursor-pointer'
                                    onClick={() => changeStatusHandler(item?.id, 'active')}
                                  />
                                ) : item.status === 'active' ? (
                                  <img
                                    src={inactiveIcon}
                                    alt=''
                                    className='cursor-pointer me-3'
                                    onClick={() => changeStatusHandler(item?.id, 'inactive')}
                                  />
                                ) : null}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div
                        className='d-flex  justify-content-center  align-items-center '
                        style={{height: '70vh'}}
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
                </div>
                {lastPage > 1 && <Pagination pageCount={pageCount} paginate={paginate} />}
              </KTCardBody>
            </KTCard>
            {/* Table End */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageBroker
