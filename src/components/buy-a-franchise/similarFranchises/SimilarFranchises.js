import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom'
import {GrFormNext, GrFormPrevious, GrNext} from 'react-icons/gr'
// import Accodian from './Accodian'
import {GrFacebookOption} from 'react-icons/gr'
import PhoneInput from 'react-phone-input-2'

// import array from './DamyData'
import 'react-phone-input-2/lib/style.css'
// import dollarPic from '../../assets/icons/dollerPic.jpg'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import {Modal} from 'react-bootstrap'

// '../../../../assets/Loader/MainScreenLoader.gif'
// '../../../assets/Loader/MainScreenLoader.gif'
import dollarPic from '../../../assets/icons/dollarIcon.svg'
// import twitter from '../../../assets/icons/twitter.svg'
// import emailIcon from '../../../assets/icons/emailIcon.svg'
// import linkedinIcon from '../../../assets/icons/linkedinIcon.svg'
import logo from '../../../assets/icons/logoP.svg'
import locationIcon from '../../../assets/icons/location.svg'
import redHeart from '../../../assets/icons/redHeart.svg'
import twitter from '../../../assets/icons/social-share-icons/twitter.svg'
import facebookIcon from '../../../assets/icons/social-share-icons/facebookIcon.svg'
import linkedinIcon from '../../../assets/icons/social-share-icons/linkedinIcon.svg'
import emailIcon from '../../../assets/icons/social-share-icons/emailIcon.svg'
import heart from '../../../assets/icons/heartIcon.svg'
import back from '../../../assets/icons/backIcon.svg'
import '../FranchiseCategories.css'
import dummyImg from '../../../assets/dummy.jpg'

