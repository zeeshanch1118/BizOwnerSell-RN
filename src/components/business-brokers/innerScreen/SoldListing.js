import React from 'react'
import {Link} from 'react-router-dom'
import './ForSaleListing.css'

function SoldListing(props) {
  function UnsafeComponent({html}) {
    const decodedHTML = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    return <div dangerouslySetInnerHTML={{__html: decodedHTML}} />
  }
  return (
    <>
      {props?.sold[0]?.length > 0
        ? props?.sold[0]?.map((item, index) => (
            <div
              className='container biz-owner-buy-a-business-component-sold my-5   p-4'
              key={index}
            >
              <div className='row'>
                <div className='mt-5 mt-md-0 ps-4 pe-5 text-wrap  col-md-12 d-flex flex-column justify-content-between'>
                  <Link
                    to={`/sold-listing/${item?.listing_category}/${item?.id}`}
                    className='pb-4 text-truncate'
                  >
                    <h1 className=' biz-owner-heading py-0 my-0 text-primary mb-md-0 mb-5 me-0  align-top text-truncate'>
                      {item?.slug}
                    </h1>

                    <span className='d-flex biz-owner-business-paragraph pt-3 pt-sm-6 pe-sm-8 broker-sold-listings text-truncate card-heading-sold'>
                      {/* {item?.description?.replace(/(<([^>]+)>)/gi, ' ') ?? 'NaN'} */}
                      <UnsafeComponent html={item?.description ?? '---'} />
                    </span>
                  </Link>
                </div>

                <div className='col-12'>
                  <Link
                    to={`/sold-listing/${item?.listing_category}/${item?.id}`}
                    type='button'
                    className='btn px-5 px-md-9  text-nowrap biz-owner-contact-btn-sold mt-auto py-2  py-md-3'
                  >
                    See Detail
                  </Link>
                </div>
              </div>
            </div>
          ))
        : null}
      {props?.soldFranchise[0]?.length > 0
        ? props?.soldFranchise[0]?.map((item, index) => (
            <div
              className='container biz-owner-buy-a-business-component-sold my-5   p-4'
              key={index}
            >
              <div className='row'>
                <div className='mt-5 mt-md-0 ps-4 pe-5 text-wrap  col-md-12 d-flex flex-column justify-content-between'>
                  <Link to={`/sold-listing/${item?.listing_category}/${item?.id}`} className='pb-4'>
                    <h1 className=' biz-owner-heading py-0 my-0 text-primary mb-md-0 mb-5 me-0 text-wrap align-top'>
                      {item?.slug}
                    </h1>

                    <span className='d-flex biz-owner-business-paragraph pt-3 pt-sm-6 pe-sm-8 broker-sold-listings card-heading-sold'>
                      {item?.about?.replace(/(<([^>]+)>)/gi, ' ') ?? 'NaN'}
                    </span>
                  </Link>
                </div>

                <div className='col-12'>
                  <Link
                    to={`/sold-listing/${item?.listing_category}/${item?.id}`}
                    type='button'
                    className='btn px-5 px-md-9  text-nowrap biz-owner-contact-btn-sold mt-auto py-2  py-md-3'
                  >
                    See Detail
                  </Link>
                </div>
              </div>
            </div>
          ))
        : null}
    </>
  )
}

export default SoldListing
