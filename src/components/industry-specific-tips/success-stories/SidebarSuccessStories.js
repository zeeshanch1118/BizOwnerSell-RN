import React from 'react'
import {FaIndustry, FaMoneyBillAlt} from 'react-icons/fa'
import { Link } from "react-router-dom";
import './SuccessStories.css';
import {

  BsNewspaper,
  BsPersonSquare,

} from "react-icons/bs";
import {
  MdWebStories,
  MdOutlineInsights,
  MdOutlineCoronavirus,
  MdOutlineSell,
  MdAccountBalance,
} from "react-icons/md";

const SidebarSuccessStories = () => {
  return (
    <div>
    {/* <div className='container'> */}
        {/* <div className='row g-4'> */}
        <div className="col-12">
                <h3 className="text-start fs-1 fw-normal border-bottom buyer-tools">
                  Tools for Sellers
                </h3>
                <div className="text-start fs-2 text-primary">
                  <li className="list-unstyled border-bottom buyer-tools ">
                    <MdOutlineSell className="" />
                    <Link to="#" className=" mx-3 bizOwner-tools">
                      List Your Business for Sale{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom buyer-tools ">
                    <MdAccountBalance className="" />
                    <Link to="#" className=" mx-3 bizOwner-tools">
                      Estimate Business Value{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom buyer-tools">
                    <BsNewspaper className="" />
                    <Link to="#" className=" mx-3 bizOwner-tools">
                      Get Our Newsletters{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom buyer-tools ">
                    <MdOutlineInsights className="" />
                    <Link to="#" className=" mx-3 bizOwner-tools">
                      Quaterly Insight Report{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom buyer-tools ">
                    <MdWebStories className="" />
                    <Link to="/small-business-success-stories" className=" mx-3 bizOwner-tools">
                      Success Stories{" "}
                    </Link>
                  </li>

                  {/* <li className="list-unstyled border-bottom buyer-tools text-nowrap">
                    <MdOutlineCoronavirus className="" />
                    <Link to="/covid-19-resources-for-small-business-buyers" className=" mx-3 bizOwner-tools ">
                      Covid 19: Buyer Resources{" "}
                    </Link>
                  </li> */}
                </div>
              </div>
              {/* <div className="col-12 text-end border pb-4">
                <div className="row g-0 align-items-center mx-4">
                  <h3 className="text-start fs-1 fw-light my-4">
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
                    <button className=" border-0 btn-primary text-white p-3 fs-5 rounded">
                      Download Now
                    </button>
                  </div>
                </div>
              </div> */}
        </div>
    // </div>
       
    // </div>
  )
}

export default SidebarSuccessStories
