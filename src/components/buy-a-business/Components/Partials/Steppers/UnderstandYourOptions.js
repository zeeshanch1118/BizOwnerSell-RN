import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import "./UnderstandYourOptions.css";
import { Link, Outlet } from "react-router-dom";
import './Stepper.css';

import {
  BsFillStarFill,
  BsNewspaper,
  BsPersonSquare,
  BsSearch,
} from "react-icons/bs";
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

const UnderstandYourOptions = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
      <div className="understand-bg buyer-bg py-3">
        <div className="container">
          <h5 className="text-start lead seller-learning-heading text-white">Buyer Learning Center</h5>
          <h3 className="text-start main-stepper-heading text-white">
            Step 1: Understand Your Options
          </h3>
        </div>
      </div>
      <div className="container">
        <div className="row g-5 parent-div">
         
          <div className="mt-2">
            {/* <UnderStandYourOptions /> */}
            <Outlet/>
           
          </div>
          <div className="col-lg-4 col-md-12 tools-column mt-lg-17">
            <div className="row g-4">
            <Box sx={{ maxWidth: 400 }}>
              <h4 className="text-start stepper-heading">
                Learn more about each <br />
                step in the buying process
              </h4>
                <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === 4 ? (
                          <Typography ></Typography>
                        ) : null
                      }
                      className="text-primary border-bottom">
                      <Link
                        to={step.link}
                        className=" bizOwner-stepper-text">
                        {step.label}
                      </Link>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          
          
              <div className="col-12">
                <h3 className="text-start fw-light border-bottom bizOwner-paddingy">
                  Tools for Buyers
                </h3>
                <div className="text-start text-primary">
                 
               
                  <li className="list-unstyled border-bottom bizOwner-paddingy">
                    <BsSearch  />
                    <Link to="/search-businesses-for-sale" className=" bizOwner-tools">
                      Search for a Business{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom bizOwner-paddingy">
                    <BsSearch  />
                    <Link to="/learning-center/industries" className=" bizOwner-tools">
                      Industry Specific Tips{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom bizOwner-paddingy">
                    <BsPersonSquare />
                    <Link to="/small-business-success-stories" className=" bizOwner-tools">
                      Success Stories{" "}
                    </Link>
                  </li>
                 
                </div>
              </div>
              
            </div>
          </div>
            
        </div>
      </div>
    </div>
  );
};

export default UnderstandYourOptions;
