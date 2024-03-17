import React, { useState } from "react";
import { Link } from "react-router-dom";
import zoom from "../../../../../assets/images/zoom.jpg";
import Paper from "@mui/material/Paper";
import './ItemsFragment.css'
const steps = [
  {
    label: "UnderStand Your Options",
    link: "/stepper/understand-your-options",
  },
  {
    label: "Find the Right Business",
    link: "/stepper/find-the-right-business",
  },
  {
    label: "Make an Offer",
    link: "/stepper/make-an-offer",
  },
  {
    label: "Get Financing",
    link: "/stepper/get-financing",
  },
  {
    label: "Close the Deal",
    link: "/stepper/close-the-deal",
  },
];
const FindTheRightBusiness = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <div style={{marginBottom:"10px"}}>
        <div className="row gy-2 gx-4 recent-insights-row bizOwner-top-img"></div>
        <div className="col-lg-8 col-md-12 mt-5">
          <div className="row g-0 ">
            <div className="col-12">
              <img
                src={zoom}
                className="img-fluid rounded-start border border-bottom-0 w-100 closed-img"
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
                  Beginning Your Search - Where to Find a Business for Sale
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

      <div style={{marginBottom:"10px", paddingTop:"12px"}}>
        <div className="row gy-2 gx-4 recent-insights-row">
          <div className="col-lg-8 col-md-12">
            <div className="card bizOwner-padding">
              <Link
                to="/stepper/how-to-spot-best-business-to-buy-preliminary-due-diligence"
                className="text-decoration-none">
                <div className="row g-0">
                  <div className="col-lg-5 col-sm-12 col-md-5 spotBusiness-img">
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className="card-text text-start">
                      <small className="text-muted minute-bg fs-6">
                        6 minute read
                      </small>
                    </p>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-12">
                    <div className="card-body border">
                      <h5 className="card-title text-start bizOwner-headings">
                        How to Spot the Best Business to Buy - Preliminary Due
                        Diligence
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
                to="/stepper/evaluating-a-business-for-sale-what-to-ask-the-owner"
                className="text-decoration-none">
                <div className="row g-0">
                  <div className="col-lg-5 col-sm-12 col-md-5 evaluate-img">
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className="card-text text-start">
                      <small className="text-muted minute-bg fs-6">
                        6 minute read
                      </small>
                    </p>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-12">
                    <div className="card-body border">
                      <h5 className="card-title text-start bizOwner-headings">
                      Evaluating a Business for Sale - What to Ask the Owner
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
                to="/stepper/buying-a-small-business-3-key-areas-to-focus-on"
                className="text-decoration-none">
                <div className="row g-0">
                  <div className="col-lg-5 col-sm-12 col-md-5 threeKey-img">
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className="card-text text-start">
                      <small className="text-muted minute-bg fs-6">
                        4 minute read
                      </small>
                    </p>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-12">
                    <div className="card-body border">
                      <h5 className="card-title text-start bizOwner-headings">
                      Buying a Small Business - 3 Key Areas to Focus On During Your Search
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
            <Paper square elevation={0} sx={{ p: 3 }} className="mx-4">
              <button
                className="step-one-btn"
                onClick={() => handleReset()}
                sx={{ mt: 1, mr: 1 }}>
                Show All
              </button>
            </Paper>
          )}
          <Link to="/stepper/make-an-offer">
            <button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
              className="step-one-btn mx-4 mb-4">
              Go To Step Three
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FindTheRightBusiness;
