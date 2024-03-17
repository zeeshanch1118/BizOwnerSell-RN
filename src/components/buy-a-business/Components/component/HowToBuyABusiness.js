import React, {useState} from 'react'
import './HowToBuyABusiness.css'
import {Badge} from 'react-bootstrap'
import IconFind from '../../../../assets/icons/IconFind.png'
import IconMakeOffer from '../../../../assets/icons/IconMake-an-offer.png'
import IconFinancing from '../../../../assets/icons/IconGet-financing.png'
import IconKey from '../../../../assets/icons/IconKeys.png'
import understandYourOptions from '../../../../assets/icons/IconUnderstand-your-options.png'
import howToBuyaSmallBusiness from '../../../../assets/images/how-to-buy-a-small-business.jpg'
import ReactCardFlip from 'react-card-flip'
import {Link} from 'react-router-dom'
import {BsFillStarFill, BsNewspaper, BsPersonSquare, BsSearch} from 'react-icons/bs'
import {FaIndustry, FaMoneyBillAlt} from 'react-icons/fa'
import {MdWebStories, MdOutlineCoronavirus} from 'react-icons/md'

const HowToBuyABusiness = () => {
  const [isFlipped, setIsFlipped] = useState(false)

  const [isFlipped2, setIsFlipped2] = useState(false)

  const [isFlipped3, setIsFlipped3] = useState(false)

  const [isFlipped4, setIsFlipped4] = useState(false)

  const [isFlipped5, setIsFlipped5] = useState(false)

  return (
    <>
      <div className='buy-bg'>
        <div className='container text-start'>
          <h3 className='text-white fs-2 lead'>Learning Center</h3>
          <h2 className='text-white fs-1 fw-normal pb-3'>Buyer Learning Center</h2>
        </div>
        <div className='bizOwner-card-bg'>
          <div className='container'>
            <div className='d-flex gap-3 justify-content-center flex-wrap'>
              <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
                <div className='card buy-card text-center'>
                  <div
                    onMouseOver={() => setIsFlipped(true)}
                    className='card-body p-4 text-center d-flex flex-column justify-content-between'
                  >
                    <div>
                      <Badge className='rounded-pill bizOwner-badge'>1</Badge>
                    </div>

                    <div>
                      <h5 className='card-title2  mt-2'>Understand Your Options</h5>
                    </div>
                    <div>
                      <img src={understandYourOptions} className='icon-img mt-5' />
                    </div>
                  </div>
                </div>
                <div className='card buy-card'>
                  <div
                    className='card-body p-4 text-center d-flex flex-column justify-content-between'
                    onMouseLeave={() => setIsFlipped(false)}
                  >
                    <div>
                      <Badge bg=' rounded-pill bizOwner-badge'>1</Badge>
                    </div>
                    <div>
                      <h5 className='card-title2 text-start  card-back-text'>
                        Understand Your Options
                      </h5>

                      <p className='text-start fs-4'>
                        Before you buy, important things to consider about small...
                      </p>
                    </div>
                    <div>
                      <Link to='/stepper/understand-your-options'>
                        <button className=' my-4 learn-more-btn text-nowrap'>Learn More</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </ReactCardFlip>

              <ReactCardFlip isFlipped={isFlipped2} flipDirection='horizontal'>
                <div className='card buy-card'>
                  <div
                    onMouseEnter={() => setIsFlipped2(true)}
                    onMouseMove={() => setIsFlipped2(true)}
                    className='card-body p-4 text-center d-flex flex-column justify-content-between'
                  >
                    <div>
                      <Badge bg=' rounded-pill bizOwner-badge center'>2</Badge>
                    </div>

                    <div>
                      <h5 className='card-title2 mt-2 text-nowrap'>
                        Find the Right
                        <br />
                        Business
                      </h5>
                    </div>

                    <div>
                      <img src={IconFind} className='icon-img img-fluid mt-5' />
                    </div>
                  </div>
                </div>
                <div className='card buy-card'>
                  <div
                    className='card-body p-4 text-center d-flex flex-column justify-content-between'
                    onMouseLeave={() => setIsFlipped2(false)}
                  >
                    <div>
                      <Badge bg=' rounded-pill bizOwner-badge text-center'>2</Badge>
                    </div>
                    <div>
                      <h5 className='card-title2 text-start card-back-text text-nowrap'>
                        Find the Right
                        <br />
                        Business
                      </h5>

                      <p className='text-start fs-4'>
                        Where to look, what to ask and how to recognize a great...
                      </p>
                    </div>
                    <div>
                      <Link to='/stepper/find-the-right-business'>
                        <button className=' learn-more-btn my-4 text-nowrap'>Learn More</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </ReactCardFlip>
              <ReactCardFlip isFlipped={isFlipped3} flipDirection='horizontal'>
                <div className='card buy-card'>
                  <div
                    onMouseEnter={() => setIsFlipped3(true)}
                    onMouseMove={() => setIsFlipped3(true)}
                    className='card-body p-4 text-center d-flex flex-column justify-content-between'
                  >
                    <div>
                      <Badge bg=' rounded-pill bizOwner-badge '>3</Badge>
                    </div>
                    <div>
                      <h5 className='card-title2 mt-2'>
                        Make
                        <br />
                        an Offer
                      </h5>
                    </div>

                    <div>
                      <img src={IconMakeOffer} className='icon-img img-fluid mt-5' />
                    </div>
                  </div>
                </div>
                <div className='card buy-card'>
                  <div
                    className='card-body p-4 text-center d-flex flex-column justify-content-between'
                    onMouseLeave={() => setIsFlipped3(false)}
                  >
                    <div>
                      <Badge bg=' rounded-pill bizOwner-badge'>3</Badge>
                    </div>
                    <div>
                      <h5 className='card-title2 text-start card-back-text'>
                        Make
                        <br />
                        an Offer
                      </h5>
                      <p className='text-start fs-4'>
                        How to value a business, make a buyer-seller friendly...
                      </p>
                    </div>

                    <div>
                      <Link to='/stepper/make-an-offer'>
                        <button className=' learn-more-btn my-4 text-nowrap'>Learn More</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </ReactCardFlip>
              <ReactCardFlip isFlipped={isFlipped4} flipDirection='horizontal'>
                <div className='card buy-card'>
                  <div
                    onMouseEnter={() => setIsFlipped4(true)}
                    onMouseMove={() => setIsFlipped4(true)}
                    className='card-body p-4 text-center d-flex flex-column justify-content-between'
                  >
                    <div>
                      <Badge bg=' rounded-pill bizOwner-badge'>4</Badge>
                    </div>
                    <div>
                      <h5 className='card-title2 mt-2'>
                        Get
                        <br />
                        Financing
                      </h5>
                    </div>

                    <div>
                      <img src={IconFinancing} className='icon-img img-fluid mt-5' />
                    </div>
                  </div>
                </div>
                <div className='card buy-card'>
                  <div
                    className='card-body p-4 text-center d-flex flex-column justify-content-between'
                    onMouseLeave={() => setIsFlipped4(false)}
                  >
                    <div>
                      <Badge bg=' rounded-pill bizOwner-badge'>4</Badge>
                    </div>
                    <div>
                      <h5 className='card-title2 text-start card-back-text'>
                        Get
                        <br />
                        Financing
                      </h5>

                      <p className='text-start fs-4'>
                        The many ways you can finance the purchase of a...
                      </p>
                    </div>

                    <div>
                      <Link to='/stepper/get-financing'>
                        <button className='learn-more-btn my-2 text-nowrap'>Learn More</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </ReactCardFlip>
              <ReactCardFlip isFlipped={isFlipped5} flipDirection='horizontal'>
                <div className='card buy-card'>
                  <div
                    onMouseEnter={() => setIsFlipped5(true)}
                    onMouseMove={() => setIsFlipped5(true)}
                    className='card-body p-4 text-center d-flex flex-column justify-content-between'
                  >
                    <div>
                      <Badge bg=' rounded-pill bizOwner-badge'>5</Badge>
                    </div>
                    <div>
                      <h5 className='card-title2 mt-2'>
                        Close
                        <br />
                        the Deal
                      </h5>
                    </div>
                    <div>
                      <img src={IconKey} className='icon-img img-fluid mt-5' />
                    </div>
                  </div>
                </div>
                <div className='card buy-card'>
                  <div
                    className='card-body p-4 text-center d-flex flex-column justify-content-between'
                    onMouseLeave={() => setIsFlipped5(false)}
                  >
                    <div>
                      <Badge bg=' rounded-pill bizOwner-badge'>5</Badge>
                    </div>
                    <div>
                      <h5 className='card-title2 text-start card-back-text'>
                        Close
                        <br />
                        the Deal
                      </h5>

                      <p className='text-start fs-4'>
                        Due diligence and assuming ownership. What to review...
                      </p>
                    </div>
                    <div>
                      <Link to='/stepper/close-the-deal'>
                        <button className=' learn-more-btn my-4 text-nowrap'>Learn More</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </ReactCardFlip>
            </div>
          </div>
        </div>
      </div>

      <div className='container border-bottom '>
        <div className='row gx-5 align-items-center my-8'>
          <div className='col-lg-5 col-md-12 text-start border fs-4 p-4'>
            <h1 className='fs-1 fw-normal py-3'>How to Buy a Business</h1>
            <p>
              Begin your journey to financial independence with BizOwnerSell. Review our articles for
              information on each step of the process for business buyers.
              <br />
               Get an overview of the business buying process, including how to find and
              value businesses and tips for negotiating with sellers.
              <br />
              <br /> Edge Members get access to our educational video series and unlock powerful
              search and analysis tools to help you find the perfect business fit.{' '}
              
            </p>
          </div>
          <div className='col-lg-7 col-md-12 text-end'>
            <img src={howToBuyaSmallBusiness} className='border w-100' />
          </div>
        </div>
      </div>

      <div className='container pt-8'>
        <div className='row gy-2 gx-5 recent-insights-row '>
          <div className='col-lg-8 col-md-12'>
            <h3 className='fs-1 fw-light text-start mb-5 my-4'>
              Recent Insights for Business Buyers from BizOwnerSell
            </h3>
            <div className='card mb-3'>
              <Link
                to='opportunities-in-buying-and-selling-close-businesses'
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
                      <h5 className='bizOwner-headings text-start'>
                        Opportunities in Buying and Selling Closed Businesses
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
                to='cares-act-sba-stimulus-loan-closing-timeline-update'
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
                      <h5 className='bizOwner-headings text-start'>
                        CARES Act SBA Stimulus: SBA Loan Closing Timeline Update
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
                to='is-there-a-boom-for-business-buyers-within-this-gloom'
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
                      <h5 className=' text-start bizOwner-headings'>
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
                to='businesses-thriving-during-covid-19-and-positioned-for-growth-as-new-markets-emerge'
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
                      <h5 className=' text-start bizOwner-headings'>
                        Businesses Thriving During COVID-19 and Positioned for Growth as New
                        Markets...
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
                    <h5 className=' text-start bizOwner-headings'>
                      Opportunities in Buying and Selling Closed Businesses
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
                    <h5 className=' text-start bizOwner-headings'>
                      Opportunities in Buying and Selling Closed Businesses
                    </h5>
                    <p className='card-text text-start bizOwner-parag'>
                      This is a wider card with supporting text below as a natural lead-in to
                      additional content. This content is a little bit longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <Link to='/stepper/understand-your-options'>
                <button
                  variant='contained'
                  // onClick={handleNext}
                  // sx={{ mt: 1, mr: 1 }}
                  className='step-one-btn my-4'
                >
                  Go To Step One
                  {/* {index === steps.length - 1 ? 'Finish' : 'Continue'} */}
                </button>
              </Link>
            </div>
          </div>

          <div className='col-lg-4 col-md-6 tools-column'>
            <div className='row gy-4 '>
              <div className='col-12 border'>
                <h3 className='text-start border-bottom fs-1 fw-light py-4'>Tools for Buyers</h3>
                <div className='text-start fs-3 text-primary'>
                  

                  <li className='list-unstyled border-bottom buyer-tools'>
                    <BsSearch className='' />
                    <Link to='#' className=' mx-3 bizOwner-tools'>
                      Search for a Business{' '}
                    </Link>
                  </li>
                  <li className='list-unstyled border-bottom buyer-tools'>
                    <FaIndustry className='' />
                    <Link to='/learning-center/industries' className=' mx-3 bizOwner-tools'>
                      <span className='side-tools'>Industry Specific Tips</span>{' '}
                    </Link>
                  </li>
                  <li className='list-unstyled border-bottom buyer-tools'>
                    <MdWebStories className='' />
                    <Link to='/small-business-success-stories' className=' mx-3 bizOwner-tools'>
                      Success Stories{' '}
                    </Link>
                  </li>
                 
                </div>
              </div>
              {/* <div className='col-12 text-end border pb-4'>
                <div className='row g-0 align-items-center'>
                  <h3 className='text-start fs-1 fw-normal my-4'>
                    Get our detailed guide to
                    <br /> Buying a Business
                  </h3>

                  <div className='col-md-6 book-img'></div>
                  <div className='col-md-6 text-start'>
                    <p>
                      Price : $ <span className='text-decoration-line-through'>19.95</span>{' '}
                      <span className='free-text'> FREE!</span>
                    </p>
                    <button className='border-0 btn-primary p-3 fs-5 rounded text-white'>
                      Download Now
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HowToBuyABusiness
