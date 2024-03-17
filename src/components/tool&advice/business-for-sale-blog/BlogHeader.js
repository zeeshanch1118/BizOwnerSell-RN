import React from 'react'
import {Link} from 'react-router-dom'
import first from '../../../assets/media/blog/first.jpg'
const BlogHeader = () => {
  return (
    <>
      <header className='pt-4'>
        <div className='d-lg-flex'>
          <Link to='/blog' className=' pe-3'>
            Latest News
          </Link>
          <Link to='/blog/category/Business-Brokerage' className='border-start px-3'>
            Business Brokerage
          </Link>
          <Link to='/blog/category/Business-Financing' className='border-start px-3'>
            Business Financing
          </Link>
          <Link to='/blog/category/Business-Trends' className='border-start px-3'>
            Business Trends
          </Link>

          <Link to='/blog/category/Buying-a-Business' className='border-start px-3'>
            Buying a Business
          </Link>
          <Link to='/blog/category/Franchising' className='border-start px-3'>
            Franchising
          </Link>
          <Link to='/blog/category/Selling-a-Business' className='border-start px-3'>
            Selling a Business
          </Link>
        </div>

        <hr />
        <div className=' d-none d-lg-block my-5'>
          <div className='d-flex'>
            <div className='border-end  border-2 pe-3' style={{width: '17.5rem'}}>
              <img src={first} className='img-fluid mb-2' alt='...' />

              <Link to='#' className='mt-3'>
                20 Tips For Running a Successful Restaurant Business 20 Tips For Running a
                Successful Restaurant Business
              </Link>
            </div>
            <div className='border-end border-2 px-2' style={{width: '17.5rem'}}>
              <img src={first} className='img-fluid mb-2' alt='...' />

              <Link to='#'>
                20 Tips For Running a Successful Restaurant Business 20 Tips For Running a
                Successful Restaurant Business
              </Link>
            </div>
            <div className='border-end border-2 px-2' style={{width: '17.5rem'}}>
              <img src={first} className='img-fluid mb-2' alt='...' />

              <Link to='#'>
                20 Tips For Running a Successful Restaurant Business 20 Tips For Running a
                Successful Restaurant Business
              </Link>
            </div>
            <div className='border-end border-2 px-2' style={{width: '17.5rem'}}>
              <img src={first} className='img-fluid mb-2' alt='...' />

              <Link to='#'>
                20 Tips For Running a Successful Restaurant Business 20 Tips For Running a
                Successful Restaurant Business
              </Link>
            </div>
            <div className='px-2' style={{width: '17.5rem'}}>
              <img src={first} className='img-fluid mb-2' alt='...' />

              <Link to='#'>
                20 Tips For Running a Successful Restaurant Business 20 Tips For Running a
                Successful Restaurant Business
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default BlogHeader
