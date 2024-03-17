import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import {choosePlan, payment} from '../../../../../services/business-services'
import {loadStripe} from '@stripe/stripe-js'
import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js'
// const ErrorMessage = ({children}) => (
import './billingDetails.css'
import ButtonLoader from '../../../../../../assets/Loader/ButtonLoader.gif'
import MainScreenLoader from '../../../../../../assets/Loader/MainScreenLoader.gif'
import '../../../../../../components/BuyBizzOwner.css'
import 'react-phone-input-2/lib/style.css'
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
  const listingBtn = localStorage.getItem('listingBtn')
  const userData = localStorage.getItem('userData')
  const transformedData = JSON?.parse(userData || '')
  const {accessToken} = transformedData
  const [key, setKey] = useState('')

  useEffect(() => {
    getUserKey()
    window.scrollTo(0, 0)
  }, [])
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

  const CheckoutForm = () => {
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
    const tokenData = localStorage.getItem('userData')
    const {biz_id} = useParams()
    const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
    const {subscription} = transtokenData
    const {accessToken} = transtokenData

    const {userName} = transtokenData

    const {role} = transtokenData

    const {userID} = transtokenData

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
            console.log(payload, 'payload')
            newToken = payload
            pay()
          })
        } catch (error) {
          console.log('token error', error)
        }
        // try {
        //   await window.Stripe.card.createToken(CardElement, (status, response) => {
        //     console.log('fayyyyyyyyyyyaz', status, response)
        //     if (status == 200) {
        //       newToken = response
        //       pay()
        //     }
        //   })
        // } catch (error) {
        //   console.log('status', error)
        // }

        setProcessing(false)
        const pay = async () => {
          let ID = null
          let key = null
          const listingId = localStorage.getItem('listingBtn')
          const businessId = localStorage.getItem('businessID')
          const franchiseId = localStorage.getItem('franchiseID')

          const businessIdData = tokenData ? JSON?.parse(businessId) : ''
          const franchiseIdData = tokenData ? JSON?.parse(franchiseId) : ''

          if (listingId == 'franchise') {
            if (biz_id) {
              ID = biz_id
            } else {
              const {franchiseID} = franchiseIdData
              ID = franchiseID
              key = 'franchise'
            }
          } else if (listingId == 'Business') {
            if (biz_id) {
              ID = biz_id
            } else {
              const {businessID} = businessIdData
              ID = businessID
              key = 'business'
            }
          }
          const response = await payment(
            newToken,
            planID,
            payload.paymentMethod.id,
            key,
            couponCode,
            stripe_plan,
            ID,
            key,
            accessToken
          )
          console.log(response)

          if (response.status == true) {
            setBtnLoader(false)

            const resultRemove = await Swal.fire({
              allowOutsideClick: false,
              title: 'Success',
              text: 'Payment completed successfully',
              icon: 'success',
              confirmButtonColor: '#009ef7',

              confirmButtonText: 'Ok',
            })
            if (resultRemove.isConfirmed) {
              localStorage.setItem('stepSkipAble', listingBtn)
              props.billingDetailStep3()
              localStorage.setItem(
                'userData',
                JSON.stringify({
                  accessToken: accessToken,
                  userName: userName,
                  role: role,
                  userID: userID,
                  subscription: 'paid',
                })
              )
              setBtnLoader(false)
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
      // <div className='Result'>
      //   <div className='ResultTitle' role='alert'>
      //    Payment completed successfully
      //   </div>
      //   <div className='ResultMessage'>Thanks for trying Stripe Elements. No money was charged</div>
      //   <ResetButton onClick={reset} />
      // </div>
      <div className='row' id='payment-biz-owner'>
        <div className='col-md-6 card-name mb-2'>
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
        <div className='col-md-6 card-email mb-2'>
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
        <div className='col-md-6 card-phone mb-2 mt-3'>
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
            <div className='biz_owner_input_validation'>invalid phone number</div>
          ) : null}
        </div>
        <div className='col-md-6 mb-2 mt-3'>
          <label className='form-label required'>Card</label>
          <CardElement
            placeholder='Card Number'
            className='biz-owner-card-input  py-3 px-4 py-md-4'
            onChange={(e) => {
              setError(e.error)
              console.log(e)
              setCardComplete(e.complete)
            }}
            style={{fontSize: '1px'}}
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
              <label className='form-label'>Coupon code</label>
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
        {btnLoader ? (
          <Link
            // onClick={handleSubmit}
            className='btn btn-primary biz-owner-billing-btn'
            to='#'
            disabled={!stripe}
          >
            <img src={ButtonLoader} className='mx-7' alt='' style={{height: '1.8rem'}} />
          </Link>
        ) : (
          <Link
            onClick={handleSubmit}
            className='btn btn-primary biz-owner-billing-btn'
            to='#'
            disabled={!stripe}
          >
            Pay Now
          </Link>
        )}
      </div>
    )
  }
  const billingStepBack3 = () => {
    props.billingStepBack3()
  }
  return (
    <>
      {isContinue ? (
        <div className='container px-md-10'>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
          <div className=' mx-auto d-flex justify-content-between my-10 '>
            <button className='btn btn-primary ' onClick={billingStepBack3}>
              Back
            </button>
          </div>
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

export default BillingDetails
