import React, {useEffect, useState} from 'react'
// import PhoneInput from 'react-phone-input-2'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Modal} from 'react-bootstrap'
import {GrFacebookOption} from 'react-icons/gr'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import {
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
//
import redHeart from '../../../assets/icons/redHeart.svg'
import dummyImg from '../../../assets/dummy.jpg'
import {loginUser} from '../../services/auth-services/AuthServices'
import {addFavorite} from '../../services/common-services'
import {getSingleBusiness} from '../../services/forSearchBusiness/Index'
import {requestBusinessesConnected} from '../../services/forSearchBusiness/Index'
//
import locationIcon from '../../../assets/icons/location.svg'
// import twitter from '../../../assets/icons/twitter.svg'
// import emailIcon from '../../../assets/icons/emailIcon.svg'
// import linkedinIcon from '../../../assets/icons/linkedinIcon.svg'
import heart from '../../../assets/icons/heartIcon.svg'
import dollar from '../../../assets/icons/dollarIcon.svg'
import contactBtn from '../../../assets/icons/contact-btn-icon.svg'
import ButtonLoader from '../../../assets/Loader/ButtonLoader.gif'
import twitter from '../../../assets/icons/social-share-icons/twitter.svg'
import facebookIcon from '../../../assets/icons/social-share-icons/facebookIcon.svg'
import linkedinIcon from '../../../assets/icons/social-share-icons/linkedinIcon.svg'
import emailIcon from '../../../assets/icons/social-share-icons/emailIcon.svg'
import './ForSaleListing.css'
import '../search-broker/BrokerDetails.css'
import {modalText} from '../../alert-text'
import Swal from 'sweetalert2'
const ForSaleListings = (props) => {
  const navigate = useNavigate()
  const [carouselImg, setCarouselImg] = useState([])
  const [firstName, setFirstName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedId, setSelectedId] = useState()
  const [btnContactId, setBtnContactId] = useState([])
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [logOutSaveListings, setLogOutSaveListings] = useState('')
  const [selectedListTitle, setSelectedListTitle] = useState('')
  //
  // validation
  const [loginEmailValidation, setLoginEmailValidation] = useState(false)
  const [loginPasswordValidation, setLoginPasswordValidation] = useState(false)
  const [phoneValiDation, setPhoneValiDation] = useState(false)
  const [fNameValiDation, setFNameValiDation] = useState(false)
  const [emailValiDation, setEmailValiDation] = useState(false)
  const [isContinueBtn, setIsContinueBtn] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [isModalShow, setShow] = useState(false)
  const [messageValiDation, setMessageValiDation] = useState(false)
  let id = props.imgId
  let dispatch = useDispatch()

  let businessContactId = []

  const tokenData = localStorage.getItem('userData')

  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(JSON.stringify(userData) || '')
  let contactId = JSON?.parse(localStorage.getItem('businessContactId'))
  useEffect(() => {
    if (contactId) {
      setBtnContactId(contactId.businessContactId)
    }
    setCarouselImg(props?.img)
  }, [])
  const saveListing = async (e, id) => {
    e.preventDefault()
    let type
    if (e.target.parentNode.classList[0] == 'biz_owner_carousel_img_camera') {
      type = 'favorite'
      e.target.setAttribute('src', redHeart)
    } else if (e.target.parentNode.classList[0] != 'biz_owner_carousel_img_camera') {
      type = 'unfavorite'
      e.target.setAttribute('src', heart)
    }
    if (e.target.id == props?.id) {
      e.target.parentNode.classList.toggle('biz_owner_carousel_img_camera-active')

      e.target.parentNode.classList.toggle('biz_owner_carousel_img_camera')
    }

    const response = await addFavorite(accessToken, 'business', id, type)
  }
  const logOutSaveListing = async (e, id) => {
    e.preventDefault()
    setLogOutSaveListings(e.target)
    setShow(true)
  }

  const inputChange = async (e) => {
    switch (e.target.name) {
      case 'firstName':
        await setFirstName(e.target.value)
        setFNameValiDation(false)

        break

      case 'email':
        await setEmail(e.target.value)
        setEmailValiDation(false)
        break

      case 'message':
        await setMessage(e.target.value)
        setMessageValiDation(false)
        break
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
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const sentMessage = async (e, id) => {
    if (contactId) {
      businessContactId = contactId.businessContactId
    }

    if (phone == '' || phone == undefined || phone.length < 6) {
      setPhoneValiDation(true)
    }
    if (firstName == '' || firstName == undefined) {
      setFNameValiDation(true)
    }
    if (email == '' || email == undefined || !isValidEmail(email)) {
      setEmailValiDation(true)
    }
    if (message == '' || message == undefined) {
      setMessageValiDation(true)
    }
    if (
      phone != '' &&
      phone != undefined &&
      phone.length > 5 &&
      firstName != '' &&
      firstName != undefined &&
      message != '' &&
      message != undefined &&
      email != '' &&
      email != undefined &&
      isValidEmail(email)
    ) {
      setIsContinueBtn(true)

      const response = await requestBusinessesConnected(
        'single',
        firstName,
        email,
        phone,
        id,
        message
      )
      setPhone('')
      setFirstName('')
      setEmail('')
      setMessage('')
      businessContactId.push(id)

      if (response.status == true) {
        setIsContinueBtn(false)
        if (selectedId.id == 'contact-icon') {
          selectedId.parentNode.classList.add('business-disable-btn')
          selectedId.parentNode.classList.add('px-9')
          selectedId.parentNode.classList.add('disabled')
          selectedId.parentNode.classList.remove('biz-owner-contact-btn')
          selectedId.parentNode.textContent = 'Contacted'
          setSelectedId('')
        } else {
          selectedId.classList.add('business-disable-btn')
          selectedId.classList.add('px-9')
          selectedId.classList.add('disabled')
          selectedId.classList.remove('biz-owner-contact-btn')
          selectedId.textContent = 'Contacted'
          setSelectedId('')
        }

        // localStorage.setItem('businessContactId', JSON.stringify(businessContactId))
        localStorage.setItem(
          'businessContactId',
          JSON.stringify({
            businessContactId: businessContactId,
          })
        )
      }
    }
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

          const response = await addFavorite(result.token, 'business', id, 'favorite')

          if (response.status == true) {
            logOutSaveListings.parentNode.classList.toggle('biz_owner_carousel_img_camera-active')

            logOutSaveListings.parentNode.classList.toggle('biz_owner_carousel_img_camera')
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

  const phoneNumberHandler = async (phone) => {
    await setPhone(phone)
    await setPhoneValiDation(false)
  }

  const contactBusiness = async (e, id, title) => {
    setSelectedListTitle(title)
    setSelectedId(e.target)
  }
  const dynamicOgTags = async (e, slug, description, fullIndex) => {
    // console.log('object', fullIndex?.img[0]?.full_path + fullIndex?.img[0]?.file_name)
    {
      document.querySelector('meta[property="og:title"]').setAttribute('content', slug)
    }
    {
      document
        .querySelector('meta[property="og:description"]')
        .setAttribute('content', description?.replace(/(<([^>]+)>)/gi, ''))
    }

    {
      document
        .querySelector('meta[property="og:image"]')
        .setAttribute('content', fullIndex?.img[0]?.full_path + fullIndex?.img[0]?.file_name)
    }
  }
  function UnsafeComponent({html}) {
    const decodedHTML = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    return <div dangerouslySetInnerHTML={{__html: decodedHTML}} />
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
      <div className=' row biz-owner-buy-a-business-components  p-4'>
        <div className='col-md-3 px-0'>
          <div className='biz_owner_carousel_container d-md-flex   px-0 pt-1  '>
            <div
              id={id}
              className='carousel slide carousel-slide-container  w-100 d-md-flex'
              data-interval='false'
              data-bs-ride='carousel'
            >
              <Link to={`/${props?.type}/${props?.slug}/${props?.id}`} className='w-100'>
                <div className='carousel-inner carousel-inner-container d-md-flex  position-relative'>
                  {carouselImg?.length > 0 ? (
                    <>
                      {carouselImg[0]?.full_path ? (
                        <div className='carousel-item active'>
                          <img
                            src={carouselImg[0]?.full_path + 'medium/' + carouselImg[0]?.file_name}
                            className='  biz-owner-carousel-imgs img-fluid'
                            alt='...'
                            style={{height: '100%'}}
                          />
                        </div>
                      ) : (
                        <div className='carousel-item active'>
                          <img
                            src={dummyImg}
                            className='biz-owner-carousel-imgs img-fluid'
                            alt='...'
                          />
                        </div>
                      )}
                    </>
                  ) : null}

                  {/* {carouselImg?.length
                    ? carouselImg?.map((item, index) =>
                        index > 0 ? (
                          <div className='carousel-item ' key={index}>
                            <img
                              src={item.full_path + 'medium/' + item.file_name}
                              className='biz-owner-carousel-imgs img-fluid'
                              alt='...'
                              style={{height: '100%'}}
                            />
                          </div>
                        ) : null
                      )
                    : null} */}
                </div>
              </Link>

              {/* {carouselImg?.length > 1 ? (
                <>
                  <button
                    className=' carousel-control-prev'
                    type='button'
                    name='fcv'
                    data-bs-target={`#${id}`}
                    data-bs-slide='prev'
                  >
                    <span className='carousel-control-prev-icon  mt-1 ' aria-hidden='true' />

                    <span className='visually-hidden'>Previous</span>
                  </button>
                  <button
                    className='carousel-control-next'
                    type='button'
                    data-bs-target={`#${id}`}
                    data-bs-slide='next'
                  >
                    <span className='carousel-control-next-icon  mt-1' aria-hidden='true' />

                    <span className='visually-hidden'>Next</span>
                  </button>
                </>
              ) : null} */}
            </div>
          </div>
        </div>
        <div className='col-md-6 px-2'>
          <div className='mt-5 mt-md-0 px-0 ps-md-3 h-100 pe-md-5 text-wrap biz-owner-end-border   d-flex flex-column justify-content-between'>
            <Link to={`/${props?.type}/${props.slug}/${props.id}`} className='pb-4'>
              <h1 className=' biz-owner-heading py-0 my-0 mb-md-0 mb-5 me-0 text-wrap align-top'>
                {props?.title ? props?.title?.substring(0, 40) : 'NaN'}
                {props?.title?.length >= 40 && '...'}
              </h1>
              <p className='biz-owner-location-heading my-3 bizOwner-line-breaker'>
                {props.locationVisibility?.slug === 'show-no-location' ? (
                  ''
                ) : (
                  <span className='biz-owner-location-icon me-4 '>
                    <img className='mb-1' src={locationIcon} alt='' width={13} />
                    {/* <VscLocation /> */}
                  </span>
                )}
                {/* {props.location ?? 'NaN'} */}
                {props?.location?.lat ? (
                  <>
                    {props.locationVisibility?.slug === 'show-full-visibility'
                      ? props?.location?.formatted_address?.substring(0, 30)
                      : props.locationVisibility?.slug === 'show-city-country-state'
                      ? props?.location?.city?.substring(0, 30) +
                        ' ' +
                        props?.location?.province?.substring(0, 30) +
                        ' ' +
                        props?.location?.country?.substring(0, 30)
                      : props.locationVisibility?.slug === 'show-country-state'
                      ? props?.location?.province?.substring(0, 30) +
                        ' ' +
                        props?.location?.country?.substring(0, 30)
                      : props.locationVisibility?.slug === 'show-state-only'
                      ? props?.location?.province?.substring(0, 30)
                      : props.locationVisibility?.slug === 'show-no-location'
                      ? ''
                      : null}
                  </>
                ) : (
                  <>
                    <span className='bizOwner-line-breaker'>
                      {props?.data?.location?.country?.substring(0, 30) ?? 'NaN'}
                    </span>
                  </>
                )}
              </p>
              <span className='d-flex biz-owner-business-paragraph biz-owner-line-breaker '>
                {/* {props?.dec?.replace(/(<([^>]+)>)/gi, ' ') ?? 'NaN'} */}
                <UnsafeComponent html={props?.dec ?? '---'} />
              </span>
            </Link>
            {props?.type === 'businesses' ? (
              <>
                {props?.listingType?.listing_type !== null &&
                  props?.listingType?.listing_type !== undefined && (
                    <>
                      {props?.listingType?.listing_type?.type ? (
                        <div className='mb-2'>
                          <span className='bg-secondary py-1 px-2' style={{borderRadius: '5px'}}>
                            {props?.listingType?.listing_type?.type ?? '---'}
                          </span>
                        </div>
                      ) : null}
                    </>
                  )}
              </>
            ) : props?.type === 'franchise' ? (
              <>
                {props?.listingType?.franchise_category !== null &&
                  props?.listingType?.franchise_category !== undefined && (
                    <>
                      {props?.listingType?.franchise_category?.name ? (
                        <div className='mb-2'>
                          <span
                            className='bg-secondary py-1 px-2 text-truncate'
                            style={{borderRadius: '5px'}}
                          >
                            {props?.listingType?.franchise_category?.name ?? '---'}
                          </span>
                        </div>
                      ) : null}
                    </>
                  )}
              </>
            ) : null}

            {/* <div className='mb-2'>
              <span
                className='social-media-icons cursor-pointer px-2'
                data-bs-toggle='tooltip'
                data-bs-placement='top'
                title='Facebook'
                onClick={(e) => dynamicOgTags(e, props?.slug, props?.dec, props?.fullIndex)}
              >
                <FacebookShareButton
                  url={`https://bizownersell.jgago.com/${props?.type}/${props.slug}/${props.id}`}
                  // title={props?.title}
                  // hashtag={`#${props?.title}`}
                >
                  <img src={facebookIcon} alt='' width={18} />
                </FacebookShareButton>
              </span>

              <span
                className='social-media-icons cursor-pointer px-2'
                data-bs-toggle='tooltip'
                data-bs-placement='top'
                title='Email'
                onClick={(e) => dynamicOgTags(e, props?.slug, props?.dec, props?.fullIndex)}
              >
                <EmailShareButton
                  className='pe-0'
                  subject={props?.title}
                  body={props?.dec?.replace(/(<([^>]+)>)/gi, ' ')}
                  url={`https://bizownersell.jgago.com/${props?.type}/${props.slug}/${props.id}`}
                >
                  <img src={emailIcon} alt='' width={17} />
                </EmailShareButton>
              </span>

              <span
                className='social-media-icons cursor-pointer px-2'
                data-bs-toggle='tooltip'
                data-bs-placement='top'
                title='Twitter'
                onClick={(e) => dynamicOgTags(e, props?.slug, props?.dec, props?.fullIndex)}
              >
                <TwitterShareButton
                  url={`https://bizownersell.jgago.com/${props?.type}/${props.slug}/${props.id}`}
                >
                  <img src={twitter} alt='' width={18} />
                </TwitterShareButton>
              </span>
              <span
                className='cursor-pointer px-2'
                data-bs-toggle='tooltip'
                data-bs-placement='top'
                title='Linkedin'
                onClick={(e) => dynamicOgTags(e, props?.slug, props?.dec, props?.fullIndex)}
              >
                <LinkedinShareButton
                  url={`https://bizownersell.jgago.com/${props?.type}/${props.slug}/${props.id}`}
                >
                  <img src={linkedinIcon} alt='' width={15} />
                </LinkedinShareButton>
              </span>
            </div> */}
          </div>
        </div>
        <div className='col-md-3'>
          <div className=' text-md-end  mt-4 mt-md-0 px-0 pe-md-2 pb-5 pb-md-0  h-100  d-flex flex-column justify-content-between align-items-md-end  '>
            <div className='d-flex flex-wrap justify-content-between d-md-block '>
              <h2 className=' my-4 my-md-0 text-nowrap biz-owner-business-price biz-owner-text-break'>
                <span className='mx-md-2 biz-owner-price-dollar-icon text-dark'>
                  <img src={dollar} alt='' />
                </span>
                <span className='biz-owner-text-break'> {props.price ?? 'NaN'}</span>
              </h2>
              <h6 className=' mt-5  mb-0 cash-flow text-md-end biz-owner-text-break'>
                Cash Flow: ${props.cashFlow ?? 'NaN'}
              </h6>
            </div>
            <div className='mt-5 mt-md-0 d-flex  flex-md-nowrap'>
              {transformedData ? (
                <>
                  {props?.favorite == null ? (
                    <div className='biz_owner_carousel_img_camera'>
                      <img
                        src={heart}
                        alt=''
                        id={props?.id}
                        className=' mx-auto d-block  img-fluid biz-owner-heart-icon-save-listings pt-1 cursor-pointer '
                        name='save-listings'
                        onClick={(e) =>
                          role == 'agent' ? agentAlertHandler() : saveListing(e, props?.id)
                        }
                      />
                    </div>
                  ) : (
                    <div className='biz_owner_carousel_img_camera-active'>
                      <img
                        src={redHeart}
                        alt=''
                        id={props?.id}
                        className=' mx-auto d-block  img-fluid biz-owner-heart-icon-save-listings pt-1 cursor-pointer '
                        name='save-listings'
                        onClick={(e) =>
                          role == 'agent' ? agentAlertHandler() : saveListing(e, props?.id)
                        }
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className='biz_owner_carousel_img_camera'>
                  <img
                    src={heart}
                    alt=''
                    id={props?.id}
                    onClick={(e) => logOutSaveListing(e)}
                    className=' mx-auto d-block img-fluid biz-owner-heart-icon-save-listings pt-1 cursor-pointer '
                  />
                </div>
              )}
              {isContinueBtn ? (
                <div className='float-right'>
                  <button
                    type='button'
                    className='btn px-9 pe-11  text-nowrap btn-primary  disabled bg-primary  py-3'
                    // '#kt_modal_contact'
                    style={{borderRadius: '25px'}}
                  >
                    <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
                  </button>
                </div>
              ) : btnContactId?.includes(props?.id) ? (
                <div className='float-right w-100'>
                  <button
                    type='button'
                    className='btn px-7  text-nowrap business-disable-btn btn-primary disabled  py-3'
                  >
                    Contacted
                  </button>
                </div>
              ) : (
                <div className='float-right w-100'>
                  <button
                    type='button'
                    className='btn px-7  text-nowrap biz-owner-contact-btn  py-3'
                    onClick={(e) =>
                      role == 'agent'
                        ? agentAlertHandler()
                        : contactBusiness(e, props?.id, props?.title)
                    }
                    data-bs-toggle={role == 'agent' ? null : 'modal'}
                    data-bs-target={`#kt_modal_contact${props?.id}_contact`}
                  >
                    <img
                      className='pb-1 pe-3 '
                      id='contact-icon'
                      src={contactBtn}
                      alt=''
                      width={31}
                    />
                    Contact
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='modal fade' tabIndex={-1} id={`kt_modal_contact${props.id}_contact`}>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header p-3'>
              <h5 className='modal-title ps-2'>Contact "{`${selectedListTitle}`}"</h5>

              <button
                type='button'
                className='btn-close me-1'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body pb-3'>
              <div className='row'>
                <div className='col-md-9 mx-auto'>
                  <div className='mb-10'>
                    <label htmlFor='exampleFormControlInput1' className=' form-label required'>
                      Full Name
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      value={firstName}
                      className='form-control form-control-solid'
                      placeholder='John Doe'
                      onChange={(e) => inputChange(e)}
                    />
                    {fNameValiDation ? (
                      <div className='biz_owner_input_validation'>Enter full name</div>
                    ) : null}
                  </div>

                  <div className='-6 mb-10'>
                    <label className='form-label required'>Phone Number For Listing</label>

                    <PhoneInput country={'us'} value={phone} onChange={phoneNumberHandler} />
                    {phoneValiDation ? (
                      <div className='biz_owner_input_validation'>Enter correct phone number</div>
                    ) : null}
                  </div>
                  <div className='mb-10'>
                    <label htmlFor='exampleFormControlInput1' className=' form-label required'>
                      Email Address
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={email}
                      className='form-control form-control-solid'
                      placeholder='johndoe@email.com'
                      onChange={(e) => inputChange(e)}
                    />
                    {emailValiDation ? (
                      <div className='biz_owner_input_validation'>Invalid email address</div>
                    ) : null}
                  </div>
                  <div className='mb-10'>
                    <label htmlFor='exampleFormControlInput1' className=' form-label required'>
                      Message
                    </label>
                    <textarea
                      type='textarea'
                      name='message'
                      value={message}
                      className='form-control form-control-solid'
                      placeholder='Message'
                      onChange={(e) => inputChange(e)}
                    />
                    {messageValiDation ? (
                      <div className='biz_owner_input_validation'>Enter message</div>
                    ) : null}
                  </div>
                </div>
                {/* <div className='col-3 ms-5'> */}
              </div>
            </div>

            <div className=' text-center d-flex flex-column pb-3'>
              <div>
                {email != '' &&
                isValidEmail(email) &&
                email != undefined &&
                firstName != '' &&
                firstName != undefined &&
                message !== '' &&
                message !== undefined &&
                phone != '' &&
                phone.length > 5 ? (
                  <button
                    type='button'
                    className='btn btn-primary mb-4'
                    data-bs-dismiss='modal'
                    onClick={(e) => sentMessage(e, props.id)}
                  >
                    Send Message
                  </button>
                ) : (
                  <button
                    type='button'
                    className='btn btn-contact-dismiss  mb-4  '
                    // data-bs-dismiss='modal'

                    onClick={(e) => sentMessage(e, props.id)}
                  >
                    Send Message
                  </button>
                )}
              </div>
              <div>
                <p>
                  By clicking the button, you agree to BizOwnerSell’s
                  <a className='ps-1' href='/terms-of-use' target='_blank'>
                    Terms of use
                  </a>{' '}
                  and{' '}
                  <a href='/privacy-notice' target='_blank'>
                    Privacy Notice
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={isModalShow} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='col-12'>
            <h4 className='text-center my-3'>Sign in to Save this listing</h4>
            <p className='text-center mb-4'>
              Don't have an account?{' '}
              <span
                className='text-primary cursor-pointer'
                onClick={() => navigate('/auth/registration')}
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                Create one Here.
              </span>
            </p>
            {loginStatus == true && (
              <p className='text-center text-danger mt-4'>Invalid login credentials</p>
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
            loginEmail.includes('@') &&
            loginPassword != '' &&
            loginPassword != undefined ? (
              <div>
                <button
                  type='submit'
                  className='btn btn-primary  px-12'
                  id='kt_sign_in_submit'
                  onClick={(e) => loginHandler(e, props?.id, props?.favorite)}
                  style={{borderRadius: '22px'}}
                >
                  Sign In
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
                  Sign In
                </button>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ForSaleListings
