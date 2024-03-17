import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import stepFour from "../../../../../assets/images/stepFour.jpg";
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
const GetFinancingPartial = () => {
  const [activeStep, setActiveStep] = useState(3);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
    <div style={{marginBottom:"10px"}}>
        <div className="row gy-2 gx-4 recent-insights-row bizOwner-top-img">
     <div className="col-lg-8 col-md-12 mt-5">
            <div className="row g-0 ">
              <div className="col-12">
                <img
                  src={stepFour}
                  className="img-fluid rounded-start border border-bottom-0 w-100"
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
                  <h5 className="card-title pt-4 text-start bizOwner-headings">
                  What Is Seller Financing for a Business?
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
            
            <div className="card bizOwner-padding ">
            <Link to='/stepper/what-is-seller-financing-for-business' className='text-decoration-none'>
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 closed-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text text-start">
                    <small className="text-muted minute-bg fs-6">
                      5 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body border">
                    <h5 className="card-title text-start bizOwner-headings">
                      Opportunities in Buying and Selling Closed Businesses
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
            <div className="card bizOwner-padding ">
            <Link to='/stepper/the-dos-and-donts-of-seller-financing-a-business-for-sale' className='text-decoration-none'>
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
                    <h5 className="card-title text-start bizOwner-headings">
                    The Do’s and Don’ts of Seller Financing a Business for Sale
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
            <div className="card bizOwner-padding ">
            <Link to='/stepper/demystifying-sba-loans-for-buying-a-business-or-franchise' className='text-decoration-none'>
            
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
                    <h5 className="card-title text-start bizOwner-headings">
                      Opportunities in Buying and Selling Closed Businesses
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
            <div className="card bizOwner-padding ">
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
                    <h5 className="card-title text-start bizOwner-headings">
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

          <div className="col-lg-8 col-md-12">
            <div className="card bizOwner-padding ">
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
                    <h5 className="card-title text-start bizOwner-headings">
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
                <button
                  className="step-one-btn"
                  onClick={() => handleReset()}
                  sx={{ mt: 1, mr: 1 }}>
                  Show All
                </button>
              </div>
            )}
            <Link to='/stepper/close-the-deal'>
            <button
           
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
              className="step-one-btn mx-4 mb-4">
              Go To Step Five
              {/* {index === steps.length - 1 ? 'Finish' : 'Continue'} */}
            </button></Link>
          </div>
            </div>
            </>
  )
}

export default GetFinancingPartial;
