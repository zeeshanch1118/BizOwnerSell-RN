import React, {useState} from 'react'
import closeDeal from "../../../../../assets/images/close-deal.jpg";
import { Link } from 'react-router-dom';
import './ItemsFragment.css'
const steps = [
  {
    label: "UnderStand Your Options",
    link : '/stepper/understand-your-options'
  },
  {
    label: "Find the Right Business",
    link : '/stepper/find-the-right-business'
  },
  {
    label: "Make an Offer",
    link : '/stepper/make-an-offer'
  },
  {
    label: "Get Financing",
    link : '/stepper/get-financing'
  },
  {
    label: "Close the Deal",
    link : '/stepper/close-the-deal'
  },
];
const CloseTheDealPartial = () => {
  const [activeStep, setActiveStep] = useState(4);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  return (
    <>
    <div style={{marginBottom:"10px"}}>
        <div className="row gy-2 gx-4 recent-insights-row bizOwner-top-img">
    <div className="col-lg-8 col-md-12 mt-5">
    <div className="row g-0 ">
      <div className="col-12">
        <img
          src={closeDeal}
          className="img-fluid rounded-start border border-bottom-0 mw-100 closed-img"
          alt="..."
        />
      </div>
      <div className="col-12 my-0">
        <div className="card-body border text-body">
          <p className="card-text text-start">
            <small className="text-muted minute-text-bg fs-6">
              5 minute read
            </small>
          </p>
          <h5 className="card-title pt-4 text-start  bizOwner-headings">
            3 Professionals to Have on Your Team When Buying a Business
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
        <div className="row gy-2 gx-4 recent-insights-row">
          <div className="col-lg-8 col-md-12">
            
            <div className="card bizOwner-padding">
            <Link to='/stepper/due-diligence-checklist-what-to-verify-before-buying-a-business' className='text-decoration-none'>
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 closed-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text text-start">
                    <small className="text-muted minute-bg fs-6">
                      6 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body border">
                    <h5 className="card-title text-start  bizOwner-headings">
                    Due Diligence Checklist - What to Verify...
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
            <Link to='/stepper/preparing-for-due-diligence-what-sellers-need-to-know-about-business-buyers' className='text-decoration-none'>
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 closed-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text text-start">
                    <small className="text-muted minute-bg fs-6">
                      3 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body border">
                    <h5 className="card-title text-start  bizOwner-headings">
                    Preparing for Due Diligence - What Sellers Will Ask Buyers
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
            <Link to='/stepper/closing-the-sale-and-securing-the-deal' className='text-decoration-none'>
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 closed-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text text-start">
                    <small className="text-muted minute-bg fs-6">
                      8 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body border">
                    <h5 className="card-title text-start  bizOwner-headings">
                    Closing the Sale and Securing the Deal
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
                    <small className="text-muted minute-bg fs-6">
                      8 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body border">
                    <h5 className="card-title text-start  bizOwner-headings">
                      Opportunities in Buying and Selling Closed Businesses
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
               
              </div>
            )}
          <Link to='/learning-center/buyer-articles'>
            <button
           
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
              className="step-one-btn mx-4 mb-5">
              Show All Articles
              {/* {index === steps.length - 1 ? 'Finish' : 'Continue'} */}
            </button></Link>
          
            </div>
            </div>
            </>
  )
}

export default CloseTheDealPartial;
