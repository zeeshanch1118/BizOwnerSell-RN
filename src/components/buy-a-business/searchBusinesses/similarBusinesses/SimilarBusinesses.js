import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom'
import {GrFormNext, GrFormPrevious, GrNext} from 'react-icons/gr'
import {Modal} from 'react-bootstrap'
//
import {getFilteredData, requestFranchises} from '../../../services/buy-a-franchises/index'
import Add from '../Add'
import {requestBusinessesConnected} from '../../../services/forSearchBusiness/Index'
import {addFavorite} from '../../../services/common-services'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../services/auth-services/AuthServices'
//
import UnlockSubscription from '../../../unlock-subscription/UnlockSubscription'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import MainScreenLoader from '../../../../assets/Loader/MainScreenLoader.gif'
import dollarPic from '../../../../assets/icons/dollarIcon.svg'

import locationIcon from '../../../../assets/icons/location.svg'
import heart from '../../../../assets/icons/heartIcon.svg'
import redHeart from '../../../../assets/icons/redHeart.svg'
import back from '../../../../assets/icons/backIcon.svg'
import contactBtn from '../../../../assets/icons/contact-btn-icon.svg'
import '../../../buy-a-franchise/FranchiseCategories.css'
import dummyImg from '../../../../assets/dummy.jpg'

import Swal from 'sweetalert2'
import {modalText, ownListingAlert} from '../../../alert-text'

