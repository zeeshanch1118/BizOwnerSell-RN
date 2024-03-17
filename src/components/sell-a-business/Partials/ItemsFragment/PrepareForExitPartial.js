import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import misileMan from "../../../../assets/images/misile-man.jpg";
import './ItemsFragment.css'
import Paper from "@mui/material/Paper";

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
const PrepareForExitPartial = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
    
    <div style={{marginBottom:"10px", marginTop:"5px"}}>
        <div className="row g-4 recent-insights-row bizOwner-top-img">
      <div className="col-lg-8 col-md-12 ">
            <div className="row g-0 ">
              <div className="col-12">
                <img
                  src={misileMan}
                  className="img-fluid rounded-start border border-bottom-0 w-100 closed-img"
                  alt="..."
                />
              </div>
              <div className="col-12 my-0">
                <div className="card-body text-body border">
                  <p className="card-text text-start">
                    <small className="text-muted minute-text-bg">
                      5 minute read
                    </small>
                  </p>
                  <h5 className="card-title text-start pt-4 step-headings bizOwner-headings">
                    Retaining Key Employees Is Critical to Selling Your Business
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
           
            <div className="card bizOwner-padding border">
            <Link to='/stepper/is-my-business-worth-selling'
            className='text-decoration-none'>
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 smVsbg-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text text-start">
                    <small className="text-muted minute-bg">
                      5 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body">
                    <h5 className="card-title text-start bizOwner-headings">
                    Is My Business Worth Selling?
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
            <div className="card border bizOwner-padding">
            <Link to='/stepper/how-to-create-a-business-exit-strategy-and-avoid-costly-mistakes'
            className='text-decoration-none'>
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 smBvalue-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text text-start">
                    <small className="text-muted minute-bg">
                      5 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body">
                    <h5 className="card-title text-start bizOwner-headings">
                    How to Create a Business Exit Strategy and Avoid Costly Mistakes
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
            <div className="card border bizOwner-padding">
            <Link to='/stepper/selling-your-business-is-all-about-timing'
            className='text-decoration-none'>
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 bestBusiness-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text text-start">
                    <small className="text-muted minute-bg">
                      4 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body">
                    <h5 className="card-title text-start bizOwner-headings">
                    Selling Your Business Is All About Timing
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
            <div className="card border bizOwner-padding">
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 closed-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text text-start">
                    <small className="text-muted minute-bg">
                      4 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body">
                    <h5 className="card-title text-start bizOwner-headings">
                    Documents and Information Required for Selling a Business
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
            <div className="card border bizOwner-padding">
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
                  <div className="card-body">
                    <h5 className="card-title text-start bizOwner-headings">
                    Going Solo: The Facts About Selling Your Business Independently
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
            <div className="card border bizOwner-padding">
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
                  <div className="card-body">
                    <h5 className="card-title text-start bizOwner-headings">
                    Selecting Your Sales Team
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
              <Paper square elevation={0} sx={{ p: 3 }} className='mx-4'>
                <button
                  className="step-one-btn"
                  onClick={() => handleReset()}
                  sx={{ mt: 1, mr: 1 }}>
                  Show All
                </button>
              </Paper>
            )}
          <Link to='/stepper/set-an-asking-price'>
            <button
           
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
              className="step-one-btn mx-4 mb-5">
              Go To Step Two
              {/* {index === steps.length - 1 ? 'Finish' : 'Continue'} */}
            </button></Link>
            </div>
            </div>
            </>
  )
}

export default PrepareForExitPartial
