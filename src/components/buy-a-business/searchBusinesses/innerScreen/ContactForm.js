import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AiFillWarning} from 'react-icons/ai'
import {GrFacebookOption} from 'react-icons/gr'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import {useNavigate} from 'react-router-dom'
import ButtonLoader from '../../../../assets/Loader/ButtonLoader.gif'

import {requestBusinessesConnected} from '../../../services/forSearchBusiness/Index'
import {postReport, getReportReason} from '../../../services/common-services'
import Swal from 'sweetalert2'
import {Modal} from 'react-bootstrap'
import {loginUser} from '../../../services/auth-services/AuthServices'
import {useDispatch} from 'react-redux'
import {
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
import twitter from '../../../../assets/icons/twitter.svg'
import emailIcon from '../../../../assets/icons/emailIcon.svg'
import linkedinIcon from '../../../../assets/icons/linkedinIcon.svg'
import shareIcon from '../../../../assets/icons/shareIcon.svg'
import phoneIcon from '../../../../assets/icons/phone.svg'
import twitterIcon from '../../../../assets/icons/twitter.svg'
import instagramIcon from '../../../../assets/icons/insta.svg'
import men from '../../../../assets/images/profile-image.png'
import './ContactForm.css'
import {modalText} from '../../../alert-text'
const ContactForm = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [fNameValidation, setFNameValidation] = useState(false)
  const [showPhoneNumber, setShowPhoneNumber] = useState(false)
  const [fullNameValiDation, setFullNameValidation] = useState(false)
  const [phoneValidation, setPhoneValidation] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)
  const [reportEmailValidation, setReportEmailValidation] = useState(false)
  const [messageValidation, setMessageValidation] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(
    'I would like to inquire about your business please contact me at your earliest convenience'
  )
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState(false)
  const [loginEmailValidation, setLoginEmailValidation] = useState(false)
  const [loginPasswordValidation, setLoginPasswordValidation] = useState(false)
  const [fullName, setFullName] = useState('')
  const [reason, setReason] = useState('')
  const [reasonData, setReasonData] = useState([])
  const [information, setInformation] = useState('')
  const [reportEmail, setReportEmail] = useState('')

  const [isContinueBtn, setIsContinueBtn] = useState(false)
  const [reasoneValidation, setReasoneValidation] = useState(false)
  const [isModalShow, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const [informationValidation, setInformationValidation] = useState(false)
  const userData = localStorage.getItem('userData')
  const transformedData = userData ? JSON?.parse(userData) : ''

  const {role} = transformedData
  useEffect(() => {
    getReasonForReport()
    if (transformedData) {
      setReportEmail('null.com')
      setFullName('null')
    }
  }, [])

  const getReasonForReport = async () => {
    const response = await getReportReason()

    if (response.status == true) {
      setReasonData(response.report_reason_business)
    }
  }
  const handleReportReasonChange = (e) => {
    setReason(e.target.value)
    setReasoneValidation(false)
  }
  const inputChange = async (e) => {
    switch (e.target.name) {
      case 'firstName':
        await setFirstName(e.target.value)
        setFNameValidation(false)
        break
      case 'full-name':
        await setFullName(e.target.value)
        setFullNameValidation(false)
        break
      case 'email':
        await setEmail(e.target.value)
        setEmailValidation(false)
        break
      case 'report-email':
        await setReportEmail(e.target.value)
        setReportEmailValidation(false)
        break

      case 'message':
        await setMessage(e.target.value)
        setMessageValidation(false)

        break
      case 'reason':
        await setReason(e.target.value)
        setReasoneValidation(false)
        break
      case 'information':
        await setInformation(e.target.value)
        setInformationValidation(false)
        break
      case 'report-email':
        await setReportEmail(e.target.value)
        break
      case 'login-password-modal':
        await setLoginPassword(e.target.value)
        break
      case 'login-email':
        await setLoginEmail(e.target.value)
        break
    }
  }
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const submitHandler = async (e, item) => {
    if (phone == '' || phone == undefined || phone.length < 6) {
      setPhoneValidation(true)
    }
    if (email == '' || email == undefined || !isValidEmail(email)) {
      setEmailValidation(true)
    }
    if (message == '' || message == undefined) {
      setMessageValidation(true)
    }
    if (firstName == '' || firstName == undefined) {
      setFNameValidation(true)
    }
    if (
      phone !== '' &&
      email !== '' &&
      message !== '' &&
      firstName !== '' &&
      phone.length > 5 &&
      isValidEmail(email)
    ) {
      setIsContinueBtn(true)
      const response = await requestBusinessesConnected(
        'multiple',
        firstName,
        email,
        phone,
        props?.data[0]?.id,
        message
      )
      if (response.status == true) {
        setIsContinueBtn(false)
        let businessContactId = []

        const localStorageBusinessContactId = localStorage.getItem('businessContactId')
        const transformedBusinessContactId = JSON?.parse(localStorageBusinessContactId)

        if (transformedBusinessContactId) {
          businessContactId = transformedBusinessContactId.businessContactId
        }

        function checkAdult(age) {
          return age === props.data[0].id
        }
        let valueCom = businessContactId.some(checkAdult)

        if (valueCom === false) {
          businessContactId.push(props.data[0].id)

          localStorage.setItem(
            'businessContactId',
            JSON.stringify({
              businessContactId: businessContactId,
            })
          )
        }
        Swal.fire({
          text: 'Email has been sent successfully',
          icon: 'success',
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        }).then((result) => {
          navigate('/similar-businesses', {
            state: {id: 1, data: response.samilerBusiness, title: props?.data?.[0]?.title},
          })
        })
      }
    }
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
      transformedData != null &&
      transformedData != undefined &&
      transformedData != '' &&
      reason != '' &&
      reason != undefined &&
      information != '' &&
      information != undefined
    ) {
      let userID = transformedData.userID

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
        setInformation('')
        setReason('')
        Swal.fire({
          text: 'Your report has been received. Our team will review the list as soon as possible and take any necessary action.',
          icon: 'success',
          confirmButtonColor: '#009ef7',
          confirmButtonText: 'Ok',
        })
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
      }
    }
    // if (reason != '' && reason != undefined && information != '' && information != undefined) {
    //   const response = await postReport()
    // }
    // setInformation('')
    // setReportEmail('')
    // setFullName('')
  }
  const phoneNumberHandler = async (phone) => {
    await setPhone(phone)
    await setPhoneValidation(false)
  }

  const loginHandler = async (e, id, favorite) => {
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
      setLoading(true)
      try {
        const result = await loginUser(loginEmail, loginPassword)
        if (result.status === true) {
          setLoading(false)
          localStorage.setItem(
            'userData',
            JSON.stringify({
              accessToken: result.token,
              userName: result.user.first_name,
              role: result.role[0].name,
              userID: result.user.id,
            })
          )
          dispatch({
            type: 'LOGIN',
            payload: {
              logIn: 'log in',
            },
          })
          setShow(false)

          // window.location.reload()
          navigate(`/business/valuation-subscription/${props?.data[0]?.id}`)

          // document.location.reload()
          // navigate('/dashboard')
        } else {
          setLoading(false)

          setLoginStatus(true)
        }
      } catch (error) {
        setLoading(false)

        console.error(error)

        setLoginStatus(true)
      }
    }
  }

  const modalClose = () => {
    setLoginStatus(false)

    setShow(false)
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
      <div
        className='container biz-owner-contact-box px-md-11  mx-0 ms-auto mt-10 mt-md-18'
        //  style={{position: 'sticky', top: '6rem'}}
      >
        <div className='row pt-2 px-5 px-md-0'>
          <div id='bizOwner-contact-form-heading' className='biz-owner-contact-heading mb-5 px-0'>
            <h3 className='mb-1 biz-owner-listed-by-title'>Contact Form</h3>
            <h5 className=' mb-3'>Let us know more about you!</h5>
          </div>
          <div className='col-12 px-0'>
            <input
              type='text'
              name='firstName'
              value={firstName}
              className='biz-owner-contact-form-input form-control form-control-solid '
              placeholder='John Doe'
              onChange={(e) => inputChange(e)}
            />
            {fNameValidation ? (
              <div className='biz_owner_input_validation mx-5'>Enter full name</div>
            ) : null}
          </div>
          <div className='col-12 px-0 mt-3'>
            <input
              type='email'
              name='email'
              value={email}
              className='biz-owner-contact-form-input form-control form-control-solid'
              placeholder='johndoe@email.com'
              onChange={(e) => inputChange(e)}
            />
            {emailValidation ? (
              <div className='biz_owner_input_validation mx-5'>Invalid email address</div>
            ) : null}
          </div>
          <div className='col-12 mt-3 px-0' id='franchise-inner-contact-form-number'>
            <PhoneInput country={'us'} value={phone} onChange={phoneNumberHandler} />
            {phoneValidation ? (
              <div className='biz_owner_input_validation mx-5'>Enter correct phone number</div>
            ) : null}
          </div>
          <div className='col-12 mt-4 px-0 '>
            <textarea
              className='form-control form-control-solid pb-10'
              name='message'
              rows='3'
              value={message}
              placeholder='Message'
              onChange={(e) => inputChange(e)}
            />
            {messageValidation ? (
              <div className='biz_owner_input_validation'>Enter message</div>
            ) : null}

            {/* <span className='d-flex justify-content-end text-muted'>0/500</span> */}
          </div>
          <div className=' mt-2 px-0'>
            {isContinueBtn ? (
              <Link to='#' className='btn mt-4 ms-3  biz-owner-contact-form-btn px-14'>
                <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
              </Link>
            ) : (
              <Link
                to='#'
                className='btn  ms-1 mt-4  biz-owner-contact-form-btn px-14'
                onClick={() => (role == 'agent' ? agentAlertHandler() : submitHandler())}
                // title='Hi, are you interested to buy'
              >
                Submit
              </Link>
            )}

            <p className='my-4 biz-owner-submit-btn-message'>
              By clicking the button, you agree to BizOwnerSell’s Terms of Use and
              <a className='ps-1' href='/privacy-notice' target={'_blank'}>
                Privacy Notice
              </a>
            </p>

            <div className='biz-owner-listed-by px-5 py-3'>
              <div className='biz-owner-listed-by-container'>
                <h3 className='biz-owner-listed-by-title text-center pb-1 mb-0'>
                  Business <span className='text-dark'>listed by</span>
                </h3>
              </div>
              <div className='row'>
                <div className='col-sm-6 px-md-2 mt-8'>
                  <div className='row ps-2'>
                    <div className='col-sm-3 px-0 ps-1'>
                      <Link
                        to={`${
                          props?.data[0]?.user?.roles[0]?.name == 'broker'
                            ? `/search-for-broker/${props?.data[0]?.user?.id}`
                            : `/seller/${props?.data[0]?.user?.id}`
                        } `}
                      >
                        {props?.data[0]?.user?.profile_image != '' &&
                        props?.data[0]?.user?.profile_image != null &&
                        props?.data[0]?.user?.profile_image != undefined &&
                        props?.data[0]?.user?.profile_image?.full_path !== null ? (
                          <img
                            src={
                              props?.data[0]?.user?.profile_image?.full_path +
                              props?.data[0]?.user?.profile_image?.file_name
                            }
                            className='img-fluid ms-md-0  mx-md-0 mx-auto mt-1'
                            alt=''
                            width={35}
                            style={{height: '35px', borderRadius: '50%'}}
                          />
                        ) : props?.data[0]?.user?.broker_images != null &&
                          props?.data[0]?.user?.broker_images != [] &&
                          props?.data[0]?.user?.broker_images?.full_path ? (
                          <img
                            src={
                              props?.data[0]?.user?.broker_images?.full_path +
                              props?.data[0]?.user?.broker_images?.file_name
                            }
                            className='img-fluid ms-md-0  mx-md-0 mx-auto mt-1'
                            alt=''
                            width={40}
                            style={{height: '30px', borderRadius: '50%'}}
                          />
                        ) : (
                          <img
                            src={men}
                            alt=''
                            width={35}
                            className='img-fluid ms-md-0  mx-md-0 mx-auto mt-1'
                            style={{height: '35px', borderRadius: '50%'}}
                          />
                        )}
                      </Link>
                    </div>
                    {/* {props?.data[0]?.user?.broker_images == null &&
                      props?.data[0]?.user?.profile_image == null && (
                        <img
                          src={men}
                          alt=''
                          width={40}
                          className='img-fluid m-auto'
                          style={{height: '30px', borderRadius: '50%'}}
                        />
                      )} */}
                    <div className='col-sm-9 text-align-center px-2 text-justify form-side-border'>
                      <Link
                        to={`${
                          props?.data[0]?.user?.roles[0]?.name == 'broker'
                            ? `/search-for-broker/${props?.data[0]?.user?.id}`
                            : `/seller/${props?.data[0]?.user?.id}`
                        } `}
                        className='mb-0 text-truncate d-block text-dark  text-align-center pt-3'
                        style={{overflowWrap: 'break-word'}}
                      >
                        {props?.data[0]?.user
                          ? props?.data[0]?.user?.username?.substring(0, 30)
                          : ''}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='col-sm-6 mt-8'>
                  <div className='ps-0 pt-3'>
                    {!showPhoneNumber ? (
                      <span
                        className='mx-1 cursor-pointer text-truncate'
                        onClick={() =>
                          role == 'agent' ? agentAlertHandler() : setShowPhoneNumber(true)
                        }
                        style={{fontSize: '12px'}}
                      >
                        <img src={phoneIcon} alt='' className='me-1' width={15} />
                        {props?.data[0]?.user?.phone !== '' && props?.data[0]?.user?.phone !== null
                          ? props?.data[0]?.user?.phone.replace(/.(?=.{3})/g, '*')
                          : null}
                      </span>
                    ) : (
                      <a
                        href={`tel:${props?.data[0]?.user?.phone ?? 'NaN'}`}
                        className='d-inline text-end  text-dark text-truncate'
                        style={{fontSize: '12px'}}
                      >
                        <span className='mx-0 '>
                          <img src={phoneIcon} alt='' width={15} />
                        </span>
                        <span className='p-0 m-0 text-truncate'>
                          {props?.data[0]?.user?.phone ?? ''}
                        </span>
                      </a>
                    )}
                    {/* <a
                      href={`tel:${props?.data[0]?.user?.phone ?? 'NaN'}`}
                      className='d-inline text-end  text-dark'
                    >
                      <span className='mx-1 '>
                        <img src={phoneIcon} alt='' width={15} />
                      </span>
                      {props?.data[0]?.user?.phone !== '' && props?.data[0]?.user?.phone !== null
                        ? props?.data[0]?.user?.phone.replace(/.(?=.{4})/g, '*')
                        : null}
                    </a> */}
                  </div>
                </div>
              </div>

              <div className='text-center pt-4 pt-sm-10'>
                Enrolled Businesses:
                <span className='text-primary'> {props?.data[0]?.registerBusiness ?? 'NaN'} </span>
              </div>
            </div>
          </div>
        </div>
        {role !== 'admin' && (
          <div className='pt-3'>
            <Link
              to='#'
              className='  d-flex'
              data-bs-toggle={role == 'agent' ? null : 'modal'}
              data-bs-target='#kt_modal_report'
              onClick={() => (role == 'agent' ? agentAlertHandler() : null)}
            >
              <div>
                <AiFillWarning size={18} />
              </div>
              <p className=' px-2'>Report an issue with this business</p>
            </Link>
          </div>
        )}
      </div>

      {/* Button trigger modal */}

      {/* <div className='container biz-owner-contact-box px-10 mx-0 ms-auto mt-5'>
        <div className='row'>
          <div className='    '>
            <div className='col-12  text-center '>
              <h3 className=''>
                <span>
                  <img src={shareIcon} alt='' />
                </span>
                Share this Business
              </h3>

              <div className='pt-5'>
                <span
                  className='social-media-icons cursor-pointer px-2'
                  data-bs-toggle='tooltip'
                  data-bs-placement='top'
                  title='Facebook'
                >
                  <FacebookShareButton
                    url={`https://bizownersell.jgago.com/businesses/${props?.data[0]?.slug}/${props?.data[0]?.id}`}
                    title={'props?.title'}
                    // hashtag={`#${props?.title}`}
                    img={
                      'https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1520x800.png'
                    }
                  >
                    <GrFacebookOption size={25} color='#1D56D3' />
                  </FacebookShareButton>
                </span>

                <span
                  className='social-media-icons cursor-pointer px-2'
                  data-bs-toggle='tooltip'
                  data-bs-placement='top'
                  title='Email'
                >
                  <EmailShareButton
                    className='pe-0'
                    subject={props?.title}
                    // body={props?.dec?.replace(/(<([^>]+)>)/gi, ' ')}
                    url={`https://bizownersell.jgago.com/businesses/${props?.data[0]?.slug}/${props?.data[0]?.id}`}
                  >
                    <img src={emailIcon} alt='' width={24} />
                  </EmailShareButton>
                </span>

                <span
                  className='social-media-icons cursor-pointer px-2'
                  data-bs-toggle='tooltip'
                  data-bs-placement='top'
                  title='Twitter'
                >
                  <TwitterShareButton
                    url={`https://bizownersell.jgago.com/businesses/${props?.data[0]?.slug}/${props?.data[0]?.id}`}
                  >
                    <img src={twitterIcon} alt='' width={25} />
                  </TwitterShareButton>
                </span>
                <span
                  className='cursor-pointer px-2'
                  data-bs-toggle='tooltip'
                  data-bs-placement='top'
                  title='Linkedin'
                >
                  <LinkedinShareButton
                    url={`https://bizownersell.jgago.com/businesses/${props?.data[0]?.slug}/${props?.data[0]?.id}`}
                  >
                    <img src={linkedinIcon} alt='' width={20} />
                  </LinkedinShareButton>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className='modal fade' tabIndex={-1} id='kt_modal_report'>
        <div className='modal-dialog '>
          <div className='modal-content'>
            <div className='modal-header p-3'>
              <h5 className='modal-title ps-2'>Report an issue </h5>
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
              {transformedData ? null : (
                <>
                  <div className='form-check my-5 ps-0'>
                    <label htmlFor='' className='form-label required'>
                      Full Name
                    </label>

                    <input
                      type='email'
                      name='full-name'
                      value={fullName}
                      className='form-control form-control-solid  required'
                      placeholder='Full Name'
                      onChange={(e) => inputChange(e)}
                    />
                    {fullNameValiDation ? (
                      <div className='biz_owner_input_validation'>Enter full name</div>
                    ) : null}
                  </div>
                  <div className='form-check my-5 ps-0'>
                    <label htmlFor='' className='form-label required'>
                      Your Email Address
                    </label>

                    <input
                      type='email'
                      name='report-email'
                      value={reportEmail}
                      className='form-control form-control-solid  required'
                      placeholder='Email Address'
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
                  onChange={(e) => handleReportReasonChange(e)}
                >
                  <option hidden>- Select a Reason -</option>
                  {reasonData?.map((item, index) => (
                    <option value={item.id} id={item.id}>
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
            {transformedData ? (
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

      <Modal show={isModalShow} onHide={modalClose}>
        <Modal.Header closeButton className='py-3'>
          <Modal.Title>Sing In</Modal.Title>
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
                  className='btn btn-primary  px-10'
                  onClick={(e) => loginHandler(e, props?.id, props?.favorite)}
                >
                  {!loading && <span>Sign in</span>}

                  {loading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <div>
                <button
                  type='button'
                  className='btn btn-primary  px-10'
                  onClick={(e) => loginHandler(e)}
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
    </>
  )
}

export default ContactForm
