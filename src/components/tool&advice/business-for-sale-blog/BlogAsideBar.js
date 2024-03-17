import React from 'react'
import {Link} from 'react-router-dom'
import ambassador from '../../../assets/media/blog/logo_ambassador.png'
import babg_book_cover from '../../../assets/media/blog/babg_book_cover.jpg'
const BlogAsideBar = () => {
  return (
    <div>
      <img src={ambassador} alt='' />
      <h1 className='border-bottom border-primary'>Stay Connected</h1>
      <div className='my-4'>
        <Link to='#' className='btn btn-icon btn-facebook me-5 '>
          <i className='fab fa-facebook-f fs-4'></i>
        </Link>
        <Link to='#' className='btn btn-icon btn-google me-5 '>
          <i className='fab fa-google fs-4'></i>
        </Link>

        <Link to='#' className='btn btn-icon btn-linkedin me-5 '>
          <i className='fab fa-linkedin fs-4'></i>
        </Link>
      </div>

      <h1 className='border-bottom border-primary'>Get our Free Guides</h1>
      <p className='fw-bold fs-4'>The BizOwnerSell Guide to Buying a Small Business</p>
      <div className='row'>
        <div className='col-5'>
          <img src={babg_book_cover} className='img-fluid' alt='' />
        </div>
        <div className='col-7'>
          <p>
            Get a detailed overview of the business buying process, including how to find and value
            businesses and tips for negotiating a buyer-seller friendly offer. Price:
          </p>
          <p className='fs-4'>
            Price: $19.95 <span className='text-danger'>Now Free!</span>
          </p>
          <button className='border-0 p-4 text-light bg-blog-color'>Download Now</button>
        </div>
      </div>
      <hr />
      <div className='row'>
        <p className='fw-bold fs-4'>The BizOwnerSell Guide to Buying a Small Business</p>
        <div className='col-5'>
          <img src={babg_book_cover} className='img-fluid' alt='' />
        </div>
        <div className='col-7'>
          <p>
            Get a detailed overview of the business buying process, including how to find and value
            businesses and tips for negotiating a buyer-seller friendly offer. Price:
          </p>
          <p className='fs-4'>
            Price: $19.95 <span className='text-danger'>Now Free!</span>
          </p>
          <button className='border-0 p-4 text-light bg-blog-color'>Download Now</button>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default BlogAsideBar
