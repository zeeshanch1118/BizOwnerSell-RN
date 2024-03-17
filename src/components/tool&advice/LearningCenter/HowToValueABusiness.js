import React from 'react'
import HowToValueImg from '../../../assets/LearningCenter/how-to-value-a-business.jpeg'
import {Link} from 'react-router-dom'
import './HowToValueABusiness.css';
import {
  BsFillStarFill,
  BsNewspaper,
  BsPersonSquare,
  BsSearch,
  BsHddNetworkFill,
} from 'react-icons/bs'
import {MdOutlineMail, MdOutlinePages, MdOutlineCoronavirus, MdAutoStories} from 'react-icons/md'
import {FaIndustry, FaMoneyBillAlt} from 'react-icons/fa'

const HowToValueABusiness = () => {
  return (
    <div>
      <div className='buy-bg'>
        <div className='container text-start py-2'>
          <h3 className='text-white fs-3 lead'>Learning Center</h3>
          <h2 className='text-white fs-1 fw-normal pb-2'>Valuation Learning Center</h2>
        </div>
      </div>
      <div className='container border-bottom py-8'>
        <div className='row g-5 align-items-center'>
          <div className='col-lg-4 col-md-12 text-start border p-6'>
            <h1 className='fs-1 fw-normal py-3'>How to Value a Business</h1>
            <p className='fs-4'>
              Learn <span className='text-primary'>what a business is worth</span> through:
              <li className='ms-3'> BizOwnerSell valuation report for a comparative
              estimate</li>
              <li className='ms-3'> A personalized, one-on-one comprehensive analysis from DealCoach</li> 
              <li className='ms-3'>The BizWorth
              Calculator for when you need a ballpark estimate</li> <br/>
              Having an accurate valuation will
              help you make better business decisions, as well as assist during the buying, selling
              or liquidating process.
              
             
            </p>
          </div>
          <div className='col-lg-8 col-md-12 text-md-center'>
            <img src={HowToValueImg} className='img-fluid border mw-100' />
          </div>
        </div>
      </div>

      <div className='container pt-8'>
        <div className='row gy-2 gx-5 recent-insights-row '>
          <div className='col-lg-8 col-md-12'>
            <div className='card mb-3'>
              <Link
                to='/stepper/why-business-brokers-and-owners-utilize-third-party-business-appraisals'
                className='text-decoration-none'
              >
                <div className='row g-0'>
                  <div className='col-lg-5 col-sm-12 col-md-5 closed-img'>
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className='card-text text-start'>
                      <small className='text-muted minute-bg fs-6'>8 minute read</small>
                    </p>
                  </div>
                  <div className='col-lg-7 col-md-7 col-sm-12'>
                    <div className='card-body border'>
                      <h5 className='card-title text-start bizOwner-headings'>
                        Why Experienced Business Brokers and the Owners They Represent Utilize...
                      </h5>
                      <p className='card-text text-start text-black bizOwner-parag'>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className='col-lg-8 col-md-12'>
            <div className='card mb-3'>
              <Link
                to='/stepper/6-rules-of-thumb-for-business-valuation'
                className='text-decoration-none'
              >
                <div className='row g-0'>
                  <div className='col-lg-5 col-sm-12 col-md-5 cares-img'>
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className='card-text text-start'>
                      <small className='text-muted minute-bg fs-6'>5 minute read</small>
                    </p>
                  </div>
                  <div className='col-lg-7 col-md-7 col-sm-12'>
                    <div className='card-body border'>
                      <h5 className='card-title text-start bizOwner-headings'>
                        6 Rules of Thumb for Business Valuation
                      </h5>
                      <p className='card-text text-start text-black bizOwner-parag'>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className='col-lg-8 col-md-12'>
            <div className='card mb-3'>
              <Link
                to='/stepper/is-there-a-boom-for-business-buyers-within-this-gloom'
                className='text-decoration-none'
              >
                <div className='row g-0'>
                  <div className='col-lg-5 col-sm-12 col-md-5 boom-img'>
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className='card-text text-start'>
                      <small className='text-muted minute-bg fs-6'>6 minute read</small>
                    </p>
                  </div>
                  <div className='col-lg-7 col-md-7 col-sm-12'>
                    <div className='card-body border'>
                      <h5 className='card-title text-start bizOwner-headings'>
                        Is there a Boom for Business Buyers within this Gloom ?
                      </h5>
                      <p className='card-text text-start text-black bizOwner-parag'>
                        There may be a big incentive supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className='col-lg-8 col-md-12'>
            <div className='card mb-3'>
              <Link
                to='/stepper/mixing-apples-and-pineapples-buildup-method-in-business-valuation'
                className='text-decoration-none'
              >
                <div className='row g-0'>
                  <div className='col-lg-5 col-sm-12 col-md-5 covid-thrive-img'>
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className='card-text text-start'>
                      <small className='text-muted minute-bg fs-6'>4 minute read</small>
                    </p>
                  </div>
                  <div className='col-lg-7 col-md-7 col-sm-12'>
                    <div className='card-body border'>
                      <h5 className='card-title text-start bizOwner-headings'>
                        Mixing Apples and Pineapples: The Build-Up Method in Business Valuation
                      </h5>
                      <p className='card-text text-start text-black bizOwner-parag'>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className='col-lg-8 col-md-12'>
            <div className='card mb-3'>
              <div className='row g-0'>
                <div className='col-lg-5 col-sm-12 col-md-5 closed-img'>
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className='card-text text-start'>
                    <small className='text-muted minute-bg fs-6'>8 minute read</small>
                  </p>
                </div>
                <div className='col-lg-7 col-md-7 col-sm-12'>
                  <div className='card-body border'>
                    <h5 className='card-title text-start bizOwner-headings'>
                      Normalizing Adjustment in Rent for Business Appraisal
                    </h5>
                    <p className='card-text text-start bizOwner-parag'>
                      This is a wider card with supporting text below as a natural lead-in to
                      additional content. This content is a little bit longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Link to='/how-to-value-a-business/all-articles'
            className='text-decoration-none'>
             <button className='fs-4'>Read all articles</button>
            </Link>

       </div>
         

          <div className='col-lg-4 col-md-12 tools-column'>
            <h3 className='text-start fs-1 fw-light border-bottom py-4'>Expanded Resources</h3>
            <div className='text-start fs-3 text-primary'>
              
              <li className='list-unstyled border-bottom buyer-tools'>
                <MdAutoStories className='' />
                <Link to='/small-business-success-stories' className=' mx-3 bizOwner-tools'>
                  Success Stories{' '}
                </Link>
              </li>
              

              <li className='list-unstyled border-bottom buyer-tools'>
                <FaIndustry className='' />
                <Link to='/learning-center/industries' className=' mx-3 bizOwner-tools'>
                  Industry Specific Tips{' '}
                </Link>
              </li>
             

             
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToValueABusiness
