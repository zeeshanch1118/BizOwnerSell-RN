import React, {useEffect, useState} from 'react'
import {Typography, Stepper, Step, StepLabel} from '@material-ui/core'
import Select from 'react-select'
import {makeStyles} from '@material-ui/core/styles'
import FranchiseListingTypes from '../../franchise/Step1/FranchiseListingTypes'
import ListingTypes from './Step1/ListingTypes'
import ChoosePlan from './Step2/ChoosePlan'
import FranchiseChoosePlan from '../../franchise/Step2/FranchiseChoosePlan'
import Preview from './step6/Preview'
import FranchisePreview from '../../franchise/step6/FranchisePreview'
import FranchiseMultiImages from '../../franchise/step5/FranchiseMultiImages'
import MultiImages from './step5/MultiImages'
import DetailInformation from './step4/DetailInformation'
import FranchiseDetailInformation from '../../franchise/step4/FranchiseDetailInformation'
import BillingDetails from './Step3/BillingDetails'
import FranchiseBillingDetails from '../../franchise/Step3/FranchiseBillingDetails'
import {useParams} from 'react-router-dom'

import '../../../../BuyBizzOwner.css'
import './Addlisting.css'

import {KTCard} from '../../../../../_metronic/helpers'
import PaymentDetails from './Payment-details/PaymentDetails'
import {useSelector} from 'react-redux'

