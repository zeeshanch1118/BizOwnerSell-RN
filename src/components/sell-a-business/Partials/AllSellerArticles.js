import React from 'react'
import { Link } from 'react-router-dom'
import './AllSellerArticles.css';
import {
    BsFillStarFill,
    BsNewspaper,
    BsPersonSquare,
    BsSearch,
} from "react-icons/bs";

const AllSellerArticles = () => {
  return (
      <>
          <div className="understand-bg buyer-bg">
              <div className="container">
                  <h5 className="text-start seller-learning-heading lead text-white">Valuation Learning Center</h5>
                  <h3 className="text-start main-stepper-heading text-white">
                      Resources for Business Buyers
                  </h3>
              </div>
          </div>
          <div className="container mt-8">
              <div className="row gy-2 gx-5 recent-insights-row parent-div ">
                  <div className="col-lg-8 col-md-12">

                      <div className="card mb-3">
                          <Link
                              to="/stepper/is-my-business-worth-selling"
                              className="text-decoration-none">
                              <div className="row g-0">
                                  <div className="col-lg-5 col-sm-12 col-md-5 no-future-img">
                                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                                      <p className="card-text text-start">
                                          <small className="text-muted minute-bg fs-6">
                                              9 minute read
                                          </small>
                                      </p>
                                  </div>
                                  <div className="col-lg-7 col-md-7 col-sm-12">
                                      <div className="card-body border">
                                          <h5 className="card-title text-start fs-2 fw-light text-primary">
                                              Is My Business Worth Selling?
                                          </h5>
                                          <p className="card-text text-start text-black fs-5">
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
                      <div className="card mb-3">
                          <Link
                              to="/stepper/how-to-create-a-business-exit-strategy-and-avoid-costly-mistakes"
                              className="text-decoration-none">
                              <div className="row g-0">
                                  <div className="col-lg-5 col-sm-12 col-md-5 appraisal-img">
                                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                                      <p className="card-text text-start">
                                          <small className="text-muted minute-bg fs-6">
                                              4 minute video
                                          </small>
                                      </p>
                                  </div>
                                  <div className="col-lg-7 col-md-7 col-sm-12">
                                      <div className="card-body border">
                                          <h5 className="card-title text-start fs-2 fw-light text-primary">
                                              Before You Buy — Recognizing Small Business Value Drivers
                                          </h5>
                                          <p className="card-text text-start text-black fs-5">
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
                      <div className="card mb-3">
                          <Link
                              to='/stepper/buying-a-business-how-to-decide-the-best-business-to-own'
                              className="text-decoration-none">
                              <div className="row g-0">
                                  <div className="col-lg-5 col-sm-12 col-md-5 appraisal-report-img">
                                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                                      <p className="card-text text-start">
                                          <small className="text-muted minute-bg fs-6">
                                              4 minute read
                                          </small>
                                      </p>
                                  </div>
                                  <div className="col-lg-7 col-md-7 col-sm-12">
                                      <div className="card-body border">
                                          <h5 className="card-title text-start fs-2 fw-light text-primary">
                                              Before You Buy — Recognizing Small Business Value Drivers
                                          </h5>
                                          <p className="card-text text-start text-black fs-5">
                                              There may be a big incentive supporting text below as a
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
                      <div className="card mb-3">
                          <Link
                              to="/stepper/selling-your-business-is-all-about-timing"
                              className="text-decoration-none">
                              <div className="row g-0">
                                  <div className="col-lg-5 col-sm-12 col-md-5 six-rules-img">
                                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                                      <p className="card-text text-start">
                                          <small className="text-muted minute-bg fs-6">
                                              4 minute read
                                          </small>
                                      </p>
                                  </div>
                                  <div className="col-lg-7 col-md-7 col-sm-12">
                                      <div className="card-body border">
                                          <h5 className="card-title text-start fs-2 fw-light text-primary">
                                              Buying A Business? How to Decide the Best Business to Own
                                          </h5>
                                          <p className="card-text text-start text-black fs-5">
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
                      <div className="card mb-3">
                          <Link to='/stepper/no-one-will-pay-you-for-a-business-amounts-to-60-hours-at-16-dollars-an-hour'>
                              <div className="row g-0">
                                  <div className="col-lg-5 col-sm-12 col-md-5 choosing-img">
                                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                                      <p className="card-text text-start">
                                          <small className="text-muted minute-bg fs-6">
                                              5 minute read
                                          </small>
                                      </p>
                                  </div>
                                  <div className="col-lg-7 col-md-7 col-sm-12">
                                      <div className="card-body border">
                                          <h5 className="card-title text-start fs-2 fw-light text-primary">
                                              No One Will Pay You for a Business That Amounts to Working 60 Hours a Week at $16/Hour
                                          </h5>
                                          <p className="card-text text-start fs-5 text-black">
                                              Seller financing a business for sale is when the owner is
                                              willing to personally finance a portion of the purchase
                                              price.
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </Link>
                      </div>
                  </div>

                  <div className="col-lg-8 col-md-12">
                      <div className="card mb-3">
                          <Link to='/stepper/how-to-increase-the-value-of-your-business'>
                              <div className="row g-0">
                                  <div className="col-lg-5 col-sm-12 col-md-5 increase-value-img">
                                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                                      <p className="card-text text-start">
                                          <small className="text-muted minute-bg fs-6">
                                              4 minute read
                                          </small>
                                      </p>
                                  </div>
                                  <div className="col-lg-7 col-md-7 col-sm-12">
                                      <div className="card-body border">
                                          <h5 className="card-title text-start fs-2 fw-light text-primary">
                                              How to Increase the Value of Your Business X5
                                          </h5>
                                          <p className="card-text text-start fs-5 text-black">
                                              Determining an asking price for your business can be
                                              tricky. If you price it too high, you won’t attract any
                                              interest.
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </Link>
                      </div>

                  </div>
                  <div className="col-lg-8 col-md-12">
                      <div className="card mb-3">
                          <Link to='/stepper/how-to-determine-the-asking-price-for-your-business'>
                              <div className="row g-0">
                                  <div className="col-lg-5 col-sm-12 col-md-5 opinion-img">
                                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                                      <p className="card-text text-start">
                                          <small className="text-muted minute-bg fs-6">
                                              4 minute read
                                          </small>
                                      </p>
                                  </div>
                                  <div className="col-lg-7 col-md-7 col-sm-12">
                                      <div className="card-body border">
                                          <h5 className="card-title text-start fs-2 fw-light text-primary">
                                              How to Determine an Asking Price for Your Business
                                          </h5>
                                          <p className="card-text text-start fs-5 text-black">
                                              Determining an asking price for your business can be
                                              tricky. If you price it too high, you won’t attract any
                                              interest.
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </Link>
                      </div>
                  </div>

                      <div className="col-lg-8 col-md-12">
                          <div className="card mb-3">
                          <Link to='/stepper/how-to-create-a-successful-business-for-sale-listing-online'>
                                  <div className="row g-0">
                                      <div className="col-lg-5 col-sm-12 col-md-5 opinion-img">
                                          {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                                          <p className="card-text text-start">
                                              <small className="text-muted minute-bg fs-6">
                                                  4 minute read
                                              </small>
                                          </p>
                                      </div>
                                      <div className="col-lg-7 col-md-7 col-sm-12">
                                          <div className="card-body border">
                                              <h5 className="card-title text-start fs-2 fw-light text-primary">
                                              Evaluating a Business for Sale - What to Ask the Owner
                                              </h5>
                                              <p className="card-text text-start fs-5 text-black">
                                                  Determining an asking price for your business can be
                                                  tricky. If you price it too high, you won’t attract any
                                                  interest.
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                              </Link>
                          </div>
                  </div>
                  <div className="col-lg-8 col-md-12">
                      <div className="card mb-3">
                          <Link to='/stepper/how-to-select-great-photos-for-your-business-for-sale-listing'>
                              <div className="row g-0">
                                  <div className="col-lg-5 col-sm-12 col-md-5 opinion-img">
                                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                                      <p className="card-text text-start">
                                          <small className="text-muted minute-bg fs-6">
                                              4 minute read
                                          </small>
                                      </p>
                                  </div>
                                  <div className="col-lg-7 col-md-7 col-sm-12">
                                      <div className="card-body border">
                                          <h5 className="card-title text-start fs-2 fw-light text-primary">
                                              How to Select Great Photos for Your Business-for-Sale Listing
                                          </h5>
                                          <p className="card-text text-start fs-5 text-black">
                                              Determining an asking price for your business can be
                                              tricky. If you price it too high, you won’t attract any
                                              interest.
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </Link>
                      </div>
                  </div>
                  <div className="col-lg-8 col-md-12">
                      <div className="card mb-3">
                          <Link to='/stepper/keeping-the-sale-of-your-business-confidential'>
                              <div className="row g-0">
                                  <div className="col-lg-5 col-sm-12 col-md-5 opinion-img">
                                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                                      <p className="card-text text-start">
                                          <small className="text-muted minute-bg fs-6">
                                              4 minute read
                                          </small>
                                      </p>
                                  </div>
                                  <div className="col-lg-7 col-md-7 col-sm-12">
                                      <div className="card-body border">
                                          <h5 className="card-title text-start fs-2 fw-light text-primary">
                                              Keeping the Sale of Your Business Confidential
                                          </h5>
                                          <p className="card-text text-start fs-5 text-black">
                                              Determining an asking price for your business can be
                                              tricky. If you price it too high, you won’t attract any
                                              interest.
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </Link>
                      </div>
                  </div>
                  <div className="col-lg-8 col-md-12">
                      <div className="card mb-3">
                          <Link to='/stepper/sell-what-is-seller-financing-for-business'>
                              <div className="row g-0">
                                  <div className="col-lg-5 col-sm-12 col-md-5 opinion-img">
                                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                                      <p className="card-text text-start">
                                          <small className="text-muted minute-bg fs-6">
                                              4 minute read
                                          </small>
                                      </p>
                                  </div>
                                  <div className="col-lg-7 col-md-7 col-sm-12">
                                      <div className="card-body border">
                                          <h5 className="card-title text-start fs-2 fw-light text-primary">
                                              What Is Seller Financing for a Business?
                                          </h5>
                                          <p className="card-text text-start fs-5 text-black">
                                              Determining an asking price for your business can be
                                              tricky. If you price it too high, you won’t attract any
                                              interest.
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </Link>
                      </div>
                  </div>

                  <div className="col-lg-8 col-md-12">
                      <div className="card mb-3">
                          <Link to='/stepper/sell-the-dos-and-donts-of-seller-financing-a-business-for-sale'>
                              <div className="row g-0">
                                  <div className="col-lg-5 col-sm-12 col-md-5 opinion-img">
                                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                                      <p className="card-text text-start">
                                          <small className="text-muted minute-bg fs-6">
                                              4 minute read
                                          </small>
                                      </p>
                                  </div>
                                  <div className="col-lg-7 col-md-7 col-sm-12">
                                      <div className="card-body border">
                                          <h5 className="card-title text-start fs-2 fw-light text-primary">
                                              The Do’s and Don’ts of Seller Financing a Business for Sale
                                          </h5>
                                          <p className="card-text text-start fs-5 text-black">
                                              Determining an asking price for your business can be
                                              tricky. If you price it too high, you won’t attract any
                                              interest.
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </Link>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 tools-column mt-lg-10">
                      <div className="row g-4">
                          {/* <div className="col-12 text-end border pb-4">
                              <div className="row g-0 align-items-center">
                                  <h3 className="text-start my-4 stepper-heading">
                                      Get our detailed guide to Buying a Business
                                  </h3>

                                  <div className="col-6 book-img">
                                  </div>
                                  <div className="col-6">
                                      <p>
                                          Price : ${" "}
                                          <span className="text-decoration-line-through">
                                              19.95
                                          </span>{" "}
                                          <span className="free-text"> FREE!</span>
                                      </p>
                                      <button className="border-0 book-btn rounded">
                                          Download Now
                                      </button>
                                  </div>
                              </div>
                          </div> */}
                          <div className="col-12">
                              <h3 className="text-start fw-light border-bottom bizOwner-paddingy">
                                  Tools for Buyers
                              </h3>
                              <div className="text-start text-primary">
                                 
                                  <li className="list-unstyled border-bottom bizOwner-paddingy">
                                      <BsPersonSquare />
                                      <Link to="#" className=" bizOwner-tools">
                                          Find a Broker{" "}
                                      </Link>
                                  </li>
                                  <li className="list-unstyled border-bottom bizOwner-paddingy">
                                      <BsSearch />
                                      <Link to="#" className=" bizOwner-tools">
                                          Search for a Business{" "}
                                      </Link>
                                  </li>
                                  <li className="list-unstyled border-bottom bizOwner-paddingy">
                                      <BsSearch />
                                      <Link to="#" className=" bizOwner-tools">
                                          Industry Specific Tips{" "}
                                      </Link>
                                  </li>
                                  <li className="list-unstyled border-bottom bizOwner-paddingy">
                                      <BsPersonSquare />
                                      <Link to="#" className=" bizOwner-tools">
                                          Success Stories{" "}
                                      </Link>
                                  </li>
                                 
                              </div>
                          </div>

                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default AllSellerArticles