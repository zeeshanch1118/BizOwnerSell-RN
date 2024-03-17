import React from 'react'
import { Link } from 'react-router-dom'
import './AllArticles.css';
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


const AllArticles = () => {
  return (
    <>
    <div className="understand-bg buyer-bg">
      <div className="container">
        <h5 className="text-start seller-learning-heading lead text-white">Valuation Learning Center</h5>
        <h3 className="text-start main-stepper-heading text-white">
          All Articles
        </h3>
      </div>
    </div>
      <div className="container mt-8">
          <div className="row gy-2 gx-5 recent-insights-row ">
              <div className="col-lg-8 col-md-12">
                 
                  <div className="card mb-3">
                      <Link
                              to="/stepper/valuing-a-business-that-has-no-future"
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
                                              Valuing a Business That Has No Future
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
                              to="/stepper/a-detailed-account-of-how-an-appraiser-values-a-business"
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
                                              What Does the Business Appraisal Process Look Like? A Detailed...
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
                              to='/stepper/how-can-you-tell-if-the-business-appraisal-report-you-receive-is-any-good'
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
                                              How Can You Tell If the Business Appraisal Report You...
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
                          to="/stepper/six-rules-of-thumb-for-business-valuation"
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
                                          6 Rules of Thumb for Business Valuation
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
                          <Link to='/stepper/choosing-a-business-appraiser'>
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
                                          Choosing a Business Appraiser
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
                          <Link to='/stepper/how-to-increase-the-value-of-your-business-and-attract-buyers'>
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
                                     How to Increase the Value of Your Business and Attract Buyers
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
                          <Link to='/stepper/in-business-valuation-how-does-one-judge-an-opinion'>
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
                                          In Business Valuation, How Does One Judge an Opinion?
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
             
          </div>
      </div>
      </>
  )
}

export default AllArticles