import React from 'react'
import {Link} from 'react-router-dom'
import {
  BsFillStarFill,
  BsNewspaper,
  BsPersonSquare,
  BsSearch,
} from "react-icons/bs";
import './ItemsFragment.css';

const SideTools = () => {
  return (
    <div className='container'>
    <div className='row'>
    <div className="col-lg-4 col-md-6 tools-column">
            <div className="row g-4">
              <div className="col-12 border">
              <h3 className="text-start buyer-tools border-bottom">
                  Tools for Buyers
                </h3>
                <div className="text-start fs-3 text-primary">
                  
                  <li className="list-unstyled border-bottom buyer-tools">
                    <BsSearch className="" />
                  <Link to="#" className=" mx-3 bizOwner-tools">
                      Search for a Business{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom buyer-tools">
                    <BsSearch className="" />
                  <Link to="#" className=" mx-3 bizOwner-tools">
                      Industry Specific Tips{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom buyer-tools">
                    <BsPersonSquare className="" />
                  <Link to="/small-business-success-stories" className=" mx-3 bizOwner-tools">
                      Success Stories{" "}
                    </Link>
                  </li>
                  
                  
                </div>
              </div>
            
            </div>
          </div>
          </div>
    </div>
  )
}

export default SideTools