export default function SimilarBusinesses() {
  const location = useLocation()
  const navigate = useNavigate()
  const {franchiseID} = useParams()
  const {pathname} = useLocation()
  const [currentPage, setCurrentPage] = useState('')
  const [lastPage, setLastPage] = useState([])
  const [loader, setLoader] = useState(false)
  const [totalRecord, setTotalRecord] = useState(null)
  const [selectedListTitle, setSelectedListTitle] = useState('')
  const [franchiseData, setFranchiseData] = useState([])
  const [isContinueBtn, setIsContinueBtn] = useState(false)
  const [btnContactId, setBtnContactId] = useState([])
  const [contactData, setContactData] = useState([])

  const [isShowPackageModal, setIsShowPackageModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('Please select a plan to access more features')
  const [selectedId, setSelectedId] = useState()

  const [firstName, setFirstName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(
    'I would like to inquire about your business please contact me at your earliest convenience'
  )
  const [phoneValiDation, setPhoneValiDation] = useState(false)
  const [fNameValiDation, setFNameValiDation] = useState(false)
  const [emailValiDation, setEmailValiDation] = useState(false)
  const [messageValiDation, setMessageValiDation] = useState(false)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState(false)
  const [selectedIdContact, setSelectedIdContact] = useState()
  const [logOutSaveListings, setLogOutSaveListings] = useState()
  const [isModalShow, setShow] = useState(false)
  const [loginEmailValidation, setLoginEmailValidation] = useState(false)
  const [loginPasswordValidation, setLoginPasswordValidation] = useState(false)
  const [logOutSaveListingsId, setLogOutSaveListingsId] = useState()
  let dispatch = useDispatch()
  const tokenData = localStorage.getItem('userData')

  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData
  const {userName} = transtokenData
  let filterData = []
  let imagID
  let businessContactId = []
  let contactId = JSON?.parse(localStorage.getItem('businessContactId'))

  useEffect(() => {
    if (contactId) {
      setBtnContactId(contactId.businessContactId)
    }
    console.log('location?.state?.data', location?.state?.data)
    setFranchiseData(location?.state?.data)
    if (location?.state?.data?.length > 0) {
      setLoader(true)
    }
  }, [])
  ///////////getForSearchFranchiseData//////////////////
  useEffect(() => {
    getForSearchFranchiseData()
  }, [franchiseID, pathname])

  const getForSearchFranchiseData = async (page = 1) => {
    const localStorageMinPrice = localStorage.getItem('f_minPrice')
    const transformedminPrice = JSON?.parse(localStorageMinPrice)
    const {f_minPrice} = transformedminPrice ?? ''

    const localStoragemaxPrice = localStorage.getItem('f_maxPrice')
    const transformedmaxPrice = JSON?.parse(localStoragemaxPrice)
    const {f_maxPrice} = transformedmaxPrice ?? ''

    const localStorageCityID = localStorage.getItem('franchiseCityID')
    const transformedcityID = JSON?.parse(localStorageCityID)
    const cityID = transformedcityID ?? ''

    const localStorageCountryID = localStorage.getItem('franchiseCountryID')
    const transformedcountryID = JSON?.parse(localStorageCountryID)
    const countryID = transformedcountryID ?? ''

    const localStorageStateID = localStorage.getItem('franchiseStateID')
    const transformedstateID = JSON?.parse(localStorageStateID)
    const stateID = transformedstateID ?? ''
    const localStoragefranchisesID = localStorage.getItem('franchisesID')
    const transformedfranchisesID = JSON?.parse(localStoragefranchisesID)
    const {franchisesID} = transformedfranchisesID ?? ''

    if (franchisesID) {
      try {
        const result = await getFilteredData(
          page,
          franchisesID,
          f_minPrice,
          f_maxPrice,
          cityID,
          countryID,
          stateID
        )
        console.log('getBusinessListingTypes err', result)
        if (result.status === true) {
          let businessData = []

          setCurrentPage(result.franchises.current_page)
          setLastPage(result.franchises.last_page)
          setTotalRecord(result.franchises.total)
          // setFranchiseData(result.franchises.data)

          await result.franchises.data.map((item, index) => {
            businessData.push({
              id: item.id,
              title: item.title,
              location: item.location,
              totalInvestment: item.total_investment,
              cashRequired: item.cash_required,
              description: item.short_description,
              img: item.slider_images,
              slug: item.slug,
              // activeImg: item.slider_images[0].full_pathfull_path + 'thumb/' + item.slider_images[0].file_name,
              imgId: 'bizOwner' + item.id + 'imgId',
            })
          })

          // setFranchiseData(businessData)
        }
      } catch (err) {
        console.log('getBusinessListingTypes err', err)

        // setErrorModelText(err.response.data.message)
        // setErrorModel(true);
      }
    } else if (franchiseID) {
      try {
        const result = await getFilteredData(
          page,
          [franchiseID],
          f_minPrice,
          f_maxPrice,
          cityID,
          countryID,
          stateID
        )
        if (result.status === true) {
          let businessData = []

          setCurrentPage(result.franchises.current_page)
          setLastPage(result.franchises.last_page)
          setTotalRecord(result.franchises.total)
          // setFranchiseData(result.franchises.data)

          await result.franchises.data.map((item, index) => {
            businessData.push({
              id: item.id,
              title: item.title,
              location: item.location,
              totalInvestment: item.total_investment,
              cashRequired: item.cash_required,
              description: item.short_description,
              img: item.slider_images,
              slug: item.slug,
              // activeImg: item.slider_images[0].full_pathfull_path + 'thumb/' + item.slider_images[0].file_name,
              imgId: 'bizOwner' + item.id + 'imgId',
            })
          })
        }
      } catch (err) {
        console.log('getBusinessListingTypes err', err)
      }
    } else {
      try {
        const result = await getFilteredData(
          page,
          [],
          f_minPrice,
          f_maxPrice,
          cityID,
          countryID,
          stateID
        )
        if (result.status === true) {
          let businessData = []

          setCurrentPage(result.franchises.current_page)
          setLastPage(result.franchises.last_page)
          setTotalRecord(result.franchises.total)
          // setFranchiseData(result.franchises.data)

          await result.franchises.data.map((item, index) => {
            let randomId = Math.floor(Math.random() * 6)
            businessData.push({
              id: item.id,
              title: item.title,
              location: item.location,
              totalInvestment: item.total_investment,
              cashRequired: item.cash_required,
              description: item.short_description,
              img: item.slider_images,
              slug: item.slug,
              // activeImg: item.slider_images[0].full_pathfull_path + 'thumb/' + item.slider_images[0].file_name,
              imgId: 'bizOwner' + randomId + item.phone + 'imgId',
            })
          })

          // setFranchiseData(businessData)
        }
      } catch (err) {
        console.log('getBusinessListingTypes err', err)
      }
    }
  }
  // let cost = [...franchiseData]
  ///////////////////////////////////Starting///////////////////////////
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const getSingleBusinessData = async (e, id, title) => {
    setSelectedListTitle(title)
    setSelectedId(id)
    setSelectedIdContact(e.target)
  }
  const inputChange = async (event) => {
    switch (event.target.name) {
      case 'firstName':
        await setFirstName(event.target.value)
        setFNameValiDation(false)

        break
      case 'login-email':
        await setLoginEmail(event.target.value)
        setLoginEmailValidation(false)
        break
      case 'login-password-modal':
        await setLoginPassword(event.target.value)
        setLoginPasswordValidation(false)
        break
      // case 'phone':
      //   await setPhone(e.target.value)
      //   break
      case 'email':
        await setEmail(event.target.value)
        setEmailValiDation(false)
        break

      case 'message':
        await setMessage(event.target.value)
        setMessageValiDation(false)

        break
      default:
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
              userName: result.user.first_name,
              role: result.role[0].name,
              userID: result.user.id,
            })
          )

          const response = await addFavorite(
            result.token,
            'business',
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

  const sentMessage = async (e, id, title) => {
    // contactData.push({title: title})

    if (contactId) {
      businessContactId = contactId.businessContactId
    }
    // const businessContactId = []

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
      message !== '' &&
      message !== undefined &&
      email != '' &&
      email != undefined &&
      isValidEmail(email)
    ) {
      let currentId = selectedIdContact

      setIsContinueBtn(true)
      if (selectedIdContact.id == 'contact-id') {
        currentId = selectedIdContact.parentNode
        // e.currentTarget.classList.add('btn3-primary')
        currentId.parentNode.textContent = ''

        currentId.parentNode.classList.remove('biz-owner-contact-btn')
        currentId.parentNode.classList.add('biz-owner-btn-loader')
      } else {
        // e.currentTarget.classList.add('btn3-primary')
        currentId.textContent = ''

        currentId.classList.add('biz-owner-btn-loader')
        currentId.classList.remove('biz-owner-contact-btn')
      }

      try {
        const response = await requestBusinessesConnected(
          'single',
          firstName,
          email,
          phone,
          id,
          message
        )

        businessContactId.push(id)

        if (response.status == true) {
          // setContactData(contactData)
          Swal.fire({
            text: 'Email has been sent successfully',
            icon: 'success',
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          })
          setIsContinueBtn(false)
          currentId.classList.remove('biz-owner-btn-loader')
          currentId.classList.add('franchise-disable-btn')
          currentId.classList.add('px-7')
          currentId.classList.add('disabled')
          currentId.textContent = 'Contacted'
          setSelectedIdContact('')
          setPhone('')
          setFirstName('')
          setEmail('')
          setMessage('')
          // localStorage.setItem('businessContactId', JSON.stringify(businessContactId))
          localStorage.setItem(
            'businessContactId',
            JSON.stringify({
              businessContactId: businessContactId,
            })
          )
        }
      } catch (error) {
        console.log('similar business', error)
      }
    }

    // console.log(fName, phone, email, message, id)
  }

  /////////////////////////////////Form Value End//////////

  //////////////////formvalidation///////////////

  const phoneNumberHandler = async (phone) => {
    await setPhone(phone)
    await setPhoneValiDation(false)
  }

  //////////////////endformvalidation///////////////

  let paginationArray = []
  for (let i = 1; i <= lastPage; i++) {
    paginationArray.push(i)
  }

  const paginate = (pageNumber) => {
    getForSearchFranchiseData(pageNumber)
    window.scrollTo({
      top: 0,
      // left: 100,
      behavior: 'smooth',
    })
    // window.scrollTo(0, 1000)
  }
  ///////////////////
  const localStorageMinPrice = localStorage.getItem('f_minPrice')
  const transformedminPrice = JSON?.parse(localStorageMinPrice)
  const localStoragemaxPrice = localStorage.getItem('f_maxPrice')
  const transformedmaxPrice = JSON?.parse(localStoragemaxPrice)

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
              <div className='col-lg-9  me-4'>
                <div className='row'>
                  <div className=' p-3 mx-1 mb-4 rounded' style={{backgroundColor: '#eff4f5'}}>
                    <div className=''>
                      <h3 className='fs-4 my-4'>
                        We've identified the following businesses you might be interested in.
                      </h3>
                    </div>
                  </div>
                </div>
                {franchiseData?.map((item, i) => {
                  {
                    imagID = 'bizzOwner' + item?.id + 'imagesId'
                  }
                  return (
                    <>
                      <div key={i}>
                        <div className='row newStyleDiv p-4 mb-5 '>
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
                                    userName == item?.user?.username
                                      ? `/my-business/${item.slug}/${item.id}`
                                      : `/businesses/${item.slug}/${item.id}`
                                  } `}
                                  className='w-100'
                                >
                                  <div className='carousel-inner h-100 carousel-inner-container_franchise d-md-flex  '>
                                    <>
                                      {item?.slider_images[0]?.full_path ? (
                                        <div className='carousel-item  w-100 active'>
                                          <img
                                            src={
                                              item?.slider_images[0]?.full_path +
                                              'medium/' +
                                              item?.slider_images[0]?.file_name
                                            }
                                            className='d-block m-auto img-fluid '
                                            alt='...'
                                            style={{width: '100%', height: '100%'}}
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
                              className='pe-2 mt-4 mt-md-0 biz-owner-end-border-franchise h-100 text-wrap d-flex flex-column justify-content-between'
                              style={{
                                margin: '0px 4px',
                              }}
                            >
                              <Link
                                to={`${
                                  userName == item?.user?.username
                                    ? `/my-business/${item.slug}/${item.id}`
                                    : `/businesses/${item.slug}/${item.id}`
                                } `}
                              >
                                <h5
                                  className='franchise-listing-bizOwner-heading bizOwner-line-breaker'
                                  style={{
                                    fontFamily: 'Arimo',
                                  }}
                                >
                                  {item?.title ? item?.title : 'NaN'}
                                </h5>
                                {/* ///////////////////// */}
                                {item?.location_visibitiy?.slug !== 'show-no-location' ? (
                                  <span
                                    className='bizOwner-line-breaker'
                                    style={{color: '#081C3D'}}
                                  >
                                    {item?.location?.lat ? (
                                      <>
                                        {item.location_visibitiy?.slug ===
                                        'show-full-visibility' ? (
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
                                              className='mb-2 mt-2 me-2'
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
                                        ) : item.location_visibitiy?.slug ===
                                          'show-country-state' ? (
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
                                              className='mb-2 mt-2 me-2'
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
                                      <>
                                        <span className=''>
                                          <img
                                            className='mb-2 mt-2 me-2'
                                            src={locationIcon}
                                            alt=''
                                            width={13}
                                          />
                                          {item?.location?.country?.substring(0, 30) ?? 'NaN'}
                                        </span>
                                      </>
                                    )}
                                  </span>
                                ) : null}
                                {/* ///////////////////// */}
                                <a
                                  className='pe-md-3 bizOwner-line-breaker'
                                  style={{
                                    color: '#081C3D',

                                    fontWeight: '400',
                                    fontSize: '13px',
                                    lineHeight: '20px',
                                  }}
                                >
                                  {/* {item?.location?.country ?? 'NaN'} */}
                                  {item?.description != null &&
                                  item?.description != 'null' &&
                                  item?.description != undefined &&
                                  item?.description != 'undefined' &&
                                  item?.description != '' ? (
                                    <p className='pt-2'>
                                      {item.description?.replace(/(<([^>]+)>)/gi, ' ') ?? 'NaN'}
                                    </p>
                                  ) : null}

                                  {/* {props.dec?.replace(/(<([^>]+)>)/gi, ' ').substring(0, 100) ?? 'NaN'} */}
                                </a>
                                {/* ///////////////////////////// */}
                              </Link>

                              {item?.listing_type !== null && item?.listing_type !== undefined && (
                                <>
                                  {item?.listing_type?.type ? (
                                    <div className='mb-2'>
                                      <span
                                        className='bg-secondary py-1 px-2 text-truncate'
                                        style={{borderRadius: '5px'}}
                                      >
                                        {item?.listing_type?.type ?? '---'}
                                      </span>
                                    </div>
                                  ) : null}
                                </>
                              )}
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className=' h-100 d-md-flex flex-md-column justify-content-between align-items-md-end'>
                              <div className='text-md-end biz-owner-text-break d-flex flex-column flex-md-row justify-content-between d-md-block'>
                                <h1 className='text-primary similar-price-range mt-5 mt-md-0 text-md-end'>
                                  <span className='mx-md-2   text-dark'>
                                    <img src={dollarPic} alt='' className='mb-1' />
                                  </span>

                                  {item?.asking_price ?? 'NaN'}
                                </h1>
                                <p className='pt-2  cash-flow mb-0'>
                                  Cash flow: ${item?.cash_flow ?? 'NaN'}
                                </p>
                              </div>

                              {userName !== item?.user?.username ? (
                                <div className='mt-4 mt-md-0 d-flex flex-wrap flex-md-nowrap'>
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
                                  {btnContactId?.includes(item.id) && (
                                    <div className='float-right'>
                                      <button
                                        type='button'
                                        className='btn px-7   text-nowrap business-disable-btn disabled  py-3'

                                        // '#kt_modal_contact'
                                      >
                                        Contacted
                                      </button>
                                    </div>
                                  )}
                                  {!btnContactId?.includes(item.id) && (
                                    <div className='float-right'>
                                      <button
                                        type='button'
                                        className='btn px-4 pe-4  text-nowrap biz-owner-contact-btn  py-3'
                                        onClick={(e) =>
                                          role == 'agent'
                                            ? agentAlertHandler()
                                            : getSingleBusinessData(e, item.id, item.title)
                                        }
                                        data-bs-toggle={role == 'agent' ? null : 'modal'}
                                        data-bs-target={`#kt_modal_contact${item.id}_contact`}

                                        // '#kt_modal_contact'
                                      >
                                        {/* <MdOutlineContacts size={16} /> */}
                                        <img
                                          className='pb-1 pe-3'
                                          id='contact-id'
                                          src={contactBtn}
                                          alt=''
                                          width={30}
                                          onClick={(e) =>
                                            role == 'agent'
                                              ? agentAlertHandler()
                                              : getSingleBusinessData(e, item.id, item.title)
                                          }
                                        />
                                        Contact
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className='mt-4 mt-md-0 d-flex flex-wrap flex-md-nowrap'>
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
                                      className='btn px-4 pe-4  text-nowrap biz-owner-contact-btn  py-3'
                                      onClick={(e) => ownListingHandler()}
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

                      <div
                        className='modal fade'
                        tabIndex={-1}
                        id={`kt_modal_contact${item.id}_contact`}

                        // 'kt_modal_contact'
                      >
                        <div className='modal-dialog modal-lg'>
                          <div className='modal-content'>
                            <div className='modal-header p-3'>
                              <h5 className='modal-title ps-2 fs-3'>
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
                                    <label
                                      htmlFor='exampleFormControlInput1'
                                      className=' form-label required'
                                    >
                                      Full Name
                                    </label>
                                    <input
                                      type='text'
                                      name='firstName'
                                      value={firstName}
                                      className='form-control form-control-solid'
                                      placeholder='John Doe'
                                      onChange={(e) => inputChange(e)}
                                    />{' '}
                                    {fNameValiDation ? (
                                      <div className='biz_owner_input_validation'>
                                        Enter full name
                                      </div>
                                    ) : null}
                                  </div>

                                  <div className='-6 mb-10'>
                                    <label className='form-label required'>
                                      Phone Number For Listing
                                    </label>

                                    <PhoneInput
                                      country={'us'}
                                      value={phone}
                                      onChange={phoneNumberHandler}
                                    />
                                    {phoneValiDation ? (
                                      <div className='biz_owner_input_validation'>
                                        Enter correct phone number
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className='mb-10'>
                                    <label
                                      htmlFor='exampleFormControlInput1'
                                      className=' form-label required'
                                    >
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
                                      <div className='biz_owner_input_validation'>
                                        {' '}
                                        Invalid email address
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className='mb-10'>
                                    <label
                                      htmlFor='exampleFormControlInput1'
                                      className=' form-label required'
                                    >
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
                                      <div className='biz_owner_input_validation'>
                                        Enter message
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className=' text-center d-flex flex-column pb-3'>
                              <div>
                                {email != '' &&
                                isValidEmail(email) &&
                                email != undefined &&
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
                                    onClick={(e) => sentMessage(e, item.id, item.title)}
                                  >
                                    Send Message
                                  </button>
                                ) : (
                                  <button
                                    type='button'
                                    className='btn btn-contact-dismiss  mb-4  '
                                    // data-bs-dismiss='modal'

                                    onClick={(e) => sentMessage(e, item.id, item.title)}
                                    style={{backgroundColor: '#35bfff53', color: 'white'}}
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
                    </>
                  )
                })}
              </div>
              <div className='col-lg-3 ms-0 d-none d-lg-block'>
                <Add />
              </div>
            </div>
          ) : null
        ) : (
          <div
            className='d-flex justify-content-center align-items-center'
            style={{height: '90vh', width: '100%'}}
          >
            <div>
              <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
            </div>
          </div>
        )}
      </div>

      {loader
        ? lastPage > 1 && (
            <div className='d-flex justify-content-center my-15 container text-nowrap'>
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
                        </span>{' '}
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
                {' '}
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
            loginEmail.includes('@') &&
            loginPassword != '' &&
            loginPassword != undefined ? (
              <div>
                <button
                  type='button'
                  className='btn btn-primary  px-12'
                  onClick={(e) => loginHandler(e, logOutSaveListingsId)}
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
