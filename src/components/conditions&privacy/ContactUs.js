import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {getContactReasons, postContactUs} from '../services/contactus'
import Swal from 'sweetalert2'
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
const ContactUs = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [reason, setReason] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [comments, setComments] = useState('')
  const [isLoader, setIsLoader] = useState(false)
  const [allReasons, setAllReasons] = useState([])

  const [nameValidation, setNameValidation] = useState(false)
  const [reasonValidation, setReasonValidation] = useState(false)
  const [companyValidation, setCompanyValidation] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)
  const [phoneValidation, setPhoneValidation] = useState(false)
  const [commentsValidation, setCommentsValidation] = useState(false)

  useEffect(() => {
    getReasons()
  }, [])

  const getReasons = async () => {
    let mapReasons = []
    try {
      const result = await getContactReasons()
      if (result.status === true) {
        result?.contact_reason?.map((item, index) =>
          mapReasons.push({value: item.id, label: item.name})
        )
        setAllReasons(mapReasons)
      }
    } catch (err) {
      console.log('getCountries err', err)
    }
  }

  const handelReasons = async (e) => {
    setReason(e)
    setReasonValidation(false)
  }
  const contactUs = async () => {
    if (name == '' || name == undefined) {
      setNameValidation(true)
    }
    if (reason == '' || reason == undefined) {
      setReasonValidation(true)
    }
    if (company == '' || company == undefined) {
      setCompanyValidation(true)
    }
    if (email == '' || email == undefined) {
      setEmailValidation(true)
    } else if (!isValidEmail(email)) {
      setEmailValidation(true)
    }
    if (phone == '' || phone == undefined) {
      setPhoneValidation(true)
    } else if (phone.length > 14) {
      setPhoneValidation(true)
    }

    if (comments == '' || comments == undefined) {
      setCommentsValidation(true)
    }
    if (
      name !== '' &&
      name !== undefined &&
      reason !== '' &&
      reason !== undefined &&
      company !== '' &&
      company !== undefined &&
      email !== '' &&
      email !== undefined &&
      phone !== '' &&
      phone !== undefined &&
      comments !== '' &&
      comments !== undefined &&
      isValidEmail(email) !== false &&
      phone.length < 15
    ) {
      try {
        setIsLoader(true)
        const result = await postContactUs(name, reason.value, company, email, phone, comments)
        if (result.status === true) {
          setIsLoader(false)
          const messageSent = await Swal.fire({
            allowOutsideClick: false,
            title: 'Success',
            text: 'Thank you! We received your message and will get back to you as soon as we can!',
            icon: 'success',
            confirmButtonColor: '#009ef7',
            confirmButtonText: 'Ok',
          })
          if (messageSent.isConfirmed) {
            navigate('/')
          }

          setName('')
          setReason('')
          setCompany('')
          setEmail('')
          setPhone('')
          setComments('')
        } else {
          setIsLoader(false)
          Swal.fire({
            allowOutsideClick: false,
            title: 'error',
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonColor: '#009ef7',
            confirmButtonText: 'Ok',
          })
        }
      } catch (err) {
        console.log('getCountries err', err)
      }
    }
  }
  const handelOnchanges = async (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value)
        setNameValidation(false)
        break
      case 'company':
        setCompany(e.target.value)
        setCompanyValidation(false)
        break
      case 'email':
        setEmail(e.target.value)
        setEmailValidation(false)
        break
      case 'phone':
        setPhone(e.target.value)
        if (e.target.value.length > e.target.maxLength) {
          e.target.value = e.target.value.slice(0, e.target.maxLength)
        }
        setPhoneValidation(false)

        break
      case 'comments':
        setComments(e.target.value)
        setCommentsValidation(false)
        break
    }
  }
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  return (
    <React.Fragment>
      <div className='container my-5'>
        <div className='row'>
          <div className='col'>
            <h2>Send Us Your Questions and Feedback</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 mt-5'>
            <div className='my-2'>
              <label className='form-label required '>Select reason</label>

              <Select
                type='search'
                options={allReasons}
                placeholder='Select Reason'
                value={reason}
                onChange={handelReasons}
              />

              {reasonValidation ? (
                <div className='biz_owner_input_validation'>Select reason</div>
              ) : null}
            </div>
            <div className='my-2'>
              <label className='form-label required '>Full Name</label>

              <input
                type='text'
                placeholder='John Don'
                className='form-control form-control-lg form-control-solid'
                name='name'
                value={name}
                onChange={(e) => handelOnchanges(e)}
                required
              />
              {nameValidation ? <div className='biz_owner_input_validation'>Enter name</div> : null}
            </div>
            <div className='my-2'>
              <label className='form-label required '>Company</label>

              <input
                type='text'
                placeholder='Company Name'
                className='form-control form-control-lg form-control-solid'
                name='company'
                value={company}
                onChange={(e) => handelOnchanges(e)}
                required
              />
              {companyValidation ? (
                <div className='biz_owner_input_validation'>Enter company name</div>
              ) : null}
            </div>
            <div className='my-2'>
              <label className='form-label required '>Email</label>

              <input
                type='email'
                placeholder='john@gmail.com'
                className='form-control form-control-lg form-control-solid'
                name='email'
                value={email}
                onChange={(e) => handelOnchanges(e)}
                required
              />
              {emailValidation ? (
                <div className='biz_owner_input_validation'>Enter valid mail</div>
              ) : null}
            </div>
            <div className='my-2'>
              <label className='form-label required '>Phone Number</label>

              <input
                type='number'
                placeholder='+1256347378'
                className='form-control form-control-lg form-control-solid'
                name='phone'
                value={phone}
                onChange={(e) => handelOnchanges(e)}
                required
                maxLength={14}
                minlength={7}
              />
              {phoneValidation ? (
                <div className='biz_owner_input_validation'>Enter valid phone number</div>
              ) : null}
            </div>
            <div className='my-2'>
              <label className='form-label required '>Comments</label>

              <textarea
                type='text-area'
                placeholder='Comments here'
                className='form-control form-control-lg form-control-solid'
                name='comments'
                value={comments}
                onChange={(e) => handelOnchanges(e)}
                required
              />
              {commentsValidation ? (
                <div className='biz_owner_input_validation'>Enter comments</div>
              ) : null}
            </div>

            <div className=' mt-5 d-flex justify-content-end'>
              <button type='button' className='btn btn-primary' onClick={() => contactUs()}>
                {!isLoader && <span className='indicator-label'>Contact Us</span>}
                {isLoader && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className='col-md-6 mt-5 ' style={{paddingLeft: '15%'}}>
            <p>
              Customer Success <rb />
              (888) 777-9893
            </p>
            <p>
              Franchise Advertising Network <br />
              (844) 495-3091
            </p>
            <p>Monday - Friday 8am to 5pm, Pacific Time</p>
            <b>Location</b>
            <p>
              BizOwnerSell.com <br />
              101 California St, 43rd Floor
              <br />
              San Francisco, CA 94111
              <br />
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ContactUs
