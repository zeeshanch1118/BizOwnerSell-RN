import React from 'react'
import babg_book_cover from '../../../../assets/media/blog/babg_book_cover.jpg'
import {Link} from 'react-router-dom'
import {BsFacebook} from 'react-icons/bs'
import {AiFillTwitterCircle} from 'react-icons/ai'
import {AiFillLinkedin} from 'react-icons/ai'
import {BsInfoCircleFill} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
const Covid19ResourcesAsideBar = () => {
  return (
    <>
      <div className='border p-3'>
        <h4 className='border-bottom'>Share this article</h4>
        <div className='my-2'>
          <BsFacebook className='fs-1 me-2 text-info' />
          <Link to='#'>Share on Facebook</Link>
        </div>
        <div className='my-2'>
          <AiFillTwitterCircle className='fs-1 me-2 text-primary' />
          <Link to='#'>Post to Twitter</Link>
        </div>
        <div className='my-2'>
          <AiFillLinkedin className='fs-1 me-2 text-primary' />
          <Link to='#'>Share on LinkedIn</Link>
        </div>
        <div className='my-2'>
          <MdEmail className='fs-1 me-2 text-dark' />
          <Link to='#'>Send via email</Link>
        </div>
      </div>
      <h2 className='mt-3'>Resources & Advice</h2>
      <div className='border-bottom'>
        <BsInfoCircleFill className='fs-1 text-primary me-2 mb-3' />
        <Link to='#'>COVID-19: Buyer Resources</Link>
      </div>
      <div className='border-bottom'>
        <BsInfoCircleFill className='fs-1 text-primary me-2 my-3 ' />
        <Link to='#'>COVID-19: Owner Resources</Link>
      </div>
      <div className='border-bottom'>
        <BsInfoCircleFill className='fs-1 text-primary me-2 my-3 ' />
        <Link to='#'>List Your Business for Sale</Link>
      </div>
      <div className='border-bottom'>
        <BsInfoCircleFill className='fs-1 text-primary me-2 my-3 ' />
        <Link to='#'>Estimate Business Value</Link>
      </div>
      <div className='border-bottom'>
        <BsInfoCircleFill className='fs-1 text-primary me-2 my-3 ' />
        <Link to='#'>Get Our Newsletters</Link>
      </div>
      <div className='border-bottom pb-5'>
        <h1 className='border-bottom border-primary my-4'>Get our Free Guides</h1>
        <p className='fw-bold fs-4'>The BizOwnerSell Guide to Buying a Small Business</p>
        <div className='row'>
          <div className='col-5'>
            <img src={babg_book_cover} className='img-fluid' alt='' />
          </div>
          <div className='col-7'>
            <p>
              Get a detailed overview of the business buying process, including how to find and
              value businesses and tips for negotiating a buyer-seller friendly offer. Price:
            </p>
            <p className='fs-4'>
              Price: $19.95 <span className='text-danger'>Now Free!</span>
            </p>
            <button className='border-0 p-4 bg-warning'>Download Now</button>
          </div>
        </div>
      </div>
      <div>
        <p className='fw-bold fs-4 mt-5'>The BizOwnerSell Guide to Buying a Small Business</p>
        <div className='row'>
          <div className='col-5'>
            <img src={babg_book_cover} className='img-fluid' alt='' />
          </div>
          <div className='col-7'>
            <p>
              Get a detailed overview of the business buying process, including how to find and
              value businesses and tips for negotiating a buyer-seller friendly offer. Price:
            </p>
            <p className='fs-4'>
              Price: $19.95 <span className='text-danger'>Now Free!</span>
            </p>
            <button className='border-0 p-4 bg-warning'>Download Now</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Covid19ResourcesAsideBar
