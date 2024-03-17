import React, {useEffect, useState} from 'react'
// import './ManageLocation.css'
import {KTSVG, KTCardBody, KTCard} from '../../../_metronic/helpers'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import Pagination from '../../../common component/Pagination'

// import image from '../../assets/profile/Bob-House.jpg'

import {getUserInvoices, getBrokerInvoices} from '../../services/manage-invoices'

import {Link} from 'react-router-dom'
const Invoices = () => {
  const [invoices, setInvoices] = useState([])
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData
  const {role} = transformedData
  const [loader, setLoader] = useState(false)
  const [lastPage, setLastPage] = useState([])
  const [navAnimate, setNavAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setNavAnimate(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (role == 'user') {
      getAllInvoices()
    } else if (role == 'broker') {
      getAllBrokerInvoices()
    }
  }, [])
  const getAllInvoices = async (page) => {
    try {
      const result = await getUserInvoices(accessToken, page)

      console.log('getUserInvoices', result)
      if (result.status === true) {
        setLoader(true)
        setInvoices(result.invoice.data)
        setLastPage(result.invoice.last_page)
      } else {
        setLoader(true)
      }
    } catch (err) {
      setLoader(false)
    }
  }
  const getAllBrokerInvoices = async (page) => {
    try {
      const result = await getBrokerInvoices(accessToken, page)
      console.log('getBrokerInvoices', result)

      if (result.status === true) {
        setLoader(true)
        setInvoices(result.invoice.data)
        setLastPage(result.invoice.last_page)
      } else {
        setLoader(true)
      }
    } catch (err) {
      setLoader(false)
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
    await getAllInvoices(page)
  }
  const paginate1 = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getAllBrokerInvoices(page)
  }
  const dateFormateHandler = (createdAt) => {
    let today = new Date(createdAt * 1000)
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

  return (
    <>
      {/* Header Start */}

      <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='container p-0 p-md-10'>
          <div className='row rounded' style={{minHeight: '90vh'}}>
            <KTCard>
              <div className='card-header border-1 border-bottom pt-6'>
                <div className='card-title'>
                  <div className='d-flex align-items-center position-relative my-1'>
                    <h3>Invoices</h3>
                  </div>
                </div>
              </div>
              <KTCardBody className='py-4 mb-4'>
                <div className='table-responsive mb-5'>
                  {loader ? (
                    invoices?.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='text-start min-w-125px'>User profile</th>

                            <th className='text-center min-w-125px'>Amount</th>
                            <th className='text-center min-w-125px'>Duration</th>
                            <th className='text-center min-w-125px'>Type</th>
                            <th className='text-center min-w-125px'>Date</th>
                            {/* <th className='text-center min-w-125px'>End</th> */}
                            <th className='text-center min-w-125px'>Status</th>
                            {/* <th className='text-center min-w-125px'>Country</th>
                            <th className='text-center min-w-125px'>Currency</th> */}
                            <th className='text-center min-w-125px'>Discount</th>
                          </tr>
                        </thead>

                        <tbody className='text-gray-600 fw-bold'>
                          {invoices?.map((item, index) => (
                            <tr key={index}>
                              <td className=' min-w-125px'>
                                <div className='d-flex align-items-center'>
                                  {/* <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                    <a href='#'>
                                      <div className='symbol-label'>
                                        <img src={image} alt='not found' className=' w-100 h-100' />
                                      </div>
                                    </a>
                                  </div> */}
                                  <div className='d-flex flex-column'>
                                    <Link
                                      to='#'
                                      // state={{ item: item }}
                                      className='text-gray-800 text-hover-primary '
                                    >
                                      {item.customer_name ? item.customer_name : 'Anonymous'}
                                    </Link>
                                    <span>{item?.customer_email}</span>
                                    <span>{item?.customer_phone}</span>
                                  </div>
                                </div>
                              </td>
                              {/* <td className='text-center min-w-125px'>{}</td> */}

                              <td className='text-center min-w-125px'>
                                {' '}
                                ${item.amount_paid / 100}
                              </td>
                              <td className='text-center min-w-125px'>
                                {item.lines.data[0].plan.interval_count +
                                  ' ' +
                                  item.lines.data[0].plan.interval}
                              </td>
                              <td className='text-center min-w-125px'>
                                {' '}
                                {item?.lines.data[0].plan.metadata.package_for ?? 'NO'}
                              </td>
                              <td className='text-center min-w-125px'>
                                {' '}
                                {dateFormateHandler(item?.lines.data[0].period?.start) ?? 'NO Date'}
                                <p className='my-1'>To</p>
                                {dateFormateHandler(item?.lines.data[0].period?.end) ?? 'NO Date'}
                              </td>
                              {/* <td className='text-center min-w-125px'>
                                {' '}
                                {dateFormateHandler(item?.lines.data[0].period?.end) ?? 'NO Date'}
                              </td> */}
                              <td className='text-center min-w-125px'>
                                <div>
                                  {item.status == 'paid' ? (
                                    <span className='badge bg-success text-white'>
                                      {item?.status?.charAt(0).toUpperCase() +
                                        item?.status?.slice(1)}
                                    </span>
                                  ) : (
                                    <span className='badge bg-light text-dark'>
                                      {' '}
                                      {item?.status?.charAt(0).toUpperCase() +
                                        item?.status?.slice(1)}
                                    </span>
                                  )}
                                </div>
                              </td>
                              {/* <td className='text-center min-w-125px'>{item?.account_country}</td>

                              <td className='text-center min-w-125px'>{item?.currency}</td> */}
                              <td className='text-center min-w-125px'>
                                $
                                {item?.lines?.data[0]?.discount_amounts[0]?.amount
                                  ? item?.lines?.data[0]?.discount_amounts[0]?.amount / 100
                                  : '0'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div
                        className='d-flex  justify-content-center  align-items-center'
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
                {role == 'user'
                  ? lastPage > 1 && <Pagination pageCount={pageCount} paginate={paginate} />
                  : role == 'broker'
                  ? lastPage > 1 && <Pagination pageCount={pageCount} paginate={paginate1} />
                  : null}
              </KTCardBody>
            </KTCard>
          </div>
        </div>
      </div>
    </>
  )
}

export default Invoices
