import React from 'react'
import {Link} from 'react-router-dom'
import '../../../components/BuyBizzOwner.css'

const GuideToSelling = () => {
  return (
    <>
      <div className='dashboard-bg py-0' style={{ backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
        <div className='container p-10'>
          <div className='row bg-white p-5 rounded mx-1'>
            <h2 className=' d-inline bizOwner-add-new-listing-heading py-5'>The BizOwnerSell Guide to Selling Your Small Business</h2>

            <div className='col-3'>
              <div className='h-100'>
                <img
                  className='img-fluid h-100'
                  src='https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/777018/Refresh-BootstrapMistakes-Luke_Social-b5bd00869567f6a93de26c346fb31726-a686c7763b9b4bbc9f14b6a2d6ab7e0a.png'
                  alt=''
                />
              </div>
            </div>
            <div className='col-5'>
              <h3 className='bizOwner-add-new-listing-inner-heading'>
                Author: Barbara Findlay Schenck
              </h3>

              <p>
                Price: <span className='text-decoration-line-through'>$19.95 </span>{' '}
                <span className='text-danger mx-1'> FREE!</span>
              </p>
              <p className='text-success'>Available Now</p>
              <button className='btn btn-primary d-block'>Download PDF</button>
              <span className=' h-6 d-block text-muted my-2 small '>Registration required.</span>
              <span className='text-muted small '>
                By downloading, you agree to our <Link to={'#'}> privacy notice.</Link>
              </span>
            </div>
            <div className='col-10 my-5 '>
              <h3 className='bizOwner-guid-to-selling-inner-heading fs-1 fw-lighter mt-4'>Book Description</h3>
              <p className='lh-lg fs-5'>
                Produced by BizOwnerSell, the Internet's Largest Business for Sale Marketplace, and
                written in conjunction with Small Business Strategist, Barbara Findlay Schenck,
                author of best-selling business books including Selling Your Business For Dummies,
                this guide provides a comprehensive overview of the small business sales process
                including actionable advice and step-by-step instructions to help maximize selling
                success.
              </p>
              <h5 className='my-5 bizOwner-guid-to-selling-inner-heading fs-2 fw-lighter mt-4'>
                This 150-page digital book provides
              </h5>
              <ul className='lh-lg fs-6'>
                <li>An overview of the small business sale process</li>
                <li>Steps to follow as you prepare your business for sale</li>
                <li>Advice on assembling a sale team and maintaining confidentiality</li>
                <li>Tips on how to effectively market your business for sale</li>
                <li>Advice regarding buyer-seller negotiations</li>
                <li>Advice on financing and tax implications</li>
              </ul>
              <h4 className='my-5 bizOwner-guid-to-selling-inner-heading fs-1 fw-lighter mt-4'>Reader Review</h4>
              <p className='lh-lg fs-6'>
                "I am grateful to BizOwnerSell for providing this kind of information on their site --
                a small business owner like myself really needed this objective, unbiased,
                unemotional 'primer'." –Patricia F. Hoffman, Health Club Owner
              </p>
              <div className=' col-3 my-5'>
                <h4 className='bizOwner-guid-to-selling-inner-heading fs-1 fw-light py-3'>About the Author</h4>
                <img
                  className='img-fluid'
                  src='https://miro.medium.com/max/640/1*cEgXKxclDwg8xWtQz98DpQ.jpeg'
                  alt=''
                />
              </div>
              <div className=' col-8 my-5 fs-6 lh-lg'>
                "I am grateful to BizOwnerSell for providing this kind of information on their site --
                a small business owner like myself really needed this objective, unbiased,
                unemotional 'primer'." –Patricia F. Hoffman, Health Club Owner
              </div>
            </div>
            <div className='col-8'>
              <h4 className='bizOwner-guid-to-selling-inner-heading fs-1 fw-light py-3'>About BizOwnerSell</h4>
              <p className='lh-lg fs-6'>
                BizOwnerSell is the Internet's largest and most heavily trafficked business for sale
                marketplace, with more business for sale listings, more unique users, and more
                search activity than any other service. BizOwnerSell currently has an inventory of
                approximately 45,000 businesses for sale and more than 1.4 million monthly visits.
                BizOwnerSell also has one of the largest databases of sale comparables for recently
                sold businesses and one of the industry's leading franchise directories.
              </p>
            </div>
            <div>
              <button className='btn btn-primary fs-5'>Download Guide to selling</button>
            </div>
            <span className='text-muted small mt-4'>
              Registration required. By downloading, you agree to our
              <Link to={'#'}> privacy notice.</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default GuideToSelling
