import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {
  AiFillDollarCircle,
  AiFillHeart,
  AiFillTwitterCircle,
  AiFillUnlock,
  AiOutlineHeart,
  AiOutlinePrinter,
} from 'react-icons/ai'
import {Tab, Tabs} from 'react-bootstrap'

import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {BsFacebook, BsHeart, BsLinkedin} from 'react-icons/bs'
import {useParams, useLocation} from 'react-router-dom'
import {GrFacebookOption} from 'react-icons/gr'
import {addFavorite} from '../../../services/common-services'
import {loginUser} from '../../../services/auth-services/AuthServices'
import UnlockSubscription from '../../../unlock-subscription/UnlockSubscription'

import {
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
import {Modal} from 'react-bootstrap'
import valuation from '../../../../assets/icons/valuationIcon.svg'
import PrinterActive from '../../../../assets/icons/PrinterActive.svg'
import Printer from '../../../../assets/icons/printer.svg'
import valuationActive from '../../../../assets/icons/valuation-white-icon.svg'
import back from '../../../../assets/icons/backIcon.svg'
import sellerFinancing from '../../../../assets/icons/sellerFinancing.svg'
import businessLocation from '../../../../assets/icons/business-location-icon.svg'
import locationIcon from '../../../../assets/icons/location.svg'
import dollar from '../../../../assets/icons/dollarIcon.svg'
import {FcPrint} from 'react-icons/fc'
import {RiShareFill} from 'react-icons/ri'
import twitter from '../../../../assets/icons/social-share-icons/White-twitter.svg'
import facebookIcon from '../../../../assets/icons/social-share-icons/White-fb.svg'
import emailIcon from '../../../../assets/icons/social-share-icons/White-email.svg'
import linkedinIcon from '../../../../assets/icons/social-share-icons/White-link-din.svg'
import {Helmet} from 'react-helmet'
import dummyImg from '../../../../assets/dummy.jpg'
import './Detail.css'
import Swal from 'sweetalert2'
import {modalText} from '../../../alert-text'
const Detail = (props) => {
  const location = useLocation()
  const targetRef = useRef(null)
  const [isShowPackageModal, setIsShowPackageModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('Please select a plan to access more features')
  const [carouselImages, setCarouselImages] = useState(props?.data[0]?.slider_images)
  const [btnActive, setBtnActive] = useState('')
  const [saveBtnToggler, setSaveBtnToggler] = useState(false)
  const [isShowModal, setShow] = useState(false)
  const [loginEmailValidation, setLoginEmailValidation] = useState(false)
  const [loginPasswordValidation, setLoginPasswordValidation] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [forgetPass, setForgetPass] = useState('')
  const [loginStatus, setLoginStatus] = useState(false)
  const [profitMargin, setProfitMargin] = useState(0)
  const [multiple, setMultiple] = useState(0)
  const [Expenses, setExpenses] = useState(0)
  const [desiredMultiple, setDesiredMultiple] = useState(0)
  const [newPriceCalculated, setNewPriceCalculated] = useState(0)
  const [acquisitionPrice, setAcquisitionPrice] = useState(0)
  const [downPayment, setDownPayment] = useState(0)
  const [bankFinancing, setBankFinancing] = useState(0)
  const [totalProfit, setTotalProfit] = useState(0)
  const [backrang, setBackrang] = useState(0)
  const [saleNoterange, setSaleNoterange] = useState(0)
  const [paymentrange, setPamentRange] = useState(0)
  const [sellerNote, setSellerNote] = useState(0)
  const [bankNoteTerm, setBankNoteTerm] = useState(0)
  const [bankNoteRate, setBankNoteRate] = useState(0)
  const [annualPaymentTotal, setAnnualPaymentTotal] = useState(0)
  const [sellerNoteTerm, setSellerNoteTerm] = useState(0)
  const [sellerNoteRate, setSellerNoteRate] = useState(0)
  const [WeightedAVG, setWeightedAVG] = useState(0)
  const [newAnnualCashFlow, setNewAnnualCashFlow] = useState(0)
  const [DSRBank, setDSRBank] = useState('')
  const [DSRTotal, setDSRTotal] = useState('')
  const [WeightedAddBacks1, setWeightedAddBacks1] = useState(0)
  const [WeightedAddBacks2, setWeightedAddBacks2] = useState(0)
  const [WeightedAddBacks3, setWeightedAddBacks3] = useState(0)
  const [weightedEnterMultiple, setWeightedEnterMultiple] = useState('')
  const [WeightedEBITDA1, setWeightedEBITDA1] = useState(0)
  const [WeightedEBITDA2, setWeightedEBITDA2] = useState(0)
  const [WeightedEBITDA3, setWeightedEBITDA3] = useState(0)
  const [WeightedAskingPrice, setWeightedAskingPrice] = useState('')
  const [yearPrice, setYearPrice] = useState('')
  const [yearEBITDA, setYearEBITDA] = useState('')
  const [yearAddBacks, setYearAddBacks] = useState('')
  const [yearMultiple, setYearMultiple] = useState('')
  const [threeYearAVG, setThreeYearAVG] = useState('')
  const [WeightSDE, setWeightSDE] = useState(0)
  const [askingPrice, setAskingPrice] = useState('')
  const [revenue, setRevenue] = useState(0)
  const [reasoneValidation, setReasoneValidation] = useState(false)
  const [isShowCalculator, setIsShowCalculator] = useState(false)
  const [reportEmailValidation, setReportEmailValidation] = useState(false)
  const [bankPymt, setBankPymt] = useState(0)
  const [sellerPymt, setsellerPymt] = useState(0)
  const [EBITDA, setEBITDA] = useState(0)
  const tokenData = localStorage.getItem('userData')
  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(JSON.stringify(userData) || '')
  const {pathname} = location
  let dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    setEBITDA(props?.data[0]?.business_meta?.ebitda)
    setAskingPrice(props?.data[0]?.asking_price)
    setRevenue(props?.data[0]?.gross_revenue)

    Math.trunc(
      setProfitMargin((props?.data[0]?.business_meta?.ebitda / props?.data[0]?.gross_revenue) * 100)
    )

    setMultiple((props?.data[0]?.asking_price / props?.data[0]?.business_meta?.ebitda) * 100)

    setExpenses(props?.data[0]?.gross_revenue - props?.data[0]?.business_meta?.ebitda)

    if (props?.data[0]?.favorite != 'Unfavorite') {
      setSaveBtnToggler(true)
      setBtnActive('save')
    }
  }, [])
  useEffect(() => {
    setBankFinancing((Number(backrang) / 100) * Number(acquisitionPrice).toFixed(2))
    setDownPayment((Number(paymentrange) / 100) * Number(acquisitionPrice).toFixed(2))
    setSellerNote((Number(saleNoterange) / 100) * Number(acquisitionPrice).toFixed(2))
    setBankPymt(
      (Number(bankNoteRate) / 100 / 12 +
        Number(bankNoteTerm) * 12 +
        (Number(backrang) / 100) * Number(acquisitionPrice)) *
        -1 *
        12
    )
    setsellerPymt(
      (Number(sellerNoteRate) / 12 +
        Number(sellerNoteTerm) * 12 +
        (Number(saleNoterange) / 100) * Number(acquisitionPrice)) *
        -1 *
        12
    )
  }, [
    sellerNoteRate,
    saleNoterange,
    sellerNoteTerm,
    backrang,
    bankNoteRate,
    bankNoteTerm,
    acquisitionPrice,
    paymentrange,
    saleNoterange,
  ])

  useEffect(() => {
    // window.scrollTo(0, 0)

    // {
    //   document
    //     .querySelector('meta[property="og:title"]')
    //     .setAttribute('content', props.data[0]?.title ?? '')
    // }
    // {
    //   document
    //     .querySelector('meta[property="og:description"]')
    //     .setAttribute('content', props?.data[0]?.description?.replace(/(<([^>]+)>)/gi, '') ?? '')
    // }

    // {
    //   document
    //     .querySelector('meta[property="og:image"]')
    //     .setAttribute(
    //       'content',
    //       props?.data[0]?.slider_images[0]?.full_path +
    //         props?.data[0]?.slider_images[0]?.file_name ?? ''
    //     )
    // }
    // ;<Helmet
    //   meta={[
    //     {property: 'og:title', content: 'title'},
    //     // { property: "og:type", "content": 'artical' },
    //     {property: 'og:description', content: 'description'},
    //     {
    //       property: 'og:image',
    //       content: 'https://imagej.nih.gov/ij/images/baboon.jpg',
    //     },
    //   ]}
    // />

    setCarouselImages(props?.data[0]?.slider_images)
  }, [props])
  const btnsStateChange = async (e) => {
    switch (e.target.name) {
      case 'print':
        setBtnActive('print')

        break
      case 'share':
        setBtnActive('share')

        break
      case 'valuation':
        if (btnActive !== 'valuation') {
          setBtnActive('valuation')
        } else {
          setBtnActive('')
        }

        break
      default:
        // setTypeOfListing('business')

        break
    }
  }
  const inputChange = async (e) => {
    switch (e.target.name) {
      case 'login-email':
        await setLoginEmail(e.target.value)
        setLoginEmailValidation(false)
        break
      case 'login-password-modal':
        await setLoginPassword(e.target.value)
        setLoginPasswordValidation(false)
        break
    }
  }
  const calculator = async (e) => {
    switch (e.target.name) {
      case 'price':
        await setAskingPrice(e.target.value)
        break
      case 'revenue':
        await setRevenue(e.target.value)
        break
      case 'EBITDA':
        await setEBITDA(e.target.value)
        break
      case 'multiple':
        await setMultiple(e.target.value)
        setReportEmailValidation(false)
        break

      case 'profit':
        await setProfitMargin(e.target.value)
        break
      case 'expenses':
        await setExpenses(e.target.value)
        break
      case 'Desired-Multiple':
        await setDesiredMultiple(e.target.value)
        break
      case 'New-Price-calculated':
        await setNewPriceCalculated(e.target.value)
        break
      case 'Acquisition-Price':
        await setAcquisitionPrice(e.target.value)
        break
      case 'Bank-Financing':
        await setBankFinancing(e.target.value)
        // await setBackrang(0)

        break
      case 'Bank-Range':
        await setBackrang(e.target.value)
        if (e.target.value > 100) {
          setBackrang(100)
        }
        break
      case 'Down-Payment-range':
        await setPamentRange(e.target.value)
        if (e.target.value > 100) {
          setPamentRange(100)
        }
        break
      case 'Seller-Note-range':
        await setSaleNoterange(e.target.value)
        if (e.target.value > 100) {
          setSaleNoterange(100)
        }
        break
      case 'Down-Payment':
        await setDownPayment(e.target.value)
        await setPamentRange(0)
        break
      case 'Bank-Note-Term':
        await setBankNoteTerm(e.target.value)

        break
      case 'Bank-Note-Rate':
        await setBankNoteRate(e.target.value)
        break
      case 'Seller-Note':
        await setSellerNote(e.target.value)
        await setSaleNoterange(0)
        break
      case 'Annual-Payment-Total':
        await setAnnualPaymentTotal(e.target.value)
        break
      case 'Seller-Note-Term':
        await setSellerNoteTerm(e.target.value)
        break
      case 'Seller-Note-Rate':
        await setSellerNoteRate(e.target.value)
        break
      case 'Annual-Payment-Total':
        await setAnnualPaymentTotal(e.target.value)
        break
      case 'New-Annual-Cash-Flow':
        await setNewAnnualCashFlow(e.target.value)
        break
      case 'DSR-Bank':
        await setDSRBank(e.target.value)
        break
      case 'DSR-Total':
        await setDSRTotal(e.target.value)
        break
      case 'Weighted-AVG':
        await setWeightedAVG(e.target.value)
        break
      case 'Weighted-Enter-a-Multiple':
        await setWeightedEnterMultiple(e.target.value)
        break
      case 'Weighted-Add-Backs1':
        await setWeightedAddBacks1(e.target.value)
        break
      case 'Weighted-Add-Backs2':
        await setWeightedAddBacks2(e.target.value)
        break
      case 'Weighted-Add-Backs3':
        await setWeightedAddBacks3(e.target.value)
        break
      case 'Weighted-EBITDA-1':
        await setWeightedEBITDA1(e.target.value)
        break
      case 'Weighted-EBITDA-2':
        await setWeightedEBITDA2(e.target.value)
        break
      case 'Weighted-EBITDA-3':
        await setWeightedEBITDA3(e.target.value)
        break
      case 'Weighted-price':
        await setWeightedAskingPrice(e.target.value)
        break
      case 'Year-price':
        await setYearPrice(e.target.value)
        break
      case 'Year-EBITDA':
        await setYearEBITDA(e.target.value)
        break
      case 'Year-Add-back':
        await setYearAddBacks(e.target.value)
        break
      case 'Year-Multiple':
        await setYearMultiple(e.target.value)
        break
      case 'three-Year-AVG':
        await setThreeYearAVG(e.target.value)
        break
    }
  }
  const rangeInput = async (e) => {
    switch (e.target.name) {
      case 'Bank-FinancingRange':
        await setBackrang(e.target.value)
        // setBankFinancing('')
        break
      case 'Down-Paymentrange':
        await setPamentRange(e.target.value)
        // await setDownPayment('')
        break
      case 'sallrerange':
        await setSaleNoterange(e.target.value)
        // await setSellerNote('')
        break
    }
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
      if (status?.isConfirmed) {
        setBtnActive('unSaved')
        type = 'unfavorite'
        setSaveBtnToggler(false)
      }
      const response = await addFavorite(accessToken, 'business', props?.data[0]?.id, type)
    } else if (savedType == 'save') {
      setIsShowPackageModal(true)
      setSaveBtnToggler(true)
      setBtnActive('save')
      type = 'favorite'
      const response = await addFavorite(accessToken, 'business', props?.data[0]?.id, type)
    }

    // if (response.status == true) {
    //   console.log('response.status == true')
    // } else {
    //   console.log('qqqqqqqqqq')
    // }
  }
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
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
          localStorage.setItem(
            'userData',
            JSON.stringify({
              accessToken: result.token,
              userName: result.user.first_name,
              role: result.role[0].name,
              userID: result.user.id,
            })
          )
          window.location.reload()

          const response = await addFavorite(
            result.token,
            'business',
            props?.data[0]?.id,
            'favorite'
          )
          console.log('response.status == true response ', response)

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
    const decodedHTML = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    return <div dangerouslySetInnerHTML={{__html: decodedHTML}} />
  }

  const updateModalTitle = (newTitle, againFetch) => {
    console.log(againFetch)
    if (againFetch == 'fetch') {
      props.againFetchData()
    }
    if (newTitle == 'close') {
      setIsShowPackageModal(false)
    } else {
      setModalTitle(newTitle)
    }
  }
  const handleClick = (e) => {
    // Get the position of the target element relative to the entire document
    if (btnActive !== 'valuation') {
      const targetPosition = targetRef.current.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({top: targetPosition, behavior: 'smooth'})
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
      <Helmet>
        {/* <title>Page Title</title> */}
        <meta property='og:url' content={`https://bizownersell.jgago.com${pathname}`} />
        <meta property='og:description' content={'yeh dynamic description hai'} />
        <meta
          property='og:image'
          content={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPzgw9Bol1WNxELfRbHe0B07lsZsIjaefcCcTeJJgLdA&s'
          }
        />
        <meta property='og:title' content='ye title hai' />
        {/* <meta property='fb:app_id' content='sample_id' /> */}
      </Helmet>
      <>
        {role !== 'admin' && (
          <Link
            to='/search-businesses-for-sale'
            className='biz-owner-business-detail-back-button mt-4 mb-2 px-0'
          >
            <span className='text-primary '>
              <img src={back} alt='' className='mt-6' />
            </span>
          </Link>
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
                            <img
                              className='mb-2 mt-2 me-1 pb-1 '
                              src={locationIcon}
                              alt=''
                              width={14}
                            />
                            {props?.data[0]?.location?.formatted_address?.substring(0, 30)}
                          </>
                        ) : props?.data[0]?.location_visibitiy?.slug ===
                          'show-city-country-state' ? (
                          <>
                            <img className='mb-2 mt-2 me-1' src={locationIcon} alt='' width={14} />
                            {props?.data[0]?.location?.city?.substring(0, 30) +
                              ' ' +
                              props?.data[0]?.location?.province?.substring(0, 30) +
                              ' ' +
                              props?.data[0]?.location?.country?.substring(0, 30)}
                          </>
                        ) : props?.data[0].location_visibitiy?.slug === 'show-country-state' ? (
                          <>
                            <img
                              className='mb-2 mt-2 me-1 pb-1 '
                              src={locationIcon}
                              alt=''
                              width={14}
                            />
                            {props.data[0]?.location?.province?.substring(0, 30) +
                              ' ' +
                              props.data[0]?.location?.country?.substring(0, 30)}
                          </>
                        ) : props.data[0].location_visibitiy?.slug === 'show-state-only' ? (
                          <>
                            <img
                              className='mb-2 mt-2 me-1 pb-1'
                              src={locationIcon}
                              alt=''
                              width={14}
                            />
                            {props.data[0]?.location?.province?.substring(0, 30)}
                          </>
                        ) : props.data[0].location_visibitiy?.slug === 'show-no-location' ? (
                          ''
                        ) : null}
                      </>
                    ) : (
                      <>
                        <span className=''>
                          <img
                            className='mb-2 mt-2 me-1 pb-1 '
                            src={locationIcon}
                            alt=''
                            width={14}
                          />
                          {props.data[0]?.location?.country?.substring(0, 30) ?? 'NaN'}
                        </span>
                      </>
                    )}
                  </span>
                ) : null}

                {/* {props.data[0]?.location ?? 'Nan'} */}
              </h5>
            </div>
            <div
              id='carouselExampleCaptions'
              className='carousel slide position-relative'
              data-bs-ride='carousel'
            >
              {console.log(props)}
              {props?.data[0].finance == 1 && (
                <div className='badge-container'>
                  <img src={sellerFinancing} width='130px' alt='' />
                  {/* <span class='badge badge-success py-2'> Seller Financing Available</span> */}
                </div>
              )}
              <div className='carousel-indicators d-none d-md-inline'>
                <ol className='carousel-indicators biz-owner-carousel-indicators'>
                  {carouselImages?.length > 0 && carouselImages?.length < 30
                    ? carouselImages?.map((item, ind) => (
                        <li
                          data-bs-target='#carouselExampleCaptions'
                          data-bs-slide-to={ind}
                          key={ind}
                          className={`${
                            ind == 0 ? 'active' : ''
                          } biz-owner-carousel-indicators-btn`}
                          aria-current={`${ind == 0 ? 'true' : 'false'}`}
                          // aria-label='Slide 1'
                        ></li>
                      ))
                    : null}
                </ol>
              </div>
              <div className='carousel-inner inner-screen-carousel'>
                {carouselImages?.length > 0 ? (
                  carouselImages?.map((item, ind) => (
                    <div className={`carousel-item h-100 ${ind == 0 ? 'active' : ''} `} key={ind}>
                      <img
                        src={item?.full_path + '/large/' + item?.file_name}
                        className='d-block img-fluid mx-auto  inner-screen-carousel-img '
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
              {carouselImages?.length > 1 ? (
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
            {/* <div className='pt-10'>ddddd</div> */}
          </div>
        </div>
        <div className='row mt-3 biz-owner-detail-container py-7 px-2 px-md-10 '>
          <div className='col-md-6   d-flex justify-content-between biz-owner-cash-flow-section'>
            <h3 className='my-auto'>Asking Price</h3>

            <h3 className='biz-owner-detail-price my-auto pe-md-8'>
              <span className='mx-md-2 '>
                <img src={dollar} alt='' width={19} className='mb-1' />
              </span>
              {props.data[0]?.asking_price ?? 'NaN'}
            </h3>
          </div>
          <div className='col-md-6 d-flex justify-content-between mt-5 mt-md-0 ps-md-5'>
            <h3 className='my-auto'>Cash Flow</h3>
            <h3 className='biz-owner-detail-price my-auto pe-md-8'>
              <span className='mx-md-2 '>
                <img src={dollar} alt='' width={19} className='mb-1' />
              </span>
              {props.data[0]?.cash_flow ?? 'Nan'}
            </h3>
          </div>
        </div>

        <div className='row mt-3 biz-owner-detail-container py-7 py-md-2 px-5 px-md-13 gx-7'>
          <div className=' col-md-6 ps-0 d-flex justify-content-between '>
            <p className='biz-owner-detail-table-price-title '>Gross Revenue:</p>
            <p className='biz-owner-detail-table-price me-md-8 '>
              ${props.data[0]?.gross_revenue ?? 'NaN'}
            </p>
          </div>
          <div className=' col-md-6 ps-md-5 d-flex justify-content-between '>
            <p className='biz-owner-detail-table-price-title'>Inventory:</p>
            <p className='biz-owner-detail-table-price me-md-6'>
              ${props.data[0]?.business_meta?.inventory ?? 'NaN'}
            </p>
          </div>
          <div className=' col-md-6 ps-0 d-flex justify-content-between '>
            <p className='biz-owner-detail-table-price-title'>EBITDA:</p>
            <p className='biz-owner-detail-table-price me-md-8'>
              ${props.data[0]?.business_meta?.ebitda ?? 'NaN'}
            </p>
          </div>
          <div className=' col-md-6 ps-md-5 d-flex justify-content-between '>
            <p className='biz-owner-detail-table-price-title'>Lease Expiration:</p>
            <p className='biz-owner-detail-table-price me-md-6'>
              {props?.data[0]?.business_meta?.lease_expiration ?? 'NaN'}
            </p>
          </div>
          <div className=' col-md-6 ps-0 d-flex justify-content-between '>
            <p className='biz-owner-detail-table-price-title'>FF&E:</p>
            <p className='biz-owner-detail-table-price me-md-8'>
              ${props.data[0]?.business_meta?.ffe ?? 'NaN'}
            </p>
          </div>
          <div className='  col-md-6 ps-md-5 d-flex justify-content-between'>
            <p className='biz-owner-detail-table-price-title'>Established:</p>
            <p className='biz-owner-detail-table-price me-md-6'>
              {props.data[0]?.established_at ?? 'NaN'}
            </p>
          </div>
          {role !== 'admin' && !pathname?.startsWith('/my-business') && (
            <>
              <hr />
              <div className='row px-0 py-0 biz-owner-btn-container my-4 mx-auto'>
                <div
                  className={`col-4 px-0  ${
                    btnActive == 'unSaved' ? ' border-end border-primary border-2' : 'border-0'
                  } ${btnActive == 'save' ? 'border-0' : ''}  ${
                    btnActive == 'valuation' ? 'border-end border-primary border-2' : ''
                  }  ${btnActive == '' ? 'border-end border-primary border-2' : ''}${
                    btnActive == 'share' ? 'border-end border-primary border-2' : ' border-0'
                  }`}
                  onClick={(e) => setIsShowCalculator(false)}
                >
                  {transformedData ? (
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
                            name='unSaved'
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
                              name='unSaved'
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
                          } `}
                          onClick={(e) =>
                            role == 'agent'
                              ? agentAlertHandler()
                              : saveListing(e, props?.data[0]?.id, 'save')
                          }
                        >
                          <span
                            className=' px-2 pb-2 d-none d-md-inline'
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
                              color={`${btnActive == 'save' ? '#FFFFFF' : '#00a3ef'}`}
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
                        <span
                          className=' px-4 pb-1 d-none d-md-inline '
                          style={{position: 'relative', bottom: '1px'}}
                        >
                          <BsHeart
                            color={`${btnActive == 'save' ? '#FFFFFF' : '#00A3EF'}`}
                            onClick={(e) => logOutSaveListing(e)}
                          />
                        </span>
                        Save
                      </button>
                    </>
                  )}
                </div>

                <div
                  className='col-4 px-0'
                  onClick={(e) => {
                    role == 'agent' ? agentAlertHandler() : setBtnActive('print'),
                      setIsShowCalculator(false)
                  }}
                >
                  <button
                    type='button'
                    className={`btn bizOwner-btn-inner w-100 h-100 py-2 biz-owner-detail-page-btn ${
                      btnActive == 'print' ? 'biz-owner-active-btn' : ''
                    } ${
                      btnActive == 'valuation' ? 'border-0' : 'border-end border-primary border-2'
                    }`}
                    data-kt-docs-advanced-forms='interactive'
                    name='print'
                    onClick={(e) => (role == 'agent' ? agentAlertHandler() : btnsStateChange(e))}
                  >
                    <span
                      className=' px-2 pb-1 d-none d-md-inline'
                      name='print'
                      onClick={(e) => {
                        role == 'agent' ? agentAlertHandler() : setBtnActive('print')
                      }}
                      style={{position: 'relative', bottom: '1px'}}
                    >
                      {/* <FcPrint /> */}
                      {btnActive == 'print' ? (
                        <img
                          src={PrinterActive}
                          width={12}
                          alt=''
                          name='print'
                          onClick={(e) => {
                            role == 'agent' ? agentAlertHandler() : setBtnActive('print')
                          }}
                        />
                      ) : (
                        <img
                          src={Printer}
                          width={12}
                          alt=''
                          onClick={(e) => {
                            role == 'agent' ? agentAlertHandler() : setBtnActive('print')
                            btnsStateChange(e)
                          }}
                        />
                      )}
                    </span>
                    Print
                  </button>
                </div>
                {/* <div className='col-3 px-0'>
                  <button
                    type='button'
                    data-bs-toggle='modal'
                    data-bs-target='#staticBackdrop'
                    className={`btn bizOwner-btn-inner w-100 h-100 biz-owner-detail-page-btn py-0 ${
                      btnActive == 'share' ? 'biz-owner-active-btn' : ''
                    }  ${btnActive == 'print' ? ' border-end border-primary border-2' : ''} ${
                      btnActive == 'save' ? ' border-end border-primary border-2 ' : ''
                    }  ${
                      btnActive == 'valuation' ? 'border-0' : 'border-end border-primary border-2'
                    }`}
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
                <div className='col-4 px-0'>
                  {transformedData ? (
                    <>
                      {props?.subscription?.package_details?.features?.[0]?.title != null &&
                      props?.subscription?.package_details?.features?.[0]?.title != undefined &&
                      props?.subscription?.package_details?.features?.[0]?.title != '' ? (
                        <Link to='#'>
                          <button
                            type='button'
                            className={`btn bizOwner-btn-inner w-100 h-100 biz-owner-detail-page-btn biz-owner-detail-page-valuation-btn py-0 ${
                              btnActive == 'valuation' ? 'biz-owner-active-btn' : ''
                            } `}
                            // data-kt-docs-advanced-forms='interactive'
                            name='valuation'
                            onClick={(e) => {
                              role == 'agent'
                                ? agentAlertHandler()
                                : setIsShowCalculator(!isShowCalculator)
                              role !== 'agent' && handleClick(e)
                              role !== 'agent' && btnsStateChange(e)
                            }}
                            // data-bs-toggle='modal'
                            // data-bs-target='#calculator'
                          >
                            <span>
                              {btnActive == 'valuation' ? (
                                <img
                                  src={valuationActive}
                                  alt=''
                                  className=' px-2 pb-1 d-none d-md-inline'
                                  name='valuation'
                                  onClick={(e) => {
                                    role == 'agent'
                                      ? agentAlertHandler()
                                      : setIsShowCalculator(!isShowCalculator)
                                    role !== 'agent' && handleClick(e)
                                    role !== 'agent' && btnsStateChange(e)
                                  }}
                                  style={{position: 'relative', bottom: '1px'}}
                                />
                              ) : (
                                <img
                                  src={valuation}
                                  alt=''
                                  className=' px-2 pb-1 d-none d-md-inline'
                                  name='valuation'
                                  onClick={(e) => {
                                    role == 'agent'
                                      ? agentAlertHandler()
                                      : setIsShowCalculator(!isShowCalculator)
                                    role !== 'agent' && handleClick(e)
                                    role !== 'agent' && btnsStateChange(e)
                                  }}
                                  style={{position: 'relative', bottom: '1px'}}
                                />
                              )}
                            </span>
                            {/* <button type='button' className='btn quick-valuation-btn mt-5'>
                    Quick Valuation
                    <span>
                      <AiFillUnlock size={22} />
                    </span>
                  </button> */}
                            Valuation <span className='d-none  d-md-inline'>Report</span>
                          </button>
                        </Link>
                      ) : (
                        <Link
                          to={`#`}
                          onClick={() =>
                            role == 'agent' ? agentAlertHandler() : setIsShowPackageModal(true)
                          }
                        >
                          <button
                            type='button'
                            className={`btn bizOwner-btn-inner w-100 h-100 biz-owner-detail-page-btn biz-owner-detail-page-valuation-btn py-0 ${
                              btnActive == 'valuation' ? 'biz-owner-active-btn' : ''
                            } `}
                            // data-kt-docs-advanced-forms='interactive'
                            name='valuation'
                            onClick={(e) =>
                              role == 'agent' ? agentAlertHandler() : btnsStateChange(e)
                            }
                            // data-bs-toggle='modal'
                            // data-bs-target='#calculator'
                          >
                            <span
                              className='d-none d-md-inline px-2 pb-1'
                              style={{position: 'relative', bottom: '1px'}}
                            >
                              {/* {btnActive == 'valuation' ? (
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
                        )} */}
                              <AiFillUnlock color='#00a3ef' />
                            </span>
                            {/* <button type='button' className='btn quick-valuation-btn mt-5'>
                    Quick Valuation
                    <span>
                      <AiFillUnlock size={22} />
                    </span>
                  </button> */}
                            Valuation <span className='d-none  d-md-inline'>Report</span>
                          </button>
                        </Link>
                      )}
                    </>
                  ) : (
                    <Link to='#'>
                      <button
                        type='button'
                        className={`btn bizOwner-btn-inner w-100 h-100 biz-owner-detail-page-btn biz-owner-detail-page-valuation-btn py-0 ${
                          btnActive == 'valuation' ? 'biz-owner-active-btn' : ''
                        } `}
                        // data-kt-docs-advanced-forms='interactive'
                        name='valuation'
                        onClick={(e) => setShow(true)}
                        // data-bs-toggle='modal'
                        // data-bs-target='#calculator'
                      >
                        <span>
                          {btnActive == 'valuation' ? (
                            <img
                              src={valuationActive}
                              alt=''
                              className=' px-2 pb-1 d-none d-md-inline'
                              name='valuation'
                              onClick={(e) => setShow(true)}
                              // onClick={(e) => btnsStateChange(e)}
                              style={{position: 'relative', bottom: '1px'}}
                            />
                          ) : (
                            <img
                              src={valuation}
                              alt=''
                              className=' px-2 pb-1 d-none d-md-inline'
                              name='valuation'
                              onClick={(e) => setShow(true)}
                              // onClick={(e) => btnsStateChange(e)}
                              style={{position: 'relative', bottom: '1px'}}
                            />
                          )}
                        </span>
                        {/* <button type='button' className='btn quick-valuation-btn mt-5'>
                    Quick Valuation
                    <span>
                      <AiFillUnlock size={22} />
                    </span>
                  </button> */}
                        Valuation <span className='d-none  d-md-inline'>Report</span>
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div ref={targetRef}></div>
        {isShowCalculator && (
          <div className='row mt-10 biz-owner-business-description pb-6'>
            <div className='card px-5 px-md-15 '>
              <div className='card-header border-2 px-0 d-block pt-10 my-2 '>
                <h3 className='single-business-heading'> Quick Valuation Report</h3>
                {/* <h6 className='pb-3 '>Own your own hometown restaurant!</h6> */}
              </div>
              <Tabs defaultActiveKey='home' id='fill-tab-example' className='mb-3' fill>
                <Tab eventKey='home' title='Quick Valuation'>
                  <div className='row mt-8 border-bottom border-2 border-primary '>
                    <div className='col-md-8'>
                      <div className='d-flex flex-wrap'>
                        <div className='col-6  px-2'>
                          <label htmlFor='' className='mb-1 fw-bold'>
                            Asking Price
                          </label>
                          <input
                            type='number'
                            name='price'
                            value={askingPrice}
                            className=' form-control form-control-solid '
                            placeholder='Asking Price'
                            onChange={(e) => calculator(e)}
                          />
                        </div>
                        <div className='col-6 px-2'>
                          <label htmlFor='' className='mb-1 fw-bold'>
                            Revenue
                          </label>

                          <input
                            type='number'
                            name='revenue'
                            value={revenue}
                            className=' form-control form-control-solid '
                            placeholder='Revenue'
                            onChange={(e) => calculator(e)}
                          />
                        </div>
                        <div className='col-6 mt-2 px-2'>
                          <label htmlFor='' className='mb-1 fw-bold'>
                            EBITDA
                          </label>

                          <input
                            type='number'
                            name='EBITDA'
                            value={EBITDA}
                            className=' form-control form-control-solid '
                            placeholder='EBITDA'
                            onChange={(e) => calculator(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 tex-center px-2 ps-md-10'>
                      <div className='mt-5'>
                        <h6 className='text-start'>Profit Margin</h6>

                        {askingPrice && revenue ? (
                          <p className='text-start'>
                            {((Number(EBITDA) / Number(revenue)) * 100).toFixed(2)}%
                          </p>
                        ) : (
                          0
                        )}

                        <h6 className='text-start'>Multiple</h6>
                        {askingPrice && EBITDA ? (
                          <p className='text-start'>
                            {(Number(askingPrice) / Number(EBITDA)).toFixed(2)}
                          </p>
                        ) : (
                          0
                        )}

                        <h6 className='text-start'> Expenses</h6>
                        <p className='text-start'>
                          ${(Number(revenue) - Number(EBITDA)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='row mt-8 border-bottom border-2 border-primary'>
                    <div className='col-md-8'>
                      <div className='d-flex flex-wrap'>
                        <div className='col-6 mt-5 px-2'>
                          <label htmlFor='' className='mb-1 fw-bold'>
                            Desired Multiple
                          </label>

                          <input
                            type='number'
                            name='Desired-Multiple'
                            value={desiredMultiple}
                            className=' form-control form-control-solid '
                            placeholder='Desired Multiple'
                            onChange={(e) => calculator(e)}
                          />
                        </div>
                        {/* <div className='col-6 mt-5 px-2'>
                          <label htmlFor=''>New Price calculated</label>

                          <input
                            type='number'
                            name='New-Price-calculated'
                            value={newPriceCalculated}
                            className=' form-control form-control-solid '
                            placeholder='Price calculated'
                            onChange={(e) => calculator(e)}
                          />
                        </div> */}
                        <div className='col-6 mt-5 px-2'>
                          <label htmlFor='' className='mb-1 fw-bold'>
                            Acquisition Price
                          </label>
                          <input
                            type='number'
                            name='Acquisition-Price'
                            value={acquisitionPrice}
                            className=' form-control form-control-solid '
                            placeholder='Acquisition Price'
                            onChange={(e) => calculator(e)}
                          />
                        </div>
                        {/* <div className='col-6 mt-5 px-2'></div> */}

                        <div className=' col-12 mt-2 px-2'>
                          <div className='row mb-2'>
                            <div className='col-10'>
                              <label htmlFor='' className=' fw-bold'>
                                Bank Financing
                              </label>
                            </div>
                            <div className='col-2  text-center'>{/* <b> %</b> */}</div>
                          </div>
                          <div className='row'>
                            <div className='col-9 col-lg-10'>
                              <input
                                type='number'
                                name='Bank-Financing'
                                value={bankFinancing}
                                className=' form-control form-control-solid '
                                placeholder='Bank Financing'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                            <div className='col-3  col-lg-2 d-flex align-items-center justify-content-end position-relative'>
                              <input
                                type='number'
                                name='Bank-Range'
                                value={backrang}
                                className=' form-control form-control-solid ps-2'
                                // placeholder='--%'
                                onChange={(e) => calculator(e)}
                              />
                              <label htmlFor='' className='position-absolute fs-3 mx-2'>
                                %
                              </label>
                            </div>
                          </div>
                          <div className='col-lg-12 col-11 mt-2'>
                            <input
                              className=''
                              type='range'
                              style={{
                                // height: '3px',
                                // color: '#00a3ef',
                                width: '82%',
                              }}
                              value={backrang}
                              name='Bank-FinancingRange'
                              id='range_weight'
                              min={0}
                              max={100}
                              onChange={(e) => rangeInput(e)}
                            />
                          </div>
                        </div>

                        <div className=' col-12 mt-2 px-2'>
                          <div className='row'>
                            <div className='col-9 col-lg-10'>
                              <label htmlFor='' className='mb-1 fw-bold'>
                                Down Payment
                              </label>
                              <input
                                type='number'
                                name='Down-Payment'
                                value={downPayment}
                                className=' form-control form-control-solid '
                                placeholder='Down Payment'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                            <div className='col-3 mt-7  col-lg-2 d-flex align-items-center justify-content-end position-relative'>
                              <input
                                type='number'
                                name='Down-Payment-range'
                                value={paymentrange}
                                className=' form-control form-control-solid  ps-2'
                                // placeholder='--%'
                                onChange={(e) => calculator(e)}
                              />

                              <label htmlFor='' className='position-absolute fs-3 mx-2'>
                                %
                              </label>
                            </div>
                          </div>
                          <div className='col-lg-12 col-11 mt-2'>
                            <input
                              className=''
                              style={{width: '82%'}}
                              type='range'
                              name='Down-Paymentrange'
                              value={paymentrange}
                              id='range_weight'
                              min={0}
                              max={100}
                              onChange={(e) => rangeInput(e)}
                              oninput='range_weight_disp.value = range_weight.value'
                            />
                          </div>
                        </div>
                        <div className='  col-12 mt-2 px-2 mb-4'>
                          <div className='row'>
                            <div className='col-9 col-lg-10'>
                              <label htmlFor='' className='mb-1 fw-bold'>
                                Seller's Note
                              </label>

                              <input
                                type='number'
                                name='Seller-Note'
                                value={sellerNote}
                                className=' form-control form-control-solid   '
                                placeholder='Seller  Note'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                            <div className='col-3 mt-7  col-lg-2 d-flex align-items-center justify-content-end position-relative'>
                              <input
                                type='number'
                                name='Seller-Note-range'
                                value={saleNoterange}
                                className=' form-control form-control-solid  ps-2'
                                // placeholder='--%'
                                onChange={(e) => calculator(e)}
                              />

                              <label htmlFor='' className='position-absolute fs-3 mx-2'>
                                %
                              </label>
                            </div>
                          </div>
                          <div className='col-lg-12 col-11 mt-2 mb-5'>
                            <input
                              className=''
                              type='range'
                              name='sallrerange'
                              value={saleNoterange}
                              style={{width: '82%'}}
                              id='range_weight'
                              min={0}
                              max={100}
                              onChange={(e) => rangeInput(e)}
                              oninput='range_weight_disp.value = range_weight.value'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 tex-center px-2 ps-md-10'>
                      <div className='mt-5'>
                        <h6 className='text-start'>New Price calculated</h6>
                        <p className='text-start'>${(2.4 * Number(EBITDA)).toFixed(2)}</p>
                        {/* <h6 className='text-start'>Desired Multiple times EBITDA</h6>
                        <p className='text-start'>{Number(desiredMultiple) * Number(EBITDA)}</p> */}
                        {/* <p className='text-start'>{newPriceCalculated}</p> */}
                        {/* <h6 className='text-start'>Bank Financing</h6>
                        <p className='text-start'>$00.00</p>
                        <h6 className='text-start'>Down Payment</h6>
                        <p className='text-start'>$00.00</p>
                        <h6 className='text-start'>Seller's Note</h6>
                        <p className='text-start'>$00.00</p> */}
                      </div>
                    </div>
                  </div>
                  <div className='row mt-8'>
                    <div className='col-md-8'>
                      <div className='d-flex flex-wrap'>
                        <div className='col-6 mt-5 px-2'>
                          <label htmlFor='' className='mb-1 fw-bold'>
                            Bank Note Term
                          </label>

                          <input
                            type='number'
                            name='Bank-Note-Term'
                            value={bankNoteTerm}
                            className=' form-control form-control-solid '
                            placeholder='Bank Note Term'
                            onChange={(e) => calculator(e)}
                          />
                        </div>
                        <div className='col-6 mt-5 px-2'>
                          <label htmlFor='' className='mb-1 fw-bold'>
                            Bank Note Rate
                          </label>

                          <input
                            type='number'
                            name='Bank-Note-Rate'
                            value={bankNoteRate}
                            className=' form-control form-control-solid '
                            placeholder='Bank Note Rate'
                            onChange={(e) => calculator(e)}
                          />
                        </div>
                        {/* <div className='col-6 mt-5 px-2'>
                          <label htmlFor=''>Annual Payment Total</label>

                          <input
                            type='number'
                            name='Annual-Payment-Total'
                            value={annualPaymentTotal}
                            className=' form-control form-control-solid '
                            placeholder='Expenses'
                            onChange={(e) => calculator(e)}
                          />
                        </div> */}
                        <div className='col-6 mt-2 px-2'>
                          <label htmlFor='' className='mb-1 fw-bold'>
                            Seller Note Term
                          </label>

                          <input
                            type='number'
                            name='Seller-Note-Term'
                            value={sellerNoteTerm}
                            className=' form-control form-control-solid '
                            placeholder='Seller Note Term'
                            onChange={(e) => calculator(e)}
                          />
                        </div>
                        <div className='col-6 mt-2 px-2'>
                          <label htmlFor='' className='mb-1 fw-bold'>
                            Seller Note Rate
                          </label>

                          <input
                            type='number'
                            name='Seller-Note-Rate'
                            value={sellerNoteRate}
                            className=' form-control form-control-solid '
                            placeholder='Seller Note Rate'
                            onChange={(e) => calculator(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 tex-center px-2 ps-md-10'>
                      <div className='mt-5'>
                        <h6 className='text-start'> Bank Annual Payment Total</h6>
                        <p className='text-start'>{bankPymt.toFixed(2)}</p>
                        <h6 className='text-start'> Seller Annual Payment Total</h6>
                        <p className='text-start'>{sellerPymt.toFixed(2)}</p>
                        <h6 className='text-start'>New Annual Cash Flow</h6>
                        <p className='text-start'>
                          ${(Number(EBITDA) * 0.85 - bankPymt - sellerPymt).toFixed(2)}
                        </p>
                        <h6 className='text-start'>DSR Bank</h6>
                        {EBITDA && bankPymt ? (
                          <p className='text-start'>
                            ${((Number(EBITDA) * 0.85) / Number(bankPymt)).toFixed(2)}
                          </p>
                        ) : (
                          0
                        )}
                        <h6 className='text-start'>DSR Total</h6>
                        {EBITDA && bankPymt && sellerPymt ? (
                          <p className='text-start'>
                            $
                            {(
                              (Number(EBITDA) * 0.85) /
                              (Number(bankPymt) + Number(sellerPymt))
                            ).toFixed(2)}
                          </p>
                        ) : (
                          0
                        )}
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey='profile' title='Weighted AVG'>
                  <div className='row mt-8'>
                    <div className='col-md-8'>
                      <div className='d-flex flex-wrap'>
                        <div className='col-12  px-2'>
                          <b htmlFor=''>Add Backs and EBITDA</b>
                          <div className='row mt-2'>
                            <div className='col-4'>
                              <label htmlFor='' className=' fw-bold'>
                                {new Date().getFullYear()}
                              </label>
                            </div>
                            <div className='col-4'>
                              <label htmlFor='' className=' fw-bold'>
                                {new Date().getFullYear() - 1}
                              </label>
                            </div>
                            <div className='col-4'>
                              <label htmlFor='' className=' fw-bold'>
                                {new Date().getFullYear() - 2}
                              </label>
                            </div>
                          </div>
                          <div className='row mt-1'>
                            <div className='col-4'>
                              <input
                                type='number'
                                name='Weighted-Add-Backs1'
                                value={WeightedAddBacks1}
                                className=' form-control form-control-solid '
                                placeholder='Add Backs'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                            <div className='col-4'>
                              <input
                                type='number'
                                name='Weighted-Add-Backs2'
                                value={WeightedAddBacks2}
                                className=' form-control form-control-solid '
                                placeholder='Add Backs'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                            <div className='col-4'>
                              <input
                                type='number'
                                name='Weighted-Add-Backs3'
                                value={WeightedAddBacks3}
                                className=' form-control form-control-solid '
                                placeholder='Add Backs'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                          </div>
                          <div className='row mt-2'>
                            <div className='col-4'>
                              <input
                                type='number'
                                name='Weighted-EBITDA-1'
                                value={WeightedEBITDA1}
                                className=' form-control form-control-solid '
                                placeholder='EBITDA'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                            <div className='col-4'>
                              <input
                                type='number'
                                name='Weighted-EBITDA-2'
                                value={WeightedEBITDA2}
                                className=' form-control form-control-solid '
                                placeholder='EBITDA'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                            <div className='col-4'>
                              <input
                                type='number'
                                name='Weighted-EBITDA-3'
                                value={WeightedEBITDA3}
                                className=' form-control form-control-solid '
                                placeholder='EBITDA'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-6 px-2 mt-3 mb-2'>
                          <label htmlFor='' className=' fw-bold  mb-1'>
                            Enter a Multiple
                          </label>

                          <input
                            type='number'
                            name='Weighted-Enter-a-Multiple'
                            value={weightedEnterMultiple}
                            className=' form-control form-control-solid '
                            placeholder='Enter a Multiple'
                            onChange={(e) => calculator(e)}
                          />
                        </div>
                        {/* <div className='col-6  px-2 mt-5'>
                          <label htmlFor=''>Weighted AVG</label>

                          <input
                            type='number'
                            name='Weighted-AVG'
                            value={WeightedAVG}
                            className=' form-control form-control-solid '
                            placeholder='Weighted AVG'
                            onChange={(e) => calculator(e)}
                          />
                        </div> */}
                      </div>
                    </div>
                    <div className='col-md-4 tex-center px-2'>
                      <div className='row mt-5 tex-center ps-md-10'>
                        {/* <h6 className='text-start'>Purchase Price</h6>
                        <p className='text-start'>$00.0</p> */}
                        <div className='col-md-12 col-6'>
                          <h6 className='text-start'>Weighted SDE</h6>
                          <div className='row mb-3'>
                            <div className='col-3'>
                              <b>{new Date().getFullYear()}</b>
                            </div>
                            <div className='col-9'>
                              {`$${
                                (Number(WeightedAddBacks1) + Number(WeightedEBITDA1)) *
                                Number(3).toFixed(2)
                              }`}
                            </div>
                          </div>
                          <div className='row mb-3'>
                            <div className='col-3'>
                              <b>{new Date().getFullYear() - 1}</b>
                            </div>
                            <div className='col-9'>
                              {`$${
                                (Number(WeightedAddBacks2) + Number(WeightedEBITDA2)) *
                                Number(2).toFixed(2)
                              }`}
                            </div>
                          </div>
                          <div className='row mb-3'>
                            <div className='col-3'>
                              <b>{new Date().getFullYear() - 2}</b>
                            </div>
                            <div className='col-9'>
                              {`$${
                                (Number(WeightedAddBacks3) + Number(WeightedEBITDA3)) *
                                Number(1).toFixed(2)
                              }`}
                            </div>
                          </div>
                        </div>
                        <div className='col-md-12 col-6'>
                          <h6 className='text-start'>Weighted AVG</h6>
                          <p className='text-start'>
                            {`$${(
                              (((Number(WeightedAddBacks1) + Number(WeightedEBITDA1)) * 3 +
                                (Number(WeightedAddBacks2) + Number(WeightedEBITDA2)) * 2 +
                                (Number(WeightedAddBacks3) + Number(WeightedEBITDA3)) * 1) /
                                6) *
                              Number(weightedEnterMultiple)
                            ).toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey='longer-tab' title='3 Year AVG'>
                  <div className='row mt-8'>
                    <div className='col-md-8'>
                      <div className='d-flex flex-wrap'>
                        {/* <div className='col-6  px-2'>
                          <label htmlFor=''>Purchase Price</label>
                          <input
                            type='number'
                            name='Weighted-price'
                            value={WeightedAskingPrice}
                            className=' form-control form-control-solid '
                            placeholder='Purchase Price'
                            onChange={(e) => calculator(e)}
                          />
                        </div>
                        <div className='col-6 px-2'>
                          <label htmlFor=''>EBITDA</label>

                          <input
                            type='number'
                            name='Weighted-EBITDA'
                            value={WeightedEBITDA1}
                            className=' form-control form-control-solid '
                            placeholder='EBITDA'
                            onChange={(e) => calculator(e)}
                          />
                        </div> */}
                        <div className='col-12  px-2'>
                          <b htmlFor=''>Add Backs and EBITDA</b>
                          <div className='row mt-2'>
                            <div className='col-4'>
                              <label htmlFor='' className=' fw-bold'>
                                {new Date().getFullYear()}
                              </label>
                            </div>
                            <div className='col-4'>
                              <label htmlFor='' className=' fw-bold'>
                                {new Date().getFullYear() - 1}
                              </label>
                            </div>
                            <div className='col-4'>
                              <label htmlFor='' className=' fw-bold'>
                                {new Date().getFullYear() - 2}
                              </label>
                            </div>
                          </div>
                          <div className='row mt-2'>
                            <div className='col-4'>
                              <input
                                type='number'
                                name='Weighted-Add-Backs1'
                                value={WeightedAddBacks1}
                                className=' form-control form-control-solid '
                                placeholder='Add Backs'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                            <div className='col-4'>
                              <input
                                type='number'
                                name='Weighted-Add-Backs2'
                                value={WeightedAddBacks2}
                                className=' form-control form-control-solid '
                                placeholder='Add Backs'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                            <div className='col-4'>
                              <input
                                type='number'
                                name='Weighted-Add-Backs3'
                                value={WeightedAddBacks3}
                                className=' form-control form-control-solid '
                                placeholder='Add Backs'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                          </div>
                          <div className='row mt-2'>
                            <div className='col-4'>
                              <input
                                type='number'
                                name='Weighted-EBITDA-1'
                                value={WeightedEBITDA1}
                                className=' form-control form-control-solid '
                                placeholder='EBITDA'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                            <div className='col-4'>
                              <input
                                type='number'
                                name='Weighted-EBITDA-2'
                                value={WeightedEBITDA2}
                                className=' form-control form-control-solid '
                                placeholder='EBITDA'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                            <div className='col-4'>
                              <input
                                type='number'
                                name='Weighted-EBITDA-3'
                                value={WeightedEBITDA3}
                                className=' form-control form-control-solid '
                                placeholder='EBITDA'
                                onChange={(e) => calculator(e)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-6 px-2 mt-2'>
                          <label htmlFor='' className='fw-bold  mb-1'>
                            Enter a Multiple
                          </label>

                          <input
                            type='number'
                            name='Weighted-Enter-a-Multiple'
                            value={weightedEnterMultiple}
                            className=' form-control form-control-solid '
                            placeholder='Enter a Multiple'
                            onChange={(e) => calculator(e)}
                          />
                        </div>
                        {/* <div className='col-6  px-2 mt-5'>
                          <label htmlFor=''>Weighted AVG</label>

                          <input
                            type='number'
                            name='Weighted-AVG'
                            value={WeightedAVG}
                            className=' form-control form-control-solid '
                            placeholder='Weighted AVG'
                            onChange={(e) => calculator(e)}
                          />
                        </div> */}
                      </div>
                    </div>
                    <div className='col-md-4 tex-center px-2'>
                      <div className='row mt-5 ps-md-10'>
                        {/* <h6 className='text-start'>Purchase Price</h6>
                        <p className='text-start'>$00.0</p> */}
                        <div className='col-md-12 col-6'>
                          <h6 className='text-start'>3 YEAR AVG SDE</h6>
                          <p className='text-start'>
                            {`$${(
                              (Number(WeightedAddBacks1) +
                                Number(WeightedAddBacks2) +
                                Number(WeightedAddBacks3) +
                                Number(WeightedEBITDA1) +
                                Number(WeightedEBITDA2) +
                                Number(WeightedEBITDA3)) /
                              3
                            ).toFixed(2)}`}
                          </p>
                        </div>
                        <div className='col-md-12 col-6'>
                          <h6 className='text-start'>3 YEAR AVG</h6>
                          <p className='text-start'>
                            {`$${(
                              ((Number(WeightedAddBacks1) +
                                Number(WeightedAddBacks2) +
                                Number(WeightedAddBacks3) +
                                Number(WeightedEBITDA1) +
                                Number(WeightedEBITDA2) +
                                Number(WeightedEBITDA3)) /
                                3) *
                              Number(weightedEnterMultiple)
                            ).toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        )}

        {props?.data[0]?.description != null &&
        props?.data[0]?.description != undefined &&
        props?.data[0]?.description != 'null' &&
        props?.data[0]?.description != '' &&
        props?.data[0]?.description != 'undefined' ? (
          <div className='row mt-10 biz-owner-business-description'>
            <div className='card px-5 px-md-15 '>
              <div className='card-header border-2 px-0 d-block pt-10 my-2 '>
                <h3 className='single-business-heading'>Business Description</h3>
                {/* <h6 className='pb-3 '>Own your own hometown restaurant!</h6> */}
              </div>
              <div className='py-5 px-0 biz-owner-paragraph'>
                <UnsafeComponent html={props?.data[0]?.description ?? '---'} />
              </div>
            </div>
          </div>
        ) : null}

        <div className='row mt-10 biz-owner-business-description'>
          <div className='card px-5 px-md-15'>
            <div className='card-header border-2 px-0 d-block pt-8 my-2 '>
              <h3 className='single-business-heading pb-5 '>Detailed Information</h3>
            </div>

            <div className='py-3 px-0'>
              <div className='row'>
                {props?.data[0]?.location != null &&
                props?.data[0]?.location != 'null' &&
                props?.data[0]?.location != 'undefined' &&
                props?.data[0]?.location != '' &&
                props?.data[0]?.location != undefined ? (
                  <>
                    <div className='col-md-4  my-3 biz-owner-detail-para-heading '>Location: </div>
                    <div className='col-md-8  my-3 biz-owner-paragraph'>
                      {props.data[0]?.location?.country ?? ''}
                    </div>
                  </>
                ) : null}

                {props?.data[0]?.real_estate_listing_type != null &&
                props?.data[0]?.real_estate_listing_type != 'null' &&
                props?.data[0]?.real_estate_listing_type != 'undefined' &&
                props?.data[0]?.real_estate_listing_type != '' &&
                props?.data[0]?.real_estate_listing_type != undefined ? (
                  <>
                    <div className='col-md-4  my-3 biz-owner-detail-para-heading '>
                      Real Estate:
                    </div>
                    <div className='col-md-8  my-3 biz-owner-paragraph'>
                      {props?.data[0]?.real_estate_listing_type?.type ?? ''}
                    </div>
                  </>
                ) : null}
                {props?.data[0]?.business_meta?.building_sf != null &&
                props?.data[0]?.business_meta?.building_sf != undefined &&
                props?.data[0]?.business_meta?.building_sf != 'undefined' &&
                props?.data[0]?.business_meta?.building_sf != '' &&
                props?.data[0]?.business_meta?.building_sf != 'null' ? (
                  <>
                    <div className='col-md-4  my-3 biz-owner-detail-para-heading '>
                      Building SF:
                    </div>
                    <div className='col-md-8  my-3 biz-owner-paragraph'>
                      {props?.data[0]?.business_meta?.building_sf ?? ''}
                    </div>
                  </>
                ) : null}

                {props?.data[0]?.business_meta?.total_employees != 'null' &&
                props?.data[0]?.business_meta?.total_employees != undefined &&
                props?.data[0]?.business_meta?.total_employees != 'undefined' &&
                props?.data[0]?.business_meta?.total_employees != '' &&
                props?.data[0]?.business_meta?.total_employees != null ? (
                  <>
                    <div className='col-md-4  my-3 biz-owner-detail-para-heading '>Employees:</div>
                    <div className='col-md-8  my-3 biz-owner-paragraph'>
                      {props?.data[0]?.business_meta?.total_employees ?? ''}
                    </div>
                  </>
                ) : null}
                {props?.data[0]?.business_meta?.ffe != 'null' &&
                props?.data[0]?.business_meta?.ffe != null &&
                props?.data[0]?.business_meta?.ffe != 'undefined' &&
                props?.data[0]?.business_meta?.ffe != '' &&
                props?.data[0]?.business_meta?.ffe != undefined ? (
                  <>
                    <div className='col-md-4  my-3 biz-owner-detail-para-heading '>
                      Furniture, Fixtures, & Equipments (FF&E):
                    </div>
                    <div className='col-md-8  my-3 biz-owner-paragraph'>
                      {props?.data[0]?.business_meta?.ffe ?? ''}
                    </div>
                  </>
                ) : null}
                {props?.data[0]?.business_meta?.facilities != 'null' &&
                props?.data[0]?.business_meta?.facilities != null &&
                props?.data[0]?.business_meta?.facilities != 'undefined' &&
                props?.data[0]?.business_meta?.facilities != '' &&
                props?.data[0]?.business_meta?.facilities != undefined ? (
                  <>
                    <div className='col-md-4  my-3 biz-owner-detail-para-heading '>Facilities:</div>
                    <div className='col-md-8  my-3 biz-owner-paragraph'>
                      {props?.data[0]?.business_meta?.facilities ?? ''}
                    </div>
                  </>
                ) : null}
                {props?.data[0]?.business_meta?.competition != 'null' &&
                props?.data[0]?.business_meta?.competition != null &&
                props?.data[0]?.business_meta?.competition != 'undefined' &&
                props?.data[0]?.business_meta?.competition != '' &&
                props?.data[0]?.business_meta?.competition != undefined ? (
                  <>
                    <div className='col-md-4 my-3 biz-owner-detail-para-heading '>Competition:</div>
                    <div className='col-md-8  my-3 biz-owner-paragraph'>
                      {props?.data[0]?.business_meta?.competition ?? ''}
                    </div>
                  </>
                ) : null}

                {props?.data[0]?.business_meta?.growth_expansion != 'null' &&
                props?.data[0]?.business_meta?.growth_expansion != null &&
                props?.data[0]?.business_meta?.growth_expansion != 'undefined' &&
                props?.data[0]?.business_meta?.growth_expansion != '' &&
                props?.data[0]?.business_meta?.growth_expansion != undefined ? (
                  <>
                    <div className='col-md-4 my-3 biz-owner-detail-para-heading '>
                      Growth & Expansion:
                    </div>
                    <div className='col-md-8  my-3 biz-owner-paragraph'>
                      {props?.data[0]?.business_meta?.growth_expansion ?? ''}
                    </div>
                  </>
                ) : null}
                {props?.data[0]?.business_meta?.support_training != 'null' &&
                props?.data[0]?.business_meta?.support_training != null &&
                props?.data[0]?.business_meta?.support_training != 'undefined' &&
                props?.data[0]?.business_meta?.support_training != '' &&
                props?.data[0]?.business_meta?.support_training != undefined ? (
                  <>
                    <div className='col-md-4 my-3 biz-owner-detail-para-heading '>
                      Support & Training:
                    </div>
                    <div className='col-md-8  my-3 biz-owner-paragraph'>
                      {props?.data[0]?.business_meta?.support_training ?? ''}
                    </div>
                  </>
                ) : null}
                {props?.data[0]?.business_meta?.reason_for_selling != 'null' &&
                props?.data[0]?.business_meta?.reason_for_selling != null &&
                props?.data[0]?.business_meta?.reason_for_selling != 'undefined' &&
                props?.data[0]?.business_meta?.reason_for_selling != '' &&
                props?.data[0]?.business_meta?.reason_for_selling != undefined ? (
                  <>
                    <div className='col-md-4 my-3 biz-owner-detail-para-heading '>
                      Reason for Selling:
                    </div>
                    <div className='col-md-8  my-3 biz-owner-paragraph'>
                      {props?.data[0]?.business_meta?.reason_for_selling ?? ''}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className='row mt-10 biz-owner-business-description  py-5'>
          <div className='card px-5 px-md-15'>
            <div className=' px-0 d-block pt-4 my-2 '>
              <h3 className='single-business-heading '>
                <span className='pe-1'>
                  <img className='mb-1' src={businessLocation} alt='' width={12} />
                </span>
                Business Location
              </h3>
            </div>

            {props?.data[0]?.location?.lat ? (
              <div className='mb-5 px-0 mx-auto w-100'>
                <iframe
                  title='iframe'
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDcLGFU2zAn2rITMgtWVTkiGnuOPnqmtCU&q=${props?.data[0]?.location.lat},${props?.data[0]?.location.lng}`}
                  // src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDcLGFU2zAn2rITMgtWVTkiGnuOPnqmtCU=${props?.data[0]?.location.formatted_address}`}
                  className='w-100 biz-owner-detail-map'
                  //   style={border:"1px"}

                  allowFullscreen=''
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                ></iframe>
              </div>
            ) : (
              <div className='mb-5 px-0 mx-auto w-100 d-flex'>
                <span className='pe-1'>{props?.data[0]?.location?.address ?? ''},</span>
                <span className='pe-1'> {props?.data[0]?.location?.city ?? ''},</span>
                <span className='pe-1'> {props?.data[0]?.location?.country ?? ''}</span>
              </div>
            )}
          </div>
        </div>
      </>

      {/* Share modal  */}
      <div className='modal fade' tabIndex={-1} id='kt_modal_Share'>
        <div className='modal-dialog '>
          <div className='modal-content'>
            <button
              type='button'
              className='btn-close me-1'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
            {/*end::Close*/}

            <div className='modal-body'>
              <div className='row'>
                <h4 className='text-center'>Share this Business for Sale Listing</h4>
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
      </div>
      {/*  */}
      <Modal show={isShowModal} onHide={modalClose}>
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
                placeholder='Email Address'
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
            <div className='d-flex justify-content-between '>
              <h5 className='modal-title p-4 fs-3' id='staticBackdropLabel'>
                Share business
              </h5>
              <button
                type='button'
                className='btn-close p-4'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body pt-0'>
              <div className='mb-2 d-flex justify-content-center'>
                <span
                  className='social-media-icons cursor-pointer px-3 facebook-share-back-ground '
                  data-bs-toggle='tooltip'
                  data-bs-placement='top'
                  title='Facebook'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <FacebookShareButton
                    url={`https://bizownersell.jgago.com/businesses/${props.data.slug}/${props.data.id}`}
                    quote={'dynamic Title'}
                  >
                    <img src={facebookIcon} alt='' width={47} className='' />
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
                    body={props?.data[0]?.description}
                    url={`https://bizownersell.jgago.com/businesses/${props?.data[0].slug}/${props?.data[0].id}`}
                  >
                    <img src={emailIcon} alt='' width={50} className='' />
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
                    url={`https://bizownersell.jgago.com/businesses/${props?.data[0].slug}/${props?.data[0].id}`}
                  >
                    <img src={twitter} alt='' width={48} className='' />
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
                    url={`https://bizownersell.jgago.com/businesses/${props?.data[0].slug}/${props?.data[0].id}`}
                  >
                    <img src={linkedinIcon} alt='' width={48} className='' />
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

      {/* valuation */}

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

export default Detail
