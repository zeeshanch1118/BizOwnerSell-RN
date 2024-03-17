import React, {useEffect, useState} from 'react'
import {Typography, Stepper, Step, StepLabel} from '@material-ui/core'
import Select from 'react-select'
import {makeStyles} from '@material-ui/core/styles'

import BasicInformation from './Step1/BasicInformation'
import ChoosePlan from './Step2/ChoosePlan'

import Preview from './step6/Preview'

import MultiImages from './step5/MultiImages'
import DetailInformation from './step4/DetailInformation'

import BillingDetails from './Step3/BillingDetails'

import '../../../../../../components/BuyBizzOwner.css'

import './BrokerRegistration.css'

import {KTCard} from '../../../../../../_metronic/helpers'
import PaymentDetails from './Payment-details/PaymentDetails'
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
const BrokerRegistration = () => {
  const useStyles = makeStyles((theme) => ({
    button: {
      marginRight: theme.spacing(1),
    },
  }))

  function getSteps() {
    return ['Basic information', 'Detail Information', 'Company Images', 'Choose a Plan', 'Payment']
  }
  const [activeStep, setActiveStep] = useState(0)

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <BasicInformation
              // listingData={listingPropsData}
              // dropDownListing={dropDownListingProps}
              nextStep={nextStep}
            />
          </>
        )

      case 1:
        return (
          <>
            <DetailInformation detailInformationStep4={detailInformationStep4} />
          </>
        )

      case 2:
        return (
          <>
            <MultiImages imgStepStep5={imgStepStep5} imgStepBack={imgStepBack} />
          </>
        )

      case 3:
        return (
          <>
            <ChoosePlan choosePlanStep={choosePlanStep} choosePlanStepBack2={choosePlanStepBack2} />
          </>
        )

      case 4:
        return (
          <>
            <BillingDetails billingDetailStep3={billingDetailStep3} />
          </>
        )

      case 5:
        return (
          <>
            <Preview previewStepBack={previewStepBack} />
          </>
        )

      default:
        return 'BizOwnerSell'
    }
  }
  const nextStep = () => {
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
    await setActiveStep(activeStep + 1)
  }
  const choosePlanStepBack2 = async () => {
    await setActiveStep(activeStep - 1)
  }

  // details step back
  const [detailStepBack, setDetailStepBack] = useState(2)

  // img step back

  const imgStepBack = async () => {
    await setActiveStep(activeStep - 1)
  }
  // preview step back
  const [previewBack, setPreviewBack] = useState(4)

  const previewStepBack = async () => {
    await setActiveStep(activeStep - 1)
  }
  const classes = useStyles()
  const steps = getSteps()
  const location = useLocation()
  useEffect(() => {
    if (location?.state) {
      setActiveStep(activeStep + location?.state?.id)
    } else {
      setActiveStep(0)
    }
  }, [location?.state?.id])

  return (
    <>
      <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5'}}>
        <div className='container position-relative  p-md-10 '>
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
                <form>{getStepContent(activeStep)}</form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BrokerRegistration
