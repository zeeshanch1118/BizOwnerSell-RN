import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import {getInvoices} from '../../components/services/manage-invoices'

import {KTCardBody, KTCard} from '../../_metronic/helpers'
import Pagination from '../../common component/Pagination'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
const ManageInvoices = () => {
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')

  const [invoices, setInvoices] = useState([])
  const [isShowNextBtn, setIsShowNextBtn] = useState(false)
  const {accessToken} = transformedData
  const [loader, setLoader] = useState(false)
  const [btnLoader, setBtnLoader] = useState(true)
  const [lastPage, setLastPage] = useState([])
  const [navAnimate, setNavAnimate] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavAnimate(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    setLoader(true)
    getAllInvoices()
  }, [])
  const getAllInvoices = async (page) => {
    try {
      const result = await getInvoices(accessToken, page)
      if (result.status === true) {
        setLoader(false)
        setBtnLoader(true)

        setInvoices(invoices.concat(result?.invoice?.data))

        setIsShowNextBtn(result.invoice?.has_more)
      }
    } catch (err) {
      setLoader(false)
      console.log('getInvoices err', err)
    }
  }
  let pageCount = lastPage
  const paginate = async (data) => {
    setBtnLoader(false)
    await getAllInvoices(data)
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
                <div className='table-responsive mb-5 pb-20'>
                  {console.log('invoices', invoices)}
                  {loader == false ? (
                    invoices?.length > 0 ? (
                      <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                        <thead>
                          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='text-start min-w-30px'>NO.</th>
                            <th className='text-start min-w-100px'>User profile</th>

                            <th className='text-center min-w-100px'>Amount</th>
                            <th className='text-center min-w-125px'>Duration</th>
                            <th className='text-center min-w-125px'>Type</th>
                            <th className='text-center min-w-125px'> Date</th>
                            {/* <th className='text-center min-w-125px'>End Date</th> */}

                            <th className='text-center min-w-125px'>Status</th>
                            <th className='text-center min-w-125px'>Discount</th>
                            {/* <th className='text-center min-w-125px'>Country</th>
                            <th className='text-center min-w-125px'>Currency</th> */}
                          </tr>
                        </thead>

                        <tbody className='text-gray-600 fw-bold'>
                          {invoices?.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td className=' min-w-100px'>
                                  <div className='d-flex align-items-center'>
                                    <div className='d-flex flex-column'>
                                      <Link to='#' className='text-gray-800 text-hover-primary '>
                                        {item.customer_name ? item.customer_name : 'Anonymous'}
                                      </Link>
                                      <span>{item?.customer_email}</span>
                                      <span>{item?.customer_phone}</span>
                                    </div>
                                  </div>
                                </td>

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
                                  {item?.lines.data[0].plan.metadata.package_for ?? 'NO '}
                                </td>

                                <td className='text-center min-w-125px'>
                                  {' '}
                                  {dateFormateHandler(item?.lines.data[0].period?.start) ??
                                    'NO Date'}
                                  <p className='my-1'>To</p>
                                  {dateFormateHandler(item?.lines.data[0].period?.end) ?? 'NO Date'}
                                </td>
                                {/* <td className='text-center min-w-125px'>  {dateFormateHandler(item?.lines.data[0].period?.end) ?? 'NO Date'}</td> */}
                                <td className='text-center min-w-125px'>
                                  {' '}
                                  {item.status == 'paid' ? (
                                    <span className='badge bg-success text-white'>
                                      {item.status}
                                    </span>
                                  ) : (
                                    <span className='badge bg-light text-dark'>{item.status}</span>
                                  )}
                                </td>
                                {/* <td className='text-center min-w-125px'>{item?.account_country}</td> */}

                                {/* <td className='text-center min-w-125px'>{item?.currency}</td> */}
                                <td className='text-center min-w-125px'>
                                  $
                                  {item?.lines?.data[0]?.discount_amounts[0]?.amount
                                    ? item?.lines?.data[0]?.discount_amounts[0]?.amount / 100
                                    : '0'}
                                </td>
                              </tr>

                              {index === invoices?.length - 1 && isShowNextBtn ? (
                                <tr>
                                  <td>
                                    <>
                                      <div
                                        className='ms-5'
                                        style={{
                                          position: 'absolute',
                                          left: '35%',
                                        }}
                                      >
                                        <button
                                          className='btn text-white text-end btn-primary  '
                                          onClick={() =>
                                            paginate(invoices?.length - 1 ? item?.id : '')
                                          }
                                          style={{
                                            marginLeft: '4rem',
                                            marginBottom: '5rem',
                                            position: 'relative',
                                          }}
                                        >
                                          {btnLoader ? (
                                            <span>Load more...</span>
                                          ) : (
                                            <>
                                              <div>
                                                <span className='px-1'>Loading...</span>
                                                <span
                                                  className='spinner-border spinner-border-sm'
                                                  role='status'
                                                  aria-hidden='true'
                                                />
                                              </div>
                                            </>
                                          )}
                                        </button>
                                      </div>
                                    </>
                                  </td>
                                </tr>
                              ) : null}
                            </>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div
                        className='d-flex  justify-content-center  align-items-center'
                        style={{height: '70vh'}}
                      >
                        <div>
                          <h1>NO INVOICE FOUND</h1>
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
              </KTCardBody>
            </KTCard>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageInvoices
