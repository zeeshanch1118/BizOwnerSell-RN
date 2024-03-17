import React from 'react'

import './BusinessForSaleBlog.css'
import BlogHeader from './BlogHeader'
import BlogAsideBar from './BlogAsideBar'
import BlogMain from './blog-main/BlogMain'
import {Outlet} from 'react-router-dom'
// import BlogMain from '../blog-main/BlogMain'
const BusinessForSaleBlog = () => {
  return (
    <>
      <div className='container'>
        <BlogHeader />

        <div className='row d-flex justify-content-between'>
          <div className='col-md-8'>
            <Outlet />
          </div>
          <div className='col-md-4'>
            <BlogAsideBar />
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessForSaleBlog
