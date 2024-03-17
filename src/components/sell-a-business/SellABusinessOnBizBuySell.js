import React from 'react'
import {Link} from 'react-router-dom'
import DownLoad from './DownLoad'
// import Resizable from './FindABroker'
import Slider from './Slider'
import './SellABusinessOnBizBuySell.css'
import StepperMain from './StepperMain'
import AddListing from '../sidebar/selling/create-app/steps/AddListing'
const userData = localStorage.getItem('userData')
const transformedData = JSON?.parse(JSON.stringify(userData))
// import StepperMainComp from './StepperMainComp'
// import ValueABusiness from './ValueABusiness'
const SellABusinessOnBizBuySell = () => {
  return (
    <>
      <div className='container-fluid SellABussinessBody'>
        <div className='inner_first_container col-12'>
          <div className='container'>
            <h1 className='headingOne'>
              <b> The #1 place to sell a business</b>
            </h1>
            <p className='ParaOne'>Reach 15x more buyers on the most active marketplace</p>

            {/* /////////////////// */}

            <div>
              {transformedData ? (
                <Link to='/dashboard/add-to-new-listing'>
                  <button
                    type='button'
                    className=' button-z'
                    style={{
                      fontSize: 'x-large',
                    }}
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_3'
                  >
                    Get Started
                  </button>
                </Link>
              ) : (
                <>
                  <Link to='/auth/login'>
                    <button
                      type='button'
                      className=' button-z'
                      style={{
                        fontSize: 'x-large',
                      }}
                    >
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
            {/* /////////////////// */}
          </div>
        </div>
        <div className=' '>
          <div className='exposure-header'>
            <p
              className=''
              style={{
                color: '#000000',
                fontWeight: '400',
                fontSize: '30px',
                lineHeight: '37px',
              }}
            >
              Get the most exposure with the largest business-for-sale network
            </p>
          </div>
          {/* <div className='container-fluid d-flex justify-content-around text-center'>
            <div
              className=' col-md-3  shadow-lg    col-sm-12  '
              style={{
                marginBottom: '9px',
              }}
            >
              <img
                src='https://www.bizbuysell.com/xcommon/images/header/BBS_logo.svg'
                alt=''
                style={{width: '70%', marginTop: '17px'}}
              />
              <p
                className=''
                style={{
                  padding: '12px 0px',
                }}
              >
                The #1 business for sale marketplace
              </p>
            </div>
            <div
              className='  col-md-4 shadow-lg    col-sm-12 '
              style={{
                marginBottom: '9px',
              }}
            >
              <img
                src='https://www.bizbuysell.com/xcommon/images/header/LN_logo.svg'
                alt=''
                style={{width: '50%', marginTop: '17px'}}
              />
              <p
                className=''
                style={{
                  padding: '12px 0px',
                }}
              >
                The #2 business for sale marketplace
              </p>
            </div>
            <div
              className='  col-md-3 shadow-lg    col-sm-12 '
              style={{
                marginBottom: '9px',
              }}
            >
              <img
                src='https://www.bizbuysell.com/xcommon/images/header/logoBizQuest.svg'
                alt=''
                style={{width: '60%', marginTop: '17px'}}
              />
              <p
                className=''
                style={{
                  padding: '12px 0px',
                }}
              >
                The #3 business for sale marketplace
              </p>
            </div>
          </div> */}
        </div>

        <div className='container d-lg-flex flex-md-col  mt-md-5 justify-content-between   '>
          <div className='col-lg-4  text-start col-md-12 text-start nearest_competitor '>
            <h1 className='col-3'>Unparalleled Exposure</h1>
            <p
              style={{
                color: '#000000',
                fontWeight: '400',
                fontSize: '18px',
                lineHeight: '30px',
              }}
            >
              With 3+ million monthly visits and hundreds of thousands of businesses sold, our
              network generates more exposure than all similar services combined.
            </p>
            {/* <span
              className=''
              style={{
                color: 'black',
                fontSize: 'medium',
                paddingTop: '5px',
              }}
            >
              Your listing appears on:
            </span>
            <h2
              style={{
                color: '#000000',
                fontWeight: '400',
                fontSize: '22px',
                lineHeight: '30px',
                marginTop: '15px',
              }}
            >
              BizBuySell, BizQuest, LoopNet, The Wall Street Journal, AllBusiness.com, the USA Today
              Network and local media partners
            </h2> */}
          </div>
          <div className='col-lg-7 col-md-12 mt-md-15  text-center'>
            <img
              style={{width: '85%'}}
              className='img-fluid'
              src='https://www.bizbuysell.com/xcommon/images/marketing/sell/15x-traffic-graph.png'
              alt=''
            />
          </div>
        </div>

        <div
          className='image'
          style={{
            marginBottom: '6px',
            marginTop: '12px',
            lineHeight: '30px',
          }}
        >
          <div className='container d-lg-flex flex-md-col  mt-md-5 justify-content-between   '>
            <div className='col-lg-6  col-md-12  nearest_competitors '>
              <h1
                style={{
                  color: '#000000',
                  fontWeight: '400',
                  fontSize: '40px',
                  lineHeight: '50px',
                }}
              >
                <b> List Any Type of Business</b>
              </h1>
              <p>
                Whether you’re in the service, restaurant, retail, hospitality, manufacturing,
                construction, transportation, wholesale, online, or any industry, when you need to
                sell a business, you need to be on BizOwnerSell.
              </p>

              <h4>
                <span className=''>
                  <ul
                    className='text-start d-md-flex flex-sm-col  col-md-12 col-sm-6'
                    style={{
                      marginTop: '19px',
                    }}
                  >
                    <div>
                      <li
                        className='col-12'
                        style={{
                          color: 'black',
                          fontSize: 'large',
                          marginRight: '65px',
                          marginBottom: '19px',
                        }}
                      >
                        Established Business
                      </li>
                      <li
                        className='col-12'
                        style={{
                          color: 'black',
                          fontSize: 'large',
                        }}
                      >
                        Business Franchises
                      </li>
                    </div>
                    <div>
                      <li
                        className='col-12 '
                        style={{
                          color: 'black',
                          fontSize: 'large',
                          marginBottom: '19px',
                        }}
                      >
                        Closed Business Assets
                      </li>
                      <li
                        className='col-12 '
                        style={{
                          color: 'black',
                          fontSize: 'large',
                          marginRight: '65px',
                        }}
                      >
                        Start-up Opportunity
                      </li>
                    </div>
                  </ul>
                </span>
              </h4>
              <div>
                {transformedData ? (
                  <Link to='/dashboard/add-to-new-listing'>
                    <button
                      type='button'
                      className=' button-z my-15'
                      style={{
                        margin: '19px 0px',
                        fontSize: 'x-large',
                      }}
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_5'
                    >
                      Create Your Listing
                    </button>
                  </Link>
                ) : (
                  <>
                    <Link to='/auth/login'>
                      <button
                        type='button'
                        className=' button-z my-15'
                        style={{
                          margin: '19px 0px',
                          fontSize: 'x-large',
                        }}
                      >
                        Create Your Listing
                      </button>
                    </Link>
                    <div className='modal fade' tabIndex={-1} id='kt_modal_5'>
                      <div className='modal-dialog'>
                        <div className='modal-content'>
                          <div className='modal-header text-center flex-column'>
                            <h2
                              className='modal-title '
                              style={{
                                marginBottom: '9px',
                                color: 'black',
                                fontSize: 'x-large',
                              }}
                            >
                              Let's Get Started
                            </h2>
                            <span className='col-md-7'>
                              You are on your way to listing your business for sale. Let's get some
                              info about you first.
                            </span>

                            <div
                              className='btn btn-icon btn-sm btn-active-light-primary'
                              data-bs-dismiss='modal'
                              aria-label='Close'
                            >
                              <span className='svg-icon svg-icon-2x' />
                            </div>
                          </div>
                          <div className='modal-body'>
                            <div
                              className='input-group input-group-solid '
                              style={{
                                magrinBottom: '9px',
                              }}
                            >
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Username'
                                aria-label='Username'
                                aria-describedby='basic-addon1'
                              />
                            </div>
                            <div
                              className='input-group input-group-solid '
                              style={{
                                magrinBottom: '9px',
                              }}
                            >
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Email'
                                aria-label='Username'
                                aria-describedby='basic-addon1'
                              />
                            </div>
                            <div
                              className='input-group input-group-solid '
                              style={{
                                magrinBottom: '9px',
                              }}
                            >
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Password'
                                aria-label='Username'
                                aria-describedby='basic-addon1'
                              />
                            </div>
                            <div
                              className='input-group input-group-solid '
                              style={{
                                magrinBottom: '9px',
                              }}
                            >
                              <input
                                type='text'
                                className='form-control '
                                placeholder='PhoneNumber'
                                aria-label='Username'
                                aria-describedby='basic-addon1'
                              />
                            </div>
                            <div className='text-center'>
                              <Link to='/dashboard/add-to-new-listing' data-bs-dismiss='modal'>
                                <button
                                  type='button'
                                  className='px-20 button-z'
                                  style={{
                                    fontSize: 'x-large',
                                  }}
                                  data-bs-dismiss='modal'
                                >
                                  Start Your Listing
                                </button>
                              </Link>
                            </div>
                            <div className='modal bg-white fade' tabindex='-1' id='kt_modal_6'>
                              <div className='modal-dialog modal-fullscreen'>
                                <div className='modal-content shadow-none'>
                                  <div className='modal-header'>
                                    <h5 className='modal-title'>Modal title</h5>

                                    <div
                                      className='btn btn-icon btn-sm btn-active-light-primary'
                                      style={{
                                        marginLeft: '4px',
                                      }}
                                      data-bs-dismiss='modal'
                                      aria-label='Close'
                                    >
                                      <span className='svg-icon svg-icon-2x'></span>
                                    </div>
                                  </div>
                                  <div className='modal-body'>
                                    <StepperMain />
                                  </div>

                                  <div className='modal-footer'>
                                    <button
                                      type='button'
                                      className='btn btn-light button-z'
                                      data-bs-dismiss='modal'
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='text-center'>
                            <h3>
                              <a
                                href=''
                                className='text-decoration-underline'
                                data-bs-toggle='modal'
                                data-bs-target='#kt_modal_10'
                              >
                                Already have an account?
                              </a>
                            </h3>
                            <div className='modal fade bg-light' tabindex='-1' id='kt_modal_10'>
                              <div className='modal-dialog'>
                                <div className='modal-content'>
                                  <div className='modal-header'>
                                    <h1 className='text-center'> Member Sign In</h1>
                                  </div>

                                  <div className='modal-body'>
                                    <div
                                      className='input-group input-group-solid '
                                      style={{
                                        marginBottom: '9px',
                                      }}
                                    >
                                      <input
                                        type='text'
                                        className='form-control '
                                        placeholder='FirstName'
                                        aria-label='Username'
                                        aria-describedby='basic-addon1'
                                      />
                                    </div>
                                    <div
                                      className='input-group input-group-solid '
                                      style={{
                                        marginBottom: '9px',
                                      }}
                                    >
                                      <input
                                        type='text'
                                        className='form-control '
                                        placeholder='Email'
                                        aria-label='Username'
                                        aria-describedby='basic-addon1'
                                      />
                                    </div>
                                  </div>

                                  <div className='modal-footer'>
                                    <button
                                      type='button'
                                      className='button-z btn btn-light'
                                      data-bs-dismiss='modal'
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='modal-footer'>
                            <button
                              type='button'
                              className='button-z btn btn-light'
                              data-bs-dismiss='modal'
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className='col-lg-6 col-md-12 mt-md-15  text-center'>
              <img
                // style={{width: '100%'}}
                className='img-fluid'
                src='https://www.bizbuysell.com/xcommon/images/marketing/sell/sellListAnyType.png'
                alt=''
              />
            </div>
          </div>
        </div>
        {/* <div className=' mt-0' style={{backgroundColor: '#48b0e0'}}>
          <div className='container text-center align-items-center'>
            <h2
              className='carousel_heading text-light '
              style={{
                padding: '15px 0px',
              }}
            >
              Why Business Owners choose BizBuySell
            </h2>
            <div
              className=''
              style={{
                paddingBottom: '12px',
              }}
            >
              <Slider />
            </div>
          </div>
        </div> */}
        <div className=''>
          <div className='container mt-20 mb-5 d-md-flex flex-sm-col justify-content-between'>
            <div
              className='col-md-4 col-sm-12'
              style={{
                marginTop: '13px',
              }}
            >
              <img
                style={{width: '110%'}}
                src='https://www.bizbuysell.com/xcommon/images/marketing/sell/SellPageValuation.png'
                alt=''
              />
            </div>
            <div className='col-md-5 col-sm-12 nearest_competitor'>
              <h1 className=''>
                <b> How much is your business worth?</b>
              </h1>
              <p
                className=''
                style={{
                  fontSize: 'large',
                }}
              >
                We can help you understand the value of your business with our BizOwnerSell valuation
                report.
              </p>
              <h6
                className='col-11 '
                style={{
                  fontSize: 'x-large',
                }}
              >
                A valuation report is included with your listing!
              </h6>
            </div>
          </div>
          <div className='text-center justify-content-center m-5'>
            {/* ////////////////////// */}
            <div>
              {transformedData ? (
                <Link to='/dashboard/add-to-new-listing'>
                  <button
                    type='button'
                    className='button-z '
                    style={{
                      margin: '0px 9px',
                      fontSize: 'x-large',
                    }}
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_1'
                  >
                    Create your listing to access your report
                  </button>
                </Link>
              ) : (
                <>
                  <Link to='/auth/login'>
                    <button
                      type='button'
                      className='button-z '
                      style={{
                        margin: '0px 9px',
                        fontSize: 'x-large',
                      }}
                    >
                      Create your listing to access your report
                    </button>
                  </Link>
                  <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
                    <div className='modal-dialog'>
                      <div className='modal-content'>
                        <div className='modal-header text-center flex-column'>
                          <h1 className='modal-title mb-5'>Let's Get Started</h1>
                          <p className='col-md-7'>
                            You are on your way to listing your business for sale. Let's get some
                            info about you first.
                          </p>
                          {/*begin::Close*/}
                          <div
                            className='btn btn-icon btn-sm btn-active-light-primary'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                          >
                            <span className='svg-icon svg-icon-2x' />
                          </div>
                          {/*end::Close*/}
                        </div>
                        <div className='modal-body'>
                          {/* ///////////////////// */}
                          <div
                            className='input-group input-group-solid '
                            style={{
                              marginBottom: '9px',
                            }}
                          >
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Username'
                              aria-label='Username'
                              aria-describedby='basic-addon1'
                            />
                          </div>
                          <div
                            className='input-group input-group-solid'
                            style={{
                              marginBottom: '9px',
                            }}
                          >
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Email'
                              aria-label='Username'
                              aria-describedby='basic-addon1'
                            />
                          </div>
                          <div
                            className='input-group input-group-solid '
                            style={{
                              marginBottom: '9px',
                            }}
                          >
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Password'
                              aria-label='Username'
                              aria-describedby='basic-addon1'
                            />
                          </div>
                          <div
                            className='input-group input-group-solid '
                            style={{
                              marginBottom: '9px',
                            }}
                          >
                            <input
                              type='text'
                              className='form-control '
                              placeholder='PhoneNumber'
                              aria-label='Username'
                              aria-describedby='basic-addon1'
                            />
                          </div>
                          <Link to='/dashboard/add-to-new-listing' data-bs-dismiss='modal'>
                            <button
                              type='button'
                              className='button-z'
                              style={{
                                margin: '9px',
                                fontSize: 'x-large',
                              }}
                              data-bs-dismiss='modal'
                            >
                              Start Your Listing
                            </button>
                          </Link>

                          <div
                            className='modal fade'
                            style={{
                              backgroundColor: 'white',
                            }}
                            tabindex='-1'
                            id='kt_modal_2'
                          >
                            <div className='modal-dialog modal-fullscreen'>
                              <div className='modal-content shadow-none'>
                                <div className='modal-header'>
                                  <h5 className='modal-title'>Modal title</h5>

                                  <div
                                    className='btn btn-icon btn-sm btn-active-light-primary '
                                    style={{
                                      marginLeft: '4px',
                                    }}
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  >
                                    <span className='svg-icon svg-icon-2x'></span>
                                  </div>
                                </div>
                                <div className='modal-body'>
                                  <StepperMain />
                                </div>

                                <div className='modal-footer'>
                                  <button
                                    type='button'
                                    className='btn btn-light button-z'
                                    data-bs-dismiss='modal'
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* ////////////////////// */}
                        </div>
                        <h3>
                          {/* <a href='' className='   text-decoration-underline'>
                          Already have an account?
                        </a> */}

                          <a
                            href=''
                            className='text-decoration-underline'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_9'
                          >
                            Already have an account?
                          </a>

                          <div className='modal fade bg-light' tabindex='-1' id='kt_modal_9'>
                            <div className='modal-dialog'>
                              <div className='modal-content'>
                                <div className='modal-header'>
                                  <h1 className='text-center'> Member Sign In</h1>
                                </div>

                                <div className='modal-body'>
                                  <div
                                    className='input-group input-group-solid '
                                    style={{
                                      marginBottom: '9px',
                                    }}
                                  >
                                    <input
                                      type='text'
                                      className='form-control '
                                      placeholder='FirstName'
                                      aria-label='Username'
                                      aria-describedby='basic-addon1'
                                    />
                                  </div>
                                  <div
                                    className='input-group input-group-solid '
                                    style={{
                                      marginBottom: '9px',
                                    }}
                                  >
                                    <input
                                      type='text'
                                      className='form-control '
                                      placeholder='Email'
                                      aria-label='Username'
                                      aria-describedby='basic-addon1'
                                    />
                                  </div>
                                </div>

                                <div className='modal-footer'>
                                  <button
                                    type='button'
                                    className=' btn btn-light'
                                    data-bs-dismiss='modal'
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* ////////////////////// */}
                        </h3>
                        <div className='modal-footer'>
                          <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ////////////////////// */}
            {/* <p
              className='  m-5'
              style={{
                fontSize: 'x-large',
              }}
            >
              Normally a $59.95 value!
            </p> */}
          </div>
        </div>
        {/* <div className='' style={{backgroundColor: '#f4f4f4'}}>
          <div className='container d-md-flex  flex-sm-col justify-content-evenly'>
            <div
              className='col-md-6 col-sm-12 '
              style={{
                marginTop: '22px',
                padding: '9px',
              }}
            >
              <h1 className=' m-5' style={{fontSize: '40px', fontWait: '400', lineHeight: '46px '}}>
                Still need some info?
              </h1>
              <p
                style={{
                  fontSize: 'x-large',
                }}
                className=' m-5 '
              >
                <a href='' className='BizBiySellUnderLine'>
                  Visit our FAQ
                </a>
                section to get advice on listing your business.
                <br className='m-5' /> Or
                <a href='' className='BizBiySellUnderLine'>
                  download our free Guide to Selling your Small Business
                </a>
                for expert tips such as setting an asking price and transitioning your business.
              </p>
            </div>
            <div className='col-md-4 col-sm-12 position-relative '>
              <img
                style={{
                  width: '100%',
                  marginTop: '22px',
                }}
                src='https://www.bizbuysell.com/xcommon/images/marketing/sell/SellPageGuide.png'
                alt=''
              />

              <Link to='/download' className='bizOwnerSelldownload' onClick={() => <DownLoad />}>
                Download Selling Guide
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default SellABusinessOnBizBuySell
