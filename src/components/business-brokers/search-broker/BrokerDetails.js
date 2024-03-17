import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Select from 'react-select'
import {Modal} from 'react-bootstrap'
import {GrFacebookOption} from 'react-icons/gr'

//
import {
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
import {loginUser} from '../../services/auth-services/AuthServices'
import {addFavorite} from '../../services/common-services'
import {contactBroker} from '../../services/broker-services/Index'

import businessImg from '../../../assets/images/evaluating-business.jpg'
import {getSingleBusiness} from '../../services/forSearchBusiness/Index'
import {requestBusinessesConnected} from '../../services/forSearchBusiness/Index'

//

import locationIcon from '../../../assets/icons/location.svg'
import dummyImg from '../../../assets/dummy.jpg'

// import twitter from '../../../assets/icons/twitter.svg'
// import emailIcon from '../../../assets/icons/emailIcon.svg'
// import linkedinIcon from '../../../assets/icons/linkedinIcon.svg'
import contactBtn from '../../../assets/icons/contact-btn-icon.svg'
import 'react-phone-input-2/lib/style.css'
import {MdOutlineContacts} from 'react-icons/md'
import twitter from '../../../assets/icons/social-share-icons/twitter.svg'
import facebookIcon from '../../../assets/icons/social-share-icons/facebookIcon.svg'
import linkedinIcon from '../../../assets/icons/social-share-icons/linkedinIcon.svg'
import emailIcon from '../../../assets/icons/social-share-icons/emailIcon.svg'
import ButtonLoader from '../../../assets/Loader/ButtonLoader.gif'
import './BrokerDetails.css'
import Swal from 'sweetalert2'
import {modalText} from '../../alert-text'
const BrokerDetails = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedId, setSelectedId] = useState()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(
    "Hey, I just found your profile as a business broker, I'm interested in selling my business/franchise. If you can contact me at your convenience, that would be great."
  )
  const [loginEmail, setLoginEmail] = useState('')
  const [listingType, setListingType] = useState('')
  const [btnContactId, setBtnContactId] = useState([])
  const [logOutSaveListings, setLogOutSaveListings] = useState()
  const [selectedListTitle, setSelectedListTitle] = useState('')
  const [isContinueBtn, setIsContinueBtn] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [isModalShow, setShow] = useState(false)
  const [forgetPass, setForgetPass] = useState('')
  const [brokerContactFilter, setBrokerContactFilter] = useState([])
  const [messageValidation, setMessageValidation] = useState(false)
  // validations
  const [phoneValiDation, setPhoneValiDation] = useState(false)
  const [fNameValiDation, setFNameValiDation] = useState(false)
  const [emailValiDation, setEmailValiDation] = useState(false)
  const [loginEmailValidation, setLoginEmailValidation] = useState(false)
  const [loginPassword, setLoginPassword] = useState('')
  const [loginPasswordValidation, setLoginPasswordValidation] = useState(false)
  let id = props.imgId

  const tokenData = localStorage.getItem('userData')
  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData
  let contactId = JSON?.parse(localStorage.getItem('brokerContactId'))
  const dispatch = useDispatch()

  let businessContactId = []
  useEffect(() => {
    if (contactId) {
      setBtnContactId(contactId.brokerContactId)
    }
  }, [])

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
        setMessageValidation(false)
        break
      case 'login-email':
        await setLoginEmail(e.target.value)
        setLoginEmailValidation(false)
        break
      case 'login-password-modal':
        await setLoginPassword(e.target.value)
        setLoginPasswordValidation(false)
        break
      case 'forget':
        await setForgetPass(e.target.value)
        break
    }
  }
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const contactBrokers = async (e, id) => {
    if (contactId) {
      businessContactId = contactId.brokerContactId
    }
    // const businessContactId = []

    if (phone == '' || phone == undefined || phone.length < 6) {
      setPhoneValiDation(true)
    }
    if (firstName == '' || firstName == undefined) {
      setFNameValiDation(true)
    }
    if (message == '' || message == undefined) {
      setMessageValidation(true)
    }
    if (email == '' || email == undefined || !isValidEmail(email)) {
      setEmailValiDation(true)
    }
    if (
      phone != '' &&
      phone != undefined &&
      phone.length > 5 &&
      firstName != '' &&
      firstName != undefined &&
      email != '' &&
      message !== '' &&
      email != undefined &&
      isValidEmail(email)
    ) {
      setIsContinueBtn(true)
      try {
        const response = await contactBroker(
          firstName,
          email,
          phone,
          brokerContactFilter,
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
            text: 'Your email to the broker has been sent. Thank you for using BizOwnerSell.',

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

          localStorage.setItem(
            'brokerContactId',
            JSON.stringify({
              brokerContactId: businessContactId,
            })
          )
        }
      } catch (error) {
        console.log('contact broker', error)
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
      loginEmail.includes('@') &&
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
  const closeModal = () => {
    setLoginStatus(false)

    setShow(false)
  }

  const phoneNumberHandler = async (phone) => {
    await setPhone(phone)
    await setPhoneValiDation(false)
  }

  const getSingleBusinessData = async (e, id, title, img) => {
    setSelectedListTitle(title)
    setPhoneValiDation(false)
    setFNameValiDation(false)
    setMessageValidation(false)
    setEmailValiDation(false)
    setPhoneValiDation(false)
    setSelectedId(e.target)
  }
  const dynamicOgTags = async (e, slug, description, fullIndex) => {
    // console.log('object', fullIndex?.img[0])
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
      <div className=' row biz-owner-buy-a-business-component-broker  p-4'>
        <div className='col-sm-2 px-0'>
          <div className='biz_owner_carousel_container d-md-flex   px-0 pt-1  '>
            <div
              id={id}
              className='carousel slide carousel-slide-container  w-100 d-md-flex'
              data-interval='false'
              data-bs-ride='carousel'
            >
              <Link to={`/search-for-broker/${props?.id}`} className='w-100'>
                <div className='ribbon ribbon-start  ribbon-clip'>
                  {/* <div className='ribbon-label'>
                  {props.title ?? 'No Package'}
                  <span className='ribbon-inner bg-success'></span>
                </div> */}
                </div>
                <div className='carousel-inner carousel-inner-container d-md-flex  position-relative'>
                  <div className='carousel-item active'>
                    {props?.img === 'undefinedthumb/undefined' ? (
                      <img
                        id='biz-owner-carousel-imgs-broker'
                        src={dummyImg}
                        className='  biz-owner-carousel-imgs img-fluid'
                        alt='...'
                      />
                    ) : (
                      <img
                        id='biz-owner-carousel-imgs-broker'
                        src={props?.img}
                        className=' m-auto img-fluid biz-owner-carousel-imgs'
                        alt='...'
                      />
                    )}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className='col-sm-7 px-2'>
          <div className='mt-5 mt-md-0 ps-4 pe-5 text-wrap h-100  biz-owner-end-border  d-flex flex-column justify-content-between'>
            <Link to={`/search-for-broker/${props?.id}`} className='pb-4'>
              <h1 className=' biz-owner-heading py-0 my-0 mb-md-0 mb-5 me-0 text-wrap align-top'>
                {props?.firstName
                  ? props?.firstName?.substring(0, 40) + ' ' + props?.lastName
                  : 'NaN'}
              </h1>
              <p className='biz-owner-location-heading my-3'>
                {props?.location != '' &&
                props?.location != null &&
                props?.location != undefined ? (
                  <>
                    <span className='biz-owner-location-icon me-1 '>
                      <img className='mb-1' src={locationIcon} alt='' width={13} />
                    </span>
                    <span>{props?.location}</span>
                  </>
                ) : null}
              </p>
              <span className='d-flex biz-owner-business-paragraph biz-owner-line-breaker'>
                {props?.dec ? props?.dec : 'NaN'}
              </span>
            </Link>

            {/* <div className='mb-2'>
              <span
                className='social-media-icons cursor-pointer px-2'
                data-bs-toggle='tooltip'
                data-bs-placement='top'
                title='Facebook'
                onClick={(e) => dynamicOgTags(e, props?.slug, props?.dec, props?.fullIndex)}
              >
                <FacebookShareButton
                  url={`https://bizownersell.jgago.com/search-for-broker/${props?.id}`}
                  
                >
                  <img src={facebookIcon} alt='' width={17} />

                
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
                  body={props?.dec}
                  url={`https://bizownersell.jgago.com/search-for-broker/${props?.id}`}
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
                  url={`https://bizownersell.jgago.com/search-for-broker/${props?.id}`}
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
                  url={`https://bizownersell.jgago.com/search-for-broker/${props?.id}`}
                >
                  <img src={linkedinIcon} alt='' width={15} />
                </LinkedinShareButton>
              </span>
            </div> */}
          </div>
        </div>
        <div className='col-md-3'>
          <div className=' text-md-end  mt-4 mt-md-0  pe-md-7  h-100  d-flex flex-row flex-md-column justify-content-between align-items-md-end  '>
            <div className='d-flex flex-wrap flex-column justify-content-md-end '>
              <div className='row'>
                <div className='d-flex flex-wrap'>
                  <h2 className='  mb-0 biz-owner-broker-certification text-md-end biz-owner-text-break'>
                    {props?.memberShipImgs?.length > 0 ? 'Membership' : null}
                    {props?.memberShipImgs?.length < 1 && props?.certiFication?.length > 0
                      ? 'Certifications'
                      : null}

                    <div className='d-flex mt-4 justify-content-center gap-3'>
                      {props?.memberShipImgs?.length > 0
                        ? props?.memberShipImgs?.map((item, index) => (
                            <>
                              {index < 5 ? (
                                <img
                                  src={item?.image?.full_path + 'thumb/' + item?.image?.file_name}
                                  alt=''
                                  width={25}
                                  height={25}
                                  className='border border-primary border-1 cursor-pointer'
                                  title={item?.description}
                                  key={index}
                                />
                              ) : null}
                            </>
                          ))
                        : props?.certiFication?.map((item, index) => (
                            <>
                              {index < 5 ? (
                                <img
                                  src={item?.image?.full_path + 'thumb/' + item?.image?.file_name}
                                  alt=''
                                  width={25}
                                  height={25}
                                  className='border border-primary border-1 cursor-pointer'
                                  title={item?.description}
                                  key={index}
                                />
                              ) : null}
                            </>
                          ))}
                    </div>
                  </h2>
                </div>
              </div>
            </div>
            <div className='mt-5 mt-md-0'>
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
                    className='btn px-9  text-nowrap business-disable-btn btn-primary disabled  py-3'

                    // '#kt_modal_contact'
                  >
                    Contacted
                  </button>
                </div>
              ) : (
                <div className='float-right'>
                  <button
                    type='button'
                    className='btn px-7  text-nowrap biz-owner-contact-btn  py-3'
                    onClick={(e) =>
                      role == 'agent'
                        ? agentAlertHandler()
                        : getSingleBusinessData(e, props?.id, props?.title, props?.img)
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
                      title='Broker contact'
                    />
                    Contact
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='modal fade' tabIndex={-1} id={`kt_modal_contact${props.id}_contact`}>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header p-3'>
                <h5 className='modal-title ps-2'>
                  Contact to "{props?.firstName ? props?.firstName + ' ' + props?.lastName : 'NaN'}"
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
                  <div className='col-md-8'>
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
                      <label className='form-label required'>Phone Number </label>

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
                      <select
                        name=''
                        id=''
                        className='form-select form-select-solid'
                        value={brokerContactFilter}
                        onChange={(e) => setBrokerContactFilter(e.target.value)}
                      >
                        <option hidden>I am..</option>

                        <option value='Looking to buy a business'>Looking to buy a business</option>
                        <option value='Looking to sell a business'>
                          Looking to sell a business
                        </option>
                      </select>
                    </div>
                    <div className='mb-10'>
                      <label htmlFor='exampleFormControlInput1' className=' form-label required'>
                        Message
                      </label>
                      <textarea
                        type='textarea'
                        name='message'
                        rows='4'
                        value={message}
                        className='form-control form-control-solid'
                        placeholder='Message'
                        onChange={(e) => inputChange(e)}
                      />
                      {messageValidation ? (
                        <div className='biz_owner_input_validation'>Enter message</div>
                      ) : null}
                    </div>
                  </div>
                  <div className='col-md-4 d-none d-md-inline'>
                    <h5>Business Broker </h5>
                    <img src={props?.img} alt='' style={{width: '80%'}} />
                  </div>
                </div>
              </div>

              <div className=' text-center d-flex flex-column pb-3'>
                <div>
                  {email != '' &&
                  isValidEmail(email) &&
                  email != undefined &&
                  firstName != '' &&
                  firstName != undefined &&
                  phone != '' &&
                  phone.length > 5 ? (
                    <button
                      type='button'
                      className='btn btn-primary mb-4'
                      data-bs-dismiss='modal'
                      onClick={(e) => contactBrokers(e, props.id)}
                    >
                      Send Message
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='btn btn-contact-dismiss  mb-4  '
                      onClick={(e) => contactBrokers(e, props.id)}
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

        <Modal show={isModalShow} onHide={closeModal}>
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
      </div>
    </>
  )
}

export default BrokerDetails