// import PhoneInput from 'react-phone-number-input'
// import axios from "axios";
import '../../buy-a-franchise/FranchiseCategories.css'
import contactBtn from '../../../assets/icons/contact-btn-icon.svg'
import UnlockSubscription from '../../unlock-subscription/UnlockSubscription'
import {getFilteredData} from '../../services/buy-a-franchises/index'
import {addFavorite, requestFranchises} from '../../services/common-services/index'
import Add from '../../buy-a-business/searchBusinesses/Add'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../services/auth-services/AuthServices'
import Swal from 'sweetalert2'
// '../services/buy-a-franchises/index'
import {
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
import {modalText, ownListingAlert} from '../../alert-text'
export default function SimilarFranchises() {
  const location = useLocation()
  const navigate = useNavigate()
  let dispatch = useDispatch()

  const [timeFrames, setTimeFrames] = useState('')
  const [cash, setCash] = useState('')
  const [states, setStates] = useState('')
  const [isShowPackageModal, setIsShowPackageModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('Please select a plan to access more features')
  const [userNames, setuserNames] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneN, setPhoneN] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [logOutSaveListings, setLogOutSaveListings] = useState()
  const [isShowModal, setShow] = useState(false)
  const [loginEmailValidation, setLoginEmailValidation] = useState(false)
  const [loginPasswordValidation, setLoginPasswordValidation] = useState(false)
  const [logOutSaveListingsId, setLogOutSaveListingsId] = useState()
  const [currentPage, setCurrentPage] = useState('')
  const [lastPage, setLastPage] = useState([])
  const [loader, setLoader] = useState(true)

  const [lists, setLists] = useState([])
  const [toggle, setToggle] = useState(false)
  const [clickedId, setClickedId] = useState([])
  const [formToggle, setFormToggle] = useState(false)
  const [franchiseData, setFranchiseData] = useState(location?.state?.data ?? [])
  const [franchiseContactId, setFranchiseContactId] = useState([])

  // validation

  const [userForm, setUserForm] = useState(false)
  const [firstNameForm, setFirstNameForm] = useState(false)
  const [emailForm, setEmailForm] = useState(false)

  const [phoneNForm, setPhoneNForm] = useState(false)
  const [zipCodeForm, setZipCodeForm] = useState(false)
  const [cashForm, setCashForm] = useState(false)
  const [timeFramesForm, setTimeFramesForm] = useState(false)
  const [statesForm, setStatesForm] = useState(false)
  const [contactData, setContactData] = useState(location?.state?.title)
  const [loginStatus, setLoginStatus] = useState(false)

  const tokenData = localStorage.getItem('userData')

  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData
  const {userName} = transtokenData
  let imagID
  let filterData = []

  // const [cost, setCost] = useState([...array])

  useEffect(() => {
    if (location?.state?.data?.length > 0) {
      setFranchiseData(location?.state?.data)
      console.log('location?.state?.data', location?.state?.data)
    }
    const BtnId = localStorage.getItem('franchiseContactId')
    const franchiseBtnId = BtnId ? JSON?.parse(BtnId) : ''
    if (franchiseBtnId) {
      setFranchiseContactId(franchiseBtnId.franchiseContactId)
    }
  }, [])

  //////////////////formvalidation///////////////
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const inputChange = async (event) => {
    switch (event.target.name) {
      case 'login-email':
        await setLoginEmail(event.target.value)
        setLoginEmailValidation(false)
        break
      case 'login-password-modal':
        await setLoginPassword(event.target.value)
        setLoginPasswordValidation(false)
        break
    }
  }
  const saveListing = async (e, id) => {
    let type
    if (e.target.parentNode.classList[0] == 'biz_owner_carousel_img_camera') {
      type = 'favorite'
      setIsShowPackageModal(true)
      e.target.setAttribute('src', redHeart)
    } else if (e.target.parentNode.classList[0] != 'biz_owner_carousel_img_camera') {
      type = 'unfavorite'
      e.target.setAttribute('src', heart)
    }
    if (id == e.target.id) {
      // setHeartToggle(id)

      e.target.parentNode.classList.toggle('biz_owner_carousel_img_camera-active')
      e.target.parentNode.classList.toggle('biz_owner_carousel_img_camera')
    }
    const response = await addFavorite(accessToken, 'business', id, type)

    //  else {
    //   setHeartToggle(id)

    // }
    // if (id == e.target.id) {
    //   setHeartToggle(true)
    // } else {
    //   setHeartToggle(false)
    // }
  }
  const logOutSaveListing = async (e, id) => {
    e.preventDefault()
    setLogOutSaveListings(e.target)
    setLogOutSaveListingsId(id)

    setShow(true)
  }
  const loginHandler = async (e, id) => {
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
              userNames: result.user.first_name,
              role: result.role[0].name,
              userID: result.user.id,
            })
          )

          const response = await addFavorite(
            result.token,
            'franchise',
            logOutSaveListingsId,
            'favorite'
          )
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

  //////////////////endformvalidation///////////////

  const contactRequest = async (e, id, title) => {
    // contactData.push({title: title})

    const userRequestData = localStorage.getItem('franchiseRequestUserRecord')
    const transformedUserRequestData = JSON?.parse(userRequestData)
    let clickedIds = clickedId
    franchiseContactId?.map((id) => {
      clickedIds.push(id)
    })
    let franchiesID = []
    let businessContactId = []

    franchiesID = lists.map((items, indexs) => {
      return items.id
    })

    function checkAdult(age) {
      return age === id
    }
    let valueCom = businessContactId.some(checkAdult)
    let currentId = e.target
    if (e.target.id == 'contact-id') {
      currentId = e.target.parentNode
      // e.currentTarget.classList.add('btn3-primary')
      e.target.parentNode.classList.remove('biz-owner-contact-btn')
      e.target.parentNode.classList.add('biz-owner-btn-loader')
      // e.target.classList.add('franchise-disable-btn')

      // e.target.classList.add('px-md-6')
      // e.target.classList.add('disabled')
      e.target.parentNode.textContent = ''
    } else {
      // e.currentTarget.classList.add('btn3-primary')
      e.target.classList.remove('biz-owner-contact-btn')
      e.target.classList.add('biz-owner-btn-loader')
      // e.target.classList.add('franchise-disable-btn')

      // e.target.classList.add('px-md-6')
      // e.target.classList.add('disabled')
      e.target.textContent = ''
    }
    if (transformedUserRequestData !== null) {
      const {firstName, lastName, email, phone, zipCode, capital, timeFrames, location} =
        transformedUserRequestData ?? ''

      const response = await requestFranchises(
        'single',
        firstName,
        lastName,
        email,
        phone,
        zipCode,
        capital,
        timeFrames,
        location,
        id
      )

      if (response.status == true) {
        Swal.fire({
          text: 'Email has been sent successfully',
          icon: 'success',
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        })
        // setContactData(contactData)
        currentId.classList.add('franchise-disable-btn')
        currentId.classList.add('ps-5')
        currentId.classList.add('disabled')
        currentId.classList.remove('biz-owner-btn-loader')
        currentId.textContent = 'Contacted'

        if (!clickedIds.includes(id)) {
          clickedIds.push(id)
        }

        // e.target.classList.add('franchise-disable-btn')

        // e.target.classList.add('px-md-6')
        // e.target.classList.add('disabled')

        setClickedId([...clickedIds])

        localStorage.setItem(
          'franchiseContactId',
          JSON.stringify({
            franchiseContactId: clickedId,
          })
        )
      }
    }

    // console.log('cost', cost)
    // let costData = cost
    // let listData = lists

    // costData.map((val) => {
    //   if (!listData.includes(val)) {
    //     if (val.id == id) {
    //       listData.push(val)
    //     }
    //   }
    // })
    // setLists([...listData])
    // console.log('=======>', lists)
    // setToggle(true)
  }

  let paginationArray = []
  for (let i = 1; i <= lastPage; i++) {
    paginationArray.push(i)
  }

  const paginate = (pageNumber) => {
    window.scrollTo({
      top: 0,
      // left: 100,
      behavior: 'smooth',
    })
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
  function ownListingHandler() {
    Swal.fire({
      text: ownListingAlert,

      icon: 'warning',
      // timer: 2000,
      confirmButtonColor: '#009ef7',

      confirmButtonText: 'Ok',
    })
  }
  ///////////////
  return (
    <>
      <div className='container justify-content-center pt-3 '>
        <button
          className=' text-primary mt-4 mb-2 ms-2 px-0'
          onClick={() => navigate(-1)}
          style={{backgroundColor: 'transparent', border: 'none'}}
        >
          <span className='text-primary '>
            <img src={back} alt='' />
          </span>
        </button>
      </div>
      <div
        className='container  text-start '
        style={{
          marginTop: '20px',
        }}
      >
        {loader ? (
          franchiseData?.length > 0 ? (
            <div className=' d-flex justify-content-between'>
              <div className='col-lg-9 col-sm-12 me-4'>
                <div className='row'>
                  <div className='mb-4 p-3 mx-1 rounded' style={{backgroundColor: '#eff4f5'}}>
                    <div className=''>
                      <h3 className='fs-4 my-4'>
                        We've identified the following franchises you might be interested in.
                      </h3>
                    </div>
                  </div>
                </div>
                {franchiseData?.map((item, i) => {
                  {
                    imagID = 'bizOwner' + item?.id + 'imagesIds'
                  }
                  return (
                    <div key={i}>
                      {console.log('itemmm', item)}
                      {/* <div className=''> */}
                      <div className='row newStyleDiv p-4 mb-5 '>
                        {/* <img src={item.image} alt='' style={{width: '130px'}} /> */}
                        <div className='col-md-3 px-0'>
                          <div className='biz_owner_carousel_container_franchise d-md-flex '>
                            <div
                              id={imagID}
                              className='carousel slide carousel-slide-container_franchise d-md-flex position-relative w-100'
                              data-interval='false'
                              data-bs-ride='carousel'
                            >
                              <Link
                                to={`${
                                  userName == item?.franchise_user?.username
                                    ? `/my-franchise/${item.slug}/${item.id}`
                                    : `/franchise/${item.slug}/${item.id}`
                                } `}
                                className='w-100'
                              >
                                <div className='carousel-inner h-100 carousel-inner-container_franchise d-md-flex  '>
                                  <>
                                    {item?.slider_images[0]?.full_path ? (
                                      <div className='carousel-item active w-100'>
                                        <img
                                          src={
                                            item?.slider_images[0]?.full_path +
                                            'medium/' +
                                            item?.slider_images[0]?.file_name
                                          }
                                          className='d-block m-auto img-fluid '
                                          alt='...'
                                          style={{height: '100%'}}
                                        />
                                      </div>
                                    ) : (
                                      <>
                                        <div className='carousel-item active'>
                                          <img
                                            src={dummyImg}
                                            className='biz-owner-carousel-franchise-imgs w-100 img-fluid'
                                            alt='...'
                                          />
                                        </div>
                                      </>
                                    )}
                                  </>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* //////////////////////////////// */}
                        <div className='col-md-6 px-0 px-md-3'>
                          <div
                            className='mt-5 mt-md-0 h-100 ps-md-4  biz-owner-end-border-franchise  text-wrap d-flex flex-column justify-content-between'
                            style={{
                              margin: '0px 4px',
                            }}
                          >
                            <Link
                              to={`${
                                userName == item?.franchise_user?.username
                                  ? `/my-franchise/${item.slug}/${item.id}`
                                  : `/franchise/${item.slug}/${item.id}`
                              } `}
                            >
                              <h5
                                className='bizOwner-line-breaker'
                                style={{
                                  fontFamily: 'Arimo',
                                  color: '#081C3D',
                                  fontWeight: '700',
                                  fontSize: '16px',
                                  lineHeight: '26px',
                                  marginBottom: '0px',
                                }}
                              >
                                {item?.title ?? 'NaN'}
                              </h5>
                              {/* ///////////////////// */}
                              {item?.location_visibitiy?.slug !== 'show-no-location' ? (
                                <span className='bizOwner-line-breaker' style={{color: '#081C3D'}}>
                                  {item?.location?.lat ? (
                                    <>
                                      {item.location_visibitiy?.slug === 'show-full-visibility' ? (
                                        <>
                                          <img
                                            className='mb-2 mt-2 me-2'
                                            src={locationIcon}
                                            alt=''
                                            width={13}
                                          />

                                          {item?.location?.formatted_address?.substring(0, 30)}
                                        </>
                                      ) : item.location_visibitiy?.slug ===
                                        'show-city-country-state' ? (
                                        <>
                                          <img
                                            className='mb-2 mt-2 me-2 '
                                            src={locationIcon}
                                            alt=''
                                            width={13}
                                          />
                                          {item?.location?.city?.substring(0, 30) +
                                            ' ' +
                                            item?.location?.province?.substring(0, 30) +
                                            ' ' +
                                            item?.location?.country?.substring(0, 30)}
                                        </>
                                      ) : item.location_visibitiy?.slug === 'show-country-state' ? (
                                        <>
                                          <img
                                            className='mb-2 mt-2 me-2'
                                            src={locationIcon}
                                            alt=''
                                            width={13}
                                          />
                                          {item?.location?.province?.substring(0, 30) +
                                            ' ' +
                                            item?.location?.country?.substring(0, 30)}
                                        </>
                                      ) : item.location_visibitiy?.slug === 'show-state-only' ? (
                                        <>
                                          <img
                                            className='mb-2 mt-2 me-2 '
                                            src={locationIcon}
                                            alt=''
                                            width={13}
                                          />
                                          {item?.location?.province?.substring(0, 30)}
                                        </>
                                      ) : item.location_visibitiy?.slug === 'show-no-location' ? (
                                        ''
                                      ) : null}
                                    </>
                                  ) : (
                                    <span>
                                      <span className=''>
                                        <img
                                          className='mb-2 mt-2 me-2 '
                                          src={locationIcon}
                                          alt=''
                                          width={13}
                                        />
                                        {item?.location?.country?.substring(0, 30) ?? 'NaN'}
                                      </span>
                                    </span>
                                  )}
                                </span>
                              ) : null}

                              <a
                                className='bizOwner-line-breaker'
                                style={{
                                  color: '#081C3D',

                                  fontWeight: '400',
                                  fontSize: '13px',
                                  lineHeight: '20px',
                                }}
                              >
                                {item?.about != null &&
                                item?.about != 'null' &&
                                item?.about != undefined &&
                                item?.about != 'undefined' &&
                                item?.about != '' ? (
                                  <p className='pt-2'>
                                    {item.about?.replace(/(<([^>]+)>)/gi, ' ') ?? 'NaN'}
                                  </p>
                                ) : null}
                              </a>
                            </Link>

                            {item?.franchise_category !== null &&
                              item?.franchise_category !== undefined && (
                                <>
                                  {item?.franchise_category?.name ? (
                                    <div className='mb-2'>
                                      <span
                                        className='bg-secondary py-1 px-2 text-truncate'
                                        style={{borderRadius: '5px'}}
                                      >
                                        {item?.franchise_category?.name ?? '---'}
                                      </span>
                                    </div>
                                  ) : null}
                                </>
                              )}
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className=' h-100 d-md-flex flex-md-column justify-content-between align-items-md-end mt-12 mt-md-0 '>
                            <div className='text-md-end biz-owner-text-break d-flex flex-column flex-md-row justify-content-between d-md-block '>
                              <h1 className='text-primary similar-price-range  text-md-end'>
                                <span className='mx-md-2   text-dark'>
                                  <img src={dollarPic} alt='' className='mb-1' />
                                </span>

                                {item?.cash_required ?? 'NaN'}
                              </h1>
                              <p className='pt-2  cash-flow mb-0 '>
                                Cash Required: ${item?.cash_required ?? 'NaN'}
                              </p>
                            </div>
                            {userName !== item?.franchise_user?.username ? (
                              <div className='mt-4 mt-md-0 text-md-end d-flex flex-wrap flex-md-nowrap'>
                                {transtokenData ? (
                                  <>
                                    {item?.favorite == null ? (
                                      <div
                                        className='biz_owner_carousel_img_camera'
                                        onClick={(e) =>
                                          role == 'agent'
                                            ? agentAlertHandler()
                                            : saveListing(e, item.id)
                                        }
                                      >
                                        <img
                                          src={heart}
                                          alt=''
                                          id={item?.id}
                                          className=' mx-auto d-block img-fluid biz-owner-heart-icon-save-listings_franchise  pt-1 cursor-pointer '
                                          name='saved-listings'
                                        />
                                      </div>
                                    ) : (
                                      <div
                                        className='biz_owner_carousel_img_camera-active'
                                        onClick={(e) =>
                                          role == 'agent'
                                            ? agentAlertHandler()
                                            : saveListing(e, item.id)
                                        }
                                      >
                                        <img
                                          src={redHeart}
                                          alt=''
                                          id={item?.id}
                                          className=' mx-auto d-block img-fluid biz-owner-heart-icon-save-listings_franchise  pt-1 cursor-pointer '
                                          name='saved-listings'
                                        />
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <div
                                    className='biz_owner_carousel_img_camera'
                                    data-bs-toggle='modal'
                                    data-bs-target='#kt_modal_login'
                                  >
                                    <img
                                      src={heart}
                                      alt=''
                                      id={item?.id}
                                      onClick={(e) => logOutSaveListing(e, item.id)}
                                      className=' mx-auto d-block img-fluid biz-owner-heart-icon-save-listings_franchise  pt-1 cursor-pointer '
                                      name='saved-listings'
                                    />
                                  </div>
                                )}
                                {franchiseContactId?.includes(item?.id) && (
                                  <div className='float-right'>
                                    <button className='btn px-md-6 rounded franchise-disable-btn   text-nowrap btn-primary disabled  py-3 '>
                                      Contacted
                                    </button>
                                  </div>
                                )}
                                {!franchiseContactId.includes(item?.id) && (
                                  <div className='float-right'>
                                    <button
                                      type='button'
                                      onClick={(e) =>
                                        role == 'agent'
                                          ? agentAlertHandler()
                                          : contactRequest(e, item?.id, item?.title)
                                      }
                                      className='btn px-4 pe-4  text-nowrap biz-owner-contact-btn  py-3'
                                      data-bs-toggle={role == 'agent' ? null : 'modal'}
                                      data-bs-target='#kt_modal_contact'
                                      id={item.id}
                                    >
                                      <img
                                        className='pb-1 pe-3'
                                        id='contact-id'
                                        src={contactBtn}
                                        alt=''
                                        width={30}
                                        onClick={(e) =>
                                          role == 'agent'
                                            ? agentAlertHandler()
                                            : contactRequest(e, item?.id, item?.title)
                                        }
                                      />
                                      Contact
                                    </button>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className='mt-4 mt-md-0 text-md-end d-flex flex-wrap flex-md-nowrap'>
                                <div
                                  className='biz_owner_carousel_img_camera'
                                  onClick={(e) => ownListingHandler()}
                                >
                                  <img
                                    src={heart}
                                    alt=''
                                    id={item?.id}
                                    className=' mx-auto d-block img-fluid biz-owner-heart-icon-save-listings_franchise  pt-1 cursor-pointer '
                                    name='saved-listings'
                                  />
                                </div>

                                <div className='float-right'>
                                  <button
                                    type='button'
                                    onClick={(e) => ownListingHandler()}
                                    className='btn px-4 pe-4  text-nowrap biz-owner-contact-btn  py-3'
                                    id={item.id}
                                  >
                                    <img
                                      className='pb-1 pe-3'
                                      id='contact-id'
                                      src={contactBtn}
                                      alt=''
                                      width={30}
                                      onClick={(e) => ownListingHandler()}
                                    />
                                    Contact
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='col-lg-3  d-none d-lg-block'>
                <Add />
              </div>
            </div>
          ) : null
        ) : null}
      </div>

      {loader
        ? lastPage > 1 && (
            <div className='d-flex justify-content-center my-15 container text-nowrap pb-4'>
              <nav
                aria-label='Page navigation example '
                className='biz-owner-pagination text-nowrap'
              >
                <ul className='pagination text-nowrap'>
                  {currentPage !== 1 && (
                    <li
                      className={'page-item text-muted text-nowrap previous '}
                      style={{cursor: 'pointer'}}
                    >
                      <span
                        className='page-link text-muted text-nowrap'
                        onClick={() => paginate(currentPage - 1)}
                      >
                        <span className='pe-2 text-nowrap '>
                          <GrFormPrevious size={25} color='#8b898990' />
                        </span>
                        Prev
                      </span>
                    </li>
                  )}

                  {paginationArray.map((item, index) => {
                    return (
                      <li
                        className={`page-item  ${index + 1 === currentPage ? 'active' : null}`}
                        style={{cursor: 'pointer'}}
                        key={index}
                      >
                        <span onClick={() => paginate(item)} className='page-link'>
                          {`${item}`}
                        </span>
                      </li>
                    )
                  })}
                  {currentPage !== lastPage && (
                    <li className={'page-item text-muted text-nowrap'} style={{cursor: 'pointer'}}>
                      <span
                        className='page-link text-muted text-nowrap'
                        onClick={() => paginate(currentPage + 1)}
                      >
                        Next
                        <span className='ps-2 text-nowrap'>
                          <GrFormNext size={25} color='#8b898990' />
                        </span>
                      </span>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          )
        : null}
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
                placeholder='johndoe@email.com'
                onChange={(e) => inputChange(e)}
              />
              {loginEmailValidation ? (
                <div className='biz_owner_input_validation'>Invalid email</div>
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
                  onClick={(e) => loginHandler(e, logOutSaveListingsId)}
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
