import React from 'react'
import {Link} from 'react-router-dom'
import './OpportunitiesInBuyingAndSelling.css'
import {
  MdCoronavirus,
  MdOutlineNaturePeople,
  MdPointOfSale,
  MdOutlineAddBusiness,
} from 'react-icons/md'
import {BsNewspaper} from 'react-icons/bs'

const InnerSidebar = () => {
  return (
    <div>
      <div className='col-12'>
        <h3 className='text-start fs-1 fw-normal'>Resources & Advice</h3>
        <div className='text-start fs-3 text-primary'>
          {/* <li className="list-unstyled border-bottom lh-lg py-5 fs-2">
                    <MdCoronavirus className="" />
                    <Link to="/" className=" mx-3 tools">
                      Covid-19: Buyer Resources{" "}
                    </Link>
                  </li>
                  <li className="list-unstyled border-bottom lh-lg py-5 fs-2">
                    <MdCoronavirus className="" />
                    <Link to="/" className=" mx-3 tools">
                      Covid-19: Owner Resources
                    </Link>
                  </li> */}
          {/* <li className="list-unstyled border-bottom lh-lg py-5 fs-2">
                    <MdOutlineNaturePeople className="" />
                    <Link to="/" className=" mx-3 tools">
                      Get Help from a Broker
                    </Link>
                  </li> */}
          <li className='list-unstyled border-bottom lh-lg py-5 fs-2'>
            <MdPointOfSale className='' />
            <Link to='/sell-a-business' className=' mx-3 tools'>
              List Your Business for Sale
            </Link>
          </li>
          <li className='list-unstyled border-bottom lh-lg py-5 fs-2'>
            <MdOutlineAddBusiness className='' />
            <Link to='/small-business-valuation' className=' mx-3 tools'>
              Estimate Business Value
            </Link>
          </li>
          <li className='list-unstyled border-bottom lh-lg py-5 fs-2'>
            <BsNewspaper className='' />
            <Link to='/subscribe' className=' mx-3 tools'>
              Get Our Newsletters
            </Link>
          </li>
        </div>
      </div>
      <div className='col-12 text-end pb-4 border-bottom'>
        <h5 className='text-start border-bottom border-primary pb-2 pt-md-4 fs-2 fw-normal'>
          Get our Free Guides
        </h5>
        <div className='row g-0 align-items-center'>
          <h3 className='text-start fs-1 fw-normal my-2'>
            The BizOwnerSell Guide to Buying a Small Business
          </h3>

          <div className='col-6 book-img'>{/* <img src={babgBookCover} /> */}</div>
          <div className='col-md-6'>
            <p className='text-start lh-sm fs-5'>
              Get a detailed overview of the business buying process, including how to find and
              value businesses and tips for negotiating a buyer-seller friendly offer.
            </p>
            <p>
              Price : $ <span className='text-decoration-line-through'>19.95</span>{' '}
              <span className='free-text'>Now FREE!</span>
            </p>
            <button className='border-0 btn-primary text-white p-2 rounded'>Download Now</button>
          </div>
        </div>
      </div>

      <div className='col-12 text-end pb-4'>
        <div className='row g-0 align-items-center'>
          <h3 className='text-start fs-1 fw-normal my-4'>
            The BizOwnerSell Guide to Selling Your Small Business
          </h3>

          <div className='col-6 book-img'>{/* <img src={babgBookCover} /> */}</div>
          <div className='col-md-6'>
            <p className='text-start lh-sm fs-5'>
              Get a complete overview of the business sales process and step-by-step instructions to
              follow to help you prepare for a profitable exit from your business.
            </p>
            <p>
              Price : $ <span className='text-decoration-line-through'>19.95</span>{' '}
              <span className='free-text'>Now FREE!</span>
            </p>
            <button className='border-0 btn-primary text-white p-2 rounded'>Download Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InnerSidebar
