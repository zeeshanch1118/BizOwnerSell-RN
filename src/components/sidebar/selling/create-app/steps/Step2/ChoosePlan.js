import React, {useEffect, useState} from 'react'

import './choosePlan.css'
import Select from 'react-select'
import '../../../../../../components/BuyBizzOwner.css'
import {baseURL} from '../../../../../services/BaseURL'
import MainScreenLoader from '../../../../../../assets/Loader/MainScreenLoader.gif'
import subcriptionListIcons from '../../../../../../assets/icons/subcriptionListIcons.svg'
import {
  choosePlan,
  getPackage,
  updateListingSecondStep,
} from '../../../../../services/business-services/index'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import {duration} from '@mui/material'
import {BsCheckCircleFill} from 'react-icons/bs'
// import {loadStripe} from '@stripe/stripe-js'
const ChoosePlan = (props) => {
  // const stripe = require('stripe')('sk_test_BdavkaT4hXelQXTZa7NzhS4k')
  // var stripe = loadStripe('stripe')(
  //   'sk_test_51LFyZUDuxLJHg6jB2Z6rseEQhwmkwamRaKcSMYG6KXXn3QWKBNBL0OA63RufDgFoJwBC4R92DO1F3SnePzpVwFmA00V01TXTMw'
  // )

  let dispatch = useDispatch()
  const [Plan, setPlan] = useState('')
  const [totalPrice, setTotalPrice] = useState('')
  const [packageDurationId, setPackageDurationId] = useState('')
  const [selectedBtn, setSelectedBtn] = useState('')
  const [newId, setNewId] = useState()
  const [Price, setPrice] = useState('')
  const [slug, setSlug] = useState('')
  const [planId, setPlanId] = useState('')
  const [stripePlan, setStripePlan] = useState('')
  const [active, setActive] = useState(false)
  const [showCaseActive, setShowCaseActive] = useState(false)
  const [diamondActive, setDiamondActive] = useState(false)
  const [planValidation, setPlanValidation] = useState(false)
  const [isContinue, setIsContinue] = useState(false)
  const [showBillingData, setShowBillingData] = useState(false)
  const [allplans, setAllplans] = useState([])
  const tokenData = localStorage.getItem('userData')

  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {accessToken} = transtokenData
  const {userID} = transtokenData ?? ''
  useEffect(() => {
    window.scrollTo(0, 0)

    getPackageListing()
  }, [])

  // const packagePrice = async (e, price ) => {

  // }
  const showPrice = async (e, item) => {
    if (item?.package_prices) {
      item?.package_prices.map((item, index) => {
        if (item?.id === packageDurationId) {
          setPrice(item?.price)
          return item?.price
        } else if (item?.type == '6 months') {
          setPrice(item?.price)
          return item?.price
        }
      })
    }
  }
  const choosePackageHandler = async (e, item) => {
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

  const getPackageListing = async () => {
    let mapListings = []
    try {
      const result = await getPackage(accessToken)
      if (result.status === true) {
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

  const choosePlanStep = async (e) => {
    e.preventDefault()

    // await sleep(300)

    // props.choosePlanStep()

    if (Plan == '' || Plan == undefined) {
      setPlanValidation(true)
    } else {
      // const result = await updateListingSecondStep(Price)
      // if (result.status === true) {
      // }
      localStorage.setItem('slug', slug)
      localStorage.setItem('price', Price)
      localStorage.setItem('planId', planId)
      localStorage.setItem('plan', stripePlan)
      props.choosePlanStep()
    }
  }

  const choosePlanStepBack2 = () => {
    props.choosePlanStepBack2()
  }

  return (
    <>
      {isContinue ? (
        <div className='container  mt-5'>
          <div className='row pb-5  px-md-15 mx-auto biz_owner_price_plan_section'>
            <div className='col-md-8 px-2'>
              <h5 className='biz-owner-selected-plan'>Choose Plan for create listing</h5>
            </div>
          </div>

          <div className='row px-5 ms-md-10 mt-5'>
            {allplans?.map((item, index) => (
              <>
                {item?.package_for == 'seller' && item?.status == 'active' && (
                  <div
                    className='biz_owner_Plan_card mx-1   mb-3  col-4'
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
                            {packagePrice?.status == 'active' && (
                              <>
                                {totalPrice == '' && packagePrice?.type == '6 months' ? (
                                  <h3
                                    className='text-center text-primary mt-6 mb-2 '
                                    style={{fontSize: '30px', fontWeight: '300'}}
                                  >
                                    ${packagePrice?.price}{' '}
                                  </h3>
                                ) : newId == item?.id && totalPrice == packagePrice?.type ? (
                                  <h3
                                    className='text-center text-primary mt-6 mb-2 '
                                    style={{fontSize: '30px', fontWeight: '300'}}
                                  >
                                    ${packagePrice?.price}{' '}
                                  </h3>
                                ) : (
                                  newId !== item?.id &&
                                  packagePrice?.type == '6 months' && (
                                    <h3
                                      className='text-center text-primary mt-6 mb-2 '
                                      style={{fontSize: '30px', fontWeight: '300'}}
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
                                <div className='  col-6 px-0'>
                                  <label className='w-100'>
                                    <input
                                      type='radio'
                                      className='btn-check'
                                      name='attachment'
                                      value='has'
                                      defaultChecked
                                    />
                                    <span
                                      className=' btn w-100 rounded-pill btn-active  py-1'
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
                        {/* <div className=' serachSection col-6 px-0'>
                          <label className='w-100'>
                            <input
                              type='radio'
                              className='btn-check'
                              name='attachment'
                              value='has'
                              defaultChecked
                            />
                            <span
                              className=' btn w-100  rounded-pill btn-active  py-2'
                              // onClick={toggleHandlerBusiness}
                              style={{backgroundColor: newId == item?.id ? '#00a3ef' : '#081c3d'}}
                            >
                              <span className='  text-white fs-4 btn-active family-font'>
                                6 Months
                              </span>
                            </span>
                          </label>
                        </div>
                        <div className=' serachSection col-6 px-0'>
                          <label className='w-100'>
                            <input
                              type='radio'
                              className='btn-check'
                              name='attachment'
                              value='any'
                            />
                            <span
                              className='btn w-100  rounded rounded-pill btn-active btn-active-primary py-2'
                              // onClick={toggleHandlerFranchise}
                            >
                              <span className=' text-white fs-4 family-font'>1 year</span>
                            </span>
                          </label>
                        </div> */}
                      </div>
                    </div>
                    <div className=' mx-5' style={{border: '.5px solid #00a3ef59'}}></div>
                    {/*  */}
                    <div className='biz_owner_Plan_card_body  biz-owner-choose-plan-decription '>
                      {item?.description != null && item?.description != undefined ? (
                        <p className='mb-1 biz-owner-choose-plan-decription pb-7'>
                          {item?.description}
                        </p>
                      ) : null}
                      <div className='pb-15'>
                        {item?.features != null &&
                          item?.features != undefined &&
                          item?.features?.map((detail, ind) => (
                            <li className='my-2 biz-owner-choose-plan-decription' key={ind}>
                              {detail?.title}
                            </li>
                          ))}
                      </div>
                    </div>
                    {/*  */}
                    {/* <div className='biz_owner_Plan_card_body '>
                      <div>
                        <BsCheckCircleFill
                          size={20}
                          color={newId == item?.id ? '#00a3ef' : '#081c3d'}
                        />
                        <span className='ps-2 text-truncate'>{totalPrice}</span>
                      </div>
                      <div>
                        <BsCheckCircleFill
                          size={20}
                          color={newId == item?.id ? '#00a3ef' : '#081c3d'}
                        />
                        <span className='ps-2 text-truncate'>Total listings</span>
                      </div>
                    </div> */}
                    {/*  */}
                    <div
                      className='d-flex justify-content-center my-3 pb-3'
                      style={{position: 'absolute', bottom: '0', width: '100%', left: ''}}
                    >
                      <div className=' serachSection mx-auto px-0'>
                        <label className='w-100'>
                          <input type='radio' className='btn-check' name='attachment' value='any' />
                          <span
                            className='btn  mx-auto  rounded rounded-pill btn-active btn-active-primary py-2 px-10 border border-1 border-primary'
                            onClick={(e) => {
                              setNewId(item?.id)

                              selectedBtn !== index ? setPackageDurationId('') : null

                              choosePackageHandler(e, item)
                            }}
                            style={{
                              backgroundColor:
                                newId == item?.id && showBillingData ? '#00a3ef' : 'white',
                            }}
                          >
                            <span
                              className=' fs-4 family-font '
                              style={{
                                color: newId == item?.id && showBillingData ? 'white' : '#009ef7',
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
            ))}

            {planValidation ? (
              <div className=' col-12 text-danger fs-4 mt-3 mx-auto'>
                Please select the package, and it’s duration then click on subscribe, after that you
                can continue.
              </div>
            ) : null}
          </div>

          {showBillingData ? (
            <div className='container px-0'>
              <div className='row py-10  px-md-15 mx-auto biz_owner_price_plan_section'>
                <div className='col-md-8 px-2'>
                  <h1 className='biz-owner-selected-plan'>You Select {Plan} Plan</h1>

                  <p className='biz-owner-selected-plan-dec'>
                    {Plan} up front. Your 6-month initial term begins one week after your purchase
                    date, but you can publish your listing as soon as you are ready. Following your
                    initial 6-month term, your listing will be billed monthly at $59.95/month unless
                    you turn off renewal via My Listings page.
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
          <div className='col-md-11 mx-auto d-flex justify-content-between my-10'>
            <button className='btn btn-primary ' onClick={(e) => choosePlanStepBack2(e)}>
              Back
            </button>
            <button className='btn btn-primary ' onClick={(e) => choosePlanStep(e)}>
              Continue
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

export default ChoosePlan