const AddListing = () => {
  const {biz_id} = useParams()
  // const {status} = useParams()
  const [typeOfListing, setTypeOfListing] = useState('Business')
  const [subscriptionStatus, setSubscriptionStatus] = useState('')

  const [disableBtn, setDisableBtn] = useState(false)
  const [disableBtnState, setDisableBtnState] = useState('')
  let listingBtnType = localStorage.getItem('listingBtn')
  const tokenData = localStorage.getItem('userData')
  const status = localStorage.getItem('listingStatus')

  const transtokenData = tokenData ? JSON?.parse(tokenData) : ''
  const {subscription} = transtokenData
  const {role} = transtokenData
  let disable = localStorage.getItem('editBtn')
  let stepRecordUpdate = useSelector((state) => {
    // setSaveSearchButtonToggler(state?.saveSearch)
    return state
  })
  useEffect(() => {
    setSubscriptionStatus(subscription)
    setActiveStep(0)
  }, [stepRecordUpdate])
  useEffect(() => {
    if (listingBtnType) {
      setTypeOfListing(listingBtnType)
    }
  }, [])
  useEffect(() => {
    if (biz_id && disable == 'businessBtn') {
      setDisableBtnState(disable)
      setDisableBtn(true)
      setTypeOfListing('Business')
    } else if (biz_id && disable == 'franchiseBtn') {
      setDisableBtnState(disable)
      setDisableBtn(true)
      setTypeOfListing('franchise')
    }
  }, [biz_id])

  localStorage.setItem('listingBtn', typeOfListing)

  const WhichTypeOfListingChange = async (e) => {
    if (e.target.name == 'franchise') {
      setTypeOfListing('franchise')

      localStorage.setItem('listingBtn', typeOfListing)
    } else if (e.target.name == 'business') {
      setTypeOfListing('Business')
      localStorage.setItem('listingBtn', typeOfListing)
    }
  }

  function getSteps() {
    if (role == 'broker' || biz_id || role == 'agent') {
      if (role !== 'broker' && role !== 'agent') {
        if (status == '1' || status == 1) {
          return ['Basic information', 'Detail information', 'Images', 'Payment detail', 'Publish']
        } else {
          return [
            'Basic information',
            'Detail information',
            'Images',
            'Choose a plan',
            'Payment',
            'Publish',
          ]
        }
      } else {
        return ['Basic information', 'Detail information', 'Images', 'Payment detail', 'Publish']
      }
    } else {
      return [
        'Basic information',
        'Detail information',
        'Images',
        'Choose a plan',
        'Payment',
        'Publish',
      ]
    }
  }
  const [activeStep, setActiveStep] = useState(0)

  function getStepContent(step) {
    switch (step) {
      case 0:
        if (typeOfListing == 'Business') {
          return (
            <>
              <ListingTypes nextStep={nextStep} />
            </>
          )
        } else {
          return (
            <>
              <FranchiseListingTypes nextStep={nextStep} />
            </>
          )
        }

      case 1:
        if (typeOfListing == 'Business') {
          if (role == 'broker' || role == 'agent') {
            return (
              <>
                <DetailInformation
                  detailInformationStep4={detailInformationStep4}
                  detailStepBack4={detailStepBack4}
                />
              </>
            )
          } else {
            return (
              <>
                <DetailInformation
                  detailInformationStep4={detailInformationStep4}
                  detailStepBack4={detailStepBack4}
                />
              </>
            )
          }
        } else {
          if (role == 'broker' || role == 'agent') {
            return (
              <>
                <FranchiseDetailInformation
                  detailInformationStep4={detailInformationStep4}
                  detailStepBack4={detailStepBack4}
                />
              </>
            )
          } else {
            return (
              <FranchiseDetailInformation
                detailInformationStep4={detailInformationStep4}
                detailStepBack4={detailStepBack4}
              />
            )
          }
        }

      case 2:
        if (typeOfListing == 'Business') {
          if (role == 'broker' || role == 'agent') {
            return <MultiImages imgStepStep5={imgStepStep5} imgStepBack={imgStepBack} />
          } else {
            return (
              <>
                <MultiImages imgStepStep5={imgStepStep5} imgStepBack={imgStepBack} />
              </>
            )
          }
        } else {
          if (role == 'broker' || role == 'agent') {
            return <FranchiseMultiImages imgStepStep5={imgStepStep5} imgStepBack={imgStepBack} />
          } else {
            return (
              <>
                <FranchiseMultiImages imgStepStep5={imgStepStep5} imgStepBack={imgStepBack} />
              </>
            )
          }
        }

      case 3:
        if (role == 'broker' || role == 'agent' || biz_id) {
          if (role !== 'broker' && role !== 'agent') {
            if (status == '1' || status == 1) {
              return (
                <>
                  <PaymentDetails
                    PaymentDetailsStep={PaymentDetailsStep}
                    paymentDetailsStepBack={paymentDetailsStepBack}
                  />
                </>
              )
            } else {
              return (
                <ChoosePlan
                  choosePlanStep={choosePlanStep}
                  choosePlanStepBack2={choosePlanStepBack2}
                />
              )
            }
          } else {
            return (
              <>
                <PaymentDetails
                  PaymentDetailsStep={PaymentDetailsStep}
                  paymentDetailsStepBack={paymentDetailsStepBack}
                />
              </>
            )
          }
        } else {
          return (
            <ChoosePlan choosePlanStep={choosePlanStep} choosePlanStepBack2={choosePlanStepBack2} />
          )
        }

      case 4:
        if (typeOfListing == 'Business') {
          if (role == 'broker' || role == 'agent' || biz_id) {
            if (role !== 'broker' && role !== 'agent') {
              if (status == '1' || status == 1) {
                return (
                  <>
                    <Preview previewStepBack={previewStepBack} />
                  </>
                )
              } else {
                return (
                  <BillingDetails
                    billingDetailStep3={billingDetailStep3}
                    billingStepBack3={billingStepBack3}
                  />
                )
              }
            } else {
              return (
                <>
                  <Preview previewStepBack={previewStepBack} />
                </>
              )
            }
          } else {
            return (
              <BillingDetails
                billingDetailStep3={billingDetailStep3}
                billingStepBack3={billingStepBack3}
              />
            )
          }
        } else {
          if (role == 'broker' || role == 'agent' || biz_id) {
            if (role !== 'broker' && role !== 'agent') {
              if (status == '1' || status == 1) {
                return (
                  <>
                    <FranchisePreview previewStepBack={previewStepBack} />
                  </>
                )
              } else {
                return (
                  <>
                    <BillingDetails
                      billingDetailStep3={billingDetailStep3}
                      billingStepBack3={billingStepBack3}
                    />
                  </>
                )
              }
            } else {
              return (
                <>
                  <FranchisePreview previewStepBack={previewStepBack} />
                </>
              )
            }
          } else {
            return (
              <>
                <BillingDetails
                  billingDetailStep3={billingDetailStep3}
                  billingStepBack3={billingStepBack3}
                />
              </>
            )
          }
        }
      case 5:
        if (typeOfListing == 'Business') {
          return <Preview previewStepBack={previewStepBack} />
        } else {
          return <FranchisePreview previewStepBack={previewStepBack} />
        }

      default:
        return 'BizOwnerSell'
    }
  }

  // step 1
  const nextStep = async () => {
    const stepSkip = await localStorage.getItem('stepSkipAble')
    if (subscriptionStatus == 'paid') {
      setActiveStep(activeStep + 1)
    } else if (stepSkip) {
      setActiveStep(activeStep + 1)
    } else {
      setActiveStep(activeStep + 1)
    }
  }
  const PaymentDetailsStep = () => {
    setActiveStep(activeStep + 1)
  }
  // choose Plan step

  const choosePlanStep = () => {
    setActiveStep(activeStep + 1)
  }

  // billing step

  const billingDetailStep3 = () => {
    setActiveStep(activeStep + 1)
  }
  // detail information

  const detailInformationStep4 = async () => {
    await setActiveStep(activeStep + 1)
  }
  // img step 5

  const imgStepStep5 = async () => {
    const stepSkip = await localStorage.getItem('stepSkipAble')
    if (role == 'broker') {
      setActiveStep(activeStep + 1)
    } else if (stepSkip) {
      setActiveStep(activeStep + 3)
    } else {
      setActiveStep(activeStep + 1)
    }
  }

  // backsteps

  const choosePlanStepBack2 = async () => {
    await setActiveStep(activeStep - 1)
  }
  const paymentDetailsStepBack = async () => {
    await setActiveStep(activeStep - 1)
  }
  // billing step back

  const billingStepBack3 = async () => {
    await setActiveStep(activeStep - 1)
  }

  // details step back

  const detailStepBack4 = async () => {
    const stepSkip = await localStorage.getItem('stepSkipAble')
    if (subscriptionStatus == 'paid') {
      await setActiveStep(activeStep - 1)
    } else if (stepSkip) {
      await setActiveStep(activeStep - 1)
    } else {
      await setActiveStep(activeStep - 1)
    }
  }
  // img step back

  const imgStepBack = async () => {
    const stepSkip = await localStorage.getItem('stepSkipAble')
    if (subscriptionStatus == 'paid') {
      await setActiveStep(activeStep - 1)
    } else if (stepSkip) {
      await setActiveStep(activeStep - 1)
    } else {
      await setActiveStep(activeStep - 1)
    }
  }
  // preview step back

  const previewStepBack = async () => {
    const stepSkip = await localStorage.getItem('stepSkipAble')
    if (role == 'broker') {
      await setActiveStep(activeStep - 1)
    } else if (stepSkip) {
      await setActiveStep(activeStep - 3)
    } else {
      await setActiveStep(activeStep - 1)
    }
  }

  const steps = getSteps()

  return (
    <>
      <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='container position-relative p-0  p-md-10 '>
          <div className='row bg-white rounded'>
            <div className='col-12 '>
              <span className='d-none d-sm-block'>
                <Stepper alternativeLabel activeStep={activeStep}>
                  {steps.map((step, index) => {
                    const labelProps = {}
                    const stepProps = {}

                    return (
                      <Step {...stepProps} key={index}>
                        <StepLabel {...labelProps}>{step}</StepLabel>
                      </Step>
                    )
                  })}
                </Stepper>
              </span>
              {activeStep === steps.length ? (
                <Typography variant='h3' align='center'>
                  Thank You
                </Typography>
              ) : (
                <>
                  {activeStep == 0 ? (
                    <>
                      <div className='d-flex  d-md-block'>
                        <div className='px-md-10 my-4 '>
                          <h3 className='text-start bizOwner-add-new-listing-headings pt-3 pb-md-3'>
                            Which type of listing?
                          </h3>
                          {biz_id && disableBtn == true ? (
                            <>
                              {' '}
                              <button
                                type='button'
                                className={`btn my-1 ms-1 my-sm-0 pe-md-13 py-1 py-md-4 ${
                                  disableBtnState == 'businessBtn'
                                    ? 'btn-active-bg py-2 py-md-5 pe-md-15 '
                                    : 'btn-stepper-disable  px-4 disabled'
                                }  btn-lg `}
                                // className='btn btn-light-primary btn-lg '
                                role='button'
                                data-kt-docs-advanced-forms='interactive'
                                name='business'
                              >
                                <input
                                  type='radio'
                                  className='ps-md-4 cursor-pointer pe-md-4 d-none d-md-inline form-check-input addListing-radio-btns'
                                  name='business'
                                  disabled
                                  checked={disableBtnState == 'businessBtn'}
                                />
                                Business
                              </button>
                              <button
                                type='button'
                                className={`btn my-1 my-sm-0 pe-md-13 ms-1 py-1 py-md-4 ${
                                  disableBtnState == 'businessBtn'
                                    ? 'btn-stepper-disable px-3   disabled'
                                    : 'btn-active-bg py-2 py-md-5 pe-md-15'
                                } mx-md-3 `}
                                data-kt-docs-advanced-forms='interactive'
                                name='franchise'
                              >
                                <input
                                  for='CSS'
                                  type='radio'
                                  className='ps-md-4 cursor-pointer pe-md-4 d-none d-md-inline form-check-input addListing-radio-btns'
                                  name='franchise'
                                  checked={disableBtnState == 'franchiseBtn'}
                                  disabled
                                  value='CSS'
                                />
                                Franchise
                              </button>
                            </>
                          ) : (
                            <>
                              {' '}
                              <button
                                type='button'
                                className={`btn my-1 ms-1 my-sm-0 pe-md-13 py-2 py-md-4 ${
                                  typeOfListing == 'Business'
                                    ? 'btn-active-bg  py-2 py-md-5 pe-md-15 '
                                    : 'business-btn-stepper px-md-7 disable franchise-btn-stepper'
                                }  btn-lg `}
                                // className='btn btn-light-primary btn-lg '
                                role='button'
                                data-kt-docs-advanced-forms='interactive'
                                name='business'
                                onClick={(e) => WhichTypeOfListingChange(e)}
                              >
                                <input
                                  type='radio'
                                  className='ps-md-4 cursor-pointer pe-md-4  d-none d-md-inline form-check-input addListing-radio-btns'
                                  name='business'
                                  checked={typeOfListing === 'Business'}
                                  onClick={(e) => WhichTypeOfListingChange(e)}
                                />
                                Business
                              </button>
                              <button
                                type='button'
                                className={`btn my-1 ms-1 my-sm-0 pe-md-13 py-2 py-md-4 ${
                                  typeOfListing == 'Business'
                                    ? 'franchise-btn-stepper px-md-4 disable'
                                    : 'btn-active-bg py-2 py-md-5  pe-md-15'
                                } mx-md-3 `}
                                data-kt-docs-advanced-forms='interactive'
                                name='franchise'
                                onClick={(e) => WhichTypeOfListingChange(e)}
                              >
                                <input
                                  for='CSS'
                                  type='radio'
                                  className='ps-md-4 cursor-pointer pe-md-4 d-none d-md-inline form-check-input addListing-radio-btns'
                                  name='franchise'
                                  checked={typeOfListing === 'franchise'}
                                  onClick={(e) => WhichTypeOfListingChange(e)}
                                  value='CSS'
                                />
                                Franchise
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ) : null}

                  <form>{getStepContent(activeStep)}</form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddListing
