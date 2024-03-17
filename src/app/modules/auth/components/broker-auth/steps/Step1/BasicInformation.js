import React, {useEffect, useState} from 'react'

import './BasicInformation.css'
import '../../../../../../../components/BuyBizzOwner.css'
import Select from 'react-select'
import Multiselect from 'multiselect-react-dropdown'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ButtonLoader from '../../../../../../../assets/Loader/ButtonLoader.gif'
import dummyProfile from '../../../../../../../assets/broker-icons/blank.svg'
import {
  getCountries,
  getStates,
  getCities,
} from '../../../../../../../components/services/get-fields-data'
import GooglePlacesAutocomplete, {geocodeByPlaceId} from 'react-google-places-autocomplete'
import {MdOutlineCancel} from 'react-icons/md'
import {FaBullseye} from 'react-icons/fa'
import {registerBrokerStep1} from '../../../../../../../components/services/auth-services/AuthServices'
import {Modal} from 'react-bootstrap'

import CropEasy from '../../../../../../../components/sidebar/profile/components/cropBroker/CropEasy'
const BasicInformation = (props) => {
  const token = localStorage.getItem('brokerID')
  const startup = [
    {name: ' Restaurants & Food', id: ' Restaurants & Food'},
    {name: ' Service Businesses', id: ' Service Businesses'},
    {name: '  Automotive & Boat', id: '  Automotive & Boat'},

    {name: '  Building & Construction', id: '  Building & Construction'},
    {name: ' Retail', id: ' Retail'},
    {name: '  Health Care & Fitness', id: '  Health Care & Fitness'},
    {name: ' Service Businesses', id: ' Service Businesses'},
  ]
  var country = [
    {country: 'Farrel Hoggin'},
    {country: 'Irma Olech'},
    {country: 'Irma Olech'},
    {country: 'Irma Olech'},
    {country: 'Emmit Gallacher'},
    {country: 'Dunn Astlet'},
    {country: 'Burg Peaddie'},

    {country: 'Darrelle Enevold'},
    {country: 'Wilmer Willmott'},
    {country: 'Kathryne Maytom'},
  ]
  const [userName, setUserName] = useState('')
  const [usernameErrorValue, setUsernameErrorValue] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [logoNotFound, setLogoNotFound] = useState(false)
  const [selectedListing, setSelectedListing] = useState('')
  const [industryValue, setIndustryValue] = useState('')
  const [stateValue, setStateValue] = useState('')
  const [openCrop, setOpenCrop] = useState(false)
  const [file, setFile] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [locationValue, setLocationValue] = useState('')
  const [cropImg, setCropImage] = useState()
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
  const [showProfileImage, setShowProfileImage] = useState(dummyProfile)
  const [password, setPassword] = useState('')
  const [bothPassword, setBothPassword] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState(false)
  const [cPasswordValidation, setCPasswordValidation] = useState(false)
  const [cPassword, setCPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [street, setStreet] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
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

  // validation states
  const [listingValidation, setListingValidation] = useState(false)
  const [industryValidation, setIndustryValidation] = useState(false)
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
  const getBusinessID = localStorage.getItem('businessID')
  const transformedBusinessID = JSON?.parse(getBusinessID)
  const {businessID} = transformedBusinessID ?? ''
  ////////////////////
  useEffect(() => {
    getAllCountries()
    getAllStates(242)
    getAllCities(5072)
    setUserName('')
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
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
        result?.countries?.map((item, index) =>
          mapCountries.push({value: item.id, label: item.name})
        )
        filterCountries = mapCountries.filter((x) => {
          return x.value !== 39 && x.value !== 233
        })
        filterCountries.unshift({value: 233, label: 'United States'}, {value: 39, label: 'Canada'})
        setAllCountries(filterCountries)
      }
    } catch (err) {
      console.log('getCountries err', err)
    }
  }
  const getAllStates = async (countryID) => {
    let mapStates = []
    try {
      const result = await getStates(countryID, token)

      if (result.status === true) {
        result?.states?.map((item, index) => mapStates.push({value: item.id, label: item.name}))
        setAllStates(mapStates)
      }
      mapStates?.map((val) => {
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
      const result = await getCities(stateID, token)

      if (result.status === true) {
        result?.cities?.map((item, index) => mapCities.push({value: item.id, label: item.name}))
        setAllCities(mapCities)
      }
    } catch (err) {
      console.log('getCities err', err)
    }
  }
  const propData = async (e) => {
    e.preventDefault()
    if (userName == '' || userName == undefined) {
      setUsernameError(true)
      setUsernameErrorValue('Enter username')
    }
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
    if (cardLogo == '' || cardLogo == null || cardLogo == undefined) {
      setLogoError('Upload profile image')
      setLogoNotFound(true)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    let locationAdd
    let country = addressValue?.label
    let province = stateValue?.label
    let city = cityValue?.label

    if (address === '' || address === null) {
      setLocationsValidation(true)

      if (cityValue == '' || cityValue == undefined) {
        setCityValidation(true)
      }

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

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    if (lastName == '' || lastName == undefined) {
      setLastNameValidation(true)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    if (companyName == '' || companyName == undefined) {
      setCompanyNameValidation(true)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    if (password == '' || password == undefined) {
      setPasswordValidation(true)
      window.scrollTo({
        top: 100,
        behavior: 'smooth',
      })
    }
    if (cPassword == '' || cPassword == undefined) {
      setCPasswordValidation(true)
      window.scrollTo({
        top: 100,
        behavior: 'smooth',
      })
    }
    if (password !== '' && cPassword !== '' && password !== cPassword) {
      setBothPassword(true)
      window.scrollTo({
        top: 100,
        behavior: 'smooth',
      })
    } else {
      setBothPassword(false)
    }
    // }

    if (locationValue == '' || locationValue == undefined) {
      setLocationValidation(true)
    }

    if (email == '' || email == undefined) {
      setEmailValiDation(true)
      setEmailValidValue('Enter email')
    } else if (!isValidEmail(email)) {
      setEmailValiDation(true)
      setEmailValidValue('Enter valid email')
    }
    if (phone == '' || phone == undefined) {
      setPhoneValiDation(true)
      setPhoneValidValue('Enter phone number')
      window.scrollTo({
        top: 50,
        behavior: 'smooth',
      })
    } else if (phone.length <= 8) {
      setPhoneValiDation(true)
      setPhoneValidValue('Enter valid phone number')
      window.scrollTo({
        top: 50,
        behavior: 'smooth',
      })
    }

    if (
      userName != '' &&
      userName != undefined &&
      usernameError == false &&
      found == false &&
      lastName != '' &&
      lastName != undefined &&
      firstName != '' &&
      firstName != undefined &&
      phone != '' &&
      phone != undefined &&
      isValidEmail(email) &&
      phone.length > 8 &&
      email != '' &&
      email != undefined &&
      address != '' &&
      address != undefined &&
      cardLogo != '' &&
      cardLogo != undefined &&
      password === cPassword
    ) {
      try {
        setIsContinueBtn(true)
        const result = await registerBrokerStep1(
          userName,
          firstName,
          lastName,
          email,
          companyName,
          password,
          phone,
          file,
          locationAdd
        )

        if (result.status == true) {
          setIsContinueBtn(false)
          localStorage.setItem('brokerID', result?.token)
          props.nextStep()
        } else {
          setIsContinueBtn(false)
          if (result.errors?.username) {
            setUsernameError(true)
            setUsernameErrorValue(result.errors.username[0])
          } else {
            setUsernameError(false)
          }
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
        setIsContinueBtn(false)
      }
    } else if (
      found == true &&
      userName != '' &&
      userName != undefined &&
      usernameError == false &&
      lastName != '' &&
      lastName != undefined &&
      firstName != '' &&
      firstName != undefined &&
      phone != '' &&
      phone != undefined &&
      isValidEmail(email) &&
      phone.length > 8 &&
      email != '' &&
      email != undefined &&
      street != '' &&
      street != undefined &&
      zipCode != '' &&
      zipCode != undefined &&
      zipCode.length > 2 &&
      stateValue != '' &&
      stateValue != undefined &&
      cityValue != '' &&
      cityValue != undefined &&
      cardLogo != '' &&
      cardLogo != undefined &&
      password === cPassword
    ) {
      try {
        setIsContinueBtn(true)
        const result = await registerBrokerStep1(
          userName,
          firstName,
          lastName,
          email,
          companyName,
          password,
          phone,
          imagesForDB,
          locationAdd
        )
        if (result.status == true) {
          setIsContinueBtn(false)
          localStorage.setItem('brokerID', result?.token)

          props.nextStep()
        } else {
          setIsContinueBtn(false)
          if (result?.errors?.email) {
            setEmailValiDation(true)
            setEmailValidValue(result?.errors?.email[0])
            window.scrollTo({
              top: 50,
              behavior: 'smooth',
            })
          }
          if (result?.errors?.phone) {
            setPhoneValiDation(true)

            setPhoneValidValue(result?.errors?.phone[0])
            window.scrollTo({
              top: 50,
              behavior: 'smooth',
            })
          }
        }
      } catch (errors) {
        setIsContinueBtn(false)
      }
    }
  }
  const stateChange = async (e) => {
    setAddress('')
    setAddressObj('')
    setIsContinueBtn(false)
    await setStateValue(e)
    getAllCities(e.value)

    setStateValidation(false)
  }

  const addressChange = async (e) => {
    getAllStates(e.value)
    setAddress('')
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
  const onInputChange = async (event, files) => {
    // if (event.target.name == 'zipCode' && event.target.lenght < 6) {
    //   setZipCode(event.target.value)
    // }
    // setAddress('')
    // setAddressObj('')
    setBothPassword(false)
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
      case 'user-name':
        await setUserName(event.target.value)
        if (event.target.value.length < 1) {
          setUsernameError(true)
          setUsernameErrorValue('Username is required')
        } else setUsernameError(false)

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
        setEmailValiDation(false)
        break

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
  const onKeyPressAdd = (e) => {
    if (e.key === 'Enter') {
      propData()
    }
  }

  ///////////Get Address In Object Form///////////

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
  const modalClose = () => {
    setOpenCrop(false)
  }
  /////////////////////
  return (
    <>
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
                  accept='.jpg, .jpeg, .png, .gif'
                  onChange={(e) => onInputChange(e)}
                />
                <input type='hidden' name='avatar_remove' />
              </label>
              {logoNotFound && (
                <div className='biz_owner_input_validation ' style={{fontSize: '11px'}}>
                  {logoError}
                </div>
              )}
              {logoThrowError && (
                <div className='biz_owner_input_validation ' style={{fontSize: '11px'}}>
                  Upload profile image
                </div>
              )}
            </div>

            <div>
              {/* <label htmlFor='FormControlInput2' className='required form-label mt-3'>
              Profile
            </label> */}
            </div>
          </div>
        </div>
        <form>
          <div className='row'>
            {/* firstName  */}

            <div className='col-md-6 mt-5'>
              <label className='form-label required '>First Name</label>

              <input
                type='text'
                placeholder='John'
                className='form-control form-control-lg form-control-solid'
                name='firstName'
                value={firstName}
                onChange={(e) => onInputChange(e)}
                onKeyPress={(e) => onKeyPressAdd(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
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
                placeholder='Doe'
                className='form-control form-control-lg form-control-solid'
                name='lastName'
                value={lastName}
                onChange={(e) => onInputChange(e)}
                onKeyPress={(e) => onKeyPressAdd(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
                required
              />
              {lastNameValidation ? (
                <div className='biz_owner_input_validation'>Enter last name </div>
              ) : null}
            </div>
            {/* company  */}
            <div className='col-md-6 mt-5 '>
              <label className='required form-label'>Username</label>
              <form>
                <input
                  type='text'
                  placeholder='John Doe'
                  name='user-name'
                  className='form-control form-control-lg form-control-solid'
                  onChange={onInputChange}
                  onKeyPress={onKeyPressAdd}
                  onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
                  value={userName}
                  required
                  autocomplete='off'
                />
              </form>
              {usernameError ? (
                <div className='biz_owner_input_validation'>{usernameErrorValue}</div>
              ) : null}
            </div>
            <div className='col-md-6 mt-5'>
              <label className='form-label required'>Company Name</label>

              <input
                type='text'
                placeholder='Walmart Amazon etc.'
                className='form-control form-control-lg form-control-solid'
                name='companyName'
                value={companyName}
                onChange={(e) => onInputChange(e)}
                onKeyPress={(e) => onKeyPressAdd(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
                required
              />
              {companyNameValidation ? (
                <div className='biz_owner_input_validation'>Enter company name </div>
              ) : null}
            </div>
            {/* phone number  */}
            <div className='col-md-6 mt-5'>
              <label className='form-label required'>Phone Number</label>

              <PhoneInput country={'us'} value={phone} onChange={phoneNumberHandler} />
              {phoneValiDation ? (
                <div className='biz_owner_input_validation'>{phoneValidValue}</div>
              ) : null}
            </div>

            {/* email  */}

            <div className=' col-md-6 mt-5'>
              <label for='validationCustomUsername ' className='form-label required'>
                Email Address
              </label>

              <input
                type='email'
                placeholder='johndoe@email.com'
                className='form-control form-control-lg form-control-solid'
                name='email'
                value={email}
                id='validationCustomUsername'
                onChange={(e) => onInputChange(e)}
                onKeyPress={(e) => onKeyPressAdd(e)}
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
                aria-describedby='inputGroupPrepend'
                required
                autocomplete='off'
              />
              {emailValiDation ? (
                <div className='biz_owner_input_validation'>{emailValidValue}</div>
              ) : null}
            </div>
            {/* password  */}
            <div className='col-md-6 mt-5'>
              <label className='form-label required '>Password</label>
              <div className='row'>
                <div className='col-11 pe-0'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    className='form-control form-control-lg form-control-solid'
                    name='password'
                    value={password}
                    onChange={(e) => onInputChange(e)}
                    onKeyPress={(e) => onKeyPressAdd(e)}
                    onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
                    required
                    autocomplete='off'
                  />
                </div>

                <div className='col-1 mb-0 form-control-password-toggle manage-margin-top'>
                  <span
                    className=' my-auto cursor-pointer'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? 'fas fa-eye fs-4' : 'fas fa-eye-slash fs-4'} />
                  </span>
                </div>
              </div>
              {passwordValidation ? (
                <div className='biz_owner_input_validation'>Enter password </div>
              ) : null}
              {bothPassword && <div className='biz_owner_input_validation'>Password not same </div>}
            </div>
            {/* conform password  */}
            <div className='col-md-6 mt-5'>
              <label className='form-label required '>Confirm Password</label>
              <div className='row'>
                <div className='col-11 pe-0'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    className='form-control form-control-lg form-control-solid'
                    name='cPassword'
                    value={cPassword}
                    onChange={(e) => onInputChange(e)}
                    onKeyPress={(e) => onKeyPressAdd(e)}
                    onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
                    required
                    autocomplete='off'
                  />
                </div>

                <div className='col-1 mb-0 form-control-password-toggle manage-margin-top'>
                  <span
                    className=' my-auto cursor-pointer'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i
                      className={showConfirmPassword ? 'fas fa-eye fs-4' : 'fas fa-eye-slash fs-4'}
                    />
                  </span>
                </div>
              </div>
              {cPasswordValidation ? (
                <div className='biz_owner_input_validation'>Enter password </div>
              ) : null}
              {bothPassword && <div className='biz_owner_input_validation'>Password not same</div>}
            </div>

            {/* address */}
            {found ? (
              <div className=' mt-5 d-flex justify-content-between'>
                <label className='form-label required '>Business Address</label>
                <i
                  className='cursor-pointer'
                  onClick={() => {
                    setFound(false)
                    setZipCodeValiDation(false)

                    // setZipCode('')
                    // setStreet('')
                  }}
                >
                  <MdOutlineCancel color={'red'} size={20} />
                </i>
              </div>
            ) : (
              <>
                <div className='col-12 mt-5'>
                  <div className=' d-flex justify-content-between'>
                    <label className='form-label required '>Business Address</label>

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
                        : null
                    }}
                    id='bgApi'
                  >
                    <GooglePlacesAutocomplete
                      fetchDetails={true}
                      minLength={2}
                      onKeyPress={(e) => onKeyPressAdd(e)}
                      apiKey='AIzaSyDcLGFU2zAn2rITMgtWVTkiGnuOPnqmtCU'
                      selectProps={{
                        value: address,

                        onChange: (e) => {
                          setAddress(e)
                          setAddressObj('')
                          setLocationsValidation(false)
                        },

                        placeholder: 'Type a business location',
                        isDisabled: found ? true : false,
                        isClearable: true,
                      }}
                    />
                    {locationsValidation && !found ? (
                      <div className='biz_owner_input_validation'>Select location</div>
                    ) : null}
                  </div>

                  {/* {businessAddressValidation && !found ? (
          <div className='biz_owner_input_validation'>Choose industry</div>
        ) : (
          !businessAddressValidation
        )} */}
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
        </form>
        {/* style={{backgroundColor: '#fafafa'}} */}
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
                placeholder='Select Business City'
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
                placeholder='Select State'
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
                    placeholder='Select Business Country'
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
        <div>
          <div className=' d-flex justify-content-end mt-10 position-relative '>
            {isContinueBtn == true ? (
              <span className='btn btn-primary'>
                <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
              </span>
            ) : (
              <button className='btn btn-primary ' onClick={(e) => propData(e)}>
                Continue
              </button>
            )}
          </div>
        </div>
      </div>

      {openCrop && (
        <Modal show={openCrop} onHide={modalClose}>
          <Modal.Header className='py-4' closeButton>
            <Modal.Title>Upload Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CropEasy {...{cropImg, setOpenCrop, setShowProfileImage, setFile}} />
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}

export default BasicInformation
{
  /* <div onClick={() => props.nextStep()}>step one</div> */
}
