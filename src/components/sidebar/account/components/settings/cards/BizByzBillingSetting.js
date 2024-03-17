import React, {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import ImageUpload from './ImageUpload'
import {getCountries} from '../../../../../services/get-fields-data'
import Multiselect from 'multiselect-react-dropdown'
import Select from 'react-select'
import MainScreenLoader from '../../../../../../assets/Loader/MainScreenLoader.gif'
import btnLoadder from '../../../../../../assets/Loader/ButtonLoader.gif'
import './ImageUpload.css'
import './style.css'
import 'react-phone-input-2/lib/style.css'

import {profileOverView, updateProfile} from '../../../../../services/profile-services'
import {useNavigate} from 'react-router-dom'
import {typeOf} from 'react-is'
import {useDispatch} from 'react-redux'
import profileImage from '../../../../../../assets/images/profile-image.png'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import GooglePlacesAutocomplete, {geocodeByPlaceId} from 'react-google-places-autocomplete'
import CropEasy from './crop/CropEasy'
import {Modal} from 'react-bootstrap'

//  '../../../services/get-fields-data'
export default function BizByzBillingSetting() {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [showPasswordForm, setPasswordForm] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  ///////////////////
  const [toggle, setToggle] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [firstNameValidation, setFirstNameValidation] = useState(false)
  const [lastName, setLastName] = useState('')
  const [lastNameValidation, setLastNameValidation] = useState(false)

  const [PhoneNo, setPhoneNo] = useState('')
  const [PhoneNoValidation, setPhoneNoValidation] = useState(false)

  const [allCountries, setAllCountries] = useState([])
  const [locationValue, setLocationValue] = useState([])
  const [locationValidation, setLocationValidation] = useState(false)

  const [email, setEmail] = useState('')

  const [loader, setLoader] = useState(false)
  const [openCrop, setOpenCrop] = useState(false)
  const [country, setCountry] = useState('')
  const [language, setLanguage] = useState('')
  const [languageValidation, setLanguageValidation] = useState(false)
  const [addressObj, setAddressObj] = useState('')

  const [timezone, setTimezone] = useState('')
  const [userName, setUserName] = useState('')
  const [currency, setCurrency] = useState('')
  const [currencyValidation, setCurrencyValidation] = useState(false)
  const [btnLoader, setBtnLoader] = useState(false)
  const [ProfileImg, setProfileImage] = useState(null)
  const [checkboxEmail, setCheckboxEmail] = useState(false)
  const [checkboxPhone, setCheckboxPhone] = useState(false)
  const [profileImg, setProfileImg] = useState()
  const [selectedImages, setSelectedImages] = useState()
  const [cropImg, setCropImage] = useState()
  const [imagesForDB, setImagesForDB] = useState()
  const [address, setAddress] = useState('')
  const [file, setFile] = useState(null)
  let navigate = useNavigate()
  const tokenData = localStorage.getItem('userData')

  // console.log(checkboxEmail, checkboxPhone)
  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData ?? ''
  const {userID} = transtokenData ?? ''
  const Languages = [
    'Bahasa Indonesia - Indonesian',
    'Bahasa Melayu - Malay',
    'Català - Catalan',
    'Čeština - Czech',
    'Dansk - Danish',
    'Deutsch - German',
    'English',
    'English UK - British English',
    'Español - Spanish',
    'Filipino',
    'Français - French',
    'Gaeilge - Irish',
    'Galego - Galician',
  ]
  const timezoneArray = [
    '(GMT-05:00) Guadalajara',
    '(GMT-11:00) Midway Island',
    '(GMT-11:00) Samoa',
    '(GMT-10:00) Hawaii',
    '(GMT-08:00) Alaska',
    '(GMT-07:00) Pacific Time (US &amp; Canada)',
    '(GMT-07:00) Tijuana',
    '(GMT-07:00) Arizona UK - British English',
    '(GMT-06:00) Mountain Time (US &amp; Canada)',
    '(GMT-06:00) Chihuahua',
    '(GMT-06:00) Mazatlan - French',
    '(GMT-06:00) Saskatchewan',
    '(GMT-06:00) Central America',
    ' (GMT-05:00) Central Time (US &amp; Canada)',
  ]
  const timeFrame = [
    'Afghanistan',
    'Aland Islands',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
  ]
  const currencyArray = [
    'USD - USA dollar',
    'GBP - British pound',
    'AUD - Australian dollar',
    'JPY - Japanese yen',
    'SEK - Swedish krona',
    'CAD - Canadian dollar',
    'CHF - Swiss franc',
  ]

  // const formToggle = () => {
  //   setToggle(true)
  // }
  useEffect(() => {
    getAllCountries()
    getProfileListingTypes()
  }, [])

  let dispatch = useDispatch()

  const inputChange = async (e) => {
    switch (e.target.name) {
      case 'f-name':
        setFirstName(e.target.value)
        setFirstNameValidation(false)

        break
      case 'l-name':
        setLastName(e.target.value)

        setLastNameValidation(false)

        break
    }
  }
  const phoneNumberHandler = async (phone) => {
    setPhoneNo(phone)
    setPhoneNoValidation(false)
  }
  const languageChange = async (e) => {
    setLanguage(e.target.value)
    setLanguageValidation(false)
  }
  const currencyChange = async (e) => {
    setCurrency(e.target.value)
    setCurrencyValidation(false)
  }

  const getProfileListingTypes = async () => {
    let country = []
    let currencyArray2 = []
    const response = await profileOverView(accessToken)
    if (response.status == true) {
      setLoader(true)
      setFirstName(response?.users?.first_name)
      setLastName(response?.users?.last_name)
      setPhoneNo(response?.users?.phone)

      currencyArray2.push(response?.users?.currency)

      if (response?.users?.location === null) {
        setAddress('')
      } else {
        setAddressObj(response?.users?.location)
        setAddress({
          label: response?.users?.location?.formatted_address,
          value: response?.users?.location?.formatted_address,
        })
      }

      // setAddress({
      //   value: response?.users?.location?.id,
      //   label: response?.users?.location?.country,
      // })
      setEmail(response?.users?.email)
      setUserName(response?.users?.username)
      setLanguage(response?.users?.language)
      setCurrency(currencyArray2[0])
      if (response?.users?.profile_image != null) {
        setSelectedImages(
          response?.users?.profile_image?.full_path + response?.users?.profile_image?.file_name
        )
        // setImagesForDB(response?.users?.profile_image?.full_path + response?.users?.profile_image?.file_name)
      }
      // setSelectedImages(response?.users?.profile_image)
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
          return x.id !== 39 && x.id !== 233
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
  const locationChange = async (e) => {
    setLocationValue(e)
    setLocationValidation(false)
  }

  const onSelectFile = async (event) => {
    // const imagesForDB = []
    console.log(event)
    const selectedFiles = event.target.files
    setImagesForDB(selectedFiles[0])
    // const blob = await selectedFiles.blob()
    // const url = URL.createObjectURL(blob)
    // const image = await new Image()
    // image.src = url
    setFile(selectedFiles[0])
    const selectedFilesArray = Array.from(selectedFiles)
    // console.log(event.target)
    // imagesForDB.push(selectedFiles)
    // setSelectedImages(image)
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })
    if (imagesArray !== undefined) {
      setCropImage(imagesArray)
      // setSelectedImages(imagesArray)
    }

    if (event.target.files.length !== 0) {
      setOpenCrop(true)
    }

    // // FOR BUG IN CHROME
    // event.target.value = ''
  }

  const SubmitForm = async () => {
    console.log('selectedDB', file)
    if (firstName == '' || firstName == undefined) {
      setFirstNameValidation(true)
    }
    if (lastName == '' || lastName == undefined) {
      setLastNameValidation(true)
    }
    if (PhoneNo == '' || PhoneNo == undefined || PhoneNo.length < 6 || PhoneNo == null) {
      setPhoneNoValidation(true)
    }
    if (address == '' || address == undefined || address.length < 1) {
      setLocationValidation(true)
    }
    if (language == '' || language == undefined) {
      setLanguageValidation(true)
    }
    if (currency == '' || currency == undefined) {
      setCurrencyValidation(true)
    }

    if (
      firstName != '' &&
      lastName != '' &&
      PhoneNo != '' &&
      address != '' &&
      language != '' &&
      currency != '' &&
      firstName != undefined &&
      lastName != undefined &&
      PhoneNo != undefined &&
      PhoneNo != null &&
      address != undefined &&
      language != undefined &&
      PhoneNo.length > 5 &&
      currency != undefined
    ) {
      setBtnLoader(true)

      const response = await updateProfile(
        firstName,
        lastName,
        PhoneNo,
        addressObj,
        language,
        currency,
        email,
        userName,
        file,
        accessToken,
        userID
      )

      if (response.status == true) {
        dispatch({
          type: 'PROFILE',
          payload: {
            selectedImages,
          },
        })
        setBtnLoader(false)
        navigate('/dashboard/my-account/overview')
      }

      // console.log(selectedImages[0])
    } else {
      setBtnLoader(false)
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
  return (
    <>
      {openCrop && (
        <Modal show={openCrop} onHide={modalClose}>
          <Modal.Header className='py-4' closeButton>
            <Modal.Title>Upload Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CropEasy {...{cropImg, setOpenCrop, setSelectedImages, setFile}} />
          </Modal.Body>
        </Modal>
      )}
      {loader ? (
        <div>
          <div
            style={{
              margin: '0px 20px',
            }}
          >
            <h1>Profile Details</h1>
            {/* <button
            className='bg-transparent'
            onClick={() => {
              formToggle()
            }}
          >
          </button> */}
          </div>
          <div className='d-flex justify-content-center'>
            <div className='image-input  image-input-outline' data-kt-image-input='true'>
              <div className='image-input-wrapper w-145px h-160px'>
                {selectedImages != null && selectedImages != undefined && selectedImages != '' ? (
                  <img src={selectedImages} alt='' id='' className='img-fluid w-100 h-100' />
                ) : (
                  <img src={profileImage} alt='' id='' className='img-fluid w-100 h-100' />
                )}
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
                  name='avatar'
                  accept='.jpg, .jpeg, .png, .svg, .webp, .mepg4, .avi, .wmv, .webm'
                  onChange={onSelectFile}
                />
                <input type='hidden' name='avatar_remove' />
              </label>
            </div>
          </div>
          {/*  */}
          {/* <div className=''>
            <div className='img-holder mb-10'>
              <label
                className=' rounded-circle text-center'
                htmlFor='input'
                style={{
                  width: '30px',
                  marginLeft: '130px',
                }}
              >
                <i className='bi bi-pencil-fill fs-4 cursor-pointer' />
              </label>

              {selectedImages != null && selectedImages != undefined && selectedImages != '' ? (
                <img src={selectedImages} alt='' id='img' className='img' />
              ) : (
                <img src={profileImage} alt='' id='img' className='img' />
              )}
            </div>
            <input
              type='file'
              accept='image/png , image/jpeg, image/webp'
              name='image-upload'
              id='input'
              onChange={onSelectFile}
            />
          </div> */}

          {/*  */}
          <div className=''>
            <div className='card-body border-top p-md-9'>
              <div className='row mb-2 mb-lg-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

                <div className='col-lg-8'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row mb-2 mb-md-0'>
                      <input
                        type='text'
                        name='f-name'
                        onChange={(e) => inputChange(e)}
                        value={firstName}
                        className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                        placeholder='John'
                      />
                      {firstNameValidation ? (
                        <div className='biz_owner_input_validation'>Enter first name</div>
                      ) : null}
                    </div>

                    <div className='col-lg-6 fv-row'>
                      <label className='col-lg-4 d-lg-none col-form-label required fw-bold fs-6'>
                        Last Name
                      </label>

                      <input
                        type='text'
                        name='l-name'
                        onChange={(e) => inputChange(e)}
                        value={lastName}
                        className='form-control form-control-lg form-control-solid'
                        placeholder='Doe'
                      />
                      {lastNameValidation ? (
                        <div className='biz_owner_input_validation'>Enter last name</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className='row mb-2 mb-lg-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Phone Number</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <PhoneInput country={'us'} value={PhoneNo} onChange={phoneNumberHandler} />
                  {PhoneNoValidation ? (
                    <div className='biz_owner_input_validation'>Enter correct phone number</div>
                  ) : null}
                </div>
              </div>

              <div className='row mb-2 mb-lg-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Address</span>
                </label>

                <div
                  className='col-lg-8 fv-row'
                  id='bgApi'
                  onClick={(e) => {
                    e.target.classList?.value == ` css-1uccc91-singleValue` ? setAddress('') : null
                  }}
                >
                  <GooglePlacesAutocomplete
                    fetchDetails={true}
                    minLength={2}
                    placeholder='Enter country'
                    apiKey='AIzaSyDcLGFU2zAn2rITMgtWVTkiGnuOPnqmtCU'
                    selectProps={{
                      value: address,

                      onChange: (e) => {
                        // console.log("first",e)
                        setAddress(e)
                        setAddressObj('')
                        setLocationValidation(false)
                      },

                      isClearable: true,
                    }}
                  />

                  {/* <Select options={allCountries} value={locationValue} onChange={locationChange} /> */}
                  {locationValidation ? (
                    <div className='biz_owner_input_validation'>Enter address</div>
                  ) : null}
                </div>
              </div>

              <div className='row mb-2 mb-lg-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Language</label>
                <div className='col-lg-8 fv-row'>
                  <select
                    onChange={(e) => {
                      languageChange(e)

                      // setZipCode('')
                      // setStreet('')
                    }}
                    // onChange={(e) => {
                    //   setLanguage(e.target.value), setLanguageValidation(false)
                    // }}
                    value={language}
                    className='form-select form-select-solid form-select-lg'
                  >
                    <option hidden>Select a Language...</option>
                    {Languages.map((LanguageOption, idx2) => (
                      <option value={LanguageOption} key={idx2}>
                        {LanguageOption}
                      </option>
                    ))}
                  </select>
                  {languageValidation ? (
                    <div className='biz_owner_input_validation'>Select language</div>
                  ) : null}
                </div>
              </div>

              {/* <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Time Zone</label>

                <div className='col-lg-8 fv-row'>
                  <select
                    onChange={(e) => setTimezone(e.target.value)}
                    defaultValue={timezone}
                    className='form-select form-select-solid form-select-lg'
                  >
                    <option value=''>Select a Timezone..</option>
                    {timezoneArray.map((timezoneArrayOption, idx4) => (
                      <option key={idx4}>{timezoneArrayOption}</option>
                    ))}
                  </select>
                </div>
              </div> */}

              <div className='row mb-2 mb-lg-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Currency</label>

                <div className='col-lg-8 fv-row'>
                  <select
                    onChange={(e) => currencyChange(e)}
                    value={currency}
                    className='form-select form-select-solid form-select-lg'
                  >
                    <option hidden>Select a currency..</option>
                    {currencyArray.map((currencyOption, idx4) => (
                      <option value={currencyOption} key={idx4}>
                        {currencyOption}
                      </option>
                    ))}
                  </select>
                  {currencyValidation ? (
                    <div className='biz_owner_input_validation'>Select currency</div>
                  ) : null}
                </div>
              </div>
              {/* 
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Communication</label>

                <div className='col-lg-8 fv-row'>
                  <div className='d-flex align-items-center mt-3'>
                    <label className='form-check form-check-inline form-check-solid me-5'>
                      <input
                        className='form-check-input'
                        checked={checkboxEmail}
                        onChange={(e) => setCheckboxEmail(e.target.value)}
                        // defaultValue={checkboxEmail}
                        name='communication[]'
                        type='checkbox'
                      />
                      <span className='fw-bold ps-2 fs-6'>Email</span>
                    </label>

                    <label className='form-check form-check-inline form-check-solid'>
                      <input
                        className='form-check-input'
                        onChange={(e) => setCheckboxPhone(e.target.value)}
                        defaultValue={checkboxPhone}
                        name='communication[]'
                        type='checkbox'
                      />
                      <span className='fw-bold ps-2 fs-6'>Phone</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className='row mb-0'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Allow Marketing</label>

                <div className='col-lg-8 d-flex align-items-center'>
                  <div className='form-check form-check-solid form-switch fv-row'>
                    <input
                      className='form-check-input w-45px h-30px'
                      type='checkbox'
                      id='allowmarketing'
                    />
                    <label className='form-check-label'></label>
                  </div>
                </div>
              </div> */}
            </div>

            <div className='card-footer d-flex justify-content-center justify-content-md-end py-6 px-md-9'>
              {btnLoader ? (
                <button
                  type='submit'
                  onClick={() => SubmitForm()}
                  className='btn btn-primary px-17'
                >
                  <img src={btnLoadder} alt='' style={{height: '20px'}} />
                </button>
              ) : (
                <button type='submit' onClick={() => SubmitForm()} className='btn btn-primary'>
                  Save Change
                </button>
              )}
            </div>
          </div>

          {/* //////////////////// SignIn Method/////////////// */}

          {/* <div>
          <div className='card mb-5 mb-xl-10 pt-0'>
            <div
              className='card-header border-0 cursor-pointer'
              role='button'
              data-bs-toggle='collapse'
              data-bs-target='#kt_account_signin_method'
            >
              <div className='card-title m-0'>
                <h3 className='fw-bolder m-0'>Sign-in Method</h3>
              </div>
            </div>

            <div id='kt_account_signin_method' className='collapse show'>
              <div className='card-body border-top p-9'>
                <div className='d-flex flex-wrap align-items-center'>
                  <div id='kt_signin_email' className={' ' + (showEmailForm && 'd-none')}>
                    <div className='fs-6 fw-bolder mb-1'>Email Address</div>
                    <div className='fw-bold text-gray-600'>Webicosoft@gmail.com</div>
                  </div>

                  <div
                    id='kt_signin_email_edit'
                    className={'flex-row-fluid ' + (!showEmailForm && 'd-none')}
                  >
                    <form id='kt_signin_change_email' className='form'>
                      <div className='row mb-6'>
                        <div className='col-lg-6 mb-4 mb-lg-0'>
                          <div className='fv-row mb-0'>
                            <label
                              htmlFor='emailaddress'
                              className='form-label fs-6 fw-bolder mb-3'
                            >
                              Enter New Email Address
                            </label>
                            <input
                              type='email'
                              className='form-control form-control-lg form-control-solid'
                              id='emailaddress'
                              placeholder='Email Address'
                            />
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='fv-row mb-0'>
                            <label
                              htmlFor='confirmemailpassword'
                              className='form-label fs-6 fw-bolder mb-3'
                            >
                              Confirm Password
                            </label>
                            <input
                              type='password'
                              className='form-control form-control-lg form-control-solid'
                              id='confirmemailpassword'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='d-flex'>
                        <button
                          id='kt_signin_submit'
                          type='submit'
                          className='btn btn-primary  me-2 px-6'
                        >
                          {!loading1 && 'Update Email'}
                          {loading1 && (
                            <span className='indicator-progress' style={{display: 'block'}}>
                              Please wait...{' '}
                              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                          )}
                        </button>
                        <button
                          id='kt_signin_cancel'
                          type='button'
                          onClick={() => {
                            setShowEmailForm(false)
                          }}
                          className='btn btn-color-gray-400 btn-active-light-primary px-6'
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>

                  <div
                    id='kt_signin_email_button'
                    className={'ms-auto ' + (showEmailForm && 'd-none')}
                  >
                    <button
                      onClick={() => {
                        setShowEmailForm(true)
                      }}
                      className='btn btn-light btn-active-light-primary'
                    >
                      Change Email
                    </button>
                  </div>
                </div>

                <div className='separator separator-dashed my-6'></div>

                <div className='d-flex flex-wrap align-items-center mb-10'>
                  <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
                    <div className='fs-6 fw-bolder mb-1'>Password</div>
                    <div className='fw-bold text-gray-600'>************</div>
                  </div>

                  <div
                    id='kt_signin_password_edit'
                    className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}
                  >
                    <form id='kt_signin_change_password' className='form' noValidate>
                      <div className='row mb-1'>
                        <div className='col-lg-4'>
                          <div className='fv-row mb-0'>
                            <label
                              htmlFor='currentpassword'
                              className='form-label fs-6 fw-bolder mb-3'
                            >
                              Current Password
                            </label>
                            <input
                              type='password'
                              className='form-control form-control-lg form-control-solid '
                              id='currentpassword'
                            />
                          </div>
                        </div>

                        <div className='col-lg-4'>
                          <div className='fv-row mb-0'>
                            <label htmlFor='newpassword' className='form-label fs-6 fw-bolder mb-3'>
                              New Password
                            </label>
                            <input
                              type='password'
                              className='form-control form-control-lg form-control-solid '
                              id='newpassword'
                            />
                          </div>
                        </div>

                        <div className='col-lg-4'>
                          <div className='fv-row mb-0'>
                            <label
                              htmlFor='confirmpassword'
                              className='form-label fs-6 fw-bolder mb-3'
                            >
                              Confirm New Password
                            </label>
                            <input
                              type='password'
                              className='form-control form-control-lg form-control-solid '
                              id='confirmpassword'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='form-text mb-5'>
                        Password must be at least 8 character and contain symbols
                      </div>

                      <div className='d-flex'>
                        <button
                          id='kt_password_submit'
                          type='submit'
                          className='btn btn-primary me-2 px-6'
                        >
                          {!loading2 && 'Update Password'}
                          {loading2 && (
                            <span className='indicator-progress' style={{display: 'block'}}>
                              Please wait...{' '}
                              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setPasswordForm(false)
                          }}
                          id='kt_password_cancel'
                          type='button'
                          className='btn btn-color-gray-400 btn-active-light-primary px-6'
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>

                  <div
                    id='kt_signin_password_button'
                    className={'ms-auto ' + (showPasswordForm && 'd-none')}
                  >
                    <button
                      onClick={() => {
                        setPasswordForm(true)
                      }}
                      className='btn btn-light btn-active-light-primary'
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      ) : (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{height: '50vh', width: '140%'}}
        >
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}
    </>
  )
}
