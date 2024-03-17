import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
//

import {contactBroker} from '../../services/broker-services/Index'
import ButtonLoader from '../../../assets/Loader/ButtonLoader.gif'
import './ContactForm.css'
import {modalText} from '../../alert-text'
const SingleBrokerContact = (props) => {
  const [phone, setPhone] = useState('')
  const [fName, setFName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(
    " Hey, I just found your profile as a business broker, I'm interested in selling my business/franchise. If you can contact me at your convenience, that would be great."
  )
  const [isContinueBtn, setIsContinueBtn] = useState(false)
  //  validations
  const [emailValidation, setEmailValidation] = useState(false)
  const [fNameValidation, setFNameValidation] = useState(false)
  const [phoneValidation, setPhoneValidation] = useState(false)
  const [messageValidation, setMessageValidation] = useState(false)

  const [brokerContactFilter, setBrokerContactFilter] = useState([])
  const tokenData = localStorage.getItem('userData')
  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData
  const inputChange = async (e) => {
    switch (e.target.name) {
      case 'fName':
        await setFName(e.target.value)
        setFNameValidation(false)
        break

      case 'email':
        await setEmail(e.target.value)
        setEmailValidation(false)
        break

      case 'message':
        await setMessage(e.target.value)
        setMessageValidation(false)

        break
    }
  }
  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const contactBrokers = async (e, item) => {
    if (phone == '' || phone == undefined || phone.length < 6) {
      setPhoneValidation(true)
    }
    if (email == '' || email == undefined || !isValidEmail(email)) {
      setEmailValidation(true)
    }
    if (message == '' || message == undefined) {
      setMessageValidation(true)
    }
    if (fName == '' || fName == undefined) {
      setFNameValidation(true)
    }
    if (
      phone !== '' &&
      email !== '' &&
      fName !== '' &&
      message !== '' &&
      message !== undefined &&
      phone.length > 5 &&
      isValidEmail(email)
    ) {
      setIsContinueBtn(true)
      const response = await contactBroker(
        fName,
        email,
        phone,
        brokerContactFilter,
        props?.data[0]?.user?.id,
        message
      )
      console.log(props?.data[0]?.user?.id)
      if (response.status == true) {
        setIsContinueBtn(false)
        // let businessContactId = []
        const resultRemove = await Swal.fire({
          text: 'Your email to the broker has been sent. Thank you for using BizOwnerSell.',
          icon: 'success',
          confirmButtonColor: '#009ef7',
          reverseButtons: true,
        })
        setFName('')
        setEmail('')
        setPhone('')
        setMessage('')
        setBrokerContactFilter('')
      }
    }
  }

  const phoneNumberHandler = async (phone) => {
    await setPhone(phone)
    await setPhoneValidation(false)
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
        className='container biz-owner-contact-box px-md-11 mx-0 ms-md-auto mt-5 mt-md-15'
        //  style={{position: 'sticky', top: '6rem'}}
      >
        <div className='row px-3 px-md-0 pt-2'>
          <div className='biz-owner-contact-heading mb-5 px-0'>
            <h3 className='mb-5 biz-owner-listed-by-title' style={{fontSize: '20px'}}>
              Contact Broker
            </h3>
          </div>
          <div className='col-12 px-0'>
            <input
              type='text'
              name='fName'
              value={fName}
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
            <select
              name=''
              id=''
              className='form-select form-select-solid'
              value={brokerContactFilter}
              onChange={(e) => setBrokerContactFilter(e.target.value)}
            >
              <option hidden>I am..</option>

              <option value='Looking to buy a business'>Looking to buy a business</option>
              <option value='Looking to sell a business'>Looking to sell a business</option>
            </select>
          </div>

          <div className='col-12 mt-4 px-0 '>
            <textarea
              className='form-control form-control-solid pb-10'
              name='message'
              value={message}
              rows='5'
              placeholder='Message...'
              onChange={(e) => inputChange(e)}
            />
            {messageValidation ? (
              <div className='biz_owner_input_validation'>Enter message</div>
            ) : null}
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
                onClick={() => (role == 'agent' ? agentAlertHandler() : contactBrokers())}
              >
                Submit
              </Link>
            )}

            <p className='my-4 biz-owner-submit-btn-message'>
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
    </>
  )
}

export default SingleBrokerContact
