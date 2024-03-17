import React from 'react'
import MultiImages from './MultiImages'

const SliderImgs = () => {
  return (
    <>
      <h2>
        <MultiImages />
      </h2>
      {/* function getSteps() {
  return [
    'Basic information',
    'Choose a Plan',
    'Payment',
    'Detail information',
    'Pictures',
    'Preview',
  ]
}


      const whatTypeofListings = [
    {value: 'Business', label: 'Business'},
    {value: 'Franchise', label: 'Franchise'},
  ]
  const [typeOfListing, setTypeOfListing] = useState('Business')
  //   const [input, setInput] = useState()

  const WhichTypeOfListingChange = async (e) => {
    // console.log(e)
    await setTypeOfListing(e.value)
    console.log(typeOfListing)
    // console.log(startuplocation)
  }

  // step 1
  const [stepper, setStepper] = useState(2)

  const nextStep = (stepper) => {
    setStepper(stepper)
    setActiveStep(stepper)
  }

  // choose Plan step
  const [choosePlanStep, setChoosePlanStep] = useState(3)

  const choosePlanStep2 = (choosePlanStep) => {
    console.log('choosePlanStep', choosePlanStep)
    setChoosePlanStep(choosePlanStep)
    setActiveStep(3)
    console.log(activeStep)
  }

  // billing step
  const [billingDetails, setBillingDetails] = useState(4)

  const billingDetailStep3 = (billingDetails) => {
    setBillingDetails(billingDetails)
    setActiveStep(billingDetails)
  }
  // detail information
  const [detailInformation, setDetailInformation] = useState(5)

  const detailInformationStep4 = async (detailInformation) => {
    await setDetailInformation(detailInformation)
    await setActiveStep(detailInformation)
  }
  // img step 5
  const [imgStep, setImgStep] = useState(6)

  const imgStepStep5 = async (imgStep) => {
    await setImgStep(imgStep)
    await setActiveStep(imgStep)
  }

  // backsteps

  const [choosePlanBackStep, setChoosePlanBackStep] = useState(1)

  const choosePlanStepBack2 = async (choosePlanBackStep) => {
    await setImgStep(choosePlanBackStep)
    await setActiveStep(choosePlanBackStep)
  }
  // billing step back
  const [billingStepBack, setBillingStepBack] = useState(2)

  const billingStepBack3 = async (billingStepBack) => {
    await setImgStep(billingStepBack)
    await setActiveStep(billingStepBack)
  }

  // details step back
  const [detailStepBack, setDetailStepBack] = useState(3)

  const detailStepBack4 = async (detailStepBack) => {
    await setDetailStepBack(detailStepBack)
    await setActiveStep(3)
  }
  // img step back
  const [imgeStepBack, setImgeStepBack] = useState(4)

  const imgStepBack = async (imgeStepBack) => {
    await setImgeStepBack(imgeStepBack)
    await setActiveStep(imgeStepBack)
  }
  // preview step back
  const [previewBack, setPreviewBack] = useState(5)

  const previewStepBack = async (previewBack) => {
    await setPreviewBack(previewBack)
    await setActiveStep(previewBack)
  }

  // Preview data

  function getStepContent(step) {
    switch (step) {
      case 1:
        if (typeOfListing == 'Business') {
          return (
            <>
              <div className='col-10 mx-auto'>
                <label htmlFor='exampleFormControlInput1' className=' form-label'>
                  which type of listing ?
                </label>

                <div className=' '>
                  <Select
                    type='search'
                    value={typeOfListing}
                    name='listing'
                    options={whatTypeofListings}
                    selectedValue={typeOfListing}
                    placeholder={typeOfListing}
                    onChange={WhichTypeOfListingChange}
                  />
                </div>
              </div>

              <ListingTypes
                // listingData={listingPropsData}
                // dropDownListing={dropDownListingProps}
                nextStep={nextStep}
              />
            </>
          )
        } else {
          return (
            <>
              <div className='col-10 mx-auto'>
                <label htmlFor='exampleFormControlInput1' className=' form-label'>
                  which type of listing ?
                </label>

                <div className=' '>
                  <Select
                    type='search'
                    value={typeOfListing}
                    name='listing'
                    options={whatTypeofListings}
                    selectedValue={typeOfListing}
                    placeholder={typeOfListing}
                    onChange={WhichTypeOfListingChange}
                  />
                </div>
              </div>

              <FranchiesListingTypes
                // listingData={listingPropsData}
                // dropDownListing={dropDownListingProps}
                nextStep={nextStep}
              />
            </>
          )
        }

      case 2:
        if (typeOfListing == 'Business') {
          return (
            <>
              <ChoosePlan
                choosePlanStep2={choosePlanStep2}
                choosePlanStepBack2={choosePlanStepBack2}
              />
            </>
          )
        } else {
          return (
            <>
              <FranchiesChoosePlan
                choosePlanStep2={choosePlanStep2}
                choosePlanStepBack2={choosePlanStepBack2}
              />
            </>
          )
        }

      case 3:
        if (typeOfListing == 'Business') {
          return (
            <>
              <BillingDetails
                billingDetailStep3={billingDetailStep3}
                billingStepBack3={billingStepBack3}
              />
            </>
          )
        } else {
          return (
            <>
              <FranchiesBillingDetails
                billingDetailStep3={billingDetailStep3}
                billingStepBack3={billingStepBack3}
              />
            </>
          )
        }

      case 4:
        if (typeOfListing == 'Business') {
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
              <FranchiesDetailInformation
                detailInformationStep4={detailInformationStep4}
                detailStepBack4={detailStepBack4}
              />
            </>
          )
        }

      case 5:
        if (typeOfListing == 'Business') {
          return (
            <>
              <MultiImages imgStepStep5={imgStepStep5} imgStepBack={imgStepBack} />
            </>
          )
        } else {
          return (
            <>
              <FranchiesMultiImages imgStepStep5={imgStepStep5} imgStepBack={imgStepBack} />
            </>
          )
        }

      case 6:
        if (typeOfListing == 'Business') {
          return (
            <>
              <Preview previewStepBack={previewStepBack} />
            </>
          )
        } else {
          return (
            <>
              <FranchiesPreview previewStepBack={previewStepBack} />
            </>
          )
        }
      // default:
      //   return 'unknown step'
      default:
        return 'unknown step'

      // default:
      //   return 'unknown step'
    }
  }
) */}
</>
}

export default SliderImgs
