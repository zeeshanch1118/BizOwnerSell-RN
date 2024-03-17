import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {ImCross} from 'react-icons/im'
import {
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
import './FranchiseCategories.css'
import {GrFacebookOption} from 'react-icons/gr'
import TopBar from './franchises-for-sale/TopBar/TopBar'
import {Modal, Tab, Tabs} from 'react-bootstrap'

import {getFilteredData} from '../services/buy-a-franchises/index'
import {addFavorite, requestFranchises} from '../services/common-services/index'
import {useDispatch} from 'react-redux'
import {loginUser} from '../services/auth-services/AuthServices'
import Pagination from '../../common component/Pagination'

//
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'
import dollarPic from '../../assets/icons/dollarIcon.svg'
import dummyImg from '../../assets/dummy.jpg'
// import twitter from '../../assets/icons/twitter.svg'
// import emailIcon from '../../assets/icons/emailIcon.svg'
// import linkedinIcon from '../../assets/icons/linkedinIcon.svg'
import locationIcon from '../../assets/icons/location.svg'
import heart from '../../assets/icons/heartIcon.svg'
import redHeart from '../../assets/icons/redHeart.svg'
import twitter from '../../assets/icons/social-share-icons/twitter.svg'
import facebookIcon from '../../assets/icons/social-share-icons/facebookIcon.svg'
import linkedinIcon from '../../assets/icons/social-share-icons/linkedinIcon.svg'
import emailIcon from '../../assets/icons/social-share-icons/emailIcon.svg'
import ButtonLoader from '../../assets/Loader/ButtonLoader.gif'
import contactBtn from '../../assets/icons/contact-btn-icon.svg'
import UnlockSubscription from '../unlock-subscription/UnlockSubscription'
import {height} from '@mui/system'
import {modalText, ownListingAlert} from '../alert-text'
import Swal from 'sweetalert2'
import Select from 'react-select'

import {getCountries} from '../services/get-fields-data'
import Multiselect from 'multiselect-react-dropdown'
export default function FranchiseCategories() {
  const navigate = useNavigate()
  let dispatch = useDispatch()

  const [isShowPackageModal, setIsShowPackageModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('Please select a plan to access more features')
  const {franchiseID} = useParams()
  const {pathname} = useLocation()
  const [currentPage, setCurrentPage] = useState('')
  const [lastPage, setLastPage] = useState([])
  const [loader, setLoader] = useState(false)
  const [totalRecord, setTotalRecord] = useState(null)
  const [lists, setLists] = useState([])
  const [clickedId, setClickedId] = useState([])
  const [contactBtnId, setContactBtnId] = useState([])
  const [formToggle, setFormToggle] = useState(false)
  const [franchiseData, setFranchiseData] = useState([])
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [forgetPass, setForgetPass] = useState('')
  const [isContinueBtn, setIsContinueBtn] = useState(false)

  const [allCountries, setAllCountries] = useState([])
  const [timeFrames, setTimeFrames] = useState('')
  const [cash, setCash] = useState('')
  const [states, setStates] = useState('')

  const [userNames, setuserNames] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneN, setPhoneN] = useState('')
  const [zipCode, setZipCode] = useState('')

  const [userForm, setUserForm] = useState(false)
  const [firstNameForm, setFirstNameForm] = useState(false)
  const [emailForm, setEmailForm] = useState(false)
  const [loginEmailValidation, setLoginEmailValidation] = useState(false)
  const [loginPasswordValidation, setLoginPasswordValidation] = useState(false)
  const [phoneNForm, setPhoneNForm] = useState(false)
  const [zipCodeForm, setZipCodeForm] = useState(false)
  const [cashForm, setCashForm] = useState(false)
  const [timeFramesForm, setTimeFramesForm] = useState(false)
  const [statesForm, setStatesForm] = useState(false)
  const [isModalShow, setShow] = useState(false)
  const [logOutSaveListings, setLogOutSaveListings] = useState()
  const [logOutSaveListingsId, setLogOutSaveListingsId] = useState()
  const [showMobile, setShowMobile] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [franchiseCat, setFranchiseCat] = useState(false)

  //

  const tokenData = localStorage.getItem('userData')

  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData
  const {userName} = transtokenData
  const userRequestData = localStorage.getItem('franchiseRequestUserRecord')
  const transformedUserRequestData = JSON?.parse(userRequestData)
  const localStorageMinPrice = localStorage.getItem('f_minPrice')
  const transformedminPrice = JSON?.parse(localStorageMinPrice)
  const {f_minPrice} = transformedminPrice ?? ''
  const localStoragemaxPrice = localStorage.getItem('f_maxPrice')
  const transformedmaxPrice = JSON?.parse(localStoragemaxPrice)
  const {f_maxPrice} = transformedmaxPrice ?? ''
  const franchiseListingName = JSON?.parse(localStorage.getItem('franchiseListingName'))
  const cityID = JSON?.parse(localStorage.getItem('franchiseCityID'))
  const countryID = JSON?.parse(localStorage.getItem('franchiseCountryID'))
  const stateID = JSON?.parse(localStorage.getItem('franchiseStateID'))
  const optionsCash = [
    'Less than $10,000',
    '$20,000',
    '$30,000',
    '$40,000',
    '$50,000',
    '$60,000',
    '$70,000',
    '$80,000',
    '$90,000',
    '$100,000',
    '$150,000',
    '$200,000',
    '$250,000',
    '$300,000',
    '$350,000',
    '$400,000',
    '$450,000',
    '$500,000',
    '$500,000+',
  ]
  const optionsStates = [
    'United States',
    'Canada',
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',

    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'IllinoisIndiana',
    'Iowa',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'MontanaNebraska',
  ]
  const timeFrame = ['1-3 Months', '3-6 Months', '6+ Months']
  let filterData = []
  let imagID
  useEffect(() => {
    getForSearchFranchiseData(1)
  }, [franchiseID, pathname])
  useEffect(() => {
    let contactId = JSON?.parse(localStorage.getItem('franchiseContactId'))
    if (contactId) {
      setContactBtnId(contactId.franchiseContactId)
    }
    getAllCountries()
  }, [])

  const getForSearchFranchiseData = async (page) => {
    setLoader(false)
    setFranchiseCat(!franchiseCat)
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
          stateID,
          accessToken
        )
        if (result.status === true) {
          let businessData = []

          setCurrentPage(result.franchises.current_page)
          setLastPage(result.franchises.last_page)
          setTotalRecord(result.franchises.total)
          // setFranchiseData(result.franchises.data)
          setLoader(true)

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
              favorite: item.favorite,
              location_visibitiy: item.location_visibitiy,
              // activeImg: item.slider_images[0].full_pathfull_path + 'thumb/' + item.slider_images[0].file_name,
              imgId: 'bizOwner' + item.id + 'imgId',
              userName: item?.franchise_user?.username,
              listingType: item?.franchise_category,
            })
          })

          setFranchiseData(businessData)
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
          stateID,
          accessToken
        )
        if (result.status === true) {
          let businessData = []

          setCurrentPage(result.franchises.current_page)
          setLastPage(result.franchises.last_page)
          setTotalRecord(result.franchises.total)
          // setFranchiseData(result.franchises.data)
          setLoader(true)
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
              favorite: item.favorite,
              location_visibitiy: item.location_visibitiy,
              // activeImg: item.slider_images[0].full_pathfull_path + 'thumb/' + item.slider_images[0].file_name,
              imgId: 'bizOwner' + item.id + 'imgId',
              userName: item?.franchise_user?.username,
              listingType: item?.franchise_category,
            })
          })

          setFranchiseData(businessData)
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
          stateID,
          accessToken
        )
        if (result.status === true) {
          console.log('result', result)
          let businessData = []
          setFranchiseData([])
          setCurrentPage(result.franchises.current_page)
          setLastPage(result.franchises.last_page)
          setTotalRecord(result.franchises.total)
          // setFranchiseData(result.franchises.data)
          setLoader(true)

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
              favorite: item.favorite,
              location_visibitiy: item.location_visibitiy,
              // activeImg: item.slider_images[0].full_pathfull_path + 'thumb/' + item.slider_images[0].file_name,
              imgId: 'bizOwner' + item.id + 'imgId',
              userName: item?.franchise_user?.username,
              listingType: item?.franchise_category,
            })
          })

          setFranchiseData(businessData)
        }
      } catch (err) {
        console.log('getBusinessListingTypes err', err)
      }
    }
  }
  const getAllCountries = async () => {
    let mapCountries = []
    let filterCountries = []
    try {
      const result = await getCountries()
      if (result.status === true) {
        result.countries.map((item, index) => mapCountries.push({value: item.id, label: item.name}))
        filterCountries = mapCountries.filter((x) => {
          return x.value !== 39 && x.value !== 233
        })
        filterCountries.unshift({value: 233, label: 'United States'}, {value: 39, label: 'Canada'})
        setAllCountries(filterCountries)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  let cost = [...franchiseData]
  ///////////////////////////////////Starting///////////////////////////
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const getFilterData = async (filterResultData, page) => {
    getForSearchFranchiseData(page)
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
    const response = await addFavorite(accessToken, 'franchise', id, type)
  }

  const ContactRequest = async (e) => {
    const userRequestData = localStorage.getItem('franchiseRequestUserRecord')
    const transformedUserRequestData = JSON?.parse(userRequestData)

    let franchiesID = []

    franchiesID = lists.map((items, indexs) => {
      return items.id
    })
    if (transformedUserRequestData !== null) {
      setIsContinueBtn(true)

      const {firstName, lastName, email, phone, zipCode, capital, timeFrames, location} =
        transformedUserRequestData ?? ''
      const response = await requestFranchises(
        'multiple',
        firstName,
        lastName,
        email,
        phone,
        zipCode,
        capital,
        timeFrames,
        location,
        franchiesID
      )

      if (response.status == true) {
        setIsContinueBtn(false)

        localStorage.setItem(
          'franchiseContactId',
          JSON.stringify({
            franchiseContactId: clickedId,
          })
        )
        navigate('/similar-franchises', {
          state: {id: 1, data: response.samilerFranchise, title: lists},
        })
      }
    } else {
      if (userNames.length < 2 || userNames == '' || userNames == undefined) {
        setUserForm(true)
      }
      if (firstName == '' || firstName == undefined) {
        setFirstNameForm(true)
      }
      if (email == '' || email == undefined || !isValidEmail(email)) {
        setEmailForm(true)
      }
      if (zipCode == '' || zipCode == undefined || zipCode?.length <= 4) {
        setZipCodeForm(true)
      }
      if (cash == '' || cash == undefined) {
        setCashForm(true)
      }
      if (phoneN == '' || phoneN == undefined || phoneN.length < 6) {
        setPhoneNForm(true)
      }
      if (timeFrames == '' || timeFrames == undefined) {
        setTimeFramesForm(true)
      }
      if (states == '' || states == undefined) {
        setStatesForm(true)
      }
      if (
        userNames !== '' &&
        firstName !== '' &&
        email !== '' &&
        phoneN !== '' &&
        zipCode !== '' &&
        cash !== '' &&
        timeFrames !== '' &&
        states !== '' &&
        franchiesID !== '' &&
        isValidEmail(email) &&
        phoneN.length > 5 &&
        zipCode.length > 4
      ) {
        setIsContinueBtn(true)

        const response = await requestFranchises(
          'multiple',
          userNames,
          firstName,
          email,
          phoneN,
          zipCode,
          cash,
          timeFrames,
          states?.label,
          franchiesID
        )
        if (response.status == true) {
          setIsContinueBtn(false)

          localStorage.setItem(
            'franchiseRequestUserRecord',
            JSON.stringify({
              firstName: userNames,
              lastName: firstName,
              email: email,
              phone: phoneN,
              zipCode: zipCode,
              capital: cash,
              timeFrames: timeFrames,
              location: states.label,
            })
          )
          localStorage.setItem(
            'franchiseContactId',
            JSON.stringify({
              franchiseContactId: clickedId,
            })
          )
          navigate('/similar-franchises', {
            state: {id: 1, data: response.samilerFranchise, title: lists},
          })
        }
      }
    }
  }

  /////////////////////////////////Form Value End//////////

  //////////////////formvalidation///////////////

  const inputChange = (event) => {
    switch (event.target.name) {
      case 'user-name':
        setuserNames(event.target.value)
        setUserForm(false)
        break
      case 'first-name':
        setFirstName(event.target.value)
        setFirstNameForm(false)
        break
      case 'login-email':
        setLoginEmail(event.target.value)
        setLoginEmailValidation(false)
        break
      case 'login-password-modal':
        setLoginPassword(event.target.value)
        setLoginPasswordValidation(false)
        break

      case 'email':
        setEmail(event.target.value)
        setEmailForm(false)
        break
      case 'phone':
        setPhoneN(event.target.value)
        setPhoneNForm(false)
        break

      default:
        break
    }

    if (event.target.name == 'zip-code') {
      let goNext = false
      if (event.target.value.length > event.target.maxLength) {
        event.target.value = event.target.value.slice(0, event.target.maxLength)
      }

      if (event.target.value.length > 0) {
        goNext = true
      } else {
        goNext = false
      }

      setZipCode(event.target.value)
      setZipCodeForm(false)
    }
  }
  const phoneNumberHandler = async (phone) => {
    await setPhoneN(phone)
    await setPhoneNForm(false)
  }

  const CapitalFunction = (e) => {
    setCash(e.target.value)
    setCashForm(false)
  }
  const TimeFramesFunction = (e) => {
    setTimeFrames(e.target.value)
    setTimeFramesForm(false)
  }
  const StatesFunction = (e) => {
    setStates(e.target.value)
    setStatesForm(false)
  }

  //////////////////endformvalidation///////////////

  const BuyASell = (id) => {
    let clickedIds

    clickedIds = clickedId
    if (!clickedIds.includes(id)) {
      clickedIds.push(id)
    }
    if (clickedIds.length == 1) {
      setFormToggle(false)
    }
    setClickedId([...clickedIds])
    let costData = cost
    let listData = lists

    costData.map((val) => {
      if (!listData.includes(val)) {
        if (val.id == id) {
          listData.push(val)
        }
      }
    })
    setLists([...listData])
    // console.log('=======>', lists)
    // setToggle(true)
  }
  const CheckedASell = (id) => {
    let clickedIds = clickedId
    // console.log('clickedIds=------->>', clickedIds)

    clickedIds.map((value, index) => {
      if (value == id) {
        clickedIds.splice(index, 1)
      }
    })

    setClickedId([...clickedIds])
    ///////////////////////////
    let listData = lists
    listData.map((value, index) => {
      if (value.id == id) {
        listData.splice(index, 1)
      }
    })

    setLists([...listData])
    // console.log('lists=====--------->', lists)
  }

  const togllerControler = () => {
    const userRequestData = localStorage.getItem('franchiseRequestUserRecord')
    const transformedUserRequestData = JSON?.parse(userRequestData)
    if (transformedUserRequestData !== null) {
      ContactRequest()
      localStorage.setItem(
        'franchiseContactId',
        JSON.stringify({
          franchiseContactId: clickedId,
        })
      )
    } else {
      setFormToggle(true)
    }
    // setToggle(false);
  }
  const resetToggle = (val, id) => {
    let listData = lists
    // console.log(lists, "''''''''''''''")
    listData.map((value, index) => {
      if (value.id == id) {
        listData.splice(index, 1)
      }
    })
    setLists([...listData])
    let clickedIds = clickedId
    clickedIds.map((value, index) => {
      if (value == id) {
        clickedIds.splice(index, 1)
      }
    })
    setClickedId([...clickedIds])

    setFormToggle(false)
  }
  const resetToggleForm = (val, id) => {
    let listData = lists
    listData.map((value, index) => {
      if (value.id == id) {
        listData.splice(index, 1)
      }
    })
    setLists([...listData])
    let clickedIds = clickedId
    clickedIds.map((value, index) => {
      if (value == id) {
        clickedIds.splice(index, 1)
      }
    })
    setClickedId([...clickedIds])
    setFormToggle(false)
    if (listData === null) setFormToggle(false)
    else {
      setFormToggle(true)
    }
  }

  let pageCount = lastPage
  const paginate = async (data) => {
    setLoader(false)
    let page = data.selected + 1
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    await getForSearchFranchiseData(page)
  }

  const modalClose = () => {
    setLoginStatus(false)

    setShow(false)
  }

  const mobileModal = () => setShowMobile(false)
  const logOutSaveListing = async (e, id) => {
    e.preventDefault()
    setLogOutSaveListings(e.target)
    setShow(true)
    setLogOutSaveListingsId(id)
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

  const changeMultiSelectHandler = (e) => {
    setStates(e)
    setStatesForm(false)
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

  ///////////////////

  const franchises = franchiseListingName?.map((item, index) => {
    return (
      <>
        <b style={{color: 'rgb(8, 28, 61)'}} key={index}>
          {' ' + item.name + ','}
        </b>
      </>
    )
  })

  const cityName = cityID?.map((item, index) => {
    return (
      <>
        <b style={{color: 'rgb(8, 28, 61)'}} key={index}>
          {' ' + item + ','}
        </b>
      </>
    )
  })
  const countryName = countryID?.map((item, index) => {
    return (
      <>
        <b style={{color: 'rgb(8, 28, 61)'}} key={index}>
          {' ' + item + ','}
        </b>
      </>
    )
  })
  const stateName = stateID?.map((item, index) => {
    return (
      <>
        <b style={{color: 'rgb(8, 28, 61)'}} key={index}>
          {' ' + item + ','}
        </b>
      </>
    )
  })

  const updateModalTitle = (newTitle) => {
    if (newTitle == 'close') {
      setIsShowPackageModal(false)
    } else {
      setModalTitle(newTitle)
    }
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
      <div style={{backgroundColor: '#081C3D'}}>
        <div className='container'>
          <TopBar getFilterData={getFilterData} franchiseCat={franchiseCat} />
        </div>
      </div>
      {(countryName?.length > 0 ||
        stateName?.length > 0 ||
        cityName?.length > 0 ||
        franchises?.length > 0 ||
        f_minPrice?.length > 0 ||
        f_maxPrice?.length > 0) &&
        loader && (
          <>
            {totalRecord > 0 ? (
              <div className='container justify-content-center pt-3'>
                <div className='row p-3 rounded' style={{backgroundColor: '#eff4f5'}}>
                  <div className='col-12'>
                    <b>{totalRecord}</b>
                    <span> records found</span>

                    {(countryName?.length > 0 || stateName?.length > 0 || cityName?.length > 0) &&
                      ' from '}

                    {countryName?.length > 0 && <span>Country: {countryName} </span>}
                    {stateName?.length > 0 && <span>State:{stateName} </span>}
                    {cityName?.length > 0 && <span>City: {cityName}</span>}
                    {franchises?.length > 0 && (
                      <>
                        <span> in Franchises:</span>
                        <b style={{color: 'rgb(8, 28, 61)'}}>{franchises}</b>
                      </>
                    )}
                    {(f_minPrice?.length > 0 || f_maxPrice?.length > 0) && (
                      <>
                        <span> between Price Range:</span>
                        <b style={{color: 'rgb(8, 28, 61)'}}>{f_minPrice + '-' + f_maxPrice},</b>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className='container justify-content-center pt-3'>
                <div className='row p-3 py-5 rounded' style={{backgroundColor: '#eff4f5'}}>
                  <div className='col-12'>
                    <h4>Sorry, no listings were found matching your search criteria</h4>

                    <li className='pt-5'>
                      Modify your search criteria to broaden your results or clear your filters.
                    </li>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      <div
        className='container  text-start '
        style={{
          marginTop: '20px',
        }}
      >
        {loader ? (
          franchiseData.length > 0 ? (
            <div className=' d-md-flex justify-content-between'>
              <div className='col-lg-9  me-4'>
                {franchiseData?.map((item, i) => {
                  {
                    imagID = item?.imgId
                  }
                  return (
                    <div key={i}>
                      {/* <div className=''> */}
                      {/* <div className='similar-biz-owner-buy-a-business-component newStyleDiv p-4 pe-lg-8 d-md-flex flex-sm-col '> */}
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
                                  userName == item?.userName
                                    ? `/my-franchise/${item.slug}/${item.id}`
                                    : `/franchise/${item.slug}/${item.id}`
                                } `}
                                className='w-100'
                              >
                                <div className='carousel-inner h-100 carousel-inner-container_franchise d-md-flex  '>
                                  <>
                                    {item?.img[0]?.full_path ? (
                                      <div className='carousel-item  w-100 active'>
                                        <img
                                          src={
                                            item?.img[0]?.full_path +
                                            'medium/' +
                                            item?.img[0].file_name
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
                                    {/* {item?.img
                                      ? item?.img?.map((item, index) =>
                                          index > 0 ? (
                                            <div className='carousel-item w-100 ' key={index}>
                                              <img
                                                src={item?.full_path + 'medium/' + item?.file_name}
                                                className='d-block m-auto img-fluid'
                                                alt='...'
                                                style={{width: '100%', height: '100%'}}
                                              />
                                            </div>
                                          ) : null
                                        )
                                      : null} */}
                                  </>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                        {/* //////////////////////////////// */}
                        <div className='col-md-6 '>
                          <div
                            className='pe-2 mt-4 mt-md-0 biz-owner-end-border-franchise h-100 text-wrap d-flex flex-column justify-content-between'
                            style={{
                              margin: '0px 4px',
                            }}
                          >
                            <Link
                              to={`${
                                userName == item?.userName
                                  ? `/my-franchise/${item.slug}/${item.id}`
                                  : `/franchise/${item.slug}/${item.id}`
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
                                    {item?.description ? item?.description : 'NaN'}
                                  </p>
                                ) : null}

                                {/* {props.dec?.replace(/(<([^>]+)>)/gi, ' ').substring(0, 100) ?? 'NaN'} */}
                              </a>
                              {/* ///////////////////////////// */}
                              {/* ///////////////////////////// */}
                            </Link>

                            {item?.listingType !== null && item?.listingType !== undefined && (
                              <>
                                {item?.listingType?.name ? (
                                  <div className='mb-2'>
                                    <span
                                      className='bg-secondary py-1 px-2 text-truncate cursor-pointer'
                                      style={{borderRadius: '5px'}}
                                      onClick={() => {
                                        localStorage.setItem(
                                          'franchisesID',
                                          JSON.stringify({
                                            franchisesID: [item?.listingType?.id],
                                          })
                                        )

                                        localStorage.setItem(
                                          'franchiseListingName',
                                          JSON.stringify([
                                            {
                                              id: item?.listingType?.id,
                                              name: item?.listingType?.name,
                                            },
                                          ])
                                        )
                                        window.scrollTo({
                                          top: 0,
                                          behavior: 'smooth',
                                        })
                                        getFilterData()
                                      }}
                                    >
                                      {item?.listingType?.name ?? '---'}
                                    </span>
                                  </div>
                                ) : null}
                              </>
                            )}
                          </div>
                        </div>
                        <div className='col-md-3 '>
                          <div className='h-100 ps-4 ps-md-0 mt-5 mt-md-0  biz-owner-text-break d-md-flex flex-md-column justify-content-between align-items-md-end mt-4 mt-md-0'>
                            <div className='text-md-end biz-owner-text-break d-flex flex-column flex-md-row justify-content-between d-md-block '>
                              <h1 className='text-primary biz-owner-text-break  text-wrap text-md-end'>
                                <span className='mx-md-2  biz-owner-text-break text-dark'>
                                  <img src={dollarPic} alt='' className='mb-1' />
                                </span>
                                <span className='biz-owner-text-break p-0 m-0'>
                                  {item?.totalInvestment ?? 'NaN'}
                                </span>
                              </h1>
                              <p className='pt-md-2 biz-owner-text-break text-wrap cash-flow '>
                                Cash Required: ${item?.cashRequired ?? 'NaN'}
                              </p>
                            </div>

                            {userName !== item?.userName ? (
                              <div className='text-md-end d-flex flex-wrap flex-md-nowrap'>
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
                                {contactBtnId?.includes(item.id) ? (
                                  <div className='float-right'>
                                    <button
                                      type='button'
                                      className='btn px-4 pe-7   text-nowrap business-disable-btn  disabled  py-3'
                                    >
                                      <span className=' pe-3'>
                                        {/* <MdOutlineContacts size={16} /> */}
                                        {/* <img className="pb-1" src={contactBtn} alt="" width={20} /> */}
                                      </span>
                                      Contacted
                                    </button>
                                  </div>
                                ) : !clickedId?.includes(item?.id) ? (
                                  <div className='float-right'>
                                    <button
                                      type='button'
                                      onClick={() =>
                                        role == 'agent' ? agentAlertHandler() : BuyASell(item?.id)
                                      }
                                      className='btn px-7 px-md-10 pe-9  text-nowrap biz-owner-contact-btn_franchise  py-3'
                                      data-bs-toggle={role == 'agent' ? null : 'modal'}
                                      title='Hi, are you interested to buy'
                                      data-bs-target='#kt_modal_contact'
                                    >
                                      <span className=' pe-3'>
                                        {/* <MdOutlineContacts size={16} /> */}
                                        <img className='pb-1' src={contactBtn} alt='' width={20} />
                                      </span>
                                      Contact
                                    </button>
                                  </div>
                                ) : (
                                  <div className='float-right '>
                                    <button
                                      className='btn     text-nowrap biz-owner-contact-btn-add-list  py-4 '
                                      style={
                                        {
                                          // margin: '0px 5px',
                                          // padding: '10px 25px',
                                          // boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
                                          // borderRadius: '15px',
                                        }
                                      }
                                      onClick={() => CheckedASell(item.id)}
                                    >
                                      Added to list
                                    </button>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className='text-md-end d-flex flex-wrap flex-md-nowrap'>
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
                                    className='btn px-7 px-md-10 pe-9  text-nowrap biz-owner-contact-btn_franchise  py-3'
                                  >
                                    <span className=' pe-3'>
                                      <img className='pb-1' src={contactBtn} alt='' width={20} />
                                    </span>
                                    Contact
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    // </div>
                  )
                })}
                <div className='my-9'>
                  {lastPage > 1 && <Pagination pageCount={pageCount} paginate={paginate} />}
                </div>
              </div>

              {clickedId.length == 0 && (
                <div
                  className=' d-none d-lg-block '
                  style={{
                    marginLeft: '2px',
                  }}
                >
                  <div
                    className=' text-start  px-3'
                    style={{
                      boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
                      borderRadius: '5px',
                      // top: '7rem',
                    }}
                  >
                    <div className='' style={{minHeight: '40px'}}>
                      <h3
                        style={{
                          paddingTop: '15px',
                          color: '#00a3ef',
                        }}
                      >
                        Franchise Request List
                      </h3>
                    </div>
                    <div className='card-body px-0 pt-2'>
                      <p className='card-text px-0'>
                        Select franchises that you want to learn more about!
                      </p>
                      <p className='my-4 px-0'>
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
              )}

              {clickedId.length !== 0 && !formToggle && (
                <div
                  className='d-none d-lg-block '
                  style={{
                    marginLeft: '2px',
                  }}
                >
                  <div
                    className='text-start '
                    style={{
                      top: '7rem',
                      boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
                      borderRadius: '5px',
                    }}
                  >
                    <div className=' align-items-center ' style={{minHeight: '40px'}}>
                      <h3
                        className=''
                        style={{
                          paddingLeft: '20px',
                          paddingTop: '10px',
                          color: '#00a3ef',
                        }}
                      >
                        Franchise Request List
                      </h3>
                    </div>
                    <div
                      className='pe-0'
                      style={{
                        maxHeight: '88px',
                        minHeight: '50px',
                        overflowX: 'hidden',
                        overflowY: 'scroll',
                        paddingLeft: '4px',
                      }}
                    >
                      {lists.map((val, i) => {
                        return (
                          <>
                            <div key={i}>
                              <div
                                className='col-12 d-flex '
                                style={{
                                  marginBottom: '1px',
                                  backgroundColor: '#081c3d',
                                  borderRadius: 10,
                                }}
                              >
                                <div className='col-10 mx-auto'>
                                  <span
                                    className='d-flex align-items-center pt-1 bizOwner-line-breaker '
                                    style={{
                                      fontSize: '14px',
                                      // marginLeft: '19px',
                                      marginBottom: '0px',
                                      color: 'white',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    {val?.title?.substring(0, 30)}
                                  </span>
                                </div>
                                <span className='pe-3 '>
                                  <span
                                    onClick={() => resetToggle(val, val.id)}
                                    className=''
                                    style={{
                                      paddingLeft: '0px',
                                      fontSize: 'large',
                                      color: 'white',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <ImCross size={10} />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </>
                        )
                      })}
                    </div>

                    <div className='pb-7'>
                      <h6 className='card-text'>
                        {isContinueBtn ? (
                          <button
                            className='btn btn-primary'
                            style={{
                              width: '93%',
                              marginTop: '15px',
                              marginLeft: '10px',
                              marginBottom: '21px',
                              paddingLeft: '6px',
                              paddingRight: '6px',
                              paddingTop: '10px',
                              paddingBottom: '10px',
                              border: 'none',
                              fontSize: '14px',
                              boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
                              borderRadius: '30px',
                            }}
                          >
                            <img
                              src={ButtonLoader}
                              className='mx-7'
                              alt=''
                              style={{height: '1.8rem'}}
                            />
                          </button>
                        ) : (
                          <button
                            className='btn btn-primary'
                            style={{
                              width: '93%',
                              marginTop: '15px',
                              marginLeft: '10px',
                              marginBottom: '21px',
                              paddingLeft: '6px',
                              paddingRight: '6px',
                              paddingTop: '10px',
                              paddingBottom: '10px',
                              border: 'none',
                              fontSize: '14px',
                              boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
                              borderRadius: '30px',
                            }}
                            onClick={togllerControler}
                          >
                            Request Info
                          </button>
                        )}
                      </h6>
                      <p className='my-4 px-3'>
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
              )}

              {clickedId.length !== 0 && formToggle && (
                <div
                  className='col-3  d-none d-lg-block '
                  style={{
                    marginLeft: '2px',
                    position: 'sticky',
                    top: '6rem',
                    // marginTop: '2px',
                  }}
                >
                  <div
                    className='text-start newStyleDiv mb-5'
                    style={{
                      top: '5rem',
                    }}
                  >
                    <div className=' align-items-center' style={{minHeight: '40px'}}>
                      {/* /////////// */}

                      <h3
                        className=''
                        style={{
                          paddingTop: '10px',
                          paddingLeft: '20px',
                          color: '#00a3ef',
                        }}
                      >
                        Franchise Request List
                      </h3>
                    </div>
                    <div
                      style={{
                        maxHeight: '64px',
                        minHeight: '50px',
                        // overflow: 'auto',
                        overflowX: 'hidden',
                        overflowY: 'scroll',
                        paddingLeft: '4.5px',
                        // background: 'red',
                      }}
                    >
                      {lists.map((val, i) => {
                        return (
                          <>
                            <div key={i}>
                              <div
                                className='col-12 d-flex'
                                style={{
                                  marginBottom: '1px',
                                  backgroundColor: '#081c3d',
                                  borderRadius: 10,
                                }}
                              >
                                <div className='col-11 pt-1 px-5'>
                                  <span
                                    className='pt-0'
                                    style={{
                                      fontSize: '14px',
                                      // marginLeft: '19px',
                                      marginBottom: '0px',
                                      color: 'white',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    {val?.title?.substring(0, 30)}
                                    {val?.title?.length >= 30 && '...'}
                                  </span>
                                </div>

                                <div className='col-1 '>
                                  <span
                                    onClick={() => resetToggleForm(val, val.id)}
                                    className=''
                                    style={{
                                      padding: '0px',
                                      fontSize: 'large',
                                      color: 'white',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <ImCross size={10} />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      })}
                    </div>

                    <div className=''>
                      <h6 className='card-text pt-7 '>
                        <div className='col-12 px-2'>
                          <div
                            className='col-12'
                            style={{
                              marginTop: '1px',
                            }}
                          >
                            {/* <input
                   type='text'
                   className='form-control '
                   onChange={userNamesFunction}
                   // onChange={(e) => setuserNames(e.target.value)}
                   value={userNames}
                   style={{
                     marginRight: '7px',
                   }}
                   placeholder='Uname'
                   aria-label='userNames'
                   aria-describedby='basic-addon1'
                 /> */}

                            <input
                              type='text'
                              className='form-control  form-control-solid '
                              onChange={(e) => inputChange(e)}
                              name='user-name'
                              value={userNames}
                              style={{
                                marginRight: '0px',
                              }}
                              placeholder='John'
                              aria-label='userNames'
                              aria-describedby='basic-addon1'
                            />

                            {userForm ? (
                              <div className='col-12 d-flex text-start myError'>
                                <br />
                                <div className='fw-lighter text-start'>Enter first name</div>
                              </div>
                            ) : null}
                            <div className='d-flex col-12 '></div>
                          </div>
                        </div>
                        <div className='col-12 px-2 mt-3'>
                          <div
                            className='col-12  '
                            style={{
                              marginTop: '0px ',
                            }}
                          >
                            <input
                              type='text'
                              className='form-control  form-control-solid mb-'
                              onChange={(e) => inputChange(e)}
                              value={firstName}
                              name='first-name'
                              placeholder='Doe'
                              aria-label='userNames'
                              aria-describedby='basic-addon1'
                              required
                            />
                          </div>
                          <div className='d-flex col-12 '>
                            {firstNameForm ? (
                              <div className='col-12 d-flex text-start myError'>
                                <br />
                                <div className='fw-lighter text-start'>Enter last name</div>
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div
                          className=''
                          style={{
                            marginTop: '0px',
                            padding: '9px 6px 0px 6px',
                          }}
                        >
                          <input
                            type='text'
                            id='userEmail'
                            className='form-control  form-control-solid mb-'
                            value={email}
                            onChange={(e) => inputChange(e)}
                            name='email'
                            style={{
                              marginTop: '2px',
                            }}
                            placeholder='johndoe@email.com'
                            required
                          />
                          {emailForm ? (
                            <div className='d-flex myError'>
                              <br />
                              <div className='fw-lighter'>Invalid email address</div>
                            </div>
                          ) : null}
                          <div className='mt-4'>
                            <PhoneInput
                              country={'us'}
                              value={phoneN}
                              onChange={phoneNumberHandler}
                            />
                          </div>
                          {/* 
                          <input
                            type='tel'
                            className='form-control  form-control-solid mb-'
                            onChange={(e) => inputChange(e)}
                            // onChange={(e) => setPhoneN(e.target.value)}
                            name='phone'
                            value={phoneN}
                            maxLength='14'
                            style={{
                              marginTop: '21px',
                            }}
                            placeholder='Phone Number'
                            required
                          /> */}
                          {phoneNForm ? (
                            <div className='d-flex align-items-start myError'>
                              <br />
                              <div className='fw-lighter'> Enter correct phone number</div>
                            </div>
                          ) : null}
                          <input
                            type='number'
                            className='form-control  form-control-solid  '
                            maxLength={6}
                            onChange={(e) => inputChange(e)}
                            name='zip-code'
                            min='0'
                            oninput="alert('You must fill out the form!');"
                            // onChange={(e) => setZipCode(e.target.value)}
                            value={zipCode}
                            style={{
                              marginTop: '15px',
                            }}
                            placeholder='Zip Code'
                          />
                          {zipCodeForm ? (
                            <div className='d-flex myError'>
                              <br />
                              <div className='fw-lighter text-start'>
                                {zipCode == '' || zipCode == undefined
                                  ? 'Enter zip code'
                                  : 'Enter valid zip code'}
                              </div>
                            </div>
                          ) : null}
                          <select
                            className='form-select form-select-solid'
                            onChange={CapitalFunction}
                            // onChange={(e) => setCash(e.target.value)}
                            placeholder='Available Capital'
                            value={cash}
                            style={{
                              marginTop: '15px',
                            }}
                            aria-label='Select example'
                          >
                            <option hidden>Available Capital</option>

                            {optionsCash.map((optionCash, idx3) => (
                              <option key={idx3}>{optionCash}</option>
                            ))}
                          </select>
                          {cashForm ? (
                            <div className='d-flex myError'>
                              <br />
                              <div className='fw-lighter text-start'>Select capital</div>
                            </div>
                          ) : null}
                          <select
                            className='form-select form-select-solid'
                            onChangeCapture={TimeFramesFunction}
                            // onChange={(e) => setTimeFrames(e.target.value)}
                            defaultValue={timeFrames}
                            style={{
                              marginTop: '15px',
                            }}
                            aria-label='Select example'
                          >
                            {/* <option>Time Frame to Invest</option> */}
                            <option hidden>Time Frame To Invest</option>
                            {timeFrame.map((optionTimeFrame, idx3) => (
                              <option key={idx3}>{optionTimeFrame}</option>
                            ))}
                          </select>
                          {timeFramesForm ? (
                            <div className='d-flex align-items-start myError'>
                              <br />
                              <div className='fw-lighter text-start'>Select time frame</div>
                            </div>
                          ) : null}

                          <div className='col-12 mt-4' id='franchiseLocation'>
                            <Select
                              type='search'
                              value={states}
                              isMulti={false}
                              options={allCountries}
                              placeholder='Desired Location'
                              onChange={changeMultiSelectHandler}
                              styles={{
                                singleValue: (base) => ({
                                  ...base,
                                  fontWeight: 600,
                                  border: 'none',
                                }),
                                control: (base, state) => ({
                                  ...base,
                                  minHeight: 40,
                                  backgroundColor: '#f5f8fa',
                                  border: 'none',
                                }),
                                option: (base) => ({
                                  ...base,
                                  fontSize: 11,
                                  fontWeight: 400,
                                  color: 'black',
                                  border: 'none',
                                }),
                              }}
                            />

                            {/* <Multiselect
                              options={allCountries}
                              selectedValues={states}
                              onSelect={changeMultiSelectHandler}
                              // Options to display in the dropdown
                              // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                              // onSelect={this.onSelect} // Function will trigger on select event
                              onRemove={changeMultiSelectHandler} // Function will trigger on remove event
                              displayValue='name' // Property name to display in the dropdown options
                              placeholder='Countries  '
                              showArrow={false}
                              singleSelect={true}
                              closeIcon={false}
                              showCheckbox={false}
                              style={{
                                searchBox: {
                                  // To change search box element look
                                  fontSize: 12,
                                  minHeight: 40,
                                  // maxHeight: 35,
                                  backgroundColor: '#e7f3fc',
                                },
                                option: {
                                  // To change css for dropdown options
                                  fontSize: 11,
                                  fontWeight: 200,
                                  color: 'black',
                                  // backgroundColor: '#f5f8fa',
                                },
                              }}
                            /> */}
                          </div>
                          {/* <select
                            className='form-select form-select-solid'
                            onChangeCapture={StatesFunction}
                            // onChange={(e) => setStates(e.target.value)}
                            value={states}
                            style={{
                              marginTop: '15px',
                            }}
                            aria-label='Select example'
                          >
                           
                            <option hidden>Desired Location</option>

                            {optionsStates.map((optionState, idx2) => (
                              <option key={idx2}>{optionState}</option>
                            ))}
                          </select> */}
                          {statesForm ? (
                            <div className='d-flex align-items-start myError'>
                              <br />
                              <div className='fw-lighter text-start'>Select location</div>
                            </div>
                          ) : null}
                        </div>
                      </h6>
                      {isContinueBtn ? (
                        <button
                          className='btn btn-primary'
                          style={{
                            //////////
                            width: '93%',
                            marginTop: '15px',
                            marginLeft: '10px',
                            marginBottom: '5px',
                            padding: '14px',
                            fontSize: '14px',
                            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
                            borderRadius: '30px',
                            border: 'none',
                          }}
                        >
                          <img
                            src={ButtonLoader}
                            className='mx-7'
                            alt=''
                            style={{height: '1.8rem'}}
                          />
                        </button>
                      ) : (
                        <button
                          className='btn btn-primary'
                          style={{
                            //////////
                            width: '93%',
                            marginTop: '15px',
                            marginLeft: '10px',
                            marginBottom: '5px',
                            padding: '14px',
                            fontSize: '14px',
                            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
                            borderRadius: '30px',
                            border: 'none',
                          }}
                          onClick={() => ContactRequest()}
                        >
                          Request Info
                        </button>
                      )}

                      <p className='p-5'>
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
              )}
            </div>
          ) : (
            <div
              className='d-flex justify-content-center align-items-center'
              style={{height: '100vh'}}
            >
              <div>
                <h1>RECORD NOT FOUND</h1>
              </div>
            </div>
          )
        ) : (
          <div
            className='d-flex justify-content-center align-items-center'
            style={{height: '100vh'}}
          >
            <div>
              <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
            </div>
          </div>
        )}
      </div>

      {transformedUserRequestData != null &&
      transformedUserRequestData != undefined &&
      clickedId?.length > 0 ? (
        <button
          className='btn btn-primary d-block d-lg-none'
          style={{
            //////////
            position: 'fixed',
            width: '100%',
            bottom: '1px',
            left: '0px',
            marginRight: '10px',
            zIndex: '9',
          }}
          onClick={() => ContactRequest()}
        >
          Request Info {clickedId?.length && <span>({clickedId.length})</span>}
        </button>
      ) : (
        <>
          {clickedId?.length > 0 ? (
            <button
              className='btn btn-primary d-block d-lg-none'
              style={{
                //////////
                position: 'fixed',
                width: '100%',
                bottom: '1px',
                left: '0px',
                marginRight: '10px',
                zIndex: '9',
              }}
              onClick={() => setShowMobile(true)}
            >
              Request Info {clickedId?.length > 0 && <span>({clickedId.length})</span>}
            </button>
          ) : null}
        </>
      )}
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
      <Modal show={showMobile} onHide={mobileModal}>
        <Modal.Header closeButton>
          <Modal.Title>Request info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
            <h6 className='card-text '>
              <div className=' row'>
                <div className='col-12'>
                  <div
                    className='col-12'
                    style={{
                      marginTop: '0px',
                      padding: '9px 6px 0px 6px',
                    }}
                  >
                    {/* <input
                   type='text'
                   className='form-control '
                   onChange={userNamesFunction}
                   // onChange={(e) => setuserNames(e.target.value)}
                   value={userNames}
                   style={{
                     marginRight: '7px',
                   }}
                   placeholder='Uname'
                   aria-label='userNames'
                   aria-describedby='basic-addon1'
                 /> */}

                    <input
                      type='text'
                      className='form-control  form-control-solid '
                      onChange={(e) => inputChange(e)}
                      name='user-name'
                      value={userNames}
                      style={{
                        marginRight: '0px',
                      }}
                      placeholder='John'
                      aria-label='userNames'
                      aria-describedby='basic-addon1'
                    />

                    {userForm ? (
                      <div className='col-12  d-flex text-start myError'>
                        <br />
                        <div className='fw-lighter text-start'>Enter first name</div>
                      </div>
                    ) : null}
                    <div className='d-flex col-12 '></div>
                  </div>
                </div>
                <div className='col-12 '>
                  <div
                    className='col-12  '
                    style={{
                      marginTop: '0px',
                      padding: '9px 6px 0px 6px',
                    }}
                  >
                    <input
                      type='text'
                      className='form-control  form-control-solid mb-'
                      onChange={(e) => inputChange(e)}
                      value={firstName}
                      name='first-name'
                      placeholder='Doe'
                      aria-label='userNames'
                      aria-describedby='basic-addon1'
                      required
                    />
                  </div>
                  <div className='d-flex col-12 '>
                    {firstNameForm ? (
                      <div className='col-12 d-flex text-start myError'>
                        <br />
                        <div className='fw-lighter text-start'>Enter last name</div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div
                className=''
                style={{
                  marginTop: '0px',
                  padding: '9px 6px 0px 6px',
                }}
              >
                <input
                  type='text'
                  id='userEmail'
                  className='form-control  form-control-solid mb-'
                  value={email}
                  onChange={(e) => inputChange(e)}
                  name='email'
                  style={{
                    marginTop: '2px',
                  }}
                  placeholder='johndoe@email.com'
                  required
                />
                {emailForm ? (
                  <div className='d-flex myError'>
                    <br />
                    <div className='fw-lighter'>Invalid email address</div>
                  </div>
                ) : null}
                <div className='mt-4'>
                  <PhoneInput country={'us'} value={phoneN} onChange={phoneNumberHandler} />
                </div>
                {/* 
                          <input
                            type='tel'
                            className='form-control  form-control-solid mb-'
                            onChange={(e) => inputChange(e)}
                            // onChange={(e) => setPhoneN(e.target.value)}
                            name='phone'
                            value={phoneN}
                            maxLength='14'
                            style={{
                              marginTop: '21px',
                            }}
                            placeholder='Phone Number'
                            required
                          /> */}
                {phoneNForm ? (
                  <div className='d-flex align-items-start myError'>
                    <br />
                    <div className='fw-lighter'> Enter correct phone number</div>
                  </div>
                ) : null}
                <input
                  type='number'
                  className='form-control  form-control-solid  '
                  maxLength={6}
                  onChange={(e) => inputChange(e)}
                  name='zip-code*'
                  // onChange={(e) => setZipCode(e.target.value)}
                  value={zipCode}
                  style={{
                    marginTop: '15px',
                  }}
                  placeholder='Zip Code'
                />
                {zipCodeForm ? (
                  <div className='d-flex myError'>
                    <br />
                    <div className='fw-light text-start'>
                      {zipCode == '' || zipCode == undefined
                        ? 'Enter zip code'
                        : 'Enter valid zip code'}
                    </div>
                  </div>
                ) : null}
                <select
                  className='form-select form-select-solid'
                  onChange={CapitalFunction}
                  // onChange={(e) => setCash(e.target.value)}
                  placeholder='Available Capital'
                  value={cash}
                  style={{
                    marginTop: '15px',
                  }}
                  aria-label='Select example'
                >
                  <option hidden>Available Capital</option>

                  {optionsCash.map((optionCash, idx3) => (
                    <option key={idx3}>{optionCash}</option>
                  ))}
                </select>
                {cashForm ? (
                  <div className='d-flex myError'>
                    <br />
                    <div className='fw-lighter text-start'> Select capital</div>
                  </div>
                ) : null}
                <select
                  className='form-select form-select-solid'
                  onChangeCapture={TimeFramesFunction}
                  // onChange={(e) => setTimeFrames(e.target.value)}
                  defaultValue={timeFrames}
                  style={{
                    marginTop: '15px',
                  }}
                  aria-label='Select example'
                >
                  {/* <option>Time Frame to Invest</option> */}
                  <option hidden>Time Frame To Invest</option>
                  {timeFrame.map((optionTimeFrame, idx3) => (
                    <option key={idx3}>{optionTimeFrame}</option>
                  ))}
                </select>
                {timeFramesForm ? (
                  <div className='d-flex align-items-start myError'>
                    <br />
                    <div className='fw-lighter text-start'>Select time frame</div>
                  </div>
                ) : null}

                <div className='col-12 mt-4' id='franchiseLocation'>
                  <Select
                    type='search'
                    value={states}
                    isMulti={false}
                    options={allCountries}
                    placeholder='Desired Location'
                    onChange={changeMultiSelectHandler}
                    styles={{
                      singleValue: (base) => ({
                        ...base,
                        fontWeight: 600,
                        border: 'none',
                      }),
                      control: (base, state) => ({
                        ...base,
                        minHeight: 40,
                        backgroundColor: '#f5f8fa',
                        border: 'none',
                      }),
                      option: (base) => ({
                        ...base,
                        fontSize: 11,
                        fontWeight: 400,
                        color: 'black',
                        border: 'none',
                      }),
                    }}
                  />

                  {/* <Multiselect
                              options={allCountries}
                              selectedValues={states}
                              onSelect={changeMultiSelectHandler}
                              // Options to display in the dropdown
                              // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                              // onSelect={this.onSelect} // Function will trigger on select event
                              onRemove={changeMultiSelectHandler} // Function will trigger on remove event
                              displayValue='name' // Property name to display in the dropdown options
                              placeholder='Countries  '
                              showArrow={false}
                              singleSelect={true}
                              closeIcon={false}
                              showCheckbox={false}
                              style={{
                                searchBox: {
                                  // To change search box element look
                                  fontSize: 12,
                                  minHeight: 40,
                                  // maxHeight: 35,
                                  backgroundColor: '#e7f3fc',
                                },
                                option: {
                                  // To change css for dropdown options
                                  fontSize: 11,
                                  fontWeight: 200,
                                  color: 'black',
                                  // backgroundColor: '#f5f8fa',
                                },
                              }}
                            /> */}
                </div>
                {/* <select
                  className='form-select form-select-solid'
                  onChangeCapture={StatesFunction}
                  // onChange={(e) => setStates(e.target.value)}
                  value={states}
                  style={{
                    marginTop: '15px',
                  }}
                  aria-label='Select example'
                >
                
                  <option hidden>Desired Location</option>

                  {optionsStates.map((optionState, idx2) => (
                    <option key={idx2}>{optionState}</option>
                  ))}
                </select> */}
                {statesForm ? (
                  <div className='d-flex align-items-start myError'>
                    <br />
                    <div className='fw-lighter text-start'>Select location</div>
                  </div>
                ) : null}
              </div>
            </h6>
            {isContinueBtn ? (
              <button
                className='btn btn-primary'
                style={{
                  //////////
                  width: '93%',
                  marginTop: '15px',
                  marginLeft: '10px',
                  marginBottom: '5px',
                  padding: '14px',
                  fontSize: '14px',
                  boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
                  borderRadius: '30px',
                  border: 'none',
                }}
              >
                <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
              </button>
            ) : (
              <button
                className='btn btn-primary'
                style={{
                  //////////
                  width: '93%',
                  marginTop: '15px',
                  marginLeft: '10px',
                  marginBottom: '5px',
                  padding: '14px',
                  fontSize: '14px',
                  boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
                  borderRadius: '30px',
                  border: 'none',
                }}
                onClick={() => ContactRequest()}
              >
                Request Info
              </button>
            )}

            <p className='p-5'>
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
      {/* forgot password Modal  */}
    </>
  )
}
