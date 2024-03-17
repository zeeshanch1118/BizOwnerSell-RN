import React from 'react'
import {Link} from 'react-router-dom'
import valReport from '../../assets/media/valReportPromo3.png'
import demographics from '../../assets/media/feature-demographics.png'
import insights from '../../assets/media/feature-insights.png'
import badge from '../../assets/media/feature-badge.png'
import stats from '../../assets/media/feature-PM-stats.png'
import alerts from '../../assets/media/feature-PM-alerts.png'
import note from '../../assets/media/feature-PM-note.png'
import PMvideo from '../../assets/media/feature-PMvideo.png'
import PMrecs from '../../assets/media/feature-PMrecs.png'
import './BizBuySellEdge.css'
import {FaCalculator} from 'react-icons/fa'
import {AiOutlineAreaChart} from 'react-icons/ai'
import {FaChartPie} from 'react-icons/fa'
import {FaAddressBook} from 'react-icons/fa'
import {AiOutlineBarChart} from 'react-icons/ai'
import {FaThumbsUp} from 'react-icons/fa'
import {FaBullhorn} from 'react-icons/fa'
import {FaVideo} from 'react-icons/fa'
const BizBuySellEdge = () => {
  return (
    <>
      {/* Header */}
      <header>
        <div className='headers_bg'>
          <div className='container'>
            <div className='row text-center  row-fluid  pt-3'>
              <h1 className=' py-3' style={{fontSize: '35px', fontWeight: '400'}}>
                Powerful Tools for Serious Buyers and Owners.
              </h1>

              <p className='biz_Edge_p fs-2 fw-lighter mb-0'>
                Unlock advanced features to help you find the perfect business or plan your exit.
              </p>
              <div className='text-center position-top '>
                <Link to='/upgrade'>
                  <div className=' d-inline-block my-2 pt-3 '>
                    <h2 className='fs-2 text-light p-3 text-center fw-normal btn_bg_color'>
                      Become a BizOwnerSell Edge Member
                    </h2>
                  </div>
                </Link>
                <div>As low as $14.99/month</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Inner Header Start */}
      <div className='container-fluid  d-none d-md-block'>
        <div className=' container '>
          <div className='row row-fluid mt-4 g-2 '>
            <div className='col-lg-3 col-md-6'>
              <div className='mb-2 '>
                <a href='#valreport' className=' link_style'>
                  <FaCalculator size={20} className='me-3 fs-4 fw-normal mb-2' />
                  Free Valuation Report
                </a>
              </div>
              <div>
                <a href='#demoData' className='link_style'>
                  <FaChartPie size={20} className='me-3 fs-5 mb-2' />
                  View Demographic Data
                </a>
              </div>
            </div>
            <div className='col-lg-3 col-md-6'>
              <div className='mb-2'>
                <a href='#demoData' className=' link_style'>
                  <AiOutlineAreaChart size={23} className='me-2 mb-2' />
                  View Market Insights
                </a>
              </div>
              <div>
                <a href='#seriousBuyer' className='link_style'>
                  <FaAddressBook size={18} className='me-3 mb-1' />
                  Appear as a Serious Buyer
                </a>
              </div>
            </div>
            <div className='col-lg-3 col-md-6'>
              <div className='mb-2'>
                <a href='#activityStats' className=' link_style'>
                  <AiOutlineBarChart size={23} className='me-3 mb-2' />
                  Access Activity Stats
                </a>
              </div>
              <div>
                <a href='#alerts' className='link_style'>
                  <FaBullhorn size={20} className='me-3 mb-2' />
                  Unlock Exclusive Alerts
                </a>
              </div>
            </div>
            <div className='col-lg-3 col-md-6'>
              <div className='mb-2'>
                <a href='#recommendations' className=' link_style'>
                  <FaThumbsUp size={15} className='me-3 mb-2' />
                  Get Recommendations
                </a>
              </div>
              <div>
                <a href='#buyerVideos' className='link_style'>
                  <FaVideo size={17} className='me-3 mb-1' />
                  Buyers Video Series
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
      {/* Inner Header End */}

      {/* Main Section Start */}
      <main>
        <div className='container'>
          <div className='row border-bottom flex-column-reverse flex-lg-row' id='valreport'>
            <div className='col-lg-4 col-12 col-12  pt-4'>
              <h1 className='biz_Edge_h1 fs-1 pb-1 fw-normal'>Get Free Valuation Reports</h1>
              <p className='biz_Edge_p fw-normal lh-3'>
                BizOwnerSell Edge members receive one free Valuation Report per month, a savings of
                up to $59.95. Valuation Reports compile data from sold businesses across numerous
                industries and locations and help you better understand the value of a business.
              </p>
              <Link to='/upgrade' className='get_started fw-normal'>
                Get started now
              </Link>
            </div>
            <div className='col-lg-8 col-12 '>
              <img src={valReport} className='w-100 ' alt='' />
            </div>
          </div>
          <div className='row  border-bottom flex-column-reverse flex-lg-row' id='demoData'>
            <div className='col-lg-4 col-12 pt-4'>
              <h1 className='biz_Edge_h1 fs-1 pb-1 fw-normal'>Discover Local Demographics</h1>
              <p className='biz_Edge_p fw-normal lh-3'>
                Get to know your potential customer base with complete market demographics including
                household income, population change, age range, walkability score and much more.
              </p>
              <Link to='/upgrade' className='get_started'>
                Get started now
              </Link>
            </div>
            <div className='col-lg-8 col-12'>
              <img src={demographics} className='w-100' alt='' srcset='' />
            </div>
          </div>
          <div className='row border-bottom flex-column-reverse flex-lg-row'>
            <div className='col-lg-4 col-12 pt-4'>
              <h1 className='biz_Edge_h1 fs-1 pb-1 fw-normal'>Commercial Real Estate Data</h1>
              <p className='biz_Edge_p fw-normal lh-3'>
                Estimate the true cost of ownership using actual commercial real estate sale and
                lease rates for businesses in the market area.
              </p>
              <Link to='/upgrade' className='get_started'>
                Get started now
              </Link>
            </div>
            <div className='col-lg-8 col-12'>
              <img src={insights} className='w-100' alt='' srcset='' />
            </div>
          </div>
          <div className='row border-bottom flex-column-reverse flex-lg-row' id='seriousBuyer'>
            <div className='col-lg-4 col-12 pt-4'>
              <h1 className='biz_Edge_h1 fs-1 pb-1 fw-normal'>Show you're a serious buyer</h1>
              <p className='biz_Edge_p fw-normal lh-3'>
                Show sellers you're seriously interested and ready to take action with a special
                designation for BizOwnerSell Edge Members. Your email and on-site communication will
                be emphasized to help brokers and sellers quickly identify you as a top buyer
                prospect.
              </p>
              <Link to='/upgrade' className='get_started'>
                Get started now
              </Link>
            </div>
            <div className='col-lg-8 col-12'>
              <img src={badge} className='w-100' alt='' srcset='' />
            </div>
          </div>
          <div className='row border-bottom flex-column-reverse flex-lg-row' id='activityStats'>
            <div className='col-lg-4 col-12 pt-4'>
              <h1 className='biz_Edge_h1 fs-1 pb-1 fw-normal'>Access activity stats</h1>
              <p className='biz_Edge_p fw-normal lh-3'>
                Gauge the popularity of business-for-sale listings with an expanded Listing
                Statistics section, visible to BizOwnerSell Edge Members only. Activity tracking
                data is calculated real-time, and available for all 45,000 businesses in our
                marketplace.
              </p>
              <Link to='/upgrade' className='get_started'>
                Get started now
              </Link>
            </div>
            <div className='col-lg-8 col-12'>
              <img src={stats} className='w-100' alt='' srcset='' />
            </div>
          </div>
          <div className='row border-bottom flex-column-reverse flex-lg-row' id='alerts'>
            <div className='col-lg-4 col-12 pt-4'>
              <h1 className='biz_Edge_h1 fs-1 pb-1 fw-normal'>Unlock exclusive alerts</h1>
              <p className='biz_Edge_p fw-normal lh-3'>
                Quickly identify the best deals with icons for Hot Businesses and Price Reductions.
                Also unlock a "Seller Contacted" badge that lets you easily see only the newest
                listings.
              </p>
              <Link to='/upgrade' className='get_started'>
                Get started now
              </Link>
            </div>
            <div className='col-lg-8 col-12'>
              <img src={alerts} className='w-100' alt='' srcset='' />
            </div>
          </div>
          <div className='row border-bottom flex-column-reverse flex-lg-row'>
            <div className='col-lg-4 col-12 pt-4'>
              <h1 className='biz_Edge_h1 fs-1 pb-1 fw-normal'>Add private notes</h1>
              <p className='biz_Edge_p fw-normal lh-3'>
                Attach your personal notes and reminders to saved businesses and seller contact
                messages to keep your thoughts secure. Save your questions and comments when and
                where they're most valuable, so you can stay one step ahead in buyer-seller
                negotiations.
              </p>
              <Link to='/upgrade' className='get_started'>
                Get started now
              </Link>
            </div>
            <div className='col-lg-8 col-12'>
              <img src={note} className='w-100' alt='' srcset='' />
            </div>
          </div>
          <div className='row border-bottom flex-column-reverse flex-lg-row' id='buyerVideos'>
            <div className='col-lg-4 col-12 pt-4'>
              <h1 className='biz_Edge_h1 fs-1 pb-1 fw-normal'>Business buyers video series</h1>
              <p className='biz_Edge_p fw-normal lh-3'>
                Ed Pendarvis, creator of the largest small-business brokerage network in the world,
                hosts a video education series which will guide you step-by-step through the entire
                process of successfully buying a business. The video series covers topics such as
                finding the right business, evaluating financing options, and negotiating the final
                price with sellers.
              </p>
              <Link to='/upgrade' className='get_started'>
                Get started now
              </Link>
            </div>
            <div className='col-lg-8 col-12'>
              <img src={PMvideo} className='w-100' alt='' srcset='' />
            </div>
          </div>
          <div className='row border-bottom flex-column-reverse flex-lg-row' id='recommendations'>
            <div className='col-lg-4 col-12 pt-5'>
              <h1 className='biz_Edge_h1 fs-1 pb-1 fw-normal'>
                Get custom business recommendations
              </h1>
              <p className='biz_Edge_p fw-normal lh-3'>
                You are unique, and so are your business goals. Put our intelligent, automated
                business search agent to work to identify only the best matches from our inventory
                of 45,000 active for-sale listings. See your personalized recommendations now, and
                get new results daily!
              </p>
              <Link to='/upgrade' className='get_started'>
                Get started now
              </Link>
            </div>
            <div className='col-lg-8 col-12'>
              <img src={PMrecs} className='w-100' alt='' srcset='' />
            </div>
          </div>
          <div className='text-center my-5'>
            <Link to='/upgrade'>
              <div className='text-center text-light d-inline-block btn_bg_color p-2 px-3 fs-4'>
                Become a BizOwnerSell Edge Member
              </div>
            </Link>
            <div className='mt-3'>As low as $14.99/month</div>
          </div>
        </div>
      </main>
      {/* Main Section End */}
    </>
  )
}

export default BizBuySellEdge
