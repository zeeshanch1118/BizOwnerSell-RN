import React, {useState} from 'react'
import closeDeal from "../../../../assets/images/close-deal.jpg";
import { Link } from 'react-router-dom';
import Paper from "@mui/material/Paper";
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
const FinalizeTheDealPartial = () => {
  const [activeStep, setActiveStep] = useState(4);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  return (
    <>
    <div style={{marginBottom:"10px", paddingTop:"17px"}}>
        <div className="row g-4 recent-insights-row">
    <div className="col-lg-8 col-md-12">
    <div className="row g-0 ">
      <div className="col-12">
        <img
          src={closeDeal}
          className="img-fluid rounded-start border border-bottom-0 w-100 "
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
        <div className="row g-4 recent-insights-row">
          <div className="col-lg-8 col-md-12">
            
            <div className="card bizOwner-padding">
            <Link to='/stepper/sell-preparing-for-due-diligence-what-sellers-need-to-know-about-business' className='text-decoration-none'>
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 evaluate-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text  bizOwner-parag">
                    <small className="text-muted minute-bg">
                      6 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body border">
                    <h5 className="card-title text-start bizOwner-headings">
                    Preparing for Due Diligence - What Sellers Want to Know About Buyers
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
            <Link to='/stepper/preparing-your-purchase-and-sale-agreement' className='text-decoration-none'>
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 threeKey-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text text-start">
                    <small className="text-muted minute-bg">
                      3 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body border">
                    <h5 className="card-title text-start bizOwner-headings">
                    Preparing Your Purchase and Sale Agreement
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
            <Link to='/stepper/sell-closing-the-sale-and-securing-the-deal' className='text-decoration-none'>
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 spotBusiness-img">
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

          {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }} className='mx-4'>
               
              </Paper>
            )}
            <Link to='/learning-center/seller-articles'>
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

export default FinalizeTheDealPartial;
