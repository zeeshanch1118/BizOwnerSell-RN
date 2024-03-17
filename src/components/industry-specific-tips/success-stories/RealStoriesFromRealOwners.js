import React from 'react'
import readingGirl from "../../../assets/images/reading-girl.jpg";
import {Link} from 'react-router-dom';
import './SuccessStories.css';
import './SuccessStoriesImages.css';

const RealStoriesFromRealOwners = () => {
  return (
    <>
     <div className='bizOwner-bg-color py-2'>
          <div className='container text-start pt-4'>
              <h3 className='text-white bizOwner-lead-heading'>Learning Center</h3>
              <h2 className=' bizOwner-top-headings pb-3'>Real Stories from Real Owners</h2>
          </div>
    </div>
    <div className='container'>
    <div style={{marginBottom:"10px"}}>
    <div className="row gy-2 gx-4 recent-insights-row bizOwner-top-img">
    <div className="col-lg-12 col-md-12 mt-10">
          <div className="row g-0 ">
          <Link to='/success-story/its-not-just-the-money-the-importance-of-winning-a-sellers-trust-buying-a-business'>
            <div className="col-12">
              <img
                src={readingGirl}
                className="img-fluid rounded-start border border-bottom-0 w-100 closed-img"
                alt="..."
              />
            </div>
                  <div className="col-12 my-0 minute-parent">
                    <div className="card-body border text-body ">
                <p className="card-text text-start">
                        <small className="text-muted minute-bg2 fs-6">
                    5 minute read
                  </small>
                </p>
                <h5 className="card-title text-start bizOwner-headings pt-4">
                It’s Not Just the Money: The Importance of Winning a Seller’s Trust When Buying a Business
                </h5>
                <p className="card-text text-start bizOwner-parag text-black">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
            </Link>
          </div>

        </div>
       
        </div>
        </div>
    <div style={{marginBottom:"10px", paddingTop:"12px"}}>
    <div className="row gy-5 gx-4 recent-insights-row">
      <div className="col-lg-8 col-md-12">
       
        <div className="card bizOwner-padding">
        <Link to='/success-story/an-american-tale-leaving-corporate-america-to-acquire-a-piece-of-main-street' className='text-decoration-none'>
          <div className="row g-0">
            <div className="col-lg-5 col-sm-12 col-md-5 img-main-street minute-parent">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg2 fs-6">
                  7 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start step-headings bizOwner-headings">
                Leaving Corporate America to Acquire a Piece of...
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
        <div className="card bizOwner-padding">
        <Link to='/success-story/entrepreneur-finds-his-pandemic-silver-lining-buying-an-eco-friendly-franchise' className='text-decoration-none'>
          <div className="row g-0">
                    <div className="col-lg-5 col-sm-12 col-md-5 img-silver-line minute-parent">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg2 fs-6">
                  7 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start step-headings bizOwner-headings">
                An Entrepreneur Finds His Pandemic Silver Lining...
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
        <div className="card bizOwner-padding">
        <Link to='/success-story/selling-a-business-during-a-pandemic-when-talented-employees-are-the-perfect-buyers' className='text-decoration-none'>
          <div className="row g-0">
                    <div className="col-lg-5 col-sm-12 col-md-5 img-selling minute-parent">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg2 fs-6">
                  7 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start step-headings bizOwner-headings">
                Selling A Business During A Pandemic: When...
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
        <div className="card bizOwner-padding">
        <Link to='/success-story/he-knew-the-healthcare-industry-so-he-bought-a-clinical-research-business'>
          <div className="row g-0">
                    <div className="col-lg-5 col-sm-12 col-md-5 img-clinic-research minute-parent">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg2 fs-6">
                  7 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start step-headings bizOwner-headings">
                He Knew the Healthcare Industry, So He Bought...
                </h5>
                <p className="card-text text-start bizOwner-parag text-black">
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
        <div className="card bizOwner-padding">
        <Link to='/success-story/meet-mr-bagel-meister-a-story-of-small-business-resilience-during-covid-19-and-beyond'>
          <div className="row g-0">
                    <div className="col-lg-5 col-sm-12 col-md-5 img-meet minute-parent">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg2 fs-6">
                  7 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start step-headings bizOwner-headings">
                Meet Mr. Bagel Meister: A Story Of Small Business Resilience...
                </h5>
                <p className="card-text text-start bizOwner-parag text-black">
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
        <div className="card bizOwner-padding">
        <Link to='/success-story/immigrant-to-franchisee-a-story-of-hard-work-and-big-dreams'>
          <div className="row g-0">
                    <div className="col-lg-5 col-sm-12 col-md-5 img-immigrant minute-parent">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg2 fs-6">
                  7 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start step-headings bizOwner-headings">
                From Immigrant To Franchisee: A Story Of Hard Work And Big Dreams
                </h5>
                <p className="card-text text-start bizOwner-parag text-black">
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
        <div className="card bizOwner-padding">
        <Link to='/success-story/blackhawk-fiberwerx-an-idea-guy-makes-entrepreneurship-his-reality'>
          <div className="row g-0">
                    <div className="col-lg-5 col-sm-12 col-md-5 img-small-boy minute-parent">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg2 fs-6">
                  7 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start step-headings bizOwner-headings">
                Bringing Life To Small Businesses: An 'Idea Guy'
                </h5>
                <p className="card-text text-start bizOwner-parag text-black">
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
        <div className="card bizOwner-padding">
        <Link to='/success-story/startups-to-shawarma-an-la-techie-finds-success-in-the-mountains-1'>
          <div className="row g-0">
                    <div className="col-lg-5 col-sm-12 col-md-5 img-sharma minute-parent">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg2 fs-6">
                  7 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start step-headings bizOwner-headings">
                Startups To Shawarma: An L.A. Techie Finds Success...
                </h5>
                <p className="card-text text-start bizOwner-parag text-black">
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
        <div className="card bizOwner-padding">
        <Link to='/success-story/europa-gifts-homecoming-a-story-of-second-career-entrepreneurship'>
          <div className="row g-0">
                    <div className="col-lg-5 col-sm-12 col-md-5 img-home minute-parent">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg2 fs-6">
                  7 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start step-headings bizOwner-headings">
                Homecoming: A Story Of Second Career Entrepreneurship
                </h5>
                <p className="card-text text-start bizOwner-parag text-black">
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
        <div className="card bizOwner-padding">
        <Link to='/success-story/nordic-mountain-meet-the-skier-with-a-knack-for-running-snow-parks'>
          <div className="row g-0">
                    <div className="col-lg-5 col-sm-12 col-md-5 img-fun-success minute-parent">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg2 fs-6">
                  7 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start step-headings bizOwner-headings">
                Channeling Fun Into Success: Meet The Skier With...
                </h5>
                <p className="card-text text-start bizOwner-parag text-black">
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
        <div className="card bizOwner-padding">
        <Link to='/success-story/sold-bakery-in-less-than-30-days'>
          <div className="row g-0">
                    <div className="col-lg-5 col-sm-12 col-md-5 img-couple-business minute-parent">
              {/* <img src={closedBusiness} className="img-fluid rounded-start closed-img" alt="..."/> */}
              <p className="card-text text-start">
                <small className="text-muted minute-bg2 fs-6">
                  7 minute read
                </small>
              </p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="card-body border">
                <h5 className="card-title text-start step-headings bizOwner-headings">
                How One Couple Sold Their Bakery Business In Less
                </h5>
                <p className="card-text text-start bizOwner-parag text-black">
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
     
      </div>
</div>
       </div>
       
        </>
  )
}

export default RealStoriesFromRealOwners
