import React, {useState} from 'react'
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";
import './SellerStepper.css';

import {
  BsFillStarFill,
  BsNewspaper,
  BsPersonSquare,
  BsSearch,
} from "react-icons/bs";
import {
  MdWebStories,
  MdOutlineInsights,
  MdOutlineCoronavirus,
  MdOutlineSell,
  MdAccountBalance,
} from "react-icons/md";

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
  

const NegotiatingStrategies = () => {
    const [SellerActiveStep, setSellerActiveStep] = useState(3);
  return (
    <div>
      <div className="understand-bg buyer-bg">
        <div className="container">
          <h5 className="text-start seller-learning-heading lead text-white">Seller Learning Center</h5>
          <h3 className="text-start main-stepper-heading text-white">
            Step 4: Negotiating Strategies
          </h3>
        </div>
      </div>
      <div className="container">
        <div className="row g-5 parent-div">
         
          <div className="mt-2">
           <Outlet/>
           
          </div>
          <div className="col-lg-4 col-md-6 tools-column pt-lg-12">
            <div className="row g-4">
            <Box sx={{ maxWidth: 400 }}>
              <h4 className="text-start stepper-heading">
                Learn more about each 
                step<br /> in the selling process
              </h4>
                <Stepper activeStep={SellerActiveStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === 4 ? (
                          <Typography variant="caption"></Typography>
                        ) : null
                      }
                      className="text-primary border-bottom">
                      <Link
                        to={step.link}
                        className="text-primary bizOwner-stepper-text">
                        {step.label}
                      </Link>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          
            {/* <div className="col-12 text-end border pb-4">
                <div className="row g-0 align-items-center">
                  <h3 className="text-start stepper-heading my-4">
                    Get our detailed guide to<br/> Selling a Business
                  </h3>

                  <div className="col-6 book-img">
                  </div>
                  <div className="col-6 text-start">
                    <p>
                      Price : ${" "}
                      <span className="text-decoration-line-through">
                        19.95
                      </span>{" "}
                      <span className="free-text"> FREE!</span>
                    </p>
                    <button className="border-0 btn-primary p-3 fs-6 text-white rounded">
                      Download Now
                    </button>
                  </div>
                </div>
              </div> */}
              <div className="col-12 border">
                <h3 className="text-start border-bottom fs-1 fw-light py-4">
                  Tools for Sellers
                </h3>
                <div className="text-start text-primary">
                  <li className="list-unstyled border-bottom bizOwner-paddingy">
                    <MdOutlineSell className="" />
                    <Link to="#" className="bizOwner-tools">
                      List Your Business for Sale{" "}
                    </Link>
                  </li>
                
                
                  <li className="list-unstyled border-bottom bizOwner-paddingy">
                    <MdAccountBalance className="" />
                    <Link to="#" className="bizOwner-tools">
                      Estimate Business Value{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom bizOwner-paddingy">
                    <BsNewspaper className="" />
                    <Link to="#" className="bizOwner-tools">
                      Get Our Newsletters{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom bizOwner-paddingy">
                    <MdOutlineInsights className="" />
                    <Link to="#" className="bizOwner-tools">
                      Quaterly Insight Report{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom bizOwner-paddingy">
                    <MdWebStories className="" />
                    <Link to="/small-business-success-stories" className="bizOwner-tools">
                      Success Stories{" "}
                    </Link>
                  </li>

                  {/* <li className="list-unstyled border-bottom bizOwner-paddingy text-nowrap">
                    <MdOutlineCoronavirus className="" />
                    <Link to="#" className="bizOwner-tools ">
                      Covid 19: Buyer Resources{" "}
                    </Link>
                  </li> */}
                </div>
              </div>
              
            </div>
          </div>
            
        </div>
      </div>
    </div>
  )
}

export default NegotiatingStrategies
