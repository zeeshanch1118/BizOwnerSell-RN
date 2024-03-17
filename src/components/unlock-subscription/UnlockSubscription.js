import React, {useEffect, useState} from 'react'

import '../sidebar/selling/create-app/steps/Step2/choosePlan.css'
import Select from 'react-select'
import '../../components/BuyBizzOwner.css'
import {baseURL} from '../../components/services/BaseURL'
import MainScreenLoader from '../../assets/Loader/MainScreenLoader.gif'

import {
  choosePlan,
  getPackage,
  updateListingSecondStep,
} from '../../components/services/business-services/index'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import BillingDetails from '../sidebar/selling/create-app/steps/Step3/BillingDetails'
import BillingInformation from './BillingInformation'
import {BsCheckCircleFill} from 'react-icons/bs'
import {Navigate, useNavigate} from 'react-router-dom'
const UnlockSubscription = (props) => {
  const Navigate = useNavigate()
  var information = {
    card: {
      number: '4242424242424242',
      exp_month: '02',
      exp_year: '21',
      cvc: '999',
      name: 'Billy Joe',
    },
  }
  let dispatch = useDispatch()
  const [Plan, setPlan] = useState('')

  const [totalPrice, setTotalPrice] = useState('')
  const [newId, setNewId] = useState()
  const [packageDurationId, setPackageDurationId] = useState('')
  const [selectedBtn, setSelectedBtn] = useState('')
  const [Price, setPrice] = useState('')
  const [slug, setSlug] = useState('')
  const [planId, setPlanId] = useState('')
  const [stripePlan, setStripePlan] = useState('')
  const [active, setActive] = useState(false)
  const [steps, setSteps] = useState(1)
  const [showCaseActive, setShowCaseActive] = useState(false)
  const [diamondActive, setDiamondActive] = useState(false)
  const [planValidation, setPlanValidation] = useState(false)
  const [isContinue, setIsContinue] = useState(false)
  const [showBillingData, setShowBillingData] = useState(false)
  const [allplans, setAllplans] = useState([])
  const tokenData = localStorage.getItem('userData')

  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {role} = transtokenData
  const {userID} = transtokenData ?? ''
  useEffect(() => {
    getPackageListing()
  }, [])

  const ListingChange = async (e, price, id, plan, type, pID, stripe_plan) => {
    setPlanValidation(false)
    setShowBillingData(true)
    setPlan(plan)
    setNewId(id)
    setPrice(price)
    setSlug(type)
    setPlanId(pID)
    setStripePlan(stripe_plan)
  }

  const getPackageListing = async () => {
    let mapListings = []
    try {
      const result = await getPackage(accessToken)
      if (result.status === true) {
        console.log(result)
        // getListings = result.data
        // result.data.map((item, index) => mapListings.push({ value: item.id, label: item.type }))
        setAllplans(result.package)
        setIsContinue(true)
      }
    } catch (err) {
      console.log('getBusinessListingTypes err', err)
      // setErrorModelText(err.response.data.message)
      // setErrorModel(true);
    }
  }

  // const [choosePlanStep2, setChoosePlanStep2] = useState(2)
  const choosePackageHandler = async (e, item, btn, index) => {
    if (btn != index) {
      setPackageDurationId('')
    }
    setPlanValidation(false)
    setShowBillingData(true)
    setSlug(item?.slug)
    setPlanId(item?.id)

    if (item?.package_prices) {
      item?.package_prices.map((item, index) => {
        if (item?.id === packageDurationId) {
          setPrice(item?.price)
          setPlan(item?.type)
          setStripePlan(item?.stripe_plan)
          setTotalPrice(item.type)
          setPackageDurationId(item?.id)
          setSelectedBtn(index)
        } else if (item?.type == '6 months') {
          setPrice(item?.price)
          setPlan(item?.type)
          setStripePlan(item?.stripe_plan)
          setTotalPrice(item.type)
          setPackageDurationId(item?.id)
          setSelectedBtn(index)
        }
      })
    }
  }
  const ChoosePlan = () => {
    const choosePlanStep = async (e) => {
      e.preventDefault()

      if (Plan == '' || Plan == undefined) {
        setPlanValidation(true)
      } else {
        localStorage.setItem('slug', slug)
        localStorage.setItem('price', Price)
        localStorage.setItem('planId', planId)
        localStorage.setItem('plan', stripePlan)
        setSteps(2)
        props.updateModalTitle('Payment Details')
      }
    }

    return (
      <>
        {isContinue ? (
          <>
            {allplans?.length > 0 ? (
              <div className='container  mt-4'>
                {/* <div className='row py-5  mx-auto biz_owner_price_plan_section'>
                  <div className='col-md-8 px-2'>
                    <h1 className='biz-owner-selected-plan'>
                      Please select a plan to access more features
                    </h1>
                  </div>
                </div> */}
                <div className='row d-flex justify-content-center pb-0'>
                  {/* basic plan  */}
                  {allplans?.map((item, index) => (
                    <>
                      {props?.forBroker == 'ShowBrokerPackage' && item?.package_for == 'broker' ? (
                        <div
                          className='biz_owner_Plan_card choose_plane_card  mx-1 pb-5  mb-10  col-4 mt-8'
                          key={index}
                          style={{
                            border: newId == item?.id ? '2px solid #00a3ef' : 'none',
                            top: newId == item?.id ? '-20px' : '0',
                            transition: newId == item?.id && 'all 0.3s ease-out',
                          }}
                        >
                          <div
                            className='biz_owner_Plan_card_header   py-4 text-center'
                            style={{
                              backgroundColor: newId == item?.id ? '#00a3ef' : '#081c3d',
                            }}
                          >
                            {item?.title != null && item?.title != undefined ? (
                              <h3 className='mb-0 text-white'>{item?.title}</h3>
                            ) : null}
                          </div>

                          <div>
                            {item?.package_prices != null &&
                              item?.package_prices != undefined &&
                              item?.package_prices?.map((packagePrice, ind) => (
                                <>
                                  {packagePrice?.status == 'active' && (
                                    <>
                                      {totalPrice == '' && packagePrice?.type == '6 months' ? (
                                        <h3
                                          className='text-center text-primary mt-6 mb-2 '
                                          style={{fontSize: '30px', fontWeight: '300'}}
                                          key={ind}
                                        >
                                          ${packagePrice?.price}{' '}
                                        </h3>
                                      ) : newId == item?.id && totalPrice == packagePrice?.type ? (
                                        <h3
                                          className='text-center text-primary mt-6 mb-2 '
                                          style={{fontSize: '30px', fontWeight: '300'}}
                                          key={ind}
                                        >
                                          ${packagePrice?.price}{' '}
                                        </h3>
                                      ) : (
                                        newId !== item?.id &&
                                        packagePrice?.type == '6 months' && (
                                          <h3
                                            className='text-center text-primary mt-6 mb-2 '
                                            style={{fontSize: '30px', fontWeight: '300'}}
                                            key={ind}
                                          >
                                            ${packagePrice?.price}{' '}
                                          </h3>
                                        )
                                      )}
                                    </>
                                  )}
                                </>
                              ))}
                          </div>
                          {/*  */}

                          <div className='my-6  mx-8 '>
                            <div
                              className=' row px-0'
                              style={{
                                backgroundColor: newId == item?.id ? '#12adf65c' : '#c9cbcf',
                                borderRadius: '2rem',
                              }}
                            >
                              {item?.package_prices != null &&
                                item?.package_prices != undefined &&
                                item?.package_prices?.map((packageDuration, durationIndex) => (
                                  <>
                                    {packageDuration?.status == 'active' ? (
                                      <div className='  col-6 px-0' key={durationIndex}>
                                        <label className='w-100'>
                                          <input
                                            type='radio'
                                            className='btn-check'
                                            name='attachment'
                                            value='has'
                                            defaultChecked
                                          />
                                          <span
                                            className=' btn w-100  rounded-pill btn-active  py-1'
                                            onClick={(e) => {
                                              setPackageDurationId(packageDuration?.id)
                                              setSelectedBtn(index)
                                              setNewId(item?.id)

                                              setTotalPrice(packageDuration?.type)
                                            }}
                                            style={{
                                              backgroundColor:
                                                packageDuration.type == '6 months' &&
                                                packageDurationId == ''
                                                  ? '#081c3d'
                                                  : packageDurationId == packageDuration?.id
                                                  ? '#00a3ef'
                                                  : packageDurationId !== packageDuration?.id &&
                                                    newId == item?.id
                                                  ? '#a9e1fc'
                                                  : index == selectedBtn &&
                                                    packageDuration.type == '6 months'
                                                  ? '#081c3d'
                                                  : packageDuration.type == '6 months'
                                                  ? '#081c3d'
                                                  : newId == item?.id &&
                                                    packageDuration.type == '6 months'
                                                  ? '#00a3ef'
                                                  : '',
                                            }}
                                          >
                                            <span className='  text-white fs-4 btn-active family-font'>
                                              {packageDuration.type}
                                            </span>
                                          </span>
                                        </label>
                                      </div>
                                    ) : null}
                                  </>
                                ))}
                            </div>
                          </div>
                          <div className=' mx-5' style={{border: '.5px solid #00a3ef59'}}></div>
                          {/*  */}
                          <div className='biz_owner_Plan_card_body  biz-owner-choose-plan-description'>
                            {item?.description != null && item?.description != undefined ? (
                              <p className='mb-1 biz-owner-choose-plan-description'>
                                {item?.description}
                              </p>
                            ) : null}
                            <div className='pb-10'>
                              {item?.features != null &&
                                item?.features != undefined &&
                                item?.features?.map((detail, ind) => (
                                  <div className='mt-3 row' key={ind}>
                                    <div className='col-1'>
                                      <BsCheckCircleFill
                                        size={20}
                                        color={newId == item?.id ? '#00a3ef' : '#081c3d'}
                                      />
                                    </div>
                                    <div className='col-11'>
                                      <p className='ps-2 mb-0 '>
                                        {detail?.id == 2
                                          ? 'Number of listings' + ' ' + detail?.pivot?.value
                                          : detail?.title}
                                      </p>
                                    </div>
                                  </div>
                                  // <li className='my-2 biz-owner-choose-plan-decription' key={ind}>
                                  //   {detail?.title}
                                  // </li>
                                ))}
                            </div>
                          </div>
                          {/*  */}

                          {/*  */}
                          <div
                            className='d-flex justify-content-center my-3 pb-2'
                            style={{position: 'absolute', bottom: '0', width: '100%', left: ''}}
                          >
                            <div className='  mx-auto px-0'>
                              <label className='w-100'>
                                <input
                                  type='radio'
                                  className='btn-check'
                                  name='attachment'
                                  value='any'
                                />
                                <span
                                  className='btn  mx-auto  rounded rounded-pill btn-active btn-active-primary py-2 px-10 border border-1 border-primary'
                                  onClick={(e) => {
                                    setNewId(item?.id)

                                    console.log('selectedBtn', selectedBtn, 'index', index)
                                    setSelectedBtn(null)
                                    choosePackageHandler(e, item, selectedBtn, index)
                                  }}
                                  style={{
                                    backgroundColor:
                                      newId == item?.id && showBillingData ? '#00a3ef' : 'white',
                                  }}
                                >
                                  <span
                                    className=' fs-4 family-font '
                                    style={{
                                      color:
                                        newId == item?.id && showBillingData ? 'white' : '#009ef7',
                                    }}
                                  >
                                    Subscribe
                                  </span>
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          {' '}
                          {item?.package_for == 'buyer' &&
                            props?.forBroker !== 'ShowBrokerPackage' && (
                              <div
                                className='biz_owner_Plan_card  mx-1   mb-10  col-4'
                                key={index}
                                style={{
                                  border: newId == item?.id ? '2px solid #00a3ef' : 'none',
                                  top: newId == item?.id ? '-20px' : '0',
                                }}
                              >
                                <div
                                  className='biz_owner_Plan_card_header   py-4 text-center'
                                  style={{
                                    backgroundColor: newId == item?.id ? '#00a3ef' : '#081c3d',
                                  }}
                                >
                                  {item?.title != null && item?.title != undefined ? (
                                    <h3 className='mb-0 text-white'>{item?.title}</h3>
                                  ) : null}
                                </div>

                                <div>
                                  {item?.package_prices != null &&
                                    item?.package_prices != undefined &&
                                    item?.package_prices?.map((packagePrice, ind) => (
                                      <>
                                        {console.log('packageDuration', packagePrice)}

                                        {packagePrice?.status == 'active' && (
                                          <>
                                            {totalPrice == '' &&
                                            packagePrice?.type == '6 months' ? (
                                              <h3
                                                className='text-center text-primary mt-6 mb-2 '
                                                style={{fontSize: '30px', fontWeight: '300'}}
                                                key={ind}
                                              >
                                                ${packagePrice?.price}{' '}
                                              </h3>
                                            ) : newId == item?.id &&
                                              totalPrice == packagePrice?.type ? (
                                              <h3
                                                className='text-center text-primary mt-6 mb-2 '
                                                style={{fontSize: '30px', fontWeight: '300'}}
                                                key={ind}
                                              >
                                                ${packagePrice?.price}{' '}
                                              </h3>
                                            ) : (
                                              newId !== item?.id &&
                                              packagePrice?.type == '6 months' && (
                                                <h3
                                                  className='text-center text-primary mt-6 mb-2 '
                                                  style={{fontSize: '30px', fontWeight: '300'}}
                                                  key={ind}
                                                >
                                                  ${packagePrice?.price}{' '}
                                                </h3>
                                              )
                                            )}
                                          </>
                                        )}
                                      </>
                                    ))}
                                </div>
                                {/*  */}

                                <div className='my-6  mx-8 '>
                                  <div
                                    className=' row px-0'
                                    style={{
                                      backgroundColor: newId == item?.id ? '#12adf65c' : '#c9cbcf',
                                      borderRadius: '2rem',
                                    }}
                                  >
                                    {item?.package_prices != null &&
                                      item?.package_prices != undefined &&
                                      item?.package_prices?.map(
                                        (packageDuration, durationIndex) => (
                                          <>
                                            {packageDuration?.status == 'active' ? (
                                              <div className='  col-6 px-0' key={durationIndex}>
                                                <label className='w-100'>
                                                  <input
                                                    type='radio'
                                                    className='btn-check'
                                                    name='attachment'
                                                    value='has'
                                                    defaultChecked
                                                  />
                                                  <span
                                                    className=' btn w-100  rounded-pill btn-active  py-1'
                                                    onClick={(e) => {
                                                      setPackageDurationId(packageDuration?.id)
                                                      setSelectedBtn(index)
                                                      setNewId(item?.id)

                                                      setTotalPrice(packageDuration?.type)
                                                    }}
                                                    style={{
                                                      backgroundColor:
                                                        packageDuration.type == '6 months' &&
                                                        packageDurationId == ''
                                                          ? '#081c3d'
                                                          : packageDurationId == packageDuration?.id
                                                          ? '#00a3ef'
                                                          : packageDurationId !==
                                                              packageDuration?.id &&
                                                            newId == item?.id
                                                          ? '#a9e1fc'
                                                          : index == selectedBtn &&
                                                            packageDuration.type == '6 months'
                                                          ? '#081c3d'
                                                          : packageDuration.type == '6 months'
                                                          ? '#081c3d'
                                                          : newId == item?.id &&
                                                            packageDuration.type == '6 months'
                                                          ? '#00a3ef'
                                                          : '',
                                                    }}
                                                  >
                                                    <span className='  text-white fs-4 btn-active family-font'>
                                                      {packageDuration.type}
                                                    </span>
                                                  </span>
                                                </label>
                                              </div>
                                            ) : null}
                                          </>
                                        )
                                      )}
                                  </div>
                                </div>
                                <div
                                  className=' mx-5'
                                  style={{border: '.5px solid #00a3ef59'}}
                                ></div>
                                {/*  */}
                                <div className='biz_owner_Plan_card_body  biz-owner-choose-plan-decription'>
                                  {item?.description != null && item?.description != undefined ? (
                                    <p className='mb-1 biz-owner-choose-plan-decription'>
                                      {item?.description}
                                    </p>
                                  ) : null}
                                </div>
                                <div className='pb-4 px-4'>
                                  {item?.features != null &&
                                    item?.features != undefined &&
                                    item?.features?.map((detail, ind) => (
                                      <div className='mt-3 pb-18' key={ind}>
                                        <BsCheckCircleFill
                                          size={20}
                                          color={newId == item?.id ? '#00a3ef' : '#081c3d'}
                                        />
                                        <span className='ps-2 text-truncate'>{detail?.title}</span>
                                      </div>
                                    ))}
                                </div>

                                <div
                                  className='d-flex justify-content-center my-3 pb-2'
                                  style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    width: '100%',
                                    left: '',
                                  }}
                                >
                                  <div className=' serachSection mx-auto px-0'>
                                    <label className='w-100'>
                                      <input
                                        type='radio'
                                        className='btn-check'
                                        name='attachment'
                                        value='any'
                                      />
                                      <span
                                        className='btn  mx-auto  rounded rounded-pill btn-active btn-active-primary py-2 px-10 border border-1 border-primary'
                                        onClick={(e) => {
                                          setNewId(item?.id)

                                          choosePackageHandler(e, item, selectedBtn, index)
                                        }}
                                        style={{
                                          backgroundColor:
                                            newId == item?.id && showBillingData
                                              ? '#00a3ef'
                                              : 'white',
                                        }}
                                      >
                                        <span
                                          className=' fs-4 family-font '
                                          style={{
                                            color:
                                              newId == item?.id && showBillingData
                                                ? 'white'
                                                : '#009ef7',
                                          }}
                                        >
                                          Subscribe
                                        </span>
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            )}
                        </>
                      )}
                    </>
                  ))}
                  {planValidation ? (
                    <div className='text-danger col-10 mt-3 fs-4 mx-auto'>
                      Please select the package, and it’s duration then click on subscribe, after
                      that you can continue.
                    </div>
                  ) : null}
                </div>

                {showBillingData ? (
                  <div className='container'>
                    <div className='row py-7   mx-auto biz_owner_price_plan_section'>
                      <div className='col-md-8 px-2'>
                        <h1>You Select {Plan} Plan</h1>
                        <p className='biz-owner-selected-plan-dec'>
                          {Plan} up front. Your 6-month initial term begins one week after your
                          purchase date, but you can publish your listing as soon as you are ready.
                          Following your initial 6-month term, your listing will be billed monthly
                          at $59.95/month unless you turn off renewal via My Listings page.
                        </p>
                      </div>
                      <div className='col-md-4  px-0'>
                        <div className='biz_owner_sub_total'>
                          <h3>
                            Sub total: <span>${Price}</span>
                          </h3>
                          <h3>
                            Tax: <span>0</span>
                          </h3>
                          <hr />
                          <h3>
                            Total: <span>${Price}</span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className='col-12 mx-auto d-flex justify-content-end my-3'>
                  {props?.forBroker == 'ShowBrokerPackage' && role == 'broker' ? (
                    <button
                      className='btn btn-light me-2 text-dark'
                      onClick={(e) => Navigate('/dashboard/my-listings')}
                    >
                      Later
                    </button>
                  ) : (
                    <button
                      className='btn btn-light me-2 text-dark'
                      onClick={(e) => props.updateModalTitle('close')}
                    >
                      Skip
                    </button>
                  )}

                  <button className='btn btn-primary ' onClick={(e) => choosePlanStep(e)}>
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div style={{minHeight: '100vh'}}>
                <h1 className='m-auto'>Currently no package available for calculator</h1>
              </div>
            )}
          </>
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
      </>
    )
  }

  const UnlockSubscriptionPage = () => {
    switch (steps) {
      case 1:
        return <ChoosePlan />
        break
      case 2:
        return (
          <BillingInformation
            updateModalTitle={props.updateModalTitle}
            paymentDetails={props?.paymentDetails}
            forBroker={props?.forBroker}
          />
        )
        break

      default:
        return <ChoosePlan />
        break
    }
  }
  return (
    <>
      <UnlockSubscriptionPage />
    </>
  )
}

export default UnlockSubscription
