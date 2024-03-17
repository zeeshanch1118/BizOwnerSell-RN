import React, {useEffect, useState} from 'react'
// import '../../components/sidebar/selling/create-app/steps/Step3/billingDetails.css'
import ButtonLoader from '../../../../../../../assets/Loader/ButtonLoader.gif'

// ;('../../../../assets/Loader/ButtonLoader.gif')
import MainScreenLoader from '../../../../../../../assets/Loader/MainScreenLoader.gif'

// import '../../components/BuyBizzOwner.css'
import 'react-phone-input-2/lib/style.css'
// import {choosePlan, payment} from '../../components/services/business-services'
import {loadStripe} from '@stripe/stripe-js'
import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js'
import './billingDetails.css'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import {payment} from '../../../../../../../components/services/business-services'
import {
  brokerPayment,
  chooseBrokerPlan,
} from '../../../../../../../components/services/broker-services/Index'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51LY7AYJl7h5bmLPxUJWAICVGmp5wvTq1kiKXT0dX0rDUKfUPIC7jE8Wey7wBtRZCrggl8uP1q9bYXokufEom4DWS00SliyEUsL'
)
const BillingDetails = (props) => {
  const planSlug = localStorage.getItem('slug')

  const [isContinue, setIsContinue] = useState(false)
  const planPrice = localStorage.getItem('price')
  const planID = localStorage.getItem('planId')
  const stripe_plan = localStorage.getItem('plan')
  const location = useLocation()
  let token
  if (location?.state) {
    const data = localStorage.getItem('BrokerAuth')
    const {accessToken} = JSON.parse(data || '')
    token = accessToken
  } else {
    token = localStorage.getItem('brokerID')
  }
  const [key, setKey] = useState('')
  useEffect(() => {
    getUserKey()
    window.scrollTo(0, 0)
  }, [])
  const getUserKey = async () => {
    if (
      planSlug != '' &&
      planSlug != null &&
      planSlug != undefined &&
      planPrice != '' &&
      planPrice != null &&
      planPrice != undefined
    ) {
      const response = await chooseBrokerPlan(planSlug, token)
      if (response.status == true) {
        setKey(response?.intent?.client_secret)
        setIsContinue(true)
      }
    }
  }

  useEffect(() => {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script')
      s.id = 'stripe-script'
      s.type = 'text/javascript'
      s.src = 'https://js.stripe.com/v2/'
      s.onload = () => {
        window['Stripe'].setPublishableKey(
          'pk_test_51LY7AYJl7h5bmLPxUJWAICVGmp5wvTq1kiKXT0dX0rDUKfUPIC7jE8Wey7wBtRZCrggl8uP1q9bYXokufEom4DWS00SliyEUsL'
        )
      }
      window.document.body.appendChild(s)
    }
  }, [])

  const CheckoutForm = () => {
    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState(null)
    const [cardComplete, setCardComplete] = useState(false)
    const [phoneValidation, setPhoneValidation] = useState(false)
    const [phoneValidationValue, setPhoneValidationValue] = useState('')
    const [nameValidation, setNameValidation] = useState(false)
    const [emailValidation, setEmailValidation] = useState(false)
    const [emailValidationValue, setEmailValidationValue] = useState('')
    const [btnLoader, setBtnLoader] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [couponCode, setCouponCode] = useState('')
    const [couponExist, setCouponExist] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [billingDetails, setBillingDetails] = useState({
      email: '',
      phone: '',
      name: '',
    })

    let newToken
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    function isValidEmail(email) {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
    const handleSubmit = async (event) => {
      event.preventDefault()

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return
      }
      if (error) {
        elements.getElement('card').focus()
        return
      }
      if (cardComplete) {
        setProcessing(true)
      }
      if (billingDetails.phone == '' || billingDetails.phone == undefined) {
        setPhoneValidation(true)
        setPhoneValidationValue('Enter phone number')
      } else if (billingDetails.phone.length < 7) {
        setPhoneValidationValue('Enter valid number')
        setPhoneValidation(true)
      }
      if (billingDetails.email == '' || billingDetails.email == undefined) {
        setEmailValidation(true)
        setEmailValidationValue('Enter email')
      } else if (!isValidEmail(billingDetails?.email)) {
        setEmailValidation(true)
        setEmailValidationValue('Enter valid email')
      }
      if (billingDetails.name == '' || billingDetails.name == undefined) {
        setNameValidation(true)
      }
      if (
        billingDetails.phone != '' &&
        billingDetails.phone != undefined &&
        billingDetails.phone.length > 6 &&
        billingDetails.email != '' &&
        billingDetails.email != undefined &&
        isValidEmail(billingDetails?.email) &&
        billingDetails.name != '' &&
        cardComplete == true &&
        billingDetails.name != undefined
      ) {
        setBtnLoader(true)

        const payload = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
          billing_details: billingDetails,
        })
        if (payload.error) {
          setBtnLoader(false)
          setError(payload.error)
        }
        try {
          stripe.createToken(elements.getElement(CardElement)).then((payload) => {
            newToken = payload
            pay()
          })
        } catch (error) {
          console.log('token error', error)
          setBtnLoader(false)
        }
        setProcessing(false)
        const pay = async () => {
          const response = await brokerPayment(
            newToken,
            planID,
            payload.paymentMethod.id,
            key,
            couponCode,
            stripe_plan,
            token
          )
          console.log('response', response)
          if (response.status == true) {
            const successPayment = await Swal.fire({
              allowOutsideClick: false,
              title: 'Success',
              text: 'Payment completed successfully',
              icon: 'success',
              confirmButtonColor: '#009ef7',
              confirmButtonText: 'Ok',
            })
            if (successPayment.isConfirmed) {
              //   setBtnLoader(false)
              navigate('/auth/login')
            }
          } else {
            const resultRemove = await Swal.fire({
              allowOutsideClick: false,
              title: 'error',
              text: response.message,
              icon: 'error',

              confirmButtonColor: '#009ef7',

              confirmButtonText: 'Ok',
            })
            setBtnLoader(false)
          }
        }
      }
    }

    return (
      <div className='row'>
        <div className='col-md-6 mb-2'>
          <label className='form-label required'>Name</label>
          <input
            id='name'
            className='form-control form-control-lg form-control-solid'
            type='text'
            placeholder='John Doe'
            required
            autoComplete='name'
            value={billingDetails.name}
            onChange={(e) => {
              setNameValidation(false)
              setBillingDetails({...billingDetails, name: e.target.value})
            }}
          />
          {nameValidation ? <div className='biz_owner_input_validation'>Enter name</div> : null}
        </div>
        <div className='col-md-6 mb-2'>
          <label className='form-label required'>Email</label>
          <input
            id='email'
            type='email'
            className='form-control form-control-lg form-control-solid'
            placeholder='Johndoe@email.com'
            required
            autoComplete='email'
            value={billingDetails.email}
            onChange={(e) => {
              setEmailValidation(false)
              setBillingDetails({...billingDetails, email: e.target.value})
            }}
          />
          {emailValidation ? (
            <div className='biz_owner_input_validation'>{emailValidationValue}</div>
          ) : null}
        </div>
        <div className='col-md-6 mb-2 mt-3'>
          <label className='form-label required'>Phone</label>
          <input
            id='phone'
            type='number'
            className='form-control form-control-lg form-control-solid'
            placeholder='+1(453)123-4567'
            required
            autoComplete='tel'
            maxLength={15}
            value={billingDetails.phone}
            onChange={(e) => {
              setPhoneValidation(false)
              if (e.target.value.length > e.target.maxLength) {
                e.target.value = e.target.value.slice(0, e.target.maxLength)
              }
              setBillingDetails({...billingDetails, phone: e.target.value})
            }}
          />
          {phoneValidation ? (
            <div className='biz_owner_input_validation'>{phoneValidationValue}</div>
          ) : null}
        </div>
        <div className='col-md-6 mb-2 mt-3'>
          <label className='form-label required'>Card</label>
          <CardElement
            placeholder='Card Number'
            className='biz-owner-card-input'
            onChange={(e) => {
              setError(e.error)

              setCardComplete(e.complete)
            }}
          />
        </div>

        <div className='col-md-6  mb-2 mt-3'>
          {!couponExist && (
            <p className='text-primary cursor-pointer' onClick={() => setCouponExist(true)}>
              Are you have coupon?
            </p>
          )}

          {couponExist && (
            <>
              <label className='form-label'>Coupon Code</label>
              <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                placeholder='Enter Coupon Code'
                required
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value)
                }}
              />{' '}
            </>
          )}
        </div>
        <div className='mt-5 d-flex justify-content-end'>
          {btnLoader ? (
            <span
              // onClick={handleSubmit}
              className='btn btn-primary'
              disabled={!stripe}
            >
              <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
            </span>
          ) : (
            <span onClick={handleSubmit} className='btn btn-primary ' disabled={!stripe}>
              Pay now
            </span>
          )}
        </div>
      </div>
    )
  }
  // <span
  //   onClick={() => props.billingDetailStep3()}
  //   className='btn btn-primary '
  //   disabled={!stripe}
  // >
  return (
    <>
      {/* {isContinue ? ( */}
      <div className='container px-md-10 py-10'>
        <div className='row'>
          <div className='my-5'>
            {/* <h2 className=' bizOwner-add-new-listing-heading'>Payment details</h2> */}
          </div>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      {/* ) : (
        <div className='d-flex justify-content-center align-items-top' style={{height: '100vh'}}>
          <div>
            <img src={MainScreenLoader} alt="BizOwnerSell" width="80" height="80" />
          </div>
        </div>
      )} */}
    </>
  )
}

export default BillingDetails
