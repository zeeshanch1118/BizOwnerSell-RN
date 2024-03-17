import React, { useState } from "react";
import { Link } from "react-router-dom";
import zoom from "../../../../assets/images/zoom.jpg";
import Paper from "@mui/material/Paper";
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
    link: "/steppernegotiating-strategies",
  },
  {
    label: "Finalize the Deal",
    link: "/stepper/finalize-the-deal",
  },
];
const SetanAskingPricePartial = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <div style={{marginBottom:"10px", marginTop:"5px"}}>
        <div className="row g-4 recent-insights-row bizOwner-top-img pb-3">
        <div className="col-lg-8 col-md-12 ">
          <div className="row g-0 ">
            <div className="col-12">
              <img
                src={zoom}
                className="img-fluid rounded-start border border-bottom-0 w-100 closed-img"
                alt="..."
              />
            </div>
            <div className="col-12 border my-0">
              <div className="card-body text-body">
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
</div>
      <div style={{marginBottom:"10px", paddingTop:"12px"}}>
        <div className="row g-4 recent-insights-row">
          <div className="col-lg-8 col-md-12">
            <div className="card bizOwner-padding">
              <Link
                to="/stepper/no-one-will-pay-you-for-a-business-amounts-to-60-hours-at-16-dollars-an-hour"
                className="text-decoration-none">
                <div className="row g-0">
                  <div className="col-lg-5 col-sm-12 col-md-5 no-one-buy-img">
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className="card-text text-start">
                      <small className="text-muted minute-bg">
                        6 minute read
                      </small>
                    </p>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-12">
                    <div className="card-body border">
                      <h5 className="card-title text-start bizOwner-headings">
                      No One Will Pay You for a Business That Amounts to Working 60 Hours a Week at...
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
                to="/stepper/how-to-increase-the-value-of-your-business"
                className="text-decoration-none">
                <div className="row g-0">
                  <div className="col-lg-5 col-sm-12 col-md-5 evaluate-img">
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className="card-text text-start">
                      <small className="text-muted minute-bg">
                        6 minute read
                      </small>
                    </p>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-12">
                    <div className="card-body border">
                      <h5 className="card-title text-start bizOwner-headings">
                      How to Increase the Value of Your Business X5
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
                to="/stepper/how-to-determine-the-asking-price-for-your-business"
                className="text-decoration-none">
                <div className="row g-0">
                  <div className="col-lg-5 col-sm-12 col-md-5 threeKey-img">
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className="card-text text-start">
                      <small className="text-muted minute-bg">
                        4 minute read
                      </small>
                    </p>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-12">
                    <div className="card-body border">
                      <h5 className="card-title bizOwner-headings text-start">
                      How to Determine an Asking Price for Your Business
                      </h5>
                      <p className="card-text bizOwner-parag text-start text-black">
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
              <Link to='/stepper/normalizing-adjustment-in-rent-for-business-appraisal'
                className="text-decoration-none">
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 normalize-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text bizOwner-parag text-start">
                    <small className="text-muted minute-bg">
                      6 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body border">
                    <h5 className="card-title bizOwner-headings text-start">
                        Normalizing Adjustment in Rent for Business Appraisal
                    </h5>
                    <p className="card-text bizOwner-parag text-start text-black">
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
              <Link to='/stepper/mixing-apples-and-pineapples-buildup-method-in-business-valuation'
              className="text-decoration-none">
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 mixing-apple-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text bizOwner-parag text-start">
                    <small className="text-muted minute-bg">
                      8 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body border">
                    <h5 className="card-title bizOwner-headings text-start">
                      Mixing Apples and Pineapples: The Build-Up...
                    </h5>
                    <p className="card-text bizOwner-parag text-start text-black">
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
              <Link to='/stepper/in-business-valuation-how-does-one-judge-an-opinion'
                className="text-decoration-none">
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 judge-opinion-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text text-start">
                    <small className="text-muted minute-bg">
                      8 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body border">
                    <h5 className="card-title bizOwner-headings text-start">
                      In Business Valuation, How Does One Judge an Opinion?
                    </h5>
                    <p className="card-text text-start bizOwner-parag text-black">
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
              <Link to='/stepper/valuing-a-business-that-has-no-future'
                className="text-decoration-none">
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
                      <h5 className="card-title bizOwner-headings text-start">
                        Valuing a Business That Has No Future
                      </h5>
                      <p className="card-text text-start bizOwner-parag text-black">
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
              <Link to='/stepper/a-detailed-account-of-how-an-appraiser-values-a-business'
                className="text-decoration-none">
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
                      <h5 className="card-title bizOwner-headings text-start">
                        What Does the Business Appraisal Process Look Like? A Detailed...
                      </h5>
                      <p className="card-text text-start bizOwner-parag text-black">
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
              <Link to='/stepper/how-can-you-tell-if-the-business-appraisal-report-you-receive-is-any-good'
                className="text-decoration-none">
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
                      <h5 className="card-title bizOwner-headings text-start">
                        How Can You Tell If the Business Appraisal Report You Receive is Any Good?
                      </h5>
                      <p className="card-text text-start bizOwner-parag text-black">
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
              <Link to='/stepper/6-rules-of-thumb-for-business-valuation'
                className="text-decoration-none">
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
                      <h5 className="card-title bizOwner-headings text-start">
                        6 Rules of Thumb for Business Valuation
                      </h5>
                      <p className="card-text text-start bizOwner-parag text-black">
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
              <Link to='/stepper/choosing-a-business-appraiser'
                className="text-decoration-none">
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
                      <h5 className="card-title bizOwner-headings text-start">
                        Choosing a Business Appraiser
                      </h5>
                      <p className="card-text text-start bizOwner-parag text-black">
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
              <Link to='/stepper/how-to-increase-the-value-of-your-business-and-attract-buyers'
                className="text-decoration-none">
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
                      <h5 className="card-title bizOwner-headings text-start">
                        How to Increase the Value of Your Business and Attract Buyers
                      </h5>
                      <p className="card-text text-start bizOwner-parag text-black">
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
              <Link to='/stepper/how-to-make-your-business-more-marketable'
                className="text-decoration-none">
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
                      <h5 className="card-title bizOwner-headings text-start">
                        How to Make Your Business More Marketable
                      </h5>
                      <p className="card-text text-start bizOwner-parag text-black">
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
          <Link to="/stepper/attract-buyers">
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

export default SetanAskingPricePartial;
