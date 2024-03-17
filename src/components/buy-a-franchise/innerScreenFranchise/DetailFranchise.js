import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {AiFillHeart, AiFillTwitterCircle, AiFillWarning, AiOutlineHeart} from 'react-icons/ai'
import ReactApexChart from 'react-apexcharts'
import {GrFacebookOption} from 'react-icons/gr'
import {Link} from 'react-router-dom'
import {Modal} from 'react-bootstrap'
import {BsFacebook, BsHeart, BsLinkedin} from 'react-icons/bs'
import {FaCircle} from 'react-icons/fa'
import Swal from 'sweetalert2'
import {
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
import {useDispatch} from 'react-redux'
import {postReport, getReportReason, addFavorite} from '../../services/common-services/index'
import {loginUser} from '../../services/auth-services/AuthServices'
import UnlockSubscription from '../../unlock-subscription/UnlockSubscription'
import twitter from '../../../assets/icons/social-share-icons/White-twitter.svg'
import facebookIcon from '../../../assets/icons/social-share-icons/White-fb.svg'
import emailIcon from '../../../assets/icons/social-share-icons/White-email.svg'
import linkedinIcon from '../../../assets/icons/social-share-icons/White-link-din.svg'

import dummyImg from '../../../assets/dummy.jpg'
import PrinterActive from '../../../assets/icons/PrinterActive.svg'
import Printer from '../../../assets/icons/printer.svg'
import detailImg from '../../../assets/icons/detail.jpg'

import sellerFinancing from '../../../assets/icons/sellerFinancing.svg'
import valuation from '../../../assets/icons/valuationIcon.svg'
import valuationActive from '../../../assets/icons/valuation-white-icon.svg'
import back from '../../../assets/icons/backIcon.svg'
import businessLocation from '../../../assets/icons/business-location-icon.svg'
import location from '../../../assets/icons/location.svg'
import dollar from '../../../assets/icons/dollarIcon.svg'
import {FcPrint} from 'react-icons/fc'
import {RiShareFill} from 'react-icons/ri'
import './DetailFranchise.css'
import {modalText} from '../../alert-text'

const DetailFranchise = (props) => {
  const navigate = useNavigate()
  let dispatch = useDispatch()
  let {pathname} = useLocation()

  const [isShowPackageModal, setIsShowPackageModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('Please select a plan to access more features')
  const [btnActive, setBtnActive] = useState('')
  const [saveBtnToggler, setSaveBtnToggler] = useState(false)

  const [carouselImages, setCarouselImages] = useState(props?.data[0]?.slider_images)
  const [isModalShow, setShow] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [forgetPass, setForgetPass] = useState('')

  const [fullName, setFullName] = useState('')
  const [reason, setReason] = useState('')
  const [information, setInformation] = useState('')
  const [reasonData, setReasonData] = useState([])

  const [reportEmail, setReportEmail] = useState('')

  const [companyOwned, setCompanyOwned] = useState('')
  const [frenchiseUnits, setFrenchiseUnits] = useState('')
  const [companyRevenue, setCompanyRevenue] = useState('')
  const [totalCompanyUnits, setTotalCompanyUnits] = useState('')
  const [companyYear, setCompanyYear] = useState('')
  // validation
  const [loginEmailValidation, setLoginEmailValidation] = useState(false)
  const [loginPasswordValidation, setLoginPasswordValidation] = useState(false)
  const [fullNameValiDation, setFullNameValidation] = useState(false)
  const [reportEmailValidation, setReportEmailValidation] = useState(false)
  const [reasoneValidation, setReasoneValidation] = useState(false)
  const [informationValidation, setInformationValidation] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [saveToggle, setSaveToggle] = useState(true)
  const [isFranchiseUnits, setIsFranchiseUnits] = useState(true)
  const [isCompanyOwnedUnits, setIsCompanyOwnedUnits] = useState(false)
  const tokenData = localStorage.getItem('userData')
  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData

  const btnsStateChange = async (e) => {
    switch (e.target.name) {
      case 'print':
        setBtnActive('print')

        break
      case 'share':
        setBtnActive('share')

        break
      case 'valuation':
        setBtnActive('valuation')

        break
      default:
        break
    }
  }
  useEffect(() => {
    if (props?.data[0]?.favorite != 'Unfavorite') {
      setSaveBtnToggler(true)
      setBtnActive('save')
    }
    getReasonForReport()
    if (transtokenData) {
      setReportEmail('null.com')
      setFullName('null')
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)

    setCarouselImages(props?.data[0]?.slider_images)

    let companyOwned = []
    let frenchiseUnits = []
    let revenue = []
    let totalUnits = []
    let year = []
    props?.data[0]?.franchise_overview.map((item, index) => {
      companyOwned.push(item.company_owned)
      frenchiseUnits.push(item.frenchise_units)
      revenue.push(item.revenue)
      totalUnits.push(item.total_units)
      year.push(item.year)
    })
    setCompanyOwned(companyOwned)
    setFrenchiseUnits(frenchiseUnits)
    setCompanyRevenue(revenue)
    setTotalCompanyUnits(totalUnits)
    setCompanyYear(year)

    // {
    //   document
    //     .querySelector('meta[property="og:title"]')
    //     .setAttribute('content', props.data[0]?.title ?? '')
    // }
    // {
    //   document
    //     .querySelector('meta[property="og:description"]')
    //     .setAttribute('content', props?.data[0]?.description?.replace(/(<([^>]+)>)/gi, ''))
    // }

    // {
    //   document
    //     .querySelector('meta[property="og:image"]')
    //     .setAttribute(
    //       'content',
    //       props?.data[0]?.slider_images[0]?.full_path + props?.data[0]?.slider_images[0]?.file_name
    //     )
    // }
  }, [props])
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const getReasonForReport = async () => {
    const response = await getReportReason()

    setReasonData(response.report_reason_franchise)
  }
  const inputChange = async (e) => {
    switch (e.target.name) {
      case 'login-email':
        await setLoginEmail(e.target.value)
        setLoginEmailValidation(false)
        break
      case 'report-email':
        await setReportEmail(e.target.value)
        setReportEmailValidation(false)
        break
      case 'full-name':
        await setFullName(e.target.value)
        setFullNameValidation(false)
        break
      case 'login-password-modal':
        await setLoginPassword(e.target.value)
        setLoginPasswordValidation(false)
        break
      case 'information':
        await setInformation(e.target.value)
        setInformationValidation(false)
        break
    }
  }
  const reportReasonHandler = (e) => {
    setReason(e.target.value)
    setReasoneValidation(false)
  }

  const loginHandler = async (e, id, favorite) => {
    let btnId = true

    if (loginEmail == '' || loginEmail == undefined || !isValidEmail(loginEmail)) {
      setLoginEmailValidation(true)
    }
    if (loginPassword == '' || loginPassword == undefined) {
      setLoginPasswordValidation(true)
    }
    if (
      loginEmail != '' &&
      loginEmail != undefined &&
      isValidEmail(loginEmail) &&
      loginPassword != '' &&
      loginPassword != undefined
    ) {
      e.target.classList.add('biz-owner-btn-loader')
      e.target.classList.remove('btn-primary')
      e.target.textContent = ''
      try {
        const result = await loginUser(loginEmail, loginPassword)

        if (result.status === true) {
          setShow(false)
          dispatch({
            type: 'SUBMITTED',
            payload: {
              btnId,
            },
          })
          window.location.reload()
          localStorage.setItem(
            'userData',
            JSON.stringify({
              accessToken: result.token,
              userName: result.user.first_name,
              role: result.role[0].name,
              userID: result.user.id,
            })
          )

          const response = await addFavorite(
            result.token,
            'franchise',
            props?.data[0]?.id,
            'favorite'
          )

          if (response.status == true) {
            setSaveBtnToggler(true)
            setBtnActive('save')
          }
          // document.location.reload()
          // navigate('/dashboard')
        } else {
          e.target.classList.remove('biz-owner-btn-loader')
          e.target.classList.add('btn-primary')
          e.target.textContent = 'Try again'

          setLoginStatus(true)
        }
      } catch (error) {
        console.error(error)
        e.target.classList.remove('biz-owner-btn-loader')
        e.target.classList.add('btn-primary')
        e.target.textContent = 'Try again'
        setLoginStatus(true)
      }
    }
  }
  const modalClose = () => {
    setLoginStatus(false)

    setShow(false)
  }
  const logOutSaveListing = async (e, id) => {
    e.preventDefault()
    setShow(true)
  }

  function UnsafeComponent({html}) {
    return <span dangerouslySetInnerHTML={{__html: html}} />
  }

  const submitReport = async () => {
    if (reason == '' || reason == undefined) {
      setReasoneValidation(true)
    }
    if (information == '' || information == undefined) {
      setInformationValidation(true)
    }
    if (fullName == '' || fullName == undefined) {
      setFullNameValidation(true)
    }
    if (reportEmail == '' || reportEmail == undefined || !isValidEmail(reportEmail)) {
      setReportEmailValidation(true)
    }
    // created_by, user_id, status
    if (
      transtokenData != null &&
      transtokenData != undefined &&
      transtokenData != '' &&
      reason != '' &&
      reason != undefined &&
      information != '' &&
      information != undefined
    ) {
      let userID = transtokenData.userID

      const response = await postReport(
        reason,
        props?.data[0]?.id,
        information,
        '',
        '',
        'login',
        userID,
        'Active'
      )

      if (response.status == true) {
        Swal.fire({
          text: 'Your report has been received. Our team will review the list as soon as possible and take any necessary action.',
          icon: 'success',
          confirmButtonColor: '#009ef7',
          confirmButtonText: 'Ok',
        })
        setReason('')
        setInformation('')
        setFullName('')
        setReportEmail('')
      }
    } else if (
      reason != '' &&
      reason != undefined &&
      information != '' &&
      information != undefined &&
      fullName != '' &&
      fullName != undefined &&
      reportEmail != '' &&
      reportEmail != undefined &&
      isValidEmail(reportEmail)
    ) {
      const response = await postReport(
        reason,
        props?.data[0]?.id,
        information,
        fullName,
        reportEmail,
        'anonymous',
        '',
        'Active'
      )
      if (response.status == true) {
        Swal.fire({
          text: 'Your report has been received. Our team will review the list as soon as possible and take any necessary action.',
          icon: 'success',
          confirmButtonColor: '#009ef7',
          confirmButtonText: 'Ok',
        })
        setReason('')
        setInformation('')
        setFullName('')
        setReportEmail('')
      }
    }
  }
  const FranchiseUnitsState = {
    series: [
      {
        name: 'Franchise Units',
        data: frenchiseUnits,
      },
    ],
    options: {
      colors: ['#2962ff'],
      chart: {
        type: 'bar',
        stacked: true,
        toolbar: {
          show: true,
        },
        toolbar: {
          show: false,
        },
        // foreColor: 'red'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '15%',
          // colors: {
          //   backgroundBarColors: ['#f5f5f5'],
          // },
          barHeight: '80%',
        },
      },
      xaxis: {
        type: 'category',
        categories: companyYear,
      },
      yaxis: {
        show: true,
        showAlways: true,
        // tickAmount: 8,
        tooltip: {
          enabled: true,
          offsetX: 0,
        },
      },
    },
  }
  const CompanyOwnedUnitsState = {
    series: [
      {
        name: 'Company Owned Units',
        data: companyOwned,
      },
    ],
    options: {
      colors: ['#181C32'],
      chart: {
        type: 'bar',
        stacked: true,
        toolbar: {
          show: true,
        },
        toolbar: {
          show: false,
        },
        // foreColor: 'red'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '15%',
          // colors: {
          //   backgroundBarColors: ['#f5f5f5'],
          // },
          barHeight: '80%',
        },
      },
      xaxis: {
        type: 'category',
        categories: companyYear,
      },
      yaxis: {
        show: true,
        showAlways: true,
        // tickAmount: 8,
        tooltip: {
          enabled: true,
          offsetX: 0,
        },
      },
    },
  }
  const saveListing = async (e, id, savedType) => {
    let type

    if (e.target.name == 'unSaved' || savedType == 'cancel') {
      const status = await Swal.fire({
        text: 'Are you sure you want to un-save this listing',
        icon: 'warning',
        confirmButtonColor: '#009ef7',
        confirmButtonText: 'Ok',
        showCancelButton: true,
        reverseButtons: true,
      })
      if (status.isConfirmed) {
        setBtnActive('unSaved')
        type = 'unfavorite'
        setSaveBtnToggler(false)
        const response = await addFavorite(accessToken, 'franchise', props?.data[0]?.id, type)
      }
    } else if (savedType == 'save') {
      setIsShowPackageModal(true)
      setSaveBtnToggler(true)
      setBtnActive('save')
      type = 'favorite'
      const response = await addFavorite(accessToken, 'franchise', props?.data[0]?.id, type)
    }
  }

  const updateModalTitle = (newTitle) => {
    if (newTitle == 'close') {
      setIsShowPackageModal(false)
    } else {
      setModalTitle(newTitle)
    }
  }
  function agentAlertHandler() {
    Swal.fire({
      text: modalText,

      icon: 'warning',
      // timer: 2000,
      confirmButtonColor: '#009ef7',

      confirmButtonText: 'Ok',
    })
  }
  return (
    <>
      <>
        {role !== 'admin' && (
          <button
            className='biz-owner-business-detail-back-button mt-4 mb-2 px-0'
            onClick={() => navigate(-1)}
          >
            <span className='text-primary '>
              <img src={back} alt='' />
            </span>
          </button>
        )}

        <div className='row '>
          <div className=' px-0 mt-3 biz-owner-detail-carousel-container position-relative'>
            <div className='mx-5 mx-md-12 biz-owner-business-detail-container my-5'>
              <h4 className='biz-owner-business-detail-heading mb-0 text-wrap'>
                {props.data[0]?.title ?? 'NaN'}
              </h4>
              <h5 className='bizOwner-inner-bottom-heading mb-0'>
                {props.data[0]?.location_visibitiy?.slug != 'show-no-location' ? (
                  <span>
                    {props?.data[0]?.location?.lat ? (
                      <>
                        {props?.data[0]?.location_visibitiy?.slug === 'show-full-visibility' ? (
                          <>
                            <img className='mb-2 mt-2 me-1 ' src={location} alt='' width={14} />
                            {props?.data[0]?.location?.formatted_address?.substring(0, 30)}
                          </>
                        ) : props?.data[0]?.location_visibitiy?.slug ===
                          'show-city-country-state' ? (
                          <>
                            <img className='mb-2 mt-2 me-1' src={location} alt='' width={14} />
                            {props?.data[0]?.location?.city?.substring(0, 30) +
                              ' ' +
                              props?.data[0]?.location?.province?.substring(0, 30) +
                              ' ' +
                              props?.data[0]?.location?.country?.substring(0, 30)}
                          </>
                        ) : props?.data[0].location_visibitiy?.slug === 'show-country-state' ? (
                          <>
                            <img className='mb-2 mt-2 me-1 ' src={location} alt='' width={14} />
                            {props.data[0]?.location?.province?.substring(0, 30) +
                              ' ' +
                              props.data[0]?.location?.country?.substring(0, 30)}
                          </>
                        ) : props.data[0].location_visibitiy?.slug === 'show-state-only' ? (
                          <>
                            <img className='mb-2 mt-2 me-1' src={location} alt='' width={14} />
                            {props.data[0]?.location?.province?.substring(0, 30)}
                          </>
                        ) : props.data[0].location_visibitiy?.slug === 'show-no-location' ? (
                          ''
                        ) : null}
                      </>
                    ) : (
                      <>
                        <span className=''>
                          <img className='mb-2 mt-2 me-1 ' src={location} alt='' width={14} />
                          {props.data[0]?.location?.country?.substring(0, 30) ?? 'NaN'}
                        </span>
                      </>
                    )}
                  </span>
                ) : null}
              </h5>
            </div>
            {/* carousel         */}
            <div
              id='carouselExampleCaptions'
              className='carousel slide position-relative'
              data-bs-ride='carousel'
            >
              {props?.data[0].finance == 1 && (
                <div className='badge-container'>
                  <img src={sellerFinancing} width='130px' alt='' />
                  {/* <span class='badge badge-success py-2'> Seller Financing Available</span> */}
                </div>
              )}
              <div className='carousel-indicators d-none d-md-inline '>
                <ol className='carousel-indicators biz-owner-carousel-indicators'>
                  {carouselImages?.length > 0 && carouselImages?.length < 30 ? (
                    carouselImages?.map((item, ind) => (
                      <li
                        key={ind}
                        data-bs-target='#carouselExampleCaptions'
                        data-bs-slide-to={ind}
                        className={`${ind == 0 ? 'active' : ''} biz-owner-carousel-indicators-btn`}
                        aria-current={`${ind == 0 ? 'true' : 'false'}`}
                        // aria-label='Slide 1'
                      ></li>
                    ))
                  ) : (
                    <>
                      <li
                        data-bs-target='#carouselExampleCaptions'
                        data-bs-slide-to={0}
                        className='active biz-owner-carousel-indicators-btn'
                        aria-current='true'
                        // aria-label='Slide 1'
                      ></li>
                    </>
                  )}
                </ol>
              </div>
              <div className='carousel-inner inner-screen-carousel'>
                {carouselImages.length > 0 ? (
                  carouselImages?.map((item, ind) => (
                    <div className={`carousel-item h-100 ${ind == 0 ? 'active' : ''} `} key={ind}>
                      <img
                        src={item?.full_path + '/large/' + item?.file_name}
                        className='d-block img-fluid mx-auto inner-screen-carousel-img'
                        alt='...'
                      />
                    </div>
                  ))
                ) : (
                  <>
                    <div className='carousel-item active'>
                      <img
                        src={dummyImg}
                        className='d-block w-100 biz-owner-detail-carousel-img'
                        alt='...'
                      />
                    </div>
                  </>
                )}
              </div>
              {carouselImages.length > 1 ? (
                <>
                  <button
                    className='carousel-control-prev biz-owner-carousel-btn-images my-auto'
                    type='button'
                    data-bs-target='#carouselExampleCaptions'
                    data-bs-slide='prev'
                  >
                    <span
                      className='carousel-control-prev-icon detail-page-carousel-btn biz-owner-detail-carousel-left-btn'
                      aria-hidden='true'
                    />
                    <span className='visually-hidden'>Previous</span>
                  </button>
                  <button
                    className='carousel-control-next biz-owner-carousel-btn-images my-auto'
                    type='button'
                    data-bs-target='#carouselExampleCaptions'
                    data-bs-slide='next'
                  >
                    <span
                      className='carousel-control-next-icon detail-page-carousel-btn'
                      aria-hidden='true'
                    />
                    <span className='visually-hidden'>Next</span>
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className='row mt-3 biz-owner-detail-container py-7 px-3 px-md-10 '>
          <div className='col-md-6  d-flex justify-content-between biz-owner-cash-flow-section'>
            <h3 className='my-auto'>Price</h3>

            <h3 className='biz-owner-detail-price my-auto pe-md-8'>
              <span className='mx-md-2 '>
                <img src={dollar} alt='' width={19} className='mb-1' />
              </span>
              {props.data[0]?.cash_required ?? 'NaN'}
            </h3>
          </div>
          <div className='col-md-6 d-flex justify-content-between mt-5 mt-md-0 ps-md-5'>
            <h3 className='my-auto'>Investment</h3>
            <h3 className='biz-owner-detail-price my-auto pe-md-8'>
              <span className='mx-md-2 '>
                <img src={dollar} alt='' width={19} className='mb-1' />
              </span>
              {props.data[0]?.total_investment ?? 'Nan'}
            </h3>
          </div>
        </div>
        <div className='row mt-3 biz-owner-detail-container py-2 px-5 px-md-13'>
          <div className=' col-md-6 ps-0 d-flex justify-content-between '>
            <p className='biz-owner-detail-table-price-title'>Franchise units:</p>
            <p className='biz-owner-detail-table-price me-md-7'>
              ${props.data[0]?.total_frenchise_units ?? 'NaN'}
            </p>
          </div>
          <div className=' col-md-6 ps-md-5 d-flex justify-content-between '>
            <p className='biz-owner-detail-table-price-title'>Royalty fee:</p>
            <p className='biz-owner-detail-table-price me-md-6'>
              ${props.data[0]?.royalty_fee ?? 'NaN'}
            </p>
          </div>
          <div className=' col-md-6 ps-0 d-flex justify-content-between '>
            <p className='biz-owner-detail-table-price-title'>Fund fee:</p>
            <p className='biz-owner-detail-table-price me-md-7'>
              ${props.data[0]?.ad_fund_fee ?? 'NaN'}
            </p>
          </div>
          <div className=' col-md-6 ps-md-5 d-flex justify-content-between '>
            <p className='biz-owner-detail-table-price-title'>Net worth:</p>
            <p className='biz-owner-detail-table-price me-md-6'>
              ${props.data[0]?.net_worth_required ?? 'NaN'}
            </p>
          </div>
          <div className=' col-md-6 ps-0 d-flex justify-content-between '>
            <p className='biz-owner-detail-table-price-title'>Min franchise fee:</p>
            <p className='biz-owner-detail-table-price me-md-7'>
              ${props.data[0]?.min_frenchise_fee ?? 'NaN'}
            </p>
          </div>
          <div className=' col-md-6 ps-md-5 d-flex justify-content-between '>
            <p className='biz-owner-detail-table-price-title'>Franchise since:</p>
            <p className='biz-owner-detail-table-price me-md-6'>
              {props.data[0]?.frenchise_since ?? 'NaN'}
            </p>
          </div>

          {role !== 'admin' && !pathname?.startsWith('/my-franchise') && (
            <>
              <hr />
              <div className='row px-0 py-0 biz-owner-btn-container my-4 mx-auto'>
                <div
                  className={`col-6 px-0  ${
                    btnActive == 'unSaved' ? ' border-end border-primary border-2' : 'border-0'
                  } ${btnActive == 'save' ? 'border-0' : ''} 
              ${btnActive == '' ? 'border-end border-primary border-2' : ''}
              ${btnActive == 'valuation' ? 'border-end border-primary border-2' : ''}${
                    btnActive == 'share' ? 'border-end border-primary border-2' : ' border-0'
                  }`}
                >
                  {transtokenData ? (
                    <>
                      {saveBtnToggler ? (
                        <button
                          name='unSaved'
                          className={` btn bizOwner-btn-inner w-100 h-100 py-0 ${
                            btnActive == 'save' ? 'biz-owner-active-btn px-0' : 'px-0'
                          } 
                      
                         `}
                          onClick={(e) =>
                            role == 'agent'
                              ? agentAlertHandler()
                              : saveListing(e, props?.data[0]?.id, 'cancel')
                          }
                        >
                          <span
                            className=' px-2 pb-2 d-none d-md-inline'
                            name='save'
                            onClick={(e) =>
                              role == 'agent'
                                ? agentAlertHandler()
                                : saveListing(e, props?.data[0]?.id, 'cancel')
                            }
                            style={{position: 'relative', bottom: '1px'}}
                          >
                            <AiFillHeart
                              size={19}
                              color={`red`}
                              onClick={(e) =>
                                role == 'agent'
                                  ? agentAlertHandler()
                                  : saveListing(e, props?.data[0]?.id, 'cancel')
                              }
                            />
                          </span>
                          Saved
                        </button>
                      ) : (
                        <button
                          name='save'
                          className={` btn w-100 h-100 py-0 bizOwner-btn-inner biz-owner-detail-page-save-btn ${
                            btnActive == 'save' ? 'biz-owner-active-btn' : ''
                          }  `}
                          onClick={(e) =>
                            role == 'agent'
                              ? agentAlertHandler()
                              : saveListing(e, props?.data[0]?.id, 'save')
                          }
                        >
                          <span
                            className=' px-2 pb-1 d-none d-md-inline'
                            name='save'
                            onClick={(e) =>
                              role == 'agent'
                                ? agentAlertHandler()
                                : saveListing(e, props?.data[0]?.id, 'save')
                            }
                            style={{position: 'relative', bottom: '1px'}}
                          >
                            <AiOutlineHeart
                              size={19}
                              color={`${btnActive == 'save' ? '#FFFFFF' : '#00A3EF'}`}
                              onClick={(e) =>
                                role == 'agent'
                                  ? agentAlertHandler()
                                  : saveListing(e, props?.data[0]?.id, 'save')
                              }
                            />
                          </span>
                          Save
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        id='notSave'
                        className={` btn w-100 bizOwner-btn-inner h-100 py-0 biz-owner-detail-page-save-btn  ${
                          btnActive == 'save' ? 'biz-owner-active-btn' : ''
                        }  ${btnActive == 'print' ? 'border-0' : ''} `}
                        onClick={(e) => logOutSaveListing(e)}
                      >
                        <span className=' px-4 pb-1 d-none d-md-inline '>
                          <BsHeart
                            // color={`${btnActive == 'save' ? '#FFFFFF' : '#00A3EF'}`}
                            onClick={(e) => logOutSaveListing(e)}
                            style={{position: 'relative', bottom: '1px'}}
                            color={`${btnActive == 'save' ? '#FFFFFF' : '#00A3EF'}`}
                          />
                        </span>
                        Save
                      </button>
                    </>
                  )}
                </div>

                <div
                  className='col-6 px-0'
                  onClick={(e) => (role == 'agent' ? agentAlertHandler() : setBtnActive('print'))}
                >
                  <button
                    type='button'
                    className={`btn bizOwner-btn-inner w-100 h-100 py-2 biz-owner-detail-page-btn ${
                      btnActive == 'print' ? 'biz-owner-active-btn' : ''
                    } ${btnActive == 'share' ? 'border-0' : 'border-end border-primary border-0'}`}
                    data-kt-docs-advanced-forms='interactive'
                    name='print'
                    onClick={(e) => (role == 'agent' ? agentAlertHandler() : btnsStateChange(e))}
                  >
                    <span
                      className=' px-2 pb-1 d-none d-md-inline'
                      name='print'
                      onClick={(e) =>
                        role == 'agent' ? agentAlertHandler() : setBtnActive('print')
                      }
                    >
                      {/* <FcPrint /> */}
                      {btnActive == 'print' ? (
                        <img
                          src={PrinterActive}
                          width={12}
                          alt=''
                          onClick={(e) =>
                            role == 'agent' ? agentAlertHandler() : setBtnActive('print')
                          }
                        />
                      ) : (
                        <img
                          src={Printer}
                          width={12}
                          alt=''
                          onClick={(e) =>
                            role == 'agent' ? agentAlertHandler() : setBtnActive('print')
                          }
                        />
                      )}
                    </span>
                    Print
                  </button>
                </div>
                {/* <div className='col-4 px-0'>
                  <button
                    type='button'
                    data-bs-toggle='modal'
                    data-bs-target='#staticBackdrop'
                    className={`btn bizOwner-btn-inner w-100 h-100 biz-owner-detail-page-btn py-0 ${
                      btnActive == 'share' ? 'biz-owner-active-btn' : ''
                    } `}
                    data-kt-docs-advanced-forms='interactive'
                    name='share'
                    onClick={(e) => btnsStateChange(e)}
                  >
                    <span
                      className=' px-2 d-none d-md-inline '
                      onClick={(e) => setBtnActive('share')}
                      style={{position: 'relative', bottom: '1px'}}
                    >
                      <RiShareFill color={`${btnActive == 'share' ? '#FFFFFF' : '#00A3EF'}`} />
                    </span>
                    Share
                  </button>
                </div> */}
                {/* <div className='col-3 px-0'>
              <Link to='#'>
                <button
                  type='button'
                  className={`btn bizOwner-btn-inner w-100 h-100 biz-owner-detail-page-btn biz-owner-detail-page-valuation-btn py-0 ${
                    btnActive == 'valuation' ? 'biz-owner-active-btn' : ''
                  } `}
                  data-kt-docs-advanced-forms='interactive'
                  name='valuation'
                  onClick={(e) => btnsStateChange(e)}
                  data-bs-toggle='modal'
                  data-bs-target='#calculator'
                >
                  <span>
                    {btnActive == 'valuation' ? (
                      <img
                        src={valuationActive}
                        alt=''
                        className=' px-2 pb-1 d-none d-md-inline'
                        name='valuation'
                        onClick={(e) => btnsStateChange(e)}
                      />
                    ) : (
                      <img
                        src={valuation}
                        alt=''
                        className=' px-2 pb-1 d-none d-md-inline'
                        name='valuation'
                        onClick={(e) => btnsStateChange(e)}
                      />
                    )}
                  </span>
                  Valuation <span className='d-none  d-md-inline'>Report</span>
                </button>
              </Link>
            </div> */}
              </div>
            </>
          )}
        </div>
        {props?.data[0]?.short_description != null &&
        props?.data[0]?.short_description != undefined &&
        props?.data[0]?.short_description != 'undefined' &&
        props?.data[0]?.short_description != 'null' &&
        props?.data[0]?.short_description != '' ? (
          <div className='row mt-10 biz-owner-business-description'>
            <div className='card px-5 px-md-15'>
              <div className='card-header border-2 px-0 d-block pt-10 my-2 '>
                <h3 className='' style={{fontWeight: '900'}}>
                  Franchise Description
                </h3>
                {/* <h6 className='pb-3 '>Own your own hometown restaurant!</h6> */}
              </div>
              <p className='py-5 px-0 biz-owner-paragraph'>
                <UnsafeComponent html={props.data[0].short_description ?? 'NaN'} />
              </p>
            </div>
          </div>
        ) : null}
        {props?.data[0]?.franchise_meta != null &&
        props?.data[0]?.franchise_meta != undefined &&
        props?.data[0]?.franchise_meta != 'undefined' &&
        props?.data[0]?.franchise_meta != 'null' &&
        props?.data[0]?.franchise_meta != '' ? (
          <div className='row mt-10 biz-owner-business-description'>
            <div className='card px-5 px-md-15'>
              <div className='card-header border-2 px-0 d-block pt-8 my-2 '>
                <h3 className=' pb-5 ' style={{fontWeight: '900'}}>
                  Detailed Information
                </h3>
              </div>

              <div className='py-3 px-0'>
                <div className='row'>
                  {props?.data[0]?.location?.country != null &&
                  props?.data[0]?.location?.country != undefined &&
                  props?.data[0]?.location?.country != 'undefined' &&
                  props?.data[0]?.location?.country != 'null' &&
                  props?.data[0]?.location?.country != '' ? (
                    <>
                      <div className='col-md-4  my-3 biz-owner-detail-para-heading '>Location:</div>
                      <div className='col-md-8  my-3 biz-owner-paragraph'>
                        {props.data[0]?.location?.country ?? ''}
                      </div>
                    </>
                  ) : null}

                  {props?.data[0]?.franchise_meta?.history != null &&
                  props?.data[0]?.franchise_meta?.history != undefined &&
                  props?.data[0]?.franchise_meta?.history != 'undefined' &&
                  props?.data[0]?.franchise_meta?.history != 'null' &&
                  props?.data[0]?.franchise_meta?.history != '' ? (
                    <>
                      <div className='col-md-4  my-3 biz-owner-detail-para-heading '>History: </div>
                      <div className='col-md-8 my-3 biz-owner-paragraph'>
                        {props?.data[0]?.franchise_meta?.history ?? ''}
                      </div>
                    </>
                  ) : null}
                  {props?.data[0]?.franchise_meta?.ideal_candidate != null &&
                  props?.data[0]?.franchise_meta?.ideal_candidate != undefined &&
                  props?.data[0]?.franchise_meta?.ideal_candidate != 'undefined' &&
                  props?.data[0]?.franchise_meta?.ideal_candidate != 'null' &&
                  props?.data[0]?.franchise_meta?.ideal_candidate != '' ? (
                    <>
                      <div className='col-md-4 my-3 biz-owner-detail-para-heading '>
                        Ideal Candidate:
                      </div>
                      <div className='col-md-8 my-3 biz-owner-paragraph'>
                        {props?.data[0]?.franchise_meta?.ideal_candidate ?? ''}
                      </div>
                    </>
                  ) : null}
                  {props?.data[0]?.franchise_meta?.training_support != null &&
                  props?.data[0]?.franchise_meta?.training_support != undefined &&
                  props?.data[0]?.franchise_meta?.training_support != 'undefined' &&
                  props?.data[0]?.franchise_meta?.training_support != 'null' &&
                  props?.data[0]?.franchise_meta?.training_support != '' ? (
                    <>
                      <div className='col-md-4 my-3 biz-owner-detail-para-heading '>
                        Training Support:
                      </div>
                      <div className='col-md-8 my-3 biz-owner-paragraph'>
                        {props?.data[0]?.franchise_meta?.training_support ?? ''}
                      </div>
                    </>
                  ) : null}

                  {props?.data[0]?.franchise_meta?.why_choose != null &&
                  props?.data[0]?.franchise_meta?.why_choose != undefined &&
                  props?.data[0]?.franchise_meta?.why_choose != 'undefined' &&
                  props?.data[0]?.franchise_meta?.why_choose != 'null' &&
                  props?.data[0]?.franchise_meta?.why_choose != '' ? (
                    <>
                      <div className='col-md-4 my-3 biz-owner-detail-para-heading '>
                        Why Choose:
                      </div>
                      <div className='col-md-8 my-3 biz-owner-paragraph'>
                        {props?.data[0]?.franchise_meta?.why_choose ?? ''}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className='row mt-10 biz-owner-business-description py-5'>
          <div className='card px-5 px-md-15'>
            <div className=' px-0 d-block pt-4 my-2 '>
              <h3 className=' ' style={{fontWeight: '900'}}>
                <span className='pe-1'>
                  <img className='mb-1' src={businessLocation} alt='' width={12} />
                </span>
                Franchise Location
              </h3>
            </div>
            {props?.data[0]?.location?.lat ? (
              <div className='py-5 px-0 mx-auto w-100'>
                <iframe
                  title='iframe'
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDcLGFU2zAn2rITMgtWVTkiGnuOPnqmtCU&q=${props?.data[0]?.location.lat},${props?.data[0]?.location.lng}`}
                  // src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDcLGFU2zAn2rITMgtWVTkiGnuOPnqmtCU=${props?.data[0]?.location.formatted_address}`}
                  className='w-100 biz-owner-detail-map '
                  //   style={border:"1px"}

                  allowFullscreen=''
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                ></iframe>
              </div>
            ) : (
              <>
                <div className='d-flex'>
                  <span className='pe-1'>{props?.data[0]?.location?.address ?? ''},</span>
                  <span className='pe-1'> {props?.data[0]?.location?.city ?? ''},</span>
                  <span className='pe-1'> {props?.data[0]?.location?.country ?? ''}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className='row mt-10 biz-owner-business-description py-5'>
          {isFranchiseUnits && (
            <ReactApexChart
              options={FranchiseUnitsState.options}
              series={FranchiseUnitsState.series}
              type='bar'
              height={245}
            />
          )}
          {isCompanyOwnedUnits && (
            <ReactApexChart
              options={CompanyOwnedUnitsState.options}
              series={CompanyOwnedUnitsState.series}
              type='bar'
              height={245}
            />
          )}

          <div className='d-flex justify-content-center flex-wrap '>
            {/* setIsFranchiseUnits setIsCompanyOwnedUnits */}
            <p
              className='mx-2 cursor-pointer biz-owner-franchise-overview'
              onClick={() => {
                setIsFranchiseUnits(true)
                setIsCompanyOwnedUnits(false)
              }}
            >
              {isCompanyOwnedUnits ? (
                <>
                  <span className='mx-2   '>
                    <FaCircle size={15} color={'#2962ff'} />
                  </span>
                  <s className='biz-owner-franchise-overview '> Franchise Units</s>
                </>
              ) : (
                <>
                  <span className='mx-2 biz-owner-franchise-overview  '>
                    <FaCircle size={15} color={'#2962ff'} />
                  </span>
                  Franchise Units
                </>
              )}
            </p>
            <p
              className='mx-2 cursor-pointer biz-owner-franchise-overview'
              onClick={() => {
                setIsCompanyOwnedUnits(true)
                setIsFranchiseUnits(false)
              }}
            >
              {isFranchiseUnits ? (
                <>
                  <span className='mx-2 '>
                    <FaCircle size={15} color={'#181C32'} />
                  </span>
                  <s className='biz-owner-franchise-overview '>Company Owned Units</s>
                </>
              ) : (
                <>
                  <span className='mx-2 '>
                    <FaCircle size={15} color={'#3a3e51'} />
                  </span>
                  Company Owned Units
                </>
              )}
            </p>
          </div>
        </div>
        {role !== 'admin' && !pathname?.startsWith('/my-franchise') && (
          <div className='pt-3'>
            <span
              className='text-primary cursor-pointer  d-flex'
              data-bs-toggle={role == 'agent' ? null : 'modal'}
              data-bs-target='#kt_modal_report'
              onClick={() => (role == 'agent' ? agentAlertHandler() : null)}
            >
              <div>
                <AiFillWarning size={18} />
              </div>
              <p className=' px-2'>Report an issue with this Franchise</p>
            </span>
          </div>
        )}
      </>

      <div className='modal fade' tabIndex={-1} id='kt_modal_report'>
        <div className='modal-dialog '>
          <div className='modal-content'>
            <div className='modal-header p-3'>
              <h5 className='modal-title'>Report an issue</h5>
              {/*begin::Close*/}
              <button
                type='button'
                className='btn-close me-1'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
              {/*end::Close*/}
            </div>
            <div className='modal-body'>
              {transtokenData ? null : (
                <>
                  <div className='form-check my-5 ps-0'>
                    <label htmlFor='' className='form-label required'>
                      Full name
                    </label>

                    <input
                      type='text'
                      name='full-name'
                      value={fullName}
                      className='form-control form-control-solid  required'
                      placeholder='John Doe'
                      onChange={(e) => inputChange(e)}
                    />
                    {fullNameValiDation ? (
                      <div className='biz_owner_input_validation'>Enter full name</div>
                    ) : null}
                  </div>
                  <div className='form-check my-5 ps-0'>
                    <label htmlFor='' className='form-label required'>
                      Your email address
                    </label>

                    <input
                      type='email'
                      name='report-email'
                      value={reportEmail}
                      className='form-control form-control-solid  required'
                      placeholder='johndoe@email.com'
                      onChange={(e) => inputChange(e)}
                    />
                    {reportEmailValidation ? (
                      <div className='biz_owner_input_validation'>Invalid email address</div>
                    ) : null}
                  </div>
                </>
              )}

              <div>
                <label htmlFor='exampleFormControlTextarea1' className='form-label required'>
                  Reason
                </label>
                <select
                  className='form-select  form-select-solid '
                  aria-label='Select example'
                  onChange={(e) => reportReasonHandler(e)}
                >
                  <option hidden>- Select a Reason -</option>
                  {reasonData?.map((item, index) => (
                    <option value={item.id} id={item.id} key={index}>
                      {item?.title}
                    </option>
                  ))}
                </select>
                {reasoneValidation ? (
                  <div className='biz_owner_input_validation'>Select reason</div>
                ) : null}
              </div>

              <div className='mt-5'>
                <div className='mb-3'>
                  <label htmlFor='exampleFormControlTextarea1' className='form-label required'>
                    Additional Information
                  </label>
                  <textarea
                    className='form-control form-control-solid'
                    id='exampleFormControlTextarea1'
                    name='information'
                    value={information}
                    rows={3}
                    onChange={(e) => inputChange(e)}
                  />
                  {informationValidation ? (
                    <div className='biz_owner_input_validation'>Enter additional information</div>
                  ) : null}
                </div>
              </div>

              <div
                className='g-recaptcha'
                data-sitekey='6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ'
              ></div>
            </div>
            {transtokenData ? (
              <div className='modal-footer p-3'>
                {reason.length > 0 && information.length > 0 ? (
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => submitReport()}
                    data-bs-dismiss='modal'
                  >
                    Send Feedback
                  </button>
                ) : (
                  <button type='button' className='btn btn-primary ' onClick={() => submitReport()}>
                    Send Feedback
                  </button>
                )}
              </div>
            ) : (
              <div className='modal-footer p-3'>
                {reason.length > 0 &&
                information.length > 0 &&
                reportEmail.length > 0 &&
                fullName.length > 0 &&
                isValidEmail(reportEmail) ? (
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => submitReport()}
                    data-bs-dismiss='modal'
                  >
                    Send Feedback
                  </button>
                ) : (
                  <button type='button' className='btn btn-primary ' onClick={() => submitReport()}>
                    Send Feedback
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 
      <div className='modal fade' tabIndex={-1} id='kt_modal_Share'>
        <div className='modal-dialog '>
          <div className='modal-content'>
            <div
              className='btn btn-icon btn-sm text-dark ms-auto'
              data-bs-dismiss='modal'
              aria-label='Close'
            >
              <span className='fs-2'>🗙</span>
            </div>

            <div className='modal-body'>
              <div className='row'>
                <h4 className='text-center'>Share this Franchise for Sale Listing</h4>
                <div className='col-6'>
                  <h6>Share with your Network:</h6>
                  <div className='my-4'>
                    <a href='https://www.facebook.com/' title='Facebook'>
                      <BsFacebook size={35} />
                      <span className='mx-3'>Share on Facebook</span>
                    </a>
                    <hr />
                  </div>
                  <div className='my-4'>
                    <a href='https://www.linkedin.com/ ' title='Linkedin'>
                      <BsLinkedin size={33} />
                      <span className='mx-4'>Share on Linkedin</span>
                    </a>
                    <hr />
                  </div>
                  <div className='my-4 ps-0'>
                    <a href='https://twitter.com/' title='Twitter'>
                      <AiFillTwitterCircle size={40} />
                      <span className='mx-3'>Share on Twitter</span>
                    </a>
                    <hr />
                  </div>
                </div>
                <div className='col-6'>
                  <h6>Or Email to a Friend:</h6>
                  <input
                    type='email'
                    className='form-control form-control-solid mb-3 mt-5'
                    placeholder='Name'
                  />
                  <input
                    type='email'
                    className='form-control form-control-solid mb-3'
                    placeholder='Email'
                  />
                  <input
                    type='email'
                    className='form-control form-control-solid mb-3'
                    placeholder="Your Friend's Email"
                  />
                  <div>
                    <button
                      className='btn bizOwner-bg-color bizOwner-color'
                      data-bs-dismiss='modal'
                    >
                      Send Via Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <Modal show={isModalShow} onHide={modalClose}>
        <Modal.Header closeButton className='py-3'>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='col-12'>
            <h4 className='text-center my-3'>Sign in to save this listing</h4>
            <p className='text-center mb-4'>
              Don't have an account?{' '}
              <span
                className='text-primary cursor-pointer'
                onClick={() => navigate('/auth/registration')}
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                Create one here.
              </span>
            </p>
            {loginStatus == true && (
              <p className='text-center text-danger mt-4'>Invalid Login Credentials</p>
            )}
            <div className='mb-10 my-5'>
              <input
                type='email'
                name='login-email'
                value={loginEmail}
                className='form-control form-control-solid '
                placeholder='johndoe@email.com'
                onChange={(e) => inputChange(e)}
              />
              {loginEmailValidation ? (
                <div className='biz_owner_input_validation'>Invalid email address</div>
              ) : null}
            </div>
            <div className='mb-10'>
              <input
                type='password'
                name='login-password-modal'
                value={loginPassword}
                className='form-control form-control-solid required'
                placeholder='Password'
                onChange={(e) => inputChange(e)}
              />
              {loginPasswordValidation ? (
                <div className='biz_owner_input_validation'>Invalid password</div>
              ) : null}
            </div>
          </div>

          <div className=' text-center d-flex flex-column pb-4'>
            {loginEmail != '' &&
            loginEmail != undefined &&
            isValidEmail(loginEmail) &&
            loginPassword != '' &&
            loginPassword != undefined ? (
              <div>
                <button
                  type='button'
                  className='btn btn-primary  px-12'
                  onClick={(e) => loginHandler(e, props?.id, props?.favorite)}
                  style={{borderRadius: '22px'}}
                >
                  Sign in
                </button>
              </div>
            ) : (
              <div>
                <button
                  type='button'
                  className='btn btn-primary  px-12'
                  onClick={(e) => loginHandler(e)}
                  style={{borderRadius: '22px'}}
                >
                  Sign in
                </button>
              </div>
            )}

            {/* <p className='my-3 pb-3'>
                  <Link
                    to='#'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_forgot'
                    data-bs-dismiss='modal'
                  >
                    Forgot Your Password
                  </Link>
                </p> */}
          </div>
        </Modal.Body>
      </Modal>

      {/* <!-- Modal --> */}
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabindex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='d-flex justify-content-between'>
              <h5 className='modal-title p-4 fs-3' id='staticBackdropLabel'>
                Share Franchise
              </h5>
              <button
                type='button'
                className='btn-close p-4'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='mb-2 d-flex justify-content-center'>
                <span
                  className='social-media-icons cursor-pointer px-3 facebook-share-back-ground'
                  data-bs-toggle='tooltip'
                  data-bs-placement='top'
                  title='Facebook'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <FacebookShareButton
                    url={`https://bizownersell.jgago.com/franchise/${props.data.slug}/${props.data.id}`}
                  >
                    <img src={facebookIcon} alt='' width={50} />
                  </FacebookShareButton>
                </span>
                <span
                  className='social-media-icons cursor-pointer px-3 email-share-back-ground'
                  data-bs-toggle='tooltip'
                  data-bs-placement='top'
                  title='Email'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <EmailShareButton
                    className='pe-0'
                    subject={props.data[0]?.title}
                    body={props.data[0].short_description}
                    url={`https://bizownersell.jgago.com/franchise/${props?.data[0].slug}/${props?.data[0].id}`}
                  >
                    <img src={emailIcon} alt='' width={50} />
                  </EmailShareButton>
                </span>
                <span
                  className='social-media-icons cursor-pointer px-3 twitter-share-back-ground'
                  data-bs-toggle='tooltip'
                  data-bs-placement='top'
                  title='Twitter'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <TwitterShareButton
                    url={`https://bizownersell.jgago.com/franchise/${props?.data[0].slug}/${props?.data[0].id}`}
                  >
                    <img src={twitter} alt='' width={55} />
                  </TwitterShareButton>
                </span>
                <span
                  className='cursor-pointer px-3 linkdin-share-back-ground'
                  data-bs-toggle='tooltip'
                  data-bs-placement='top'
                  title='Linkedin'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <LinkedinShareButton
                    url={`https://bizownersell.jgago.com/franchise/${props?.data[0].slug}/${props?.data[0].id}`}
                  >
                    <img src={linkedinIcon} alt='' width={50} />
                  </LinkedinShareButton>
                </span>
              </div>
            </div>
            {/* <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Close
              </button>
              <button type='button' className='btn btn-primary'>
                Understood
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <Modal
        show={isShowPackageModal}
        size='xl'
        onHide={() => setIsShowPackageModal(!isShowPackageModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <UnlockSubscription updateModalTitle={updateModalTitle} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant='secondary' onClick={() => setIsShowPackageModal(!isShowPackageModal)}>
            Close
          </Button>
          <Button variant='primary'>Save changes</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}

export default DetailFranchise
