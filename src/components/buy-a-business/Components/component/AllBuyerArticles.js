import React from 'react'
import { Link } from 'react-router-dom'
import './AllBuyerArticles.css';
import {
    BsFillStarFill,
    BsNewspaper,
    BsPersonSquare,
    BsSearch,
} from "react-icons/bs";

const AllBuyerArticles = () => {
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
                              to="/stepper/buying-a-small-business-vs-a-big-business-why-size-matters"
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
                                          <h5 className="card-title text-start bizOwner-headings fw-light text-primary">
                                              advantages-of-buying-an-existing-business-vs-starting-a-new-business
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
                      <div className="card mb-3">
                          <Link
                              to="/stepper/before-you-buy-recognizing-small-business-value-drivers"
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
                                          <h5 className="card-title text-start bizOwner-headings fw-light text-primary">
                                              Buying a Small Business vs a Big Business — Why Size Matters
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
                                          <h5 className="card-title text-start bizOwner-headings fw-light text-primary">
                                              Before You Buy — Recognizing Small Business Value Drivers
                                          </h5>
                                          <p className="card-text text-start text-black bizOwner-parag">
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
                              to="/stepper/how-to-spot-best-business-to-buy-preliminary-due-diligence"
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
                                          <h5 className="card-title text-start bizOwner-headings fw-light text-primary">
                                              Buying A Business? How to Decide the Best Business to Own
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
                      <div className="card mb-3">
                          <Link to='/stepper/evaluating-a-business-for-sale-what-to-ask-the-owner'>
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
                                          <h5 className="card-title text-start bizOwner-headings fw-light text-primary">
                                              How to Spot the Best Business to Buy - Preliminary Due Diligence
                                          </h5>
                                          <p className="card-text text-start bizOwner-parag text-black">
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
                          <Link to='/stepper/buying-a-small-business-3-key-areas-to-focus-on'>
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
                                          <h5 className="card-title text-start bizOwner-headings fw-light text-primary">
                                              Evaluating a Business for Sale - What to Ask the Owner
                                          </h5>
                                          <p className="card-text text-start bizOwner-parag text-black">
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
                          <Link to='/stepper/valuing-a-small-business-determining-its-earning-potential'>
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
                                          <h5 className="card-title text-start bizOwner-headings fw-light text-primary">
                                              Evaluating a Business for Sale - What to Ask the Owner
                                          </h5>
                                          <p className="card-text text-start bizOwner-parag text-black">
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
                              <Link to='/stepper/6-rules-of-thumb-for-business-valuation'>
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
                                              <h5 className="card-title text-start bizOwner-headings fw-light text-primary">
                                              6 Rules of Thumb for Business Valuation
                                              </h5>
                                              <p className="card-text text-start bizOwner-parag text-black">
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
                          <Link to='/stepper/what-is-seller-financing-for-business'>
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
                                          <h5 className="card-title text-start bizOwner-headings fw-light text-primary">
                                              What Is Seller Financing for a Business?
                                          </h5>
                                          <p className="card-text text-start bizOwner-parag text-black">
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
                          <Link to='/stepper/the-dos-and-donts-of-seller-financing-a-business-for-sale'>
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
                                          <h5 className="card-title text-start bizOwner-headings fw-light text-primary">
                                              The Do’s and Don’ts of Seller Financing a Business for Sale
                                          </h5>
                                          <p className="card-text text-start bizOwner-parag text-black">
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
                          <Link to='/stepper/demystifying-sba-loans-for-buying-a-business-or-franchise'>
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
                                          <h5 className="card-title text-start bizOwner-headings fw-light text-primary">
                                              Evaluating a Business for Sale - What to Ask the Owner
                                          </h5>
                                          <p className="card-text text-start bizOwner-parag text-black">
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
                          <Link to='/stepper/preparing-for-due-diligence-what-sellers-need-to-know-about-business-buyers'>
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
                                          <h5 className="card-title text-start bizOwner-headings fw-light text-primary">
                                              Preparing for Due Diligence - What Sellers Will Ask Buyers
                                          </h5>
                                          <p className="card-text text-start bizOwner-parag text-black">
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
                                      <button className="border-0 btn-primary p-3 fs-6 text-white rounded">
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
                                      <BsSearch />
                                      <Link to="#" className=" bizOwner-tools">
                                          Search for a Business{" "}
                                      </Link>
                                  </li>
                                  <li className="list-unstyled border-bottom bizOwner-paddingy">
                                      <BsSearch />
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
      </>
  )
}

export default AllBuyerArticles