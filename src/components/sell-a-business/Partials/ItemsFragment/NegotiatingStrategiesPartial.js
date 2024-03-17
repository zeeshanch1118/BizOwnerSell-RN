import React, { useState } from "react";
import { Link } from "react-router-dom";
import stepFour from "../../../../assets/images/stepFour.jpg";
import './ItemsFragment.css'
const steps = [
  {
    label: "Prepare for Your Exit",
    link: "/stepper/prepare-for-your-exit",
  },
  {
    label: "Set an Asking Price",
    link: "/stepper/set-an-asking-price",
  },
  {
    label: "Attract Buyers",
    link: "/stepper/attract-buyers",
  },
  {
    label: "Negotiating Strategies",
    link: "/stepper/negotiating-strategies",
  },
  {
    label: "Finalize the Deal",
    link: "/stepper/finalize-the-deal",
  },
];
const NegotiatingStrategiesPartial = () => {
  const [activeStep, setActiveStep] = useState(3);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <div style={{marginBottom:"10px", paddingTop:"17px"}}>
        <div className="row g-4 recent-insights-row">
          <div className="col-lg-8 col-md-12">
            <div className="row g-0 ">
              <div className="col-12">
                <img
                  src={stepFour}
                  className="img-fluid rounded-start border border-bottom-0 w-100 closed-img"
                  alt="..."
                />
              </div>
              <div className="col-12 border my-0">
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
        <div className="row g-4 recent-insights-row">
          <div className="col-lg-8 col-md-12">
            <div className="card bizOwner-padding">
              <Link
                to="/stepper/negotiating-strategies-incentives-to-motivate-buyers-and-close-the-deal"
                className="text-decoration-none">
                <div className="row g-0">
                  <div className="col-lg-5 col-sm-12 col-md-5 bestBusiness-img">
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
                        Negotiating Strategies: Incentives to Motivate Buyers
                        and Close the Deal
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
              <Link
                to="/stepper/sell-what-is-seller-financing-for-business"
                className="text-decoration-none">
                <div className="row g-0">
                  <div className="col-lg-5 col-sm-12 col-md-5 evaluate-img">
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
                        What Is Seller Financing for a Business?
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
              <Link
                to="/stepper/sell-the-dos-and-donts-of-seller-financing-a-business-for-sale"
                className="text-decoration-none">
                <div className="row g-0">
                  <div className="col-lg-5 col-sm-12 col-md-5 spotBusiness-img">
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
                        The Do’s and Don’ts of Seller Financing a Business for
                        Sale
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
            <div square elevation={0} sx={{ p: 3 }} className="mx-4">
              <button
                className="step-one-btn"
                onClick={() => handleReset()}
                sx={{ mt: 1, mr: 1 }}>
                Show All
              </button>
            </div>
          )}
          <Link to="/stepper/finalize-the-deal">
            <button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
              className="step-one-btn mx-4 mb-4">
              Go To Step Five
              {/* {index === steps.length - 1 ? 'Finish' : 'Continue'} */}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NegotiatingStrategiesPartial;
