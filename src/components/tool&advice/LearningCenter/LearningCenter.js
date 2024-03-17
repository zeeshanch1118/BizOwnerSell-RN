import React from 'react'
import BuyerImg from '../../../assets/LearningCenter/buyer-learning-center.jpg'
import SellerImg from '../../../assets/LearningCenter/seller-learning-center.jpg'
import { Link } from 'react-router-dom'
import './LearningCenter.css'
import {
  BsFillStarFill,
  BsHddNetworkFill
} from "react-icons/bs";
import {
  MdOutlinePages,
  MdAutoStories
} from "react-icons/md";
import {

  FaIndustry,
  FaMoneyBillAlt
} from "react-icons/fa";


const LearningCenter = () => {
  return (
    <div>
      <div className="buy-bg">
        <div className="container text-start">

          <h2 className="text-white learning-heading pb-3">Learning Center</h2>
        </div>
        <div className='cards-bg'>
          <div className='container'>
            <div className='row g-4'>
              <div className='col-lg-4 col-md-4 col-sm-12'>
                <div className='card'>
                  <div className='card-title'>
                    <div className='col-12'>
                      <img src={BuyerImg} className='mw-100 card-img-top' />
                    </div>
                    <div className='card-body text-center'>
                      <Link to='/how-to-buy-a-business'>
                        <button className='px-12 fs-2 border-0 rounded btn-primary text-white py-3 text-nowrap'>How to Buy a Business</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-4 col-md-4 col-sm-12'>
                <div className='card'>
                  <div className='card-title'>
                    <div className='col-12'>
                      <img src={SellerImg} className='mw-100 card-img-top' />
                    </div>
                    <div className='card-body text-center'>
                      <Link to='/how-to-sell-a-business'>
                        <button className='px-12 fs-2 border-0 rounded btn-primary text-white py-3'>How to Sell a Business</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-4 col-md-4 col-sm-12'>
                <div className='card'>
                  <div className='card-title'>
                    <div className='col-12'>
                      <img src={BuyerImg} className='mw-100 card-img-top' />
                    </div>
                    <div className='card-body text-center'>
                      <Link to='/how-to-value-a-business'>
                        <button className='px-10 fs-2 text-nowrap border-0 rounded btn-primary text-white py-3'>How to Value a Business</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
      <div className='container mt-4'>
        <div className='row'>

          <h4 className='py-4 fs-1 fw-light'>Featured Articles</h4>
          <div className=" mb-4">
            <div className="row gy-2 gx-4 recent-insights-row">
              <div className="col-lg-8 col-md-12">

                <div className="card mb-3">
                  <Link to='/stepper/how-to-create-a-successful-business-for-sale-listing-online'
                    className='text-decoration-none'>
                    <div className="row g-0">
                      <div className="col-lg-5 col-sm-12 col-md-5 smVsbg-img minute-parent">
                        {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                        <p className="card-text text-start">
                          <small className="text-muted minute-bg fs-6">
                            5 minute read
                          </small>
                        </p>
                      </div>
                      <div className="col-lg-7 col-md-7 col-sm-12 border">
                        <div className="card-body">
                          <h5 className="card-title text-start bizOwner-headings">
                            Using a Broker to Sell Your Business to a Friend or Family
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
                  <Link to='/learning-center/is-there-a-boom-for-business-buyers-within-this-gloom'
                    className='text-decoration-none'>
                    <div className="row g-0">
                      <div className="col-lg-5 col-sm-12 col-md-5 smBvalue-img minute-parent">
                        {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                        <p className="card-text text-start">
                          <small className="text-muted minute-bg fs-6">
                            5 minute read
                          </small>
                        </p>
                      </div>
                      <div className="col-lg-7 col-md-7 col-sm-12 border">
                        <div className="card-body">
                          <h5 className="card-title text-start bizOwner-headings">
                            Podcast: The Joys and Perils of Buying a Big City Salon
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
                  <Link to='/stepper/selling-your-business-is-all-about-timing'
                    className='text-decoration-none'>
                    <div className="row g-0">
                      <div className="col-lg-5 col-sm-12 col-md-5 bestBusiness-img minute-parent">
                        {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                        <p className="card-text text-start">
                          <small className="text-muted minute-bg fs-6">
                            4 minute read
                          </small>
                        </p>
                      </div>
                      <div className="col-lg-7 col-md-7 col-sm-12 border">
                        <div className="card-body">
                          <h5 className="card-title text-start bizOwner-headings">
                            Retaining Key Employees Is Critical to Selling Your Business
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
                  <div className="row g-0">
                    <div className="col-lg-5 col-sm-12 col-md-5 closed-img minute-parent">
                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                      <p className="card-text text-start">
                        <small className="text-muted minute-bg fs-6">
                          4 minute read
                        </small>
                      </p>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-12 border">
                      <div className="card-body">
                        <h5 className="card-title text-start bizOwner-headings">
                          Why Experienced Business Brokers and the Owners...
                        </h5>
                        <p className="card-text text-start bizOwner-parag">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is a
                          little bit longer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 col-md-12">
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-lg-5 col-sm-12 col-md-5 closed-img minute-parent">
                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                      <p className="card-text text-start">
                        <small className="text-muted minute-bg fs-6">
                          8 minute read
                        </small>
                      </p>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-12 border">
                      <div className="card-body">
                        <h5 className="card-title text-start bizOwner-headings">
                          Restaurant Unit Sales in Q1 2022 Up 42 Percent...
                        </h5>
                        <p className="card-text text-start bizOwner-parag">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is a
                          little bit longer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 col-md-12">
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-lg-5 col-sm-12 col-md-5 closed-img minute-parent">
                      {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                      <p className="card-text text-start">
                        <small className="text-muted minute-bg fs-6">
                          8 minute read
                        </small>
                      </p>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-12 border">
                      <div className="card-body">
                        <h5 className="card-title text-start bizOwner-headings">
                          No One Will Pay You for a Business That Amounts to Working...
                        </h5>
                        <p className="card-text text-start bizOwner-parag">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is a
                          little bit longer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='pt-2'>
                  <Link to='/how-to-buy-a-business'>
                    <button className='border-0 btn-primary rounded text-white p-2 mx-2 my-2 fs-4'>Buyer Learning Center</button>
                  </Link>
                  <Link to='/how-to-sell-a-business'>
                    <button className='border-0 btn-primary rounded text-white p-2 mx-2 my-2 fs-4'>Seller Learning Center</button>
                  </Link>
                </div>

              </div>
              <div className="col-lg-4 col-md-12 tools-column">
                <h3 className="text-start fs-1 fw-normal border-bottom py-4">
                  Expanded Resources
                </h3>
                <div className="text-start fs-1 text-primary">
                 

                 
                  <li className="list-unstyled border-bottom buyer-tools">
                    <MdAutoStories className="" />
                    <Link to="/small-business-success-stories" className=" mx-3 bizOwner-tools">
                      Success Stories{" "}
                    </Link>
                  </li>
                 
                  <li className="list-unstyled border-bottom buyer-tools">
                    <FaIndustry className="" />
                    <Link to="/learning-center/industries" className=" mx-3 bizOwner-tools">
                      Industry Specific Tips{" "}
                    </Link>
                  </li>
                 
                </div>
              </div>

            </div>
          </div>

          <div className='col-lg-4 col-md-4 col-sm-12'>
            <div className='card mb-3 border'>
              <div className='card-title'>
                <div className='col-12 text-black px-4 mt-4'>
                  <h5 className='fs-2 fw-light'>Ready to Buy a Business?</h5>
                  <p className='fs-5'>Search our inventory of over 45,000 business for sale to find the perfect fit for your location, interest, and lifestyle.</p>
                </div>
                <div className='card-body text-start'>
                  <button className='p-2 fs-6 text-lg-nowrap border-0 rounded btn-primary text-white'>Start Your Search</button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-4 col-sm-12'>
            <div className='card mb-3 border' >
              <div className='card-title'>
                <div className='col-12 text-black px-4 mt-4'>
                  <h5 className='fs-2 fw-light'>Ready to Sell Your Business?</h5>
                  <p className='fs-5'>Search our inventory of over 45,000 business for sale to find the perfect fit for your location, interest, and lifestyle.</p>
                </div>
                <div className='card-body text-start'>
                  <button className='p-2 fs-6 text-lg-nowrap border-0 rounded btn-primary text-white'>Create Your Ad</button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-4 col-sm-12'>
            <div className='card mb-3 border'>
              <div className='card-title'>
                <div className='col-12 text-black px-4 mt-4'>
                  <h5 className='fs-2 fw-light'>Ready to Value a Business?</h5>
                  <p className='fs-5'>Search our inventory of over 45,000 business for sale to find the perfect fit for your location, interest, and lifestyle.</p>
                </div>
                <div className='card-body text-start'>
                  <Link to='/how-to-value-a-business'>
                    <button className='p-2 fs-6 text-lg-nowrap border-0 rounded btn-primary text-white'>Value a Business</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningCenter
