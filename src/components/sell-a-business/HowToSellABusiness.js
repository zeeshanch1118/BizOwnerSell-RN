import React, { useState } from "react";
import "./HowToSellABusiness.css";
import { Badge } from "react-bootstrap";
import IconHandshake from "../../assets/icons/sellerIcon/IconHandshake.png";
import IconClipBoard from "../../assets/icons/sellerIcon/IconClipboard.png";
import SetAnAskingPrice from "../../assets/icons/sellerIcon/IconSet-an-asking-price.png";
import AttractBuyers from "../../assets/icons/sellerIcon/IconAttract-buyers.png";
import IconNegotiating from "../../assets/icons/sellerIcon/IconNegotiating.png";
import howToSellaSmallBusiness from "../../assets/HowToSellaBusinessImages/how-to-sell-a-small-business.jpg";
import ReactCardFlip from "react-card-flip";
import { Link } from "react-router-dom";
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

const HowToSellABusiness = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const [isFlipped2, setIsFlipped2] = useState(false);

  const [isFlipped3, setIsFlipped3] = useState(false);

  const [isFlipped4, setIsFlipped4] = useState(false);

  const [isFlipped5, setIsFlipped5] = useState(false);

  return (
    <>
      <div className="buy-bg">
        <div className="container text-start">
          <h3 className="text-white learning-center-heading lead">Learning Center</h3>
          <h2 className="text-white main-seller-heading fw-light">Seller Learning Center</h2>
        </div>
        <div className="bizOwner-cards-bg">
          <div className="container">
            <div className="d-flex justify-content-between">
              <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className="card buy-card">
                  <div
                    onMouseEnter={() => setIsFlipped(true)}
                    onMouseMove={() => setIsFlipped(true)}
                    className="card-body p-3 text-center d-flex flex-column justify-content-between">
                    <div>
                      <Badge bg=" rounded-pill badge badge-sell">1</Badge>
                    </div>
                    <div>
                      <h5 className="card-title1 mt-2">
                      Prepare for Your
                       Exit
                    </h5>
                    </div>
                    
                           <div>
                          <img src={IconClipBoard} className="icon-img mt-4" />  
                           </div>
                    
                  </div>
                </div>
                <div className="card buy-card">
                  <div
                    className="card-body p-3 text-center d-flex flex-column justify-content-between"
                    onMouseLeave={() => setIsFlipped(false)}>
                    <div>
                      <Badge bg=" rounded-pill badge badge-sell">1</Badge>
                    </div>
                    <div>
                       <h5 className="card-title1 text-start card-back-text">
                      Prepare for Your
                      Exit
                    </h5>
                       <p className="text-start seller-card-text">
                      Plan ahead and prepare your business to avoid costly
                      ...
                    </p>
                    </div>
                   
                  
                    
                   
                   <div>
                    <Link to="/stepper/prepare-for-your-exit">
                        <button className="button-z learn-more-btn text-nowrap">Learn More</button>
                    </Link>
                   </div>
                    
                  </div>
                </div>
              </ReactCardFlip>

              <ReactCardFlip isFlipped={isFlipped2} flipDirection="horizontal">
                <div className="card buy-card">
                <div
                    onMouseEnter={() => setIsFlipped2(true)}
                    onMouseMove={() => setIsFlipped2(true)}
                    className="card-body p-3 text-center d-flex flex-column justify-content-between">
                    <div>
                      <Badge bg=" rounded-pill badge badge-sell">2</Badge>
                    </div>
                    <div>
                      <h5 className="card-title1 mt-2">
                      Set an Asking
                      <br />
                      Price
                    </h5>
                    </div>
                    <div>
                        <img
                      src={SetAnAskingPrice}
                      className="icon-img img-fluid mt-4"
                    />
                    </div>

                  
                  </div>
                </div>
                <div className="card buy-card">
                  <div
                    className="card-body p-3 text-center d-flex flex-column justify-content-between"
                    onMouseLeave={() => setIsFlipped2(false)}>
                    <div>
                      <Badge bg=" rounded-pill badge badge-sell">2</Badge>
                    </div>
                    <div>
                            <h5 className="card-title1 text-start card-back-text">
                      Set an Asking
                       Price
                     
                    </h5>

                    <p className="text-start seller-card-text">
                      Evaluate and calculate. Valuation methods and how to set...
                    </p>
                    </div>
                    <div>
                      <Link to="/stepper/set-an-asking-price">
                        <button className="button-z learn-more-btn text-nowrap">Learn More</button>
                    </Link>
                    </div>
                    
                  </div>
                </div>
              </ReactCardFlip>
              <ReactCardFlip isFlipped={isFlipped3} flipDirection="horizontal">
                <div className="card buy-card">
                  <div
                    onMouseEnter={() => setIsFlipped3(true)}
                    onMouseMove={() => setIsFlipped3(true)}
                    className="card-body p-3 text-center d-flex flex-column justify-content-between">
                    <div>
                      <Badge bg=" rounded-pill badge badge-sell">3</Badge>
                    </div>
                    <div>
                       <h5 className="card-title1 mt-2">
                      Attract
                      Buyers
                    </h5>
                    </div>
                   <div>
                      <img
                      src={AttractBuyers}
                      className="icon-img img-fluid mt-4"
                    />
                   </div>

                  
                  </div>
                </div>
                <div className="card buy-card">
                  <div
                    className="card-body p-3 text-center d-flex flex-column justify-content-between"
                    onMouseLeave={() => setIsFlipped3(false)}>
                    <div>
                      <Badge bg=" rounded-pill badge badge-sell">3</Badge>
                    </div>
                    <div>
                           <h5 className="card-title1 text-start card-back-text">
                      Attract
                       Buyers
                    </h5>

                    <p className="text-start seller-card-text">
                      Market your business and attract qualified buyers - even...
                      
                    </p>
                    </div>
               <div>
                <Link to="/stepper/attract-buyers">
                        <button className="button-z learn-more-btn text-nowrap">
                        Learn More
                      </button>
                    </Link>
               </div>
                    
                  </div>
                </div>
              </ReactCardFlip>
              <ReactCardFlip isFlipped={isFlipped4} flipDirection="horizontal">
                <div className="card buy-card">
                  <div
                    onMouseEnter={() => setIsFlipped4(true)}
                    onMouseMove={() => setIsFlipped4(true)}
                    className="card-body p-3 text-center d-flex flex-column justify-content-between">
                    <div>
                      <Badge bg=" rounded-pill badge badge-sell">4</Badge>
                    </div>
                    <div>
                        <h5 className="card-title1 mt-2">
                      Negotiating 
                      Strategies
                    </h5>
                    </div>
                  <div>
                     <img
                      src={IconNegotiating}
                      className="icon-img img-fluid mt-4"
                    /> 
                  </div>

                  
                  </div>
                </div>
                <div className="card buy-card">
                  <div
                    className="card-body p-3 text-center d-flex flex-column justify-content-between"
                    onMouseLeave={() => setIsFlipped4(false)}>
                    <div>
                       <Badge bg=" rounded-pill badge badge-sell">4</Badge>
                    </div>
                   <div>
                        <h5 className="card-title1 text-start card-back-text">
                      Negotiating 
                      Strategies
                    </h5>

                    <p className="text-start seller-card-text">
                      How to negotiate from a position of strength, incentivize
                     ...
                    </p>
                   </div>
                <div>
                    <Link to="/stepper/negotiating-strategies">
                        <button className="button-z learn-more-btn text-nowrap">Learn More</button>
                    </Link>
                </div>
                  
                  </div>
                </div>
              </ReactCardFlip>
              <ReactCardFlip isFlipped={isFlipped5} flipDirection="horizontal">
                <div className="card buy-card">
                  <div
                    onMouseEnter={() => setIsFlipped5(true)}
                    onMouseMove={() => setIsFlipped5(true)}
                    className="card-body p-3 text-center d-flex flex-column justify-content-between">
                    <div>
                      <Badge bg=" rounded-pill badge badge-sell">5</Badge>
                    </div>
                    <div>
                        <h5 className="card-title1 mt-2">
                      Finalize
                       the Deal
                    </h5>
                    </div>
                  <div>
                     <img
                      src={IconHandshake}
                      className="icon-img img-fluid mt-4"
                    /> 
                  </div>

                  
                  </div>
                </div>
                <div className="card buy-card">
                  <div
                    className="card-body p-3 text-center d-flex flex-column justify-content-between"
                    onMouseLeave={() => setIsFlipped5(false)}>
                    <div>
                      <Badge bg=" rounded-pill badge badge-sell">5</Badge>
                    </div>
                    <div>
                         <h5 className="card-title1 text-start card-back-text">
                      Finalize
                       the Deal
                    </h5>

                    <p className="text-start seller-card-text">
                      Due diligence and assuming ownership. What to review and
                     ...
                    </p>
                    </div>
                 <div>
                     <Link to="/stepper/finalize-the-deal">
                        <button className="button-z learn-more-btn text-nowrap">Learn More</button>
                    </Link>
                 </div>
                 
                  </div>
                </div>
              </ReactCardFlip>
            </div>
          </div>
        </div>
      </div>

      <div className="container border-bottom mt-8 pb-8">
        <div className="row gx-5 align-items-center">
          <div className="col-lg-5 col-md-12 text-start border p-2">
          <div className="px-5">
            <h1 className="fs-1 fw-normal py-3">Get Ready to Exit:</h1>
            <h4 className="fs-3 fw-normal">
             Download our
              <span className="text-primary "> Guide to Selling</span>
            </h4>
            <li className="lead fs-4">Step-by-step tips to prepare</li>
            <li className="lead fs-4">Worksheets to stay on track</li>
            <br />
            <h4 className="fs-3 fw-normal">
              Visit our{" "}
              <span className="text-primary ">Exit Planning Resources</span>
            </h4>
            <li className="lead fs-4">Step-by-step tips to prepare</li>
            <li className="lead fs-4">Worksheets to stay on track</li>
            <br />
            <h4 className="fs-3 fw-normal">
              Consult a{" "}
              <span className="text-primary ">Local Business Broker</span>
            </h4>
            <li className="lead fs-4">Step-by-step tips to prepare</li>
            <li className="lead fs-4">Worksheets to stay on track</li>
            <br />
          </div>
</div>

          <div className="col-lg-7 col-md-12 text-end">
            <img src={howToSellaSmallBusiness} className="border w-100" />
          </div>
         
        </div>
      </div>

      <div className="container mt-8">
        <div className="row gy-2 gx-5 recent-insights-row ">
          <div className="col-lg-8 col-md-12">
            <h3 className="fs-1 fw-light text-start mb-4 my-4">
              Recent Insights for Business Sellers from BizOwnerSell
            </h3>
            <div className="card mb-3">
              <Link
                to="/how-to-sell-a-business/retaining-key-employees-is-critical-to-selling-your-business"
                className="text-decoration-none">
                <div className="row g-0">
                  <div className="col-lg-5 col-sm-12 col-md-5 closed-img">
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className="card-text text-start">
                      <small className="text-muted minute-bg fs-6">
                        9 minute read
                      </small>
                    </p>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-12">
                    <div className="card-body border">
                      <h5 className=" text-start bizOwner-headings fw-light">
                        Retaining Key Employees Is Critical to Selling Your
                        Business
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
                to="/learning-center/is-there-a-boom-for-business-buyers-within-this-gloom"
                className="text-decoration-none">
                <div className="row g-0">
                  <div className="col-lg-5 col-sm-12 col-md-5 cares-img">
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className="card-text text-start">
                      <small className="text-muted minute-bg fs-6">
                        4 minute video
                      </small>
                    </p>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-12">
                    <div className="card-body border">
                      <h5 className=" text-start bizOwner-headings fw-light">
                        Watch: 7 Key Elements for Creating a Business for Sale
                        Listing
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
                to='/learning-center/is-there-a-boom-for-business-buyers-within-this-gloom'
                className="text-decoration-none">
                <div className="row g-0">
                  <div className="col-lg-5 col-sm-12 col-md-5 boom-img">
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className="card-text text-start">
                      <small className="text-muted minute-bg fs-6">
                        4 minute read
                      </small>
                    </p>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-12">
                    <div className="card-body border">
                      <h5 className=" text-start bizOwner-headings fw-light">
                      How to Choose the Right Business Broker
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
                to="/stepper/six-rules-of-thumb-for-business-valuation"
                className="text-decoration-none">
                <div className="row g-0">
                  <div className="col-lg-5 col-sm-12 col-md-5 covid-thrive-img">
                    {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                    <p className="card-text text-start">
                      <small className="text-muted minute-bg fs-6">
                        4 minute read
                      </small>
                    </p>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-12">
                    <div className="card-body border">
                      <h5 className=" text-start bizOwner-headings fw-light">
                        6 Rules of Thumb for Business Valuation
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
                <div className="col-lg-5 col-sm-12 col-md-5 closed-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text text-start">
                    <small className="text-muted minute-bg fs-6">
                      5 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body border">
                    <h5 className=" text-start bizOwner-headings fw-light">
                      The Do’s and Don’ts of Seller Financing a Business for
                      Sale
                    </h5>
                    <p className="card-text text-start bizOwner-parag">
                      Seller financing a business for sale is when the owner is
                      willing to personally finance a portion of the purchase
                      price.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-12">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-lg-5 col-sm-12 col-md-5 closed-img">
                  {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
                  <p className="card-text text-start">
                    <small className="text-muted minute-bg fs-6">
                      4 minute read
                    </small>
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card-body border">
                    <h5 className=" text-start bizOwner-headings fw-light">
                      How to Determine an Asking Price for Your Business
                    </h5>
                    <p className="card-text text-start bizOwner-parag">
                      Determining an asking price for your business can be
                      tricky. If you price it too high, you won’t attract any
                      interest.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/stepper/prepare-for-your-exit">
                <button
                  variant="contained"
                  // onClick={handleNext}
                  // sx={{ mt: 1, mr: 1 }}
                  className="step-one-btn my-4 button-z">
                  Go To Step One
                  {/* {index === steps.length - 1 ? 'Finish' : 'Continue'} */}
                </button>
              </Link>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 tools-column">
            <div className="row gy-4 ">
              <div className="col-12 border">
                <h3 className="text-start border-bottom fs-1 fw-light py-4">
                  Tools for Sellers
                </h3>
                <div className="text-start bizOwner-headings text-primary">
                  <li className="list-unstyled border-bottom buyer-tools">
                    <MdOutlineSell className="" />
                    <Link to="#" className=" mx-3 bizOwner-tools">
                      List Your Business for Sale{" "}
                    </Link>
                  </li>
                 
                  <li className="list-unstyled border-bottom buyer-tools">
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
                  <li className="list-unstyled border-bottom buyer-tools">
                    <MdOutlineInsights className="" />
                    <Link to="#" className=" mx-3 bizOwner-tools">
                      Quaterly Insight Report{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom buyer-tools">
                    <MdWebStories className="" />
                    <Link to="/small-business-success-stories" className=" mx-3 bizOwner-tools">
                      Success Stories{" "}
                    </Link>
                  </li>

                  {/* <li className="list-unstyled border-bottom buyer-tools text-nowrap">
                    <MdOutlineCoronavirus className="" />
                    <Link to="#" className=" mx-3 bizOwner-tools ">
                      Covid 19: Buyer Resources{" "}
                    </Link>
                  </li> */}
                </div>
              </div>
              {/* <div className="col-12 text-end border pb-4">
                <div className="row g-0 align-items-center">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToSellABusiness;
