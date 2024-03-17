import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import {useDispatch} from 'react-redux'
// import PhoneInput from 'react-phone-number-input'
// import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {Modal} from 'react-bootstrap'
import UnlockSubscription from '../../unlock-subscription/UnlockSubscription'
import {requestBusinessesConnected} from '../../services/forSearchBusiness/Index'

import {loginUser} from '../../services/auth-services/AuthServices'
import {addFavorite} from '../../services/common-services'
import ButtonLoader from '../../../assets/Loader/ButtonLoader.gif'
import locationIcon from '../../../assets/icons/location.svg'

import heart from '../../../assets/icons/heartIcon.svg'
import redHeart from '../../../assets/icons/redHeart.svg'
import dollar from '../../../assets/icons/dollarIcon.svg'
import contactBtn from '../../../assets/icons/contact-btn-icon.svg'

import './BusinessDetail.css'

import {modalText, ownListingAlert} from '../../alert-text'
const BusinessDetail = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [carouselImg, setCarouselImg] = useState(props.img)
  const [firstName, setFirstName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedId, setSelectedId] = useState()
  const [btnContactId, setBtnContactId] = useState([])
  const [isShowPackageModal, setIsShowPackageModal] = useState(false)
  const [defaultCountry, setDefaultCountry] = useState('US')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(
    'I would like to inquire about your business please contact me at your earliest convenience'
  )
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [logOutSaveListings, setLogOutSaveListings] = useState()
  const [selectedListTitle, setSelectedListTitle] = useState('')
  const [isContinueBtn, setIsContinueBtn] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [isModalShow, setShow] = useState(false)
  //  validations
  const [phoneValiDation, setPhoneValiDation] = useState(false)
  const [messageValiDation, setMessageValiDation] = useState(false)
  const [fNameValiDation, setFNameValiDation] = useState(false)
  const [emailValiDation, setEmailValiDation] = useState(false)
  const [loginEmailValidation, setLoginEmailValidation] = useState(false)
  const [loginPasswordValidation, setLoginPasswordValidation] = useState(false)
  const tokenData = localStorage.getItem('userData')
  const userData = localStorage.getItem('userData')
  const [modalTitle, setModalTitle] = useState('Please select a plan to access more features')
  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  let contactId = JSON?.parse(localStorage.getItem('businessContactId'))
  const transformedData = JSON?.parse(JSON.stringify(userData) || '')
  const {accessToken} = transtokenData
  const {role} = transtokenData
  const {userName} = transtokenData

  let carouselID = props.imgId
  let businessContactId = []
  // let selectedListTitle
  useEffect(() => {
    if (contactId) {
      setBtnContactId(contactId.businessContactId)
    }
  }, [])
  const saveListing = async (e, id) => {
    e.preventDefault()

    let type
    if (e.target.parentNode.classList[0] == 'biz_owner_carousel_img_camera') {
      setIsShowPackageModal(true)
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
    if (isValidEmail(email)) {
      setEmailValiDation(false)
    } else if (!isValidEmail(email)) {
      console.log('ddddddddddd')
      setEmailValiDation(true)
    }
    // let email = email.trim().toUpperCase()
    // if (email == '' || email == undefined || !email.endsith('.COM')) {
    //   setEmailValidation(true)
    // }
    if (message == '' || message == undefined) {
      setMessageValiDation(true)
    }
    if (
      phone != '' &&
      phone != undefined &&
      phone.length > 5 &&
      firstName != '' &&
      firstName != undefined &&
      message !== '' &&
      message !== undefined &&
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
        Swal.fire({
          text: 'Email has been sent successfully',

          icon: 'success',
          // timer: 2000,
          confirmButtonColor: '#009ef7',

          confirmButtonText: 'Ok',
        })

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

    // console.log(fName, phone, email, message, id)
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

  const phoneNumberHandler = async (value) => {
    await setPhone(value)
    await setPhoneValidation(false)
  }

  const getSingleBusinessData = async (e, id, title) => {
    setSelectedListTitle(title)
    setSelectedId(e.target)
  }

  const updateModalTitle = (newTitle) => {
    if (newTitle == 'close') {
      setIsShowPackageModal(false)
    } else {
      setModalTitle(newTitle)
    }
  }
  const badgeFilterHandler = (newTitle) => {
    localStorage.setItem(
      'listingsID',
      JSON.stringify({
        listingsID: [props?.listingType?.id],
      })
    )
    localStorage.setItem(
      'listingName',
      JSON.stringify([{id: props?.listingType?.id, name: props?.listingType?.type}])
    )
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    props.getFilterData()
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
  function ownListingHandler() {
    Swal.fire({
      text: ownListingAlert,

      icon: 'warning',
      // timer: 2000,
      confirmButtonColor: '#009ef7',

      confirmButtonText: 'Ok',
    })
  }
  return (
    <>
      <div className=' row biz-owner-buy-a-business-component  p-4'>
        <div className=' col-md-3 px-0'>
          <div className='biz_owner_carousel_container d-md-flex h-100  px-0 pt-1 '>
            <div
              id={carouselID}
              className='carousel slide carousel-slide-container  w-100 d-md-flex'
              data-interval='false'
              data-bs-ride='carousel'
            >
              <Link
                to={`${
                  userName == props?.username
                    ? `/my-business/${props?.slug}/${props?.id}`
                    : `/businesses/${props?.slug}/${props?.id}`
                } `}
                className='w-100'
              >
                <div className='carousel-inner carousel-inner-container d-md-flex  position-relative'>
                  {carouselImg[0]?.full_path ? (
                    <div className='carousel-item h-100 w-100 active '>
                      <img
                        src={carouselImg[0]?.full_path + '/medium/' + carouselImg[0]?.file_name}
                        className='d-block m-auto  img-fluid business-image'
                        alt='...'
                        style={{height: '100%'}}
                      />
                    </div>
                  ) : (
                    <div className='carousel-item h-100 active'>
                      <img
                        src={props.img3}
                        className='  img-fluid m-auto d-block img-fluid'
                        alt='...'
                        style={{maxHeight: '99%'}}
                      />
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className='  col-md-6 ps-md-4'>
          <div className='mt-5 mt-md-0  pe-5 text-wrap biz-owner-end-border d-flex flex-column justify-content-between'>
            <Link
              to={`${
                userName == props?.username
                  ? `/my-business/${props?.slug}/${props?.id}`
                  : `/businesses/${props?.slug}/${props?.id}`
              } `}
              className='pb-4'
            >
              <h1 className='bizOwner-line-breaker biz-owner-heading py-0 my-0 mb-md-0 me-0 text-wrap align-top'>
                {props?.title ? props?.title?.substring(0, 40) : 'NaN'}
              </h1>
              <p className='biz-owner-location-heading mb-2 mt-1 bizOwner-line-breaker'>
                {props.locationVisibility?.slug != 'show-no-location' ? (
                  <span>
                    {props?.location?.lat ? (
                      <>
                        {props?.locationVisibility?.slug === 'show-full-visibility' ? (
                          <>
                            <img className='mb-2 mt-2 me-2 ' src={locationIcon} alt='' width={13} />
                            {props?.location?.formatted_address?.substring(0, 30)}
                          </>
                        ) : props?.locationVisibility?.slug === 'show-city-country-state' ? (
                          <>
                            <img className='mb-2 mt-2 me-2' src={locationIcon} alt='' width={13} />
                            {props?.location?.city?.substring(0, 30) +
                              ' ' +
                              props?.location?.province?.substring(0, 30) +
                              ' ' +
                              props?.location?.country?.substring(0, 30)}
                          </>
                        ) : props?.locationVisibility?.slug === 'show-country-state' ? (
                          <>
                            <img className='mb-2 mt-2 me-2 ' src={locationIcon} alt='' width={13} />
                            {props?.location?.province?.substring(0, 30) +
                              ' ' +
                              props?.location?.country?.substring(0, 30)}
                          </>
                        ) : props?.locationVisibility?.slug === 'show-state-only' ? (
                          <>
                            <img className='mb-2 mt-2 me-2' src={locationIcon} alt='' width={13} />
                            {props?.location?.province?.substring(0, 30)}
                          </>
                        ) : props?.locationVisibility?.slug === 'show-no-location' ? (
                          ''
                        ) : null}
                      </>
                    ) : (
                      <>
                        <span className=''>
                          <img className='mb-2 mt-2 me-2 ' src={locationIcon} alt='' width={13} />
                          {props?.location?.country?.substring(0, 30) ?? 'NaN'}
                        </span>
                      </>
                    )}
                  </span>
                ) : null}
              </p>
              <div className='d-flex biz-owner-business-paragraph bizOwner-line-breaker '>
                {/* {props?.dec?.replace(/(<([^>]+)>)/gi, ' ') ?? 'NaN'} */}
                <UnsafeComponent html={props?.dec ?? '---'} />
              </div>
            </Link>

            {props?.listingType !== null && props?.listingType !== undefined && (
              <>
                {props?.listingType?.type ? (
                  <div className='mb-2'>
                    <span
                      className='bg-secondary py-1 px-2 cursor-pointer'
                      style={{borderRadius: '5px'}}
                      onClick={(e) => badgeFilterHandler(e)}
                    >
                      {props?.listingType?.type ?? '---'}
                    </span>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
        <div className='col-md-3  '>
          <div className='text-md-end  mt-4 mt-md-0  h-100    d-flex flex-column justify-content-between align-items-md-end '>
            <div className='d-flex flex-wrap justify-content-between d-md-block '>
              <h2 className=' my-4 my-md-0 text-nowrap biz-owner-business-price biz-owner-text-break'>
                <span className='mx-md-0 biz-owner-price-dollar-icon text-dark'>
                  <img src={dollar} alt='' />
                </span>
                <span className='biz-owner-text-break'> {props.price ?? 'NaN'}</span>
              </h2>
              <h6 className=' mt-md-5  mb-0 cash-flow text-md-end biz-owner-text-break'>
                Cash Flow: ${props.cashFlow ?? 'NaN'}
              </h6>
            </div>
            {userName !== props?.username ? (
              <div className='mt-5 pb-5 pb-md-0 mt-md-0 d-flex  flex-md-nowrap'>
                {transformedData ? (
                  <>
                    {props?.favorite == null ? (
                      <div className='biz_owner_carousel_img_camera'>
                        <img
                          src={heart}
                          alt=''
                          id={props?.id}
                          className=' mx-auto d-block  img-fluid biz-owner-heart-icon-save-listings pt-1 cursor-pointer red-heart '
                          name='save-listings'
                          onClick={(e) => {
                            role == 'agent' ? agentAlertHandler() : saveListing(e, props?.id)
                          }}
                        />
                      </div>
                    ) : (
                      <div className='biz_owner_carousel_img_camera-active'>
                        <img
                          src={redHeart}
                          alt=''
                          id={props?.id}
                          className=' mx-auto d-block  img-fluid biz-owner-heart-icon-save-listings pt-1 cursor-pointer  '
                          name='save-listings'
                          onClick={(e) => {
                            role == 'agent' ? agentAlertHandler() : saveListing(e, props?.id)
                          }}
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
                  <div className='float-right w-100'>
                    <button
                      type='button'
                      className='btn px-9 pe-11  text-nowrap btn-primary  disabled bg-primary  py-3'
                      style={{borderRadius: '25px'}}
                    >
                      <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
                    </button>
                  </div>
                ) : btnContactId?.includes(props?.id) ? (
                  <div className='float-right w-100'>
                    <button
                      type='button'
                      title='Contacted'
                      className='btn px-7  text-nowrap business-disable-btn btn-primary disabled  py-3'
                    >
                      Contacted
                    </button>
                  </div>
                ) : (
                  <div className='float-right w-100'>
                    <button
                      type='button'
                      title='Hi, are you interested to buy'
                      className='btn px-7  text-nowrap biz-owner-contact-btn  py-3'
                      onClick={(e) =>
                        role == 'agent'
                          ? agentAlertHandler()
                          : getSingleBusinessData(e, props?.id, props?.title)
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
            ) : (
              <div className='mt-5 pb-5 pb-md-0 mt-md-0 d-flex  flex-md-nowrap'>
                <div className='biz_owner_carousel_img_camera'>
                  <img
                    src={heart}
                    alt=''
                    onClick={(e) => ownListingHandler()}
                    className=' mx-auto d-block img-fluid biz-owner-heart-icon-save-listings pt-1 cursor-pointer '
                  />
                </div>

                <div className='float-right w-100'>
                  <button
                    type='button'
                    className='btn px-7  text-nowrap biz-owner-contact-btn  py-3'
                    onClick={(e) => ownListingHandler()}
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
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='modal fade' tabIndex={-1} id={`kt_modal_contact${props.id}_contact`}>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header p-3'>
              <h5 className='modal-title ps-2 pe-5 fs-3 bizOwner-line--contact-header'>
                Contact to "{`${selectedListTitle}`}"
              </h5>

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
              </div>
            </div>

            <div className=' text-center d-flex flex-column pb-3'>
              <div>
                {email != '' &&
                email != undefined &&
                isValidEmail(email) &&
                firstName != '' &&
                message !== '' &&
                message !== undefined &&
                firstName != undefined &&
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
      </Modal>
    </>
  )
}

export default BusinessDetail
