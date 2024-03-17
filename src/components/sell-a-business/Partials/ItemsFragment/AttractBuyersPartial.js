import React, {useState} from 'react'
import readingGirl from "../../../../assets/images/reading-girl.jpg";
import { Link } from 'react-router-dom';
import './ItemsFragment.css'
const steps = [
  {
    label: "Prepare for Your Exit",
    link : '/stepper/prepare-for-your-exit'
  },
  {
    label: "Set an Asking Price",
    link : '/stepper/set-an-asking-price'
  },
  {
    label: "Attract Buyers",
    link : '/stepper/attract-buyers'
  },
  {
    label: "Negotiating Strategies",
    link : '/stepper/negotiating-strategies'
  },
  {
    label: "Finalize the Deal",
    link : '/stepper/finalize-the-deal'
  },
];
const AttractBuyersPartial = () => {
  const [activeStep, setActiveStep] = useState(2);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
    <div style={{marginBottom:"10px", marginTop:"5px"}}>
    <div className="row g-4 bizOwner-top-img recent-insights-row">
    <div className="col-lg-8 col-md-12 mt-5">
          <div className="row g-0 ">
            <div className="col-12">
              <img
                src={readingGirl}
                className="img-fluid rounded-start border border-bottom-0 w-100 closed-img"
                alt="..."
              />
            </div>
            <div className="col-12 border my-0">
              <div className="card-body text-body">
                <p className="card-text text-start">
                  <small className="text-muted minute-text-bg">
                    5 minute read
                  </small>
                </p>
                <h5 className="card-title pt-4 text-start bizOwner-headings">
                  What to Look for In Small Business Financial Documents
                </h5>
                <p className="card-text text-start bizOwner-parag">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
    <div style={{marginBottom:"10px", paddingTop:"12px"}}>
    <div className="row g-4 recent-insights-row">
      <div className="col-lg-8 col-md-12">
       
        <div className="card bizOwner-padding">
        <Link to='/stepper/how-to-create-a-successful-business-for-sale-listing-online' className='text-decoration-none'>
          <div className="row g-0">
            <div className="col-lg-5 col-sm-12 col-md-5 threeKey-img">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg">
                  8 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start bizOwner-headings">
                10 Steps for Creating a Successful Online Business-for-Sale Listing
                </h5>
                <p className="card-text text-start text-black bizOwner-parag">
                  This is a wider card with supporting text below as a
                  natural lead-in to additional content. This content is a
                  little bit longer.
                </p>
              </div>
            </div>
          </div>
      </Link>
        </div>
      </div>

      <div className="col-lg-8 col-md-12">
        <div className="card bizOwner-padding">
        <Link to='/stepper/how-to-select-great-photos-for-your-business-for-sale-listing' className='text-decoration-none'>
          <div className="row g-0">
            <div className="col-lg-5 col-sm-12 col-md-5 closed-img">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg">
                  8 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start bizOwner-headings">
                How to Select Great Photos for Your Business-for-Sale Listing
                </h5>
                <p className="card-text text-start text-black bizOwner-parag">
                  This is a wider card with supporting text below as a
                  natural lead-in to additional content. This content is a
                  little bit longer.
                </p>
              </div>
            </div>
          </div>
          </Link>
        </div>
      </div>

      <div className="col-lg-8 col-md-12">
        <div className="card bizOwner-padding">
        <Link to='/stepper/keeping-the-sale-of-your-business-confidential' className='text-decoration-none'>
          <div className="row g-0">
            <div className="col-lg-5 col-sm-12 col-md-5 evaluate-img">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg">
                  8 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start bizOwner-headings">
                Keeping the Sale of Your Business Confidential
                </h5>
                <p className="card-text text-start text-black bizOwner-parag">
                  This is a wider card with supporting text below as a
                  natural lead-in to additional content. This content is a
                  little bit longer.
                </p>
              </div>
            </div>
          </div>
          </Link>
        </div>
      </div>

      <div className="col-lg-8 col-md-12">
        <div className="card bizOwner-padding">
          <div className="row g-0">
            <div className="col-lg-5 col-sm-12 col-md-5 closed-img">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg">
                  8 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start bizOwner-headings">
                Effective Negotiation Tactics to Get the Best Deal on a Business for Sale
                </h5>
                <p className="card-text text-start bizOwner-parag">
                  This is a wider card with supporting text below as a
                  natural lead-in to additional content. This content is a
                  little bit longer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

        {activeStep === steps.length && (
            <div square elevation={0} sx={{ p: 3 }} className='mx-4'>
              <button
                className="step-one-btn"
                onClick={() => handleReset()}
                sx={{ mt: 1, mr: 1 }}>
                Show All
              </button>
            </div>
          )}
          <Link to='/stepper/negotiating-strategies'>
          <button
         
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 1 }}
            className="step-one-btn mx-4 mb-4">
            Go To Step Four
            {/* {index === steps.length - 1 ? 'Finish' : 'Continue'} */}
          </button></Link>
        </div>
        </div>
        </>
  )
}

export default AttractBuyersPartial
