import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Select from 'react-select'
import Swal from 'sweetalert2'
import {useDispatch} from 'react-redux'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import GooglePlacesAutocomplete, {geocodeByPlaceId} from 'react-google-places-autocomplete'
import {MdOutlineCancel} from 'react-icons/md'
import {getCountries, getStates, getCities} from '../../../services/get-fields-data'
import {
  profileOverView,
  brokerProfileOverView,
  updateBrokerProfileOverView,
} from '../../../services/profile-services'
import CropEasy from './cropBroker/CropEasy'
import MainScreenLoader from '../../../../assets/Loader/MainScreenLoader.gif'
import ButtonLoader from '../../../../assets/Loader/ButtonLoader.gif'

import './style.css'
const Overview = () => {
  let dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const [openEditModel, setOpenEditModel] = useState(false)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [email, setEmail] = useState('')
  const [loader, setLoader] = useState(false)
  const tokenData = localStorage.getItem('userData')

  const transtokenData = tokenData ? JSON.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData ?? ''

  const [logoNotFound, setLogoNotFound] = useState(false)
  const [selectedListing, setSelectedListing] = useState('')
  const [industryValue, setIndustryValue] = useState('')
  const [stateValue, setStateValue] = useState('')
  const [openCrop, setOpenCrop] = useState(false)
  const [file, setFile] = useState(null)
  const [cropImg, setCropImage] = useState()

  const [locationValue, setLocationValue] = useState('')
  const [cityValue, setCityValue] = useState('')
  const [toggleInput, setToggleInput] = useState(true)
  const [businessAddressValue, setBusinessAddressValue] = useState('')
  const [searchItems, setSearchItems] = useState(country)
  const [isContinue, setIsContinue] = useState(false)
  const [isContinueBtn, setIsContinueBtn] = useState(false)
  const [phoneValidValue, setPhoneValidValue] = useState('')

  const [addressValue, setAddressValue] = useState('')
  const [startuplocation, setStartuplocation] = useState('')
  const [allListings, setAllListings] = useState([])
  const [allIndutries, setAllIndutries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [allStates, setAllStates] = useState([])
  const [allCities, setAllCities] = useState([])
  const [allVisibleLocations, setAllVisibleLocations] = useState([])

  const [profileValidation, setProfileValidation] = useState(false)
  const [cardLogo, setCardLogo] = useState('')
  const [showProfileImage, setShowProfileImage] = useState()
  const [password, setPassword] = useState('')
  const [bothPassword, setBothPassword] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState(false)
  const [cPasswordValidation, setCPasswordValidation] = useState(false)
  const [cPassword, setCPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [street, setStreet] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [locationValidation, setLocationValidation] = useState(false)
  const [logoThrowError, setLogoThrowError] = useState(false)
  const [address, setAddress] = useState('')
  const [addressObj, setAddressObj] = useState('')
  const [found, setFound] = useState(false)
  const [stateValidation, setStateValidation] = useState(false)
  const [addressValidation, setAddressValidation] = useState(false)
  const [logoError, setLogoError] = useState('')
  const [imagesForDB, setImagesForDB] = useState()
  const [emailValidValue, setEmailValidValue] = useState('')
  const [brokerInformation, setBrokerInformation] = useState([])

  // validation states
  const [firstNameValidation, setFirstNameValidation] = useState(false)
  const [lastNameValidation, setLastNameValidation] = useState(false)
  const [companyNameValidation, setCompanyNameValidation] = useState(false)
  const [businessAddressValidation, setBusinessAddressValidation] = useState(false)
  const [cityValidation, setCityValidation] = useState(false)
  const [showAddress, setShowAddress] = useState('')
  const [streetValidation, setStreetValidation] = useState(false)
  const [go, setGo] = useState(false)
  const [streetValiDation, setStreetValiDation] = useState(false)
  const [emailValiDation, setEmailValiDation] = useState(false)
  const [phoneValiDation, setPhoneValiDation] = useState(false)
  const [zipCodeValiDation, setZipCodeValiDation] = useState(false)
  const [locationsValidation, setLocationsValidation] = useState(false)
  const [dbId, setDbId] = useState(0)
  ////////////////////
  useEffect(() => {
    getAllCountries()
    getAllStates(242)
    getAllCities(5072)
  }, [])
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
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
  const getAllStates = async (countryID) => {
    let mapStates = []
    try {
      const result = await getStates(countryID, accessToken)

      if (result.status === true) {
        result.states.map((item, index) => mapStates.push({value: item.id, label: item.name}))
        setAllStates(mapStates)
      }
      mapStates.map((val) => {
        if (val.value == 5072) {
          setStateValue(val)
        }
      })
    } catch (err) {
      console.log('getStates err', err)
    }
  }
  const getAllCities = async (stateID) => {
    let mapCities = []
    try {
      const result = await getCities(stateID, accessToken)

      if (result.status === true) {
        result.cities.map((item, index) => mapCities.push({value: item.id, label: item.name}))
        setAllCities(mapCities)
      }
    } catch (err) {
      console.log('getCities err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }
  useEffect(() => {
    if (role == 'user' || role == 'agent') {
      getProfileListingTypes()
    } else if (role == 'broker') {
      getBrokerProfileListing()
    }
  }, [])

  const getProfileListingTypes = async () => {
    const response = await profileOverView(accessToken)
    if (response.status == true) {
      setLoader(true)

      setFullName(response?.users?.first_name + ' ' + response?.users?.last_name)
      setPhone(response?.users?.phone)
      setCountry(response?.users?.location?.country)
      setEmail(response?.users?.email)
    }
  }
  //////////////////////broker//////////////
  const getBrokerProfileListing = async () => {
    const response = await brokerProfileOverView(accessToken)
    if (response.status == true) {
      setLoader(true)
      setBrokerInformation(response?.users)
      // setFullName(response?.users?.first_name + ' ' + response?.users?.last_name)
      // setPhone(response?.users?.phone)
      // setCountry(response?.users?.location?.country)
      // setEmail(response?.users?.email)
      // if (response?.users?.profile_image != null) {
      //   setProfileImage(response?.users?.profile_image?.full_path + response?.users?.profile_image?.file_name)
      // }
    }
  }
  const stateChange = async (e) => {
    getAllCities(e.value)
    setAddress('')
    setAddressObj('')
    setCityValue('')
    setIsContinueBtn(false)
    await setStateValue(e)

    setStateValidation(false)
  }
  const locationChange = async (e) => {
    setIsContinueBtn(false)
    await setLocationValue(e)
    setLocationValidation(false)
  }
  const addressChange = async (e) => {
    getAllStates(e.value)
    setAddress('')
    setCityValue('')
    setStateValue('')
    setAddressObj('')
    setIsContinueBtn(false)
    await setAddressValue(e)

    setAddressValidation(false)
  }
  const cityChange = async (e) => {
    setAddress('')
    setAddressObj('')
    setIsContinueBtn(false)
    await setCityValue(e)
    setCityValidation(false)
  }
  const phoneNumberHandler = async (phone) => {
    setIsContinueBtn(false)
    await setPhone(phone)
    await setPhoneValiDation(false)
  }
  const onSearch = async (searchTerm, e) => {
    await setIndustryValue(searchTerm)
  }
  ///////////Get Address In Object Form///////////
  const onInputChange = async (event, files) => {
    // if (event.target.name == 'zipCode' && event.target.lenght < 6) {
    //   setZipCode(event.target.value)
    // }
    // setAddress('')
    // setAddressObj('')
    setIsContinueBtn(false)

    switch (event.target.name) {
      case 'logo':
        await setCardLogo(event.target.files[0])
        setFile(event.target.files[0])

        if (event.target.files.length !== 0) {
          setOpenCrop(true)

          // setShowProfileImage(URL.createObjectURL(event.target.files[0]))
          setCropImage(URL.createObjectURL(event.target.files[0]))
        } else if (event.target.files.length === 0) {
          setShowProfileImage('')
        }

        if (event.target.value.length > 1) {
          setLogoNotFound(false)
        } else setLogoNotFound(false)

        const selectedFiles = event.target.files
        setImagesForDB(selectedFiles[0])
        break
      case 'firstName':
        await setFirstName(event.target.value)
        setFirstNameValidation(false)
        break
      case 'lastName':
        await setLastName(event.target.value)
        setLastNameValidation(false)
        break
      case 'companyName':
        await setCompanyName(event.target.value)
        setCompanyNameValidation(false)
        break
      case 'password':
        await setPassword(event.target.value)
        setPasswordValidation(false)
        break
      case 'cPassword':
        await setCPassword(event.target.value)
        setCPasswordValidation(false)
        break

      case 'street':
        let street_a = false
        await setStreet(event.target.value)
        await setStreetValiDation(false)

        if (event.target.value.length > 0) {
          street_a = true
          setStreetValidation(street_a)
        } else {
          street_a = false
          setStreetValidation(street_a)
        }
        break

      case 'email':
        setEmail(event.target.value)
        // await setEmailValiDation(false)
        // const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/

        setEmailValiDation(false)

        // if (!email.endsWith('gmail.com')) {
        //   setEmailValiDation(true)
        // }
        // if (email.endsWith('gmail.com')) {
        //   setEmailValiDation(false)
        // }

        break
      // case 'phone':
      //   await setPhone(event.target.value)
      //   await setPhoneValiDation(false)
      //   break
      case 'zipCode':
        await setZipCode(event.target.value)
        let goNext = false
        if (event.target.value.length > event.target.maxLength) {
          event.target.value = event.target.value.slice(0, event.target.maxLength)
        }

        if (event.target.value.length > 0) {
          goNext = true
          setGo(goNext)
        } else {
          goNext = false
          setGo(goNext)
        }
        await setZipCodeValiDation(false)
        break
    }
  }
  const getAddressObject = (address_components, place_id, geometry) => {
    const ShouldBeComponent = {
      street_number: ['street_number'],
      postal_code: ['postal_code'],
      street: ['street_address', 'route'],
      province: [
        'administrative_area_level_1',
        'administrative_area_level_2',
        'administrative_area_level_3',
        'administrative_area_level_4',
        'administrative_area_level_5',
      ],
      city: [
        'locality',
        'sublocality',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
      ],
      country: ['country'],
    }

    let address = {
      street_number: '',
      postal_code: '',
      street: '',
      province: '',
      city: '',
      country: '',
      place_id: place_id,
      lat: geometry.location.lat(),
      lng: geometry.location.lng(),
    }

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === 'country') {
            address[shouldBe] = component.long_name
          } else {
            address[shouldBe] = component.long_name
          }
        }
      }
    })

    // Fix the shape to match our schema
    address.address = address.street_number + ' ' + address.street
    delete address.street_number
    delete address.street
    if (address.country === 'US') {
      address.state = address.province
      delete address.province
    }
    return address
  }
  const [toggle, setToggle] = useState(false)
  ///////////useEffect For GeocodeByPlaceId  Record///////////
  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address && address.value && (await geocodeByPlaceId(address.value.place_id))
      const addressObject =
        geocodeObj &&
        getAddressObject(
          geocodeObj[0].address_components,
          geocodeObj[0].place_id,
          geocodeObj[0].geometry
        )

      setAddressObj(addressObject)
    }
    func()
  }, [address])
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })
  const updateInformation = async (e) => {
    e.preventDefault()

    if (zipCode == '' || zipCode == undefined || zipCode.length <= 2) {
      setZipCodeValiDation(true)
      window.scrollTo(0, 300)
    }
    if (street == '' || street == undefined) {
      setStreetValiDation(true)
      window.scrollTo(0, 300)
    }
    if (stateValue == '' || stateValue == undefined) {
      setStateValidation(true)
      window.scrollTo(0, 300)
    }
    if (cityValue == '' || cityValue == undefined) {
      setCityValidation(true)
      window.scrollTo(0, 300)
    }
    if (addressValue == '' || addressValue == undefined) {
      setAddressValidation(true)
      window.scrollTo(0, 300)
    }
    // if (cardLogo == '' || cardLogo == null || cardLogo == undefined) {
    //   setLogoError('Upload profile')
    //   setLogoNotFound(true)
    // }

    let locationAdd
    let country = addressValue?.label
    let province = stateValue?.label
    let city = cityValue?.label

    if (address === '' || address === null) {
      setLocationsValidation(true)

      if (cityValue == '' || cityValue == undefined) {
        setCityValidation(true)
      }

      // if (addressValue == '' || addressValue == undefined) {
      //   setAddressValidation(true)
      // }
      // if (zipCode == '' || zipCode == undefined) {
      //   setZipCodeValiDation(true)
      // }

      locationAdd = {
        country: country,
        province: province,
        city: city,
        address: street,
        postal_code: zipCode,
      }
    } else if (address !== '' || address !== null) {
      setLocationsValidation(false)
      setStreetValidation(true)
      setGo(true)
      locationAdd = addressObj
    }

    if (firstName == '' || firstName == undefined) {
      setFirstNameValidation(true)
      window.scrollTo(0, 300)
    }
    if (lastName == '' || lastName == undefined) {
      setLastNameValidation(true)
      window.scrollTo(0, 300)
    }
    if (companyName == '' || companyName == undefined) {
      setCompanyNameValidation(true)
      window.scrollTo(0, 300)
    }

    if (password == '' || password == undefined) {
      setPasswordValidation(true)
      window.scrollTo(0, 300)
    }
    if (cPassword == '' || cPassword == undefined) {
      setCPasswordValidation(true)
      window.scrollTo(0, 300)
    }
    if (password !== '' && cPassword !== '' && password !== cPassword) {
      setBothPassword(true)
    } else {
      setBothPassword(false)
    }
    // }

    if (locationValue == '' || locationValue == undefined) {
      setLocationValidation(true)
    }
    if (email == '' || email == undefined || !isValidEmail(email)) {
      setEmailValiDation(true)
      setEmailValidValue('Enter valid email')
    }
    if (phone == '' || phone == undefined) {
      setPhoneValiDation(true)
      setPhoneValidValue('Enter phone number')
    } else if (phone.length <= 8) {
      setPhoneValiDation(true)
      setPhoneValidValue('Enter valid phone number')
    }
    // if (CardLogo == '') {
    //   profileValidation(true)
    //   window.scrollTo(0, 300)
    // }

    if (
      found == false &&
      lastName != '' &&
      lastName != undefined &&
      firstName != '' &&
      firstName != undefined &&
      phone != '' &&
      phone != undefined &&
      // email.endsWith('.com') &&
      phone.length > 8 &&
      // email != '' &&
      // email != undefined &&
      address != '' &&
      address != undefined
      // cardLogo != '' &&
      // cardLogo != undefined &&
      // bothPassword !== true
    ) {
      try {
        setIsContinueBtn(true)

        const result = await updateBrokerProfileOverView(
          dbId,
          accessToken,
          firstName,
          lastName,
          email,
          companyName,
          phone,
          file,
          locationAdd
        )

        if (result.status == true) {
          setIsContinueBtn(false)
          Toast.fire({
            icon: 'success',
            title: 'Information successfully updated',
          })
          setBrokerInformation(result.user)

          setOpenEditModel(false)
          setToggle(!toggle)
          dispatch({
            type: 'PROFILE',
            payload: {
              toggle,
            },
          })
        } else {
          setIsContinueBtn(false)

          if (result?.errors?.email) {
            setEmailValiDation(true)
            setEmailValidValue(result?.errors?.email[0])
          }
          if (result?.errors?.phone) {
            setPhoneValiDation(true)

            setPhoneValidValue(result?.errors?.phone[0])
          }
        }
      } catch (errors) {
        Toast.fire({
          icon: 'error',
          title: 'Please try again',
        })
        setIsContinueBtn(false)
      }
    } else if (
      found == true &&
      lastName != '' &&
      lastName != undefined &&
      firstName != '' &&
      firstName != undefined &&
      phone != '' &&
      phone != undefined &&
      // email.endsWith('.com') &&
      phone.length > 8 &&
      // email != '' &&
      // email != undefined &&
      street != '' &&
      street != undefined &&
      zipCode != '' &&
      zipCode != undefined &&
      zipCode.length > 2 &&
      stateValue != '' &&
      stateValue != undefined &&
      cityValue != '' &&
      cityValue != undefined &&
      addressValue !== '' &&
      addressValue !== undefined
      // cardLogo != '' &&
      // cardLogo != undefined &&
      // bothPassword !== true
    ) {
      try {
        setIsContinueBtn(true)
        const result = await updateBrokerProfileOverView(
          dbId,
          accessToken,
          firstName,
          lastName,
          email,
          companyName,
          phone,
          cardLogo,
          locationAdd
        )

        if (result.status == true) {
          setIsContinueBtn(false)
          setToggle(!toggle)
          dispatch({
            type: 'PROFILE',
            payload: {
              toggle,
            },
          })
          Toast.fire({
            icon: 'success',
            title: 'Information successfully updated',
          })
          setBrokerInformation(result.user)

          setOpenEditModel(false)
        } else {
          setIsContinueBtn(false)
          if (result?.errors?.email) {
            setEmailValiDation(true)
            setEmailValidValue(result?.errors?.email[0])
          }
          if (result?.errors?.phone) {
            setPhoneValiDation(true)
            setPhoneValidValue(result?.errors?.phone[0])
          }
        }
      } catch (errors) {
        // setIsContinueBtn(false)
        Toast.fire({
          icon: 'error',
          title: 'Please try again',
        })
      }
    }
  }

  /////////////////////
  const setValueFromDb = () => {
    setDbId(brokerInformation.id)
    setFirstName(brokerInformation.first_name)
    setLastName(brokerInformation.last_name)
    setPhone(brokerInformation.phone)
    setEmail(brokerInformation.email)
    setShowProfileImage(
      brokerInformation?.profile_image?.full_path + brokerInformation?.profile_image?.file_name
    )
    setCompanyName(brokerInformation.company_name)
    setAddressObj(brokerInformation?.location)
    if (
      brokerInformation?.location?.place_id !== '' &&
      brokerInformation?.location?.place_id !== null
    ) {
      setFound(false)

      setAddressObj(brokerInformation?.location)
      setAddress({
        label: brokerInformation?.location?.formatted_address,
        value: brokerInformation?.location?.formatted_address,
      })
      setGo(true)
      setStreetValidation(true)
    } else {
      setFound(true)
      addressChange({
        label: brokerInformation?.location?.country,
        value: brokerInformation?.location?.country,
      })
      stateChange({
        label: brokerInformation?.location?.province,
        value: brokerInformation?.location?.province,
      })
      cityChange({
        value: brokerInformation?.location?.city,
        label: brokerInformation?.location?.city,
      })

      setStreet(brokerInformation?.location?.address)
      setZipCode(brokerInformation?.location?.postal_code)
      setGo(true)
      setStreetValidation(true)
    }
    // setCardLogo(brokerInformation.profile_image.full_path + brokerInformation.profile_image.file_name)
    setPhone(brokerInformation.phone)
  }
  const clearValidation = () => {
    setLogoNotFound(false)
    setProfileValidation(false)
    setPasswordValidation(false)
    setCPasswordValidation(false)
    setLocationValidation(false)
    setLogoThrowError(false)
    setStateValidation(false)
    setAddressValidation(false)
    setFirstNameValidation(false)
    setLastNameValidation(false)
    setCompanyNameValidation(false)
    setBusinessAddressValidation(false)
    setCityValidation(false)
    setStreetValidation(false)
    setStreetValiDation(false)
    setEmailValiDation(false)
    setPhoneValiDation(false)
    setZipCodeValiDation(false)
    setLocationsValidation(false)
  }
  return (
    <>
      {loader ? (
        <>
          {role == 'user' || role == 'agent' ? (
            <div className=' mb-5 mb-xl-10' id='kt_profile_details_view'>
              <div className='d-flex justify-content-between  px-7'>
                <div className='card-title m-0'>
                  <h3 className='fw-bolder m-0'>Profile Overview</h3>
                </div>

                <Link
                  to='/dashboard/my-account/settings'
                  className='btn btn-primary mt-5 mt-md-0 align-self-center'
                >
                  Edit Profile
                </Link>
              </div>

              <div className=' p-7'>
                <div className='row mb-7'>
                  <label className=' col-sm-6 col-md-4 fw-bolder profile-overview-biz-owner'>
                    Full Name
                  </label>

                  <div className='col-sm-6 col-md-8'>
                    <span className='fw-normal fs-6 text-dark profile-overview-biz-owner'>
                      {fullName}
                    </span>
                  </div>
                </div>

                <div className='row mb-7'>
                  <label className='col-sm-6 col-md-4 fw-bolder profile-overview-biz-owner'>
                    Contact Phone
                    {/* <i
                  className='fas fa-exclamation-circle ms-1 fs-7'
                  data-bs-toggle='tooltip'
                  title='Phone number must be active'
                ></i> */}
                  </label>

                  <div className='col-sm-6 col-md-8 d-flex align-items-center'>
                    <span className='fw-normal fs-6 me-2 profile-overview-biz-owner'>{phone}</span>
                  </div>
                </div>
                {country != '' && country != null && (
                  <div className='row mb-7'>
                    <label className='col-sm-6 col-md-4 fw-bolder profile-overview-biz-owner'>
                      Country
                    </label>

                    <div className='col-sm-6 col-md-8'>
                      <span className='fw-normal fs-6 text-dark profile-overview-biz-owner'>
                        {country}
                      </span>
                    </div>
                  </div>
                )}

                <div className='row mb-7'>
                  <label className='col-sm-6 col-md-4  fw-bolder profile-overview-biz-owner'>
                    Email
                  </label>

                  <div className='col-sm-6 col-md-8 '>
                    <span className='fw-normal fs-6 text-dark profile-overview-biz-owner'>
                      {email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : role == 'broker' ? (
            <div className='mb-5 mb-xl-10' id='kt_profile_details_view'>
              <div className='d-flex justify-content-end cursor-pointer'>
                <button
                  className='btn btn-primary mt-5 mt-md-0 align-self-center'
                  onClick={() => {
                    setOpenEditModel(true)
                    setValueFromDb()
                    clearValidation()
                  }}
                >
                  Edit
                </button>
              </div>

              <div className='card-body p-9'>
                <div className='row mb-7'>
                  <label className=' col-sm-6 col-md-4 fw-bolder profile-overview-biz-owner'>
                    Full Name
                  </label>

                  <div className='col-sm-6 col-md-8'>
                    <span className='fw-normal fs-6  profile-overview-biz-owner'>
                      {brokerInformation.first_name + ' ' + brokerInformation?.last_name}
                    </span>
                  </div>
                </div>

                <div className='row mb-7'>
                  <label className='col-sm-6 col-md-4 fw-bolder profile-overview-biz-owner'>
                    Contact Phone
                    {/* <i
                  className='fas fa-exclamation-circle ms-1 fs-7'
                  data-bs-toggle='tooltip'
                  title='Phone number must be active'
                ></i> */}
                  </label>

                  <div className='col-sm-6 col-md-8 d-flex align-items-center'>
                    <span className='fw-normal fs-6 me-2 profile-overview-biz-owner'>
                      {brokerInformation?.phone}
                    </span>
                  </div>
                </div>

                <div className='row mb-7'>
                  <label className='col-sm-6 col-md-4 fw-bolder profile-overview-biz-owner'>
                    Broker Address
                  </label>

                  <div className='col-sm-6 col-md-8'>
                    <span className='fw-normal fs-6 text-dark profile-overview-biz-owner'>
                      {brokerInformation?.location?.formatted_address}
                    </span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-sm-6 col-md-4  fw-bolder profile-overview-biz-owner'>
                    Email
                  </label>

                  <div className='col-sm-6 col-md-8 '>
                    <span className='fw-normal fs-6 text-dark profile-overview-biz-owner'>
                      {brokerInformation?.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{height: '80vh', width: '100%'}}
        >
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}

      {/* <Modal isOpen={openCrop} onHide={modalClose} style={{zIndex: '9999'}}>
        <Modal.Header className='py-4' closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CropEasy {...{cropImg, setOpenCrop, setShowProfileImage, setFile}} />
        </Modal.Body>
      </Modal> */}

      <Modal size='md' isOpen={openCrop} centered={true}>
        <ModalHeader toggle={() => setOpenCrop(!openCrop)}>
          <h5 className='modal-title'> Upload Image</h5>
        </ModalHeader>

        <ModalBody>
          <CropEasy {...{cropImg, setOpenCrop, setShowProfileImage, setFile}} />
        </ModalBody>
      </Modal>

      {/*edit Model Start */}
      <Modal size='xl' isOpen={openEditModel} centered={true}>
        <ModalHeader toggle={() => setOpenEditModel(!openEditModel)}>
          <h5 className='modal-title'> Edit Basic Information</h5>
        </ModalHeader>

        <ModalBody>
          <div className='container mx-auto p-10 px-md-10'>
            <div className='row justify-content-center'>
              <div className='mb-3 col-md-2 col-6'>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className='image-input-wrapper w-125px h-125px'>
                    <img src={showProfileImage} className='img-fluid w-100 h-100' alt='' />
                  </div>

                  <label
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='change'
                    data-bs-toggle='tooltip'
                    title='Change avatar'
                  >
                    <i className='bi bi-pencil-fill fs-7' />

                    <input
                      type='file'
                      name='logo'
                      accept='.jpg, .jpeg, .png, .svg, .gif, .webp, .mp4, .mepg4, .avi, .wmv, .mkv, .webm, .flv'
                      onChange={(e) => onInputChange(e)}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                </div>
                {logoNotFound && <div className='biz_owner_input_validation me-9'>{logoError}</div>}
                {logoThrowError && <div className='biz_owner_input_validation'>Upload profile</div>}
                <div>
                  {/* <label htmlFor='FormControlInput2' className='required form-label mt-3'>
                    Profile
                  </label> */}
                </div>
              </div>
            </div>
            <div className='row'>
              {/* firstName  */}
              <div className='col-md-6 mt-5'>
                <label className='form-label required '>First Name</label>

                <input
                  type='text'
                  placeholder='First name'
                  className='form-control form-control-lg form-control-solid'
                  name='firstName'
                  value={firstName}
                  onChange={(e) => onInputChange(e)}
                  required
                />
                {firstNameValidation ? (
                  <div className='biz_owner_input_validation'>Enter first name</div>
                ) : null}
              </div>
              {/* last  */}
              <div className='col-md-6 mt-5'>
                <label className='form-label required '>Last Name</label>

                <input
                  type='text'
                  placeholder='Last name'
                  className='form-control form-control-lg form-control-solid'
                  name='lastName'
                  value={lastName}
                  onChange={(e) => onInputChange(e)}
                  required
                />
                {lastNameValidation ? (
                  <div className='biz_owner_input_validation'>Enter last name </div>
                ) : null}
              </div>
              {/* company  */}
              <div className='col-md-6 mt-5'>
                <label className='form-label required '>Company Name</label>

                <input
                  type='text'
                  placeholder='Company name'
                  className='form-control form-control-lg form-control-solid'
                  name='companyName'
                  value={companyName}
                  onChange={(e) => onInputChange(e)}
                  required
                />
                {companyNameValidation ? (
                  <div className='biz_owner_input_validation'>Enter company name </div>
                ) : null}
              </div>
              {/* email  */}

              {/* <div className=' col-md-6 mt-5'>
                <label for='validationCustomUsername ' className='form-label required'>
                  Email Address
                </label>

                <input
                  type='email'
                  placeholder='Email Address'
                  className='form-control form-control-lg form-control-solid'
                  name='email'
                  value={email}
                  id='validationCustomUsername'
                  onChange={(e) => onInputChange(e)}
                  aria-describedby='inputGroupPrepend'
                  required
                />
                {emailValiDation ? (
                  <div className='biz_owner_input_validation'>{emailValidValue}</div>
                ) : null}
              </div> */}
              {/* password  */}
              {/* <div className='col-md-6 mt-5'>
                <label className='form-label required '>Password</label>

                <input
                  type='password'
                  placeholder='Password'
                  className='form-control form-control-lg form-control-solid'
                  name='password'
                  value={password}
                  onChange={(e) => onInputChange(e)}
                  required
                />
                {passwordValidation ? (
                  <div className='biz_owner_input_validation'>Enter password </div>
                ) : null}
                {bothPassword && (
                  <div className='biz_owner_input_validation'>password not same </div>
                )}
              </div> */}
              {/* conform password  */}
              {/* <div className='col-md-6 mt-5'>
                <label className='form-label required '>Confirm Password</label>

                <input
                  type='password'
                  placeholder='Conform password'
                  className='form-control form-control-lg form-control-solid'
                  name='cPassword'
                  value={cPassword}
                  onChange={(e) => onInputChange(e)}
                  required
                />
                {cPasswordValidation ? (
                  <div className='biz_owner_input_validation'>Enter password </div>
                ) : null}
                {bothPassword && (
                  <div className='biz_owner_input_validation'>password not same </div>
                )}
              </div> */}

              {/* phone number  */}
              <div className='col-md-6 mt-5'>
                <label className='form-label required'>Phone Number</label>

                <PhoneInput country={'us'} value={phone} onChange={phoneNumberHandler} />

                {phoneValiDation ? (
                  <div className='biz_owner_input_validation'>{phoneValidValue}</div>
                ) : null}
              </div>
              {/* address */}
              {found ? (
                <div className=' mt-5 d-flex justify-content-between'>
                  <label className='form-label required '>Broker Address</label>
                  <i className='cursor-pointer'>
                    <MdOutlineCancel
                      color={'red'}
                      size={20}
                      onClick={() => {
                        setFound(false)
                        setZipCodeValiDation(false)
                      }}
                    />
                  </i>
                </div>
              ) : (
                <>
                  <div className='col-12 mt-5'>
                    <div className=' d-flex justify-content-between'>
                      <label className='form-label required '>Broker Address</label>
                      <label
                        className='  fs-6 text-primary form-label  ps-3 cursor-pointer mt-1'
                        onClick={() => {
                          setFound(true)
                          setAddress('')
                          setAddressObj('')
                          setLocationsValidation(false)
                          setIsContinueBtn(false)
                        }}
                      >
                        Add Location Manually
                      </label>
                    </div>

                    <div
                      onClick={(e) => {
                        setFound(false)
                        e.target.classList?.value == ` css-1uccc91-singleValue`
                          ? setAddress('')
                          : setAddress(address)
                      }}
                      id='bgApi'
                    >
                      <GooglePlacesAutocomplete
                        fetchDetails={true}
                        minLength={2}
                        placeholder='Search Location'
                        apiKey='AIzaSyDcLGFU2zAn2rITMgtWVTkiGnuOPnqmtCU'
                        selectProps={{
                          value: address,

                          onChange: (e) => {
                            setAddress(e)
                            setAddressObj('')
                            setLocationsValidation(false)
                          },
                          isDisabled: found ? true : false,
                          isClearable: true,
                        }}
                      />
                      {locationsValidation && !found ? (
                        <div className='biz_owner_input_validation'>Select location</div>
                      ) : null}
                    </div>
                    {businessAddressValue.length >= 1 ? (
                      <>
                        <div
                          id='biz_owner_industry_options'
                          className=' pt-2   w-100 '
                          style={{backgroundColor: '#f5f8fa'}}
                        >
                          {searchItems.slice(0, 10).map((item) => (
                            <div
                              onClick={(e) => onSearch(item.country, e)}
                              className='biz_owner_search_options_value cursor-pointer search_items py-1 px-5'
                              key={item.country}
                            >
                              <div>{item.country.length > 0 ? item.country : <p>ss</p>}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div>
                </>
              )}
            </div>

            <div className={`${found ? 'row mx-0' : null}`} style={{backgroundColor: '#fafafa'}}>
              {found && (
                <div className=' col-md-6   mt-5'>
                  <label className='form-label required'>Street Address</label>
                  <input
                    type='text'
                    placeholder='Enter Street Address'
                    className='form-control form-control-lg form-control-solid'
                    name='street'
                    value={street}
                    onChange={(e) => onInputChange(e)}
                  />
                  {streetValiDation ? (
                    <div className='biz_owner_input_validation'>Enter street address</div>
                  ) : null}
                </div>
              )}
              {found && (
                <div className='col-md-6  mt-5'>
                  <label className='form-label required'>City</label>

                  <Select
                    type='search'
                    options={allCities}
                    placeholder='City'
                    value={cityValue}
                    onChange={cityChange}
                  />
                  {cityValidation ? (
                    <div className='biz_owner_input_validation'>Select city</div>
                  ) : null}
                </div>
              )}

              {found && (
                <div className='col-md-6 mt-5'>
                  <label className='form-label required'>State</label>

                  <Select
                    type='search'
                    options={allStates}
                    value={stateValue}
                    placeholder='State'
                    onChange={(e) => stateChange(e)}
                  />
                  {stateValidation ? (
                    <div className='biz_owner_input_validation'>Select state</div>
                  ) : null}
                </div>
              )}
              {found && (
                <div className='  col-md-6 mt-5'>
                  <div className='  '>
                    <label className='form-label required'>Country</label>
                    <div className='col-12 '>
                      <Select
                        type='search'
                        options={allCountries}
                        value={addressValue}
                        placeholder='Country'
                        onChange={addressChange}
                      />
                      {addressValidation ? (
                        <div className='biz_owner_input_validation'>Select business address</div>
                      ) : null}
                    </div>
                  </div>{' '}
                </div>
              )}
              {found && (
                <div className='col-md-6  my-5'>
                  <label for='quantity' className='form-label required'>
                    ZIP Code
                  </label>

                  <input
                    type='number'
                    placeholder='Enter Business Zip Code'
                    className='form-control form-control-lg form-control-solid'
                    name='zipCode'
                    id='quantity'
                    maxLength={6}
                    value={zipCode}
                    onChange={(e) => onInputChange(e)}
                  />
                  {zipCodeValiDation ? (
                    <div className='biz_owner_input_validation'>Enter valid zip code</div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </ModalBody>

        <ModalFooter className='text-center py-5'>
          <button
            type='reset'
            className='btn btn-light me-3'
            onClick={() => {
              setOpenEditModel(!openEditModel)
            }}
          >
            Discard
          </button>

          <div className=' d-flex justify-content-end  position-relative '>
            {isContinueBtn == true ? (
              <span className='btn btn-primary'>
                <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
              </span>
            ) : (
              <button className='btn btn-primary ' onClick={(e) => updateInformation(e)}>
                Update
              </button>
            )}
          </div>
        </ModalFooter>
      </Modal>

      {/* edit Model End */}
    </>
  )
}
export default Overview
