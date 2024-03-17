import React, {useEffect, useState} from 'react'
import {KTSVG, KTCardBody, KTCard} from '../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
import './MessageCenter.css'
import {padding} from '@mui/system'
const MessageCenter = () => {
  const myFunction = () => {
    var x = document.getElementById('myDIV')
    setModelControl(true)
    if ((x.style.width = '0px')) {
      x.style.width = '500px'

      x.style.padding = '20px'
      x.style.transition = '0.5s'
    } else {
      x.style.width = '0px'
    }
  }

  const myMove = () => {
    let id = null
    const elem = document.getElementById('animate')
    let pos = 0
    clearInterval(id)
    id = setInterval(frame, 5)
    function frame() {
      if (pos == 350) {
        clearInterval(id)
      } else {
        pos++
        elem.style.top = pos + 'px'
        elem.style.left = pos + 'px'
      }
    }
  }


  const [modelControl, setModelControl] = useState(true)
  const ModelClose = () => {
    setModelControl(false)
    var x = document.getElementById('myDIV')
    setModelControl(true)
    if ((x.style.width = 'auto')) {
      x.style.width = '0px'
      x.style.padding = '0'
      x.style.transition = '0.5s'
    } else {
      x.style.width = 'auto'
    }
  }
  const [UserManagement, setUserManagement] = useState([
    {
      id: 1,
      name: 'Benjamin',
      sellername: 'jamin',
      buyerImg: 'https://i.pinimg.com/564x/f0/ff/d7/f0ffd743e0dafd40a8e07b421999aac8.jpg',
      sellerImg:
        'https://4.bp.blogspot.com/-UeMkBAjIPvQ/WPYgmTS1b5I/AAAAAAAAAEM/rQebXsPEs7kU7d8ZkQ5RblNLUmVv_xqbACLcB/s640/5%2BCute%2BUSA%2BGirls%2BPictures1.png',

      discrecption:
        '	California California California California California California California California California',
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const [industryID, setIndustryID] = useState(true)
  const [industryTitle, setIndustryTitle] = useState('')
  const [industrySlug, setIndustrySlug] = useState('')
  const [allMessageCenter, setAllMessageCenter] = useState([
    {
      id: 1,
      buyerName: 'Isaac',
      sellerName: 'Maverick',
      buyerEmail: 'Isaac@gmail.com',
      buyerImg:
        'https://ca-times.brightspotcdn.com/dims4/default/8d5c4c9/2147483647/strip/true/crop/1915x1321+0+0/resize/840x579!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fc5%2F9e%2F4a8b158945d8b3f4e47eca7f9f1a%2Ft.Harris%20author%20photo%20%28photo%20credit%20Eze%20Amos%29.jpg',
      sellerImg:
        'https://images.unsplash.com/photo-1624421998513-77a9ebb43d0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHRlZW5hZ2VyJTIwYm95fGVufDB8fDB8fA%3D%3D&w=1000&q=80',
      sellerEmail: 'Maverick@gmail.com',

      ConverSationDuration: 'three months',
    },
    {
      id: 2,
      buyerName: 'Josiah',
      sellerName: 'Isaac',
      buyerEmail: 'Josiah@gmail.com',
      sellerEmail: 'Isaac@gmail.com',
      buyerImg: 'https://wallpapercave.com/wp/wp10072906.jpg',
      sellerImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz9Lj8_HYEOVAC-kcpmvXbW6y-v6P0PDLymg&usqp=CAU',
      ConverSationDuration: 'one year',
    },
    {
      id: 3,
      buyerName: 'Andrew',
      sellerName: 'Colton',
      buyerEmail: 'Andrew@gmail.com',
      sellerEmail: 'Colton@gmail.com',
      buyerImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRONS60lXybZfoesLuFpI_zt90Gt0xNo8xI7A&usqp=CAU',
      sellerImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyeV6nOnOmAm3G1nlnXLZbTr_2EGU9x2AKiw&usqp=CAU',
      ConverSationDuration: 'four months',
    },
    {
      id: 4,
      buyerName: 'Christian',
      sellerName: 'Cameron',
      buyerEmail: 'Christian@gmail.com',
      sellerEmail: 'Cameron@gmail.com',
      buyerImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTDNMbPM5RdHwQFssqVeDcwrilKxx0C9GYrg&usqp=CAU',
      sellerImg:
        'https://4.bp.blogspot.com/-UeMkBAjIPvQ/WPYgmTS1b5I/AAAAAAAAAEM/rQebXsPEs7kU7d8ZkQ5RblNLUmVv_xqbACLcB/s640/5%2BCute%2BUSA%2BGirls%2BPictures1.png',
      ConverSationDuration: 'five months',
    },
  ])
  const userData = localStorage.getItem('userData')
  const transformedData = JSON.parse(userData || '')
  const {accessToken} = transformedData

  useEffect(() => {
  }, [])

  return (
    <>

      <div
        className='dashboard-bg py-0 '
        id='bgBlur'
        style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}
      >
        <div className='container p-0 p-md-10'>
          <div className='row p-5 bg-white rounded'>
            <KTCard className='mx-4 mb-20'>
              <div className='card-header border-0 pt-6'>
                <div className='card-title'>
                  <div className='d-flex align-items-center position-relative my-1'>
                    <KTSVG
                      path='/media/icons/duotune/general/gen021.svg'
                      className='svg-icon-1 position-absolute ms-6'
                    />
                    <input
                      type='text'
                      data-kt-user-table-filter='search'
                      className='form-control form-control-solid w-250px ps-14'
                      placeholder='Search user'
                    />
                  </div>
                </div>
              </div>
              {/* Header End */}
              {/* Table Start */}
              <KTCardBody className='py-4 mb-4'>
                <div className='table-responsive'>
                  <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer '>
                    <thead>
                      <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                        <th className='min-w-100px'>Buyer</th>
                        <th className='text-start min-w-100px'>Seller</th>
                        <th className='text-center min-w-100px'>ConverSation Duration</th>
                      </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold'>
                      {allMessageCenter?.map((item, index) => (
                        <>
                          <tr key={index}>
                            <td className=' min-w-125px'>
                              <div className='d-flex align-items-center'>
                                <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                  <a href='#'>
                                    <div className='symbol-label'>
                                      <img
                                        src={item.buyerImg}
                                        alt='not found'
                                        className=' w-100 h-100'
                                      />
                                    </div>
                                  </a>
                                </div>
                                <div className='d-flex flex-column'>
                                  <Link
                                    to='#'
                                    className='text-gray-800 text-hover-primary mb-1 ms-2'
                                  >
                                    {item.buyerName}
                                  </Link>
                                  <span>{item.buyerEmail}</span>
                                </div>
                              </div>
                            </td>
                            <td className=' min-w-125px'>
                              <div className='d-flex align-items-center'>
                                <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                  <a href='#'>
                                    <div className='symbol-label'>
                                      <img
                                        src={item.sellerImg}
                                        alt='not found'
                                        className=' w-100 h-100'
                                      />
                                    </div>
                                  </a>
                                </div>
                                <div className='d-flex flex-column'>
                                  <Link
                                    to='#'
                                    className='text-gray-800 text-hover-primary mb-1 ms-2'
                                  >
                                    {item.sellerName}
                                  </Link>
                                  <span>{item.sellerEmail}</span>
                                </div>
                              </div>
                            </td>
                            <td className='text-center min-w-100px'>{item.ConverSationDuration}</td>
                            <div className='mt-5'>
                              
                              <button className='close_btn bg-primary' onClick={myFunction}>
                                See Conversation
                              </button>
                            </div>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* //////////////////////Side Model start/////////////// */}
                <>
                  {modelControl ? (
                    <div className='slide_box' id='myDIV'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div>
                          <h5 className='modal-title'>Conversation</h5>
                          <p className='modal-title'>Active</p>
                        </div>
                        <button
                          type='button'
                          className='btn-close'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                          onClick={ModelClose}
                        ></button>
                      </div>
                      <hr />
                      <div className=' '>
                        <div className='mb-3  col-md-12'>
                          {UserManagement.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td className=' min-w-125px'>
                                  <div className='d-flex align-items-center'>
                                    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                      <a href='#'>
                                        <div className='symbol-label'>
                                          <img
                                            src={item.buyerImg}
                                            alt='not found'
                                            className=' w-100 h-100'
                                          />
                                        </div>
                                      </a>
                                    </div>
                                    <div className='d-flex flex-column'>
                                      <Link
                                        to='#'
                                        className='text-gray-800 text-hover-primary mb-1 ms-2'
                                      >
                                        <b className='fw-large'> {item.sellername}</b>
                                        <small> 2 min</small>
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </>
                          ))}
                          <div
                            className='mt-3 ms-2 me-19 rounded'
                            style={{
                              backgroundColor: '#f1faff',
                              padding: '10px 5px',
                            }}
                          >
                            <span>hello</span>
                          </div>
                        </div>
                        <div className='mb-3  col-md-12'>
                          {UserManagement.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td className=' min-w-125px'>
                                  <div
                                    className='d-flex align-items-center'
                                    style={{
                                      margin: '5px 3px 5px 240px',
                                    }}
                                  >
                                    <div className='d-flex flex-column'>
                                      <Link
                                        to='#'
                                        className='text-gray-800 me-5 text-hover-primary mb-1 ms-2'
                                      >
                                        <div className='d-flex'>
                                          <small> 2min </small>
                                          <b className='fw-large'> {item.name}</b>
                                        </div>
                                      </Link>
                                    </div>
                                    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                      <a href='#'>
                                        <div className='symbol-label'>
                                          <img
                                            src={item.sellerImg}
                                            alt='not found'
                                            className=' w-100 h-100'
                                          />
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </>
                          ))}
                          <div
                            className='mt-3 ms-19 rounded'
                            style={{
                              backgroundColor: '#f8f5ff',
                              padding: '10px 5px',
                            }}
                          >
                            <span>
                              Company BBQ to celebrate the last quater achievements and goals. Food
                              and drinks provided
                            </span>
                          </div>
                        </div>
                        <div className='mb-3  col-md-12'>
                          {UserManagement.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td className=' min-w-125px'>
                                  <div className='d-flex align-items-center'>
                                    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                      <a href='#'>
                                        <div className='symbol-label'>
                                          <img
                                            src={item.buyerImg}
                                            alt='not found'
                                            className=' w-100 h-100'
                                          />
                                        </div>
                                      </a>
                                    </div>
                                    <div className='d-flex flex-column'>
                                      <Link
                                        to='#'
                                        className='text-gray-800 text-hover-primary mb-1 ms-2'
                                      >
                                        <b className='fw-large'> {item.sellername}</b>
                                        <small> 2 min</small>
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </>
                          ))}
                          <div
                            className='mt-3 ms-2 me-19 rounded'
                            style={{
                              backgroundColor: '#f1faff',
                              padding: '10px 5px',
                            }}
                          >
                            <span>
                              How likely are you to recommend our company to your friends and family
                              ?
                            </span>
                          </div>
                        </div>
                        <div className='mb-3  col-md-12'>
                          {UserManagement.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td className=' min-w-125px'>
                                  <div
                                    className='d-flex align-items-center'
                                    style={{
                                      margin: '5px 3px 5px 265px',
                                    }}
                                  >
                                    <div className='d-flex flex-column'>
                                      <Link
                                        to='#'
                                        className='text-gray-800 me-5 text-hover-primary mb-1 ms-2'
                                      >
                                        <small> 5 min</small>
                                        <b className='fw-large'> {item.name}</b>
                                      </Link>
                                    </div>
                                    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                      <a href='#'>
                                        <div className='symbol-label'>
                                          <img
                                            src={item.sellerImg}
                                            alt='not found'
                                            className=' w-100 h-100'
                                          />
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </>
                          ))}
                          <div
                            className='mt-3 ms-19 rounded'
                            style={{
                              backgroundColor: '#f8f5ff',
                              padding: '10px 5px',
                            }}
                          >
                            <span>
                              You can unwatch this repository immediately by clicking here:
                              Keenthemes.com
                            </span>
                          </div>
                        </div>
                        <div className='mb-3  col-md-12'>
                          {UserManagement.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td className=' min-w-125px'>
                                  <div className='d-flex align-items-center'>
                                    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                      <a href='#'>
                                        <div className='symbol-label'>
                                          <img
                                            src={item.buyerImg}
                                            alt='not found'
                                            className=' w-100 h-100'
                                          />
                                        </div>
                                      </a>
                                    </div>
                                    <div className='d-flex flex-column'>
                                      <Link
                                        to='#'
                                        // state={{ item: item }}
                                        className='text-gray-800 text-hover-primary mb-1 ms-2'
                                      >
                                        <b className='fw-large'> {item.sellername}</b>
                                        <small> 2 min</small>
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </>
                          ))}
                          <div
                            className='mt-3 ms-2 me-19 rounded'
                            style={{
                              backgroundColor: '#f1faff',
                              padding: '10px 5px',
                            }}
                          >
                            <span>
                              Hey there, we’re just writing to let you know that you’ve been
                              subscribed to a repository on GitHub.
                            </span>
                          </div>
                        </div>
                        <div className='mb-3  col-md-12'>
                          {UserManagement.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td className=' min-w-125px'>
                                  <div
                                    className='d-flex align-items-center'
                                    style={{
                                      margin: '5px 3px 5px 265px',
                                    }}
                                  >
                                    <div className='d-flex flex-column'>
                                      <Link
                                        to='#'
                                        // state={{ item: item }}
                                        className='text-gray-800 me-5 text-hover-primary mb-1 ms-2'
                                      >
                                        <small> 2 min</small>
                                        <b className='fw-large'> {item.name}</b>
                                      </Link>
                                    </div>
                                    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                      <a href='#'>
                                        <div className='symbol-label'>
                                          <img
                                            src={item.sellerImg}
                                            alt='not found'
                                            className=' w-100 h-100'
                                          />
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </>
                          ))}
                          <div
                            className='mt-3 ms-19 rounded'
                            style={{
                              backgroundColor: ' #f8f5ff',
                              padding: '10px 5px',
                            }}
                          >
                            <span>You’ll receive notifications for all issues, pull requests!</span>
                          </div>
                        </div>
                        <div className='mb-3  col-md-12'>
                          {UserManagement.map((item, index) => (
                            <>
                              <tr key={index}>
                                <td className=' min-w-125px'>
                                  <div className='d-flex align-items-center'>
                                    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                      <a href='#'>
                                        <div className='symbol-label'>
                                          <img
                                            src={item.buyerImg}
                                            alt='not found'
                                            className=' w-100 h-100'
                                          />
                                        </div>
                                      </a>
                                    </div>
                                    <div className='d-flex flex-column'>
                                      <Link
                                        to='#'
                                        // state={{ item: item }}
                                        className='text-gray-800 text-hover-primary mb-1 ms-2'
                                      >
                                        <b className='fw-large'> {item.sellername}</b>
                                        <small> 2 min</small>
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </>
                          ))}
                          <div
                            className='mt-3 ms-2 me-19 rounded'
                            style={{
                              backgroundColor: '#f1faff',
                              padding: '10px 5px',
                            }}
                          >
                            <span>
                              Company BBQ to celebrate the last quater achievements and goals. Food
                              and drinks provided
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </>
                
                {/* ///////////////////////////////////// */}
                {/* Pagination Start*/}
                <div className='row mt-3'>
                  <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
                  <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                    <ul className='pagination'>
                      <li className='page-item previous disabled'>
                        <span className='page-link'>Previous</span>
                      </li>
                      <li className='page-item '>
                        <a href='#' className='page-link'>
                          1
                        </a>
                      </li>
                      <li className='page-item active'>
                        <a href='#' className='page-link'>
                          2
                        </a>
                      </li>

                      <li className='page-item next'>
                        <a className='page-link' href='#'>
                          Next
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Pagination End*/}
              </KTCardBody>
            </KTCard>
           
          </div>
        </div>
      </div>
    </>
  )
}

export default MessageCenter
