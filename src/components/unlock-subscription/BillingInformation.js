import React, {useEffect, useState} from 'react'
import '../../components/sidebar/selling/create-app/steps/Step3/billingDetails.css'
import ButtonLoader from '../../assets/Loader/ButtonLoader.gif'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'

import '../../components/BuyBizzOwner.css'
import 'react-phone-input-2/lib/style.css'
import {choosePlan, payment} from '../../components/services/business-services'
import {loadStripe} from '@stripe/stripe-js'
import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js'
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import {brokerPayment} from '../services/broker-services/Index'

const ResetButton = ({onClick}) => (
  <button type='button' className='ResetButton' onClick={onClick}>
    <svg width='32px' height='32px' viewBox='0 0 32 32'>
      <path
        fill='#FFF'
        d='M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z'
      />
    </svg>
  </button>
)
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51LY7AYJl7h5bmLPxUJWAICVGmp5wvTq1kiKXT0dX0rDUKfUPIC7jE8Wey7wBtRZCrggl8uP1q9bYXokufEom4DWS00SliyEUsL'
)
const BillingInformation = (props) => {
  const planSlug = localStorage.getItem('slug')
  const [isContinue, setIsContinue] = useState(false)
  const planPrice = localStorage.getItem('price')
  const planID = localStorage.getItem('planId')
  const stripe_plan = localStorage.getItem('plan')

  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const {accessToken} = transformedData
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
      const response = await choosePlan(planSlug, accessToken)
      if (response.status == true) {
        setKey(response?.intent?.client_secret)
        setIsContinue(true)
      }
    }
  }
  const billingDetailStep3 = async (e) => {
    e.preventDefault()
  }
  // const submitPayment = async () => {
  //   const response = await payment(newToken, planID, key, accessToken)
  //   console.log(response)
  // }
  // step back

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
    const [nameValidation, setNameValidation] = useState(false)
    const [emailValidation, setEmailValidation] = useState(false)
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

    // const [newToken, setNewToken] = useState('')
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
      // props.billingDetailStep3()

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
      if (
        billingDetails.phone == '' ||
        billingDetails.phone == undefined ||
        billingDetails.phone.length < 7
      ) {
        setPhoneValidation(true)
      }
      if (
        billingDetails.email == '' ||
        billingDetails.email == undefined ||
        !isValidEmail(billingDetails.email)
      ) {
        setEmailValidation(true)
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
        isValidEmail(billingDetails.email) &&
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
        } else {
          // setBtnLoader(false)
        }
        try {
          stripe.createToken(elements.getElement(CardElement)).then((payload) => {
            newToken = payload
            pay()
          })
        } catch (error) {
          console.log('token error', error)
        }

        setProcessing(false)
        const pay = async () => {
          console.log('props?.forBrokerprops?.forBrokerprops?.forBroker', props?.forBroker)
          if (props?.forBroker == 'ShowBrokerPackage') {
            const response = await brokerPayment(
              newToken,
              planID,
              payload.paymentMethod.id,
              key,
              couponCode,
              stripe_plan,
              accessToken
            )

            if (response.status == true) {
              if (props?.forBroker == 'ShowBrokerPackage') {
                props.updateModalTitle('close')
                const resultRemove = await Swal.fire({
                  allowOutsideClick: false,
                  title: 'Success',
                  text: 'Payment completed successfully',
                  icon: 'success',
                  confirmButtonColor: '#009ef7',

                  confirmButtonText: 'Ok',
                })
                if (resultRemove.isConfirmed) {
                  //   setBtnLoader(false)

                  props.paymentDetails()
                }
              } else {
                const resultRemove = await Swal.fire({
                  allowOutsideClick: false,
                  title: 'Success',
                  text: 'Payment completed successfully',
                  icon: 'success',
                  confirmButtonColor: '#009ef7',

                  confirmButtonText: 'Ok',
                })
                if (resultRemove.isConfirmed) {
                  //   setBtnLoader(false)
                  props.updateModalTitle('close', 'fetch')
                }
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
          } else {
            const response = await payment(
              newToken,
              planID,
              payload.paymentMethod.id,
              key,
              couponCode,
              stripe_plan,
              '',
              '',
              accessToken
            )

            if (response.status == true) {
              if (props?.forBroker == 'ShowBrokerPackage') {
                props.updateModalTitle('close')
                const resultRemove = await Swal.fire({
                  allowOutsideClick: false,
                  title: 'Success',
                  text: 'Payment completed successfully',
                  icon: 'success',
                  confirmButtonColor: '#009ef7',

                  confirmButtonText: 'Ok',
                })
                if (resultRemove.isConfirmed) {
                  //   setBtnLoader(false)

                  props.paymentDetails()
                }
              } else {
                const resultRemove = await Swal.fire({
                  allowOutsideClick: false,
                  title: 'Success',
                  text: 'Payment completed successfully',
                  icon: 'success',
                  confirmButtonColor: '#009ef7',

                  confirmButtonText: 'Ok',
                })
                if (resultRemove.isConfirmed) {
                  //   setBtnLoader(false)
                  props.updateModalTitle('close', 'fetch')
                }
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
    }

    return (
      // <div className='Result'>
      //   <div className='ResultTitle' role='alert'>
      //     Payment completed successfully
      //   </div>
      //   <div className='ResultMessage'>Thanks for trying Stripe Elements. No money was charged</div>
      //   <ResetButton onClick={reset} />
      // </div>
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
          {nameValidation ? <div className='biz_owner_input_validation'>invalid input</div> : null}
        </div>
        <div className='col-md-6 mb-2'>
          <label className='form-label required'>Email</label>
          <input
            id='email'
            type='email'
            className='form-control form-control-lg form-control-solid'
            placeholder='johndoe@email.com'
            required
            autoComplete='email'
            value={billingDetails.email}
            onChange={(e) => {
              setEmailValidation(false)
              setBillingDetails({...billingDetails, email: e.target.value})
            }}
          />
          {emailValidation ? (
            <div className='biz_owner_input_validation'>invalid email address</div>
          ) : null}
        </div>
        <div className='col-md-6 mb-2 mt-3'>
          <label className='form-label required'>Phone</label>
          <input
            id='phone'
            type='number'
            className='form-control form-control-lg form-control-solid'
            placeholder='+1(543)123-4567'
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
            <div className='biz_owner_input_validation'>invalid phone number</div>
          ) : null}
        </div>
        <div className='col-md-6 mb-2 mt-3'>
          <label className='form-label required'>Card</label>
          <CardElement
            placeholder='Card Number'
            className='form-control form-control-lg form-control-solid'
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
  return (
    <>
      {isContinue ? (
        <div className='container px-md-10 py-10'>
          {/* <div className='row'>
            <div className='my-5'>
              <h2 className=' bizOwner-add-new-listing-heading'>Payment details</h2>
            </div>
          </div> */}
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
          <div>
            <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
          </div>
        </div>
      )}
    </>
  )
}

export default BillingInformation
