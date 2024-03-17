import React from 'react'
import { Link } from "react-router-dom";
import {
    MdOutlineMail,
    MdCoronavirus,
    MdOutlineNaturePeople,
    MdPointOfSale,
    MdOutlineAddBusiness,
  } from "react-icons/md";
  import {
    BsPersonSquare,
    BsNewspaper,
    BsFacebook,
    BsTwitter,
    BsLinkedin,
  } from "react-icons/bs"; 

const InnerSidebar = () => {
  return (
    <div>
       <div className="col-12">
                <h3 className="text-start fs-4">Resources & Advice</h3>
                <div className="text-start fs-3 text-primary">
                  {/* <li className="list-unstyled border-bottom lh-lg pb-3">
                    <MdCoronavirus className="" />
                    <Link to="/" className=" mx-3 tools">
                      Covid-19: Buyer Resources{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom lh-lg pb-3">
                    <MdCoronavirus className="" />
                    <Link to="/" className=" mx-3 tools">
                      Covid-19: Owner Resources
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom lh-lg pb-3">
                    <MdOutlineNaturePeople className="" />
                    <Link to="/" className=" mx-3 tools">
                      Get Help from a Broker
                    </Link>
                  </li> */}
                  <li className="list-unstyled border-bottom lh-lg pb-3">
                    <MdPointOfSale className="" />
            <Link to="/sell-a-business" className=" mx-3 tools">
                      List Your Business for Sale
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom lh-lg pb-3">
                    <MdOutlineAddBusiness className="" />
            <Link to="/small-business-valuation" className=" mx-3 tools">
                      Estimate Business Value
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom lh-lg pb-3">
                    <BsNewspaper className="" />
            <Link to="/subscribe" className=" mx-3 tools">
                      Get Our Newsletters
                    </Link>
                  </li>
                </div>
              </div>
              <div className="col-12 text-end pb-4 border-bottom">
                <h5 className="text-start border-bottom border-primary pb-2 pt-md-4">
                  Get our Free Guides
                </h5>
                <div className="row g-0 align-items-center">
                  <h3 className="text-start fs-6 my-2">
                    The BizOwnerSell Guide to Buying a Small Business
                  </h3>

                  <div className="col-6 book-img">
                    {/* <img src={babgBookCover} /> */}
                  </div>
                  <div className="col-6">
                    <p className="text-start lh-sm">
                      Get a detailed overview of the business buying process,
                      including how to find and value businesses and tips for
                      negotiating a buyer-seller friendly offer.
                    </p>
                    <p>
                      Price : ${" "}
                      <span className="text-decoration-line-through">
                        19.95
                      </span>{" "}
                      <span className="free-text">Now FREE!</span>
                    </p>
                    <button className="border-0 btn-primary text-white p-2 rounded">
                      Download Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 text-end pb-4">
                <div className="row g-0 align-items-center">
                  <h3 className="text-start fs-6 my-4">
                    The BizOwnerSell Guide to Selling Your Small Business
                  </h3>

                  <div className="col-6 book-img">
                    {/* <img src={babgBookCover} /> */}
                  </div>
                  <div className="col-6">
                    <p className="text-start lh-sm">
                      Get a complete overview of the business sales process and
                      step-by-step instructions to follow to help you prepare
                      for a profitable exit from your business.
                    </p>
                    <p>
                      Price : ${" "}
                      <span className="text-decoration-line-through">
                        19.95
                      </span>{" "}
                      <span className="free-text">Now FREE!</span>
                    </p>
                    <button className="border-0 btn-primary text-white p-2 rounded">
                      Download Now
                    </button>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default InnerSidebar
