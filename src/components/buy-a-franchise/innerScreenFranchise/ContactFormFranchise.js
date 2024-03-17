import React, {useState, useEffect} from 'react'
import {AiFillWarning} from 'react-icons/ai'
import {Link, useNavigate} from 'react-router-dom'
import './ContactFormFranchise.css'
import {GrFacebookOption} from 'react-icons/gr'
import twitter from '../../../assets/icons/twitter.svg'
import insta from '../../../assets/icons/insta.svg'
import logo from '../../../assets/icons/logoP.svg'
import shareIcon from '../../../assets/icons/shareIcon.svg'
import phoneIcon from '../../../assets/icons/phone.svg'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ButtonLoader from '../../../assets/Loader/ButtonLoader.gif'
import Select from 'react-select'

import {postReport, getReportReason, requestFranchises} from '../../services/common-services'
import Swal from 'sweetalert2'
import {modalText} from '../../alert-text'
import {getCountries} from '../../services/get-fields-data'

const ContactFormFranchise = (props) => {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [fName, setFName] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [fNameValidation, setFNameValidation] = useState(false)
  const [fullNameValiDation, setFullNameValidation] = useState(false)
  const [phoneValidation, setPhoneValidation] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)
  const [reportEmailValidation, setReportEmailValidation] = useState(false)
  const [messageValidation, setMessageValidation] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [fullName, setFullName] = useState('')
  const [reason, setReason] = useState('')
  const [reasonData, setReasonData] = useState([])
  const [information, setInformation] = useState('')
  const [reportEmail, setReportEmail] = useState('')
  const [isContinueBtn, setIsContinueBtn] = useState(false)
  const [reasoneValidation, setReasoneValidation] = useState(false)
  const [informationValidation, setInformationValidation] = useState(false)
  const userData = localStorage.getItem('userData')

  const getReasonForReport = async () => {
    const response = await getReportReason()

    if (response.status == true) {
      setReasonData(response.reportReason)
    }
  }
  const transformedData = userData ? JSON?.parse(userData) : ''
  const {role} = transformedData
  useEffect(() => {
    getReasonForReport()
    if (transformedData) {
      setReportEmail('null.com')
      setFullName('null')
    }
  }, [])
  const inputChange = async (event) => {
    switch (event.target.name) {
      case 'user-name':
        setUserName(event.target.value)
        setUserForm(false)
        break
      case 'first-name':
        setFirstName(event.target.value)
        setFirstNameForm(false)
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

  ///////////////////////////////////left form start...............

  ///////////////////////////////////Starting///////////////////////////

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

  const [timeFrames, setTimeFrames] = useState('')
  const [cash, setCash] = useState('')
  const [states, setStates] = useState('')

  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')

  const [phoneN, setPhoneN] = useState('')
  const [zipCode, setZipCode] = useState('')

  useEffect(() => {
    const userRequestData = localStorage.getItem('franchiseRequestUserRecord')
    const transformedUserRequestData = JSON?.parse(userRequestData)
    if (transformedUserRequestData !== null) {
      const {firstName, lastName, email, phone, zipCode, capital, time, location} =
        transformedUserRequestData ?? ''
      setUserName(firstName)
      setFirstName(lastName)
      setPhoneN(phone)
      setPhone(phone)
      setZipCode(zipCode)
      setEmail(email)
      setCash(capital)
      setTimeFrames(time)
      setStates({value: 999999999, label: location})
    }
    getAllCountries()
  }, [])
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
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const SearchRequests = async (e) => {
    let franchiesID = [props?.data[0]?.id]
    if (userName.length < 2 || userName == '' || userName == undefined) {
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
      userName !== '' &&
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
        userName,
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
            firstName: userName,
            lastName: firstName,
            email: email,
            phone: phoneN,
            zipCode: zipCode,
            capital: cash,
            time: timeFrames,
            location: states?.label,
          })
        )

        let franchiseContactId = []

        const localStorageFranchiseContactId = localStorage.getItem('franchiseContactId')
        const transformedFranchiseContactId = JSON?.parse(localStorageFranchiseContactId)

        if (transformedFranchiseContactId) {
          franchiseContactId = transformedFranchiseContactId.franchiseContactId
        }

        function checkAdult(age) {
          return age === props.data[0].id
        }
        let valueCom = franchiseContactId.some(checkAdult)

        if (valueCom === false) {
          franchiseContactId.push(props.data[0].id)

          localStorage.setItem(
            'franchiseContactId',
            JSON.stringify({
              franchiseContactId: franchiseContactId,
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
          navigate('/similar-franchises', {state: {id: 1, data: response.samilerFranchise}})
        })
      }
    }
  }
  //////////////////End form............

  //////////////////formvalidation///////////////
  const [userForm, setUserForm] = useState(false)
  const [firstNameForm, setFirstNameForm] = useState(false)
  const [emailForm, setEmailForm] = useState(false)

  const [phoneNForm, setPhoneNForm] = useState(false)
  const [zipCodeForm, setZipCodeForm] = useState(false)
  const [cashForm, setCashForm] = useState(false)
  const [timeFramesForm, setTimeFramesForm] = useState(false)
  const [statesForm, setStatesForm] = useState(false)

  // setZipCodeForm(false)
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
  const phoneNumberHandler = async (phone) => {
    await setPhoneN(phone)
    await setPhoneNForm(false)
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
  ///////////////////////////////////left form end...............
  const changeMultiSelectHandler = (e) => {
    setStates(e)
    setStatesForm(false)
  }
  return (
    <>
      <div className='container biz-owner-contact-box px-1 mx-0 ms-md-auto mt-6 mt-md-18'>
        <h3
          className=''
          style={{
            paddingLeft: '20px',
            color: '#00a3ef',
          }}
        >
          Franchise Request
        </h3>
        <h6 className='card-text pt-7 '>
          <div className='col-12 px-3'>
            <div
              className='col-12'
              style={{
                marginTop: '1px',
              }}
            >
              <input
                type='text'
                className='form-control  form-control-solid '
                onChange={(e) => inputChange(e)}
                name='user-name'
                value={userName}
                style={{
                  marginRight: '0px',
                }}
                placeholder='John'
                aria-label='Username'
                aria-describedby='basic-addon1'
              />
              {userForm ? (
                <div className=' ms-3  myError'>
                  <small className='fw-lighter text-start'>Enter first name</small>
                </div>
              ) : null}

              <div className='d-flex col-12'></div>
            </div>
          </div>
          <div className='col-12 mt-4  px-3'>
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
                aria-label='Username'
                aria-describedby='basic-addon1'
                required
              />
              {firstNameForm ? (
                <div className='myError'>
                  <small className='fw-lighter text-start'>Enter last name</small>
                </div>
              ) : null}
            </div>
          </div>
          <div
            className=''
            style={{
              marginTop: '0px',
              padding: '9px 10px 2px 10px',
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
                <small className='fw-lighter'>Invalid email address </small>
              </div>
            ) : null}
            <div className='mt-4'>
              {/* <input
                type='number'
                placeholder='Phone Number'
                className='form-control form-control-lg form-control-solid'
                name='phone'
                value={phone}
                onChange={(e) => onInputChange(e)}
                required
              /> */}
              {/* <PhoneInput
                country={'us'}
                enableSearch={true}
                value={phoneN}
                onChange={(phone) => phoneNumberHandler(phone)}
              /> */}

              <PhoneInput country={'us'} value={phone} onChange={phoneNumberHandler} />
            </div>
            {phoneNForm ? (
              <div className='d-flex align-items-start myError'>
                <br />
                <small className='fw-lighter'> Enter correct phone number</small>
              </div>
            ) : null}
            <input
              type='number'
              className='form-control  form-control-solid  '
              maxLength={6}
              onChange={(e) => inputChange(e)}
              name='zip-code'
              id='quantity'
              // onChange={(e) => setZipCode(e.target.value)}
              value={zipCode}
              style={{
                marginTop: '13px',
              }}
              placeholder='Zip Code'
            />
            {zipCodeForm ? (
              <div className='d-flex myError'>
                <small className='fw-lighter text-start'>
                  {' '}
                  {zipCode == '' || zipCode == undefined
                    ? 'Enter zip code'
                    : 'Enter valid zip code'}{' '}
                </small>
              </div>
            ) : null}
            <select
              className='form-select form-select-solid'
              onChange={CapitalFunction}
              // onChange={(e) => setCash(e.target.value)}
              placeholder='Available Capital'
              value={cash}
              style={{
                marginTop: '13px',
              }}
              aria-label='Select example'
            >
              {/* <option>Available Capital</option> */}
              <option hidden>Available Capital</option>
              {/* <option label='Select time frame'></option> */}

              {optionsCash.map((optionCash, idx3) => (
                <option key={idx3}>{optionCash}</option>
              ))}
            </select>
            {cashForm ? (
              <div className='d-flex myError'>
                <br />
                <small className='fw-lighter text-start'>Select capital</small>
              </div>
            ) : null}
            <select
              className='form-select form-select-solid'
              onChangeCapture={TimeFramesFunction}
              // onChange={(e) => setTimeFrames(e.target.value)}
              value={timeFrames}
              style={{
                marginTop: '13px',
              }}
              aria-label='Select example'
            >
              {/* <option>Time Frame to Invest</option> */}
              {/* <option label='Select time frame'></option> */}
              <option hidden>Select Time Frame</option>

              {timeFrame.map((optionTimeFrame, idx3) => (
                <option key={idx3}>{optionTimeFrame}</option>
              ))}
            </select>
            {timeFramesForm ? (
              <div className='d-flex align-items-start myError'>
                <small className='fw-lighter text-start'>Select time frame</small>
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
            {statesForm ? (
              <div className='d-flex align-items-start myError'>
                <small className='fw-lighter text-start'>Select location</small>
              </div>
            ) : null}
          </div>
        </h6>
        {isContinueBtn ? (
          <span
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
          </span>
        ) : (
          <button
            className='btn btn-primary py-2 py-md-4'
            style={{
              //////////
              width: '93%',
              marginTop: '15px',
              marginLeft: '10px',
              marginBottom: '5px',
              // padding: '14px',
              fontSize: '14px',
              boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
              borderRadius: '30px',
              border: 'none',
            }}
            // title='Hi, are you interested to buy'

            onClick={() => (role == 'agent' ? agentAlertHandler() : SearchRequests())}
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

      {/* <div className='container biz-owner-contact-box px-10 mx-0 ms-auto mt-8'>
        <div className='row'>
          <div className='    '>
            <div className='col-12  text-center '>
              <h3 className=''>
                <span>
                  <img src={shareIcon} alt='' />
                </span>
                Share this Business
              </h3>

              <div className='pt-4'>
                <span className='social-media-icons cursor-pointer pe-2'>
                  <GrFacebookOption size={20} color='#1D56D3' />
                </span>
                <span className='social-media-icons cursor-pointer px-2'>
                  <img src={insta} alt='' width={20} />
                </span>
                <span className='social-media-icons cursor-pointer px-2'>
                  <img src={twitter} alt='' width={21} />
                </span>
                <span className='cursor-pointer px-2'>
                  <img src={logo} alt='' width={18} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default ContactFormFranchise
