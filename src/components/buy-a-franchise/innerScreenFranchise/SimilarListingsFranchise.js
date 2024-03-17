import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './SimilarListingsFranchise.css'
import dummyImg from '../../../assets/dummy.jpg'

const SimilarListingsFranchise = (props) => {
  const [similalListing, setSimilarListing] = useState([])
  useEffect(() => {
    setSimilarListing(props?.data[0])
  }, [props])
  return (
    <>
      {similalListing?.length > 0 ? (
        <div className='container-fluid mt-10 biz-owner-similar-listing-section '>
          <div className='container'>
            <div className='row  py-5 pb-10  '>
              <div className='row gap-3 mx-auto ps-0 d-flex biz-owner-similar-box-container '>
                <div className=' col-md-10  '>
                  <h4 className=' mt-5 mb-1 bizOwner-business-description'>Similar Franchises </h4>
                  {/* <Link to='/search-businesses-for-sale' className='Similar-Listings-links mb-3'>
                Cleaning Businesses for Sale |
              </Link>
              <Link to='/search-businesses-for-sale' className='ps-2 Similar-Listings-links'>
                All Businesses for Sale in Cook County
              </Link> */}
                </div>
                {similalListing?.map((item, index) => (
                  <>
                    <div
                      className='px-0 col-10 col-md-4 col-lg-3 mt-3 mx-auto mx-md-0 biz-owner-similar-listing-cards '
                      key={index}
                      style={{width: '20rem'}}
                    >
                      <div className='px-0 '>
                        <Link to={`/franchise/${item.slug}/${item.id}`}>
                          {item?.slider_images[0] ? (
                            <div className='d-flex ' style={{height: '14rem'}}>
                              <img
                                // carouselImg[0].full_path + 'thumb/' + carouselImg[0].file_name
                                src={
                                  item?.slider_images[0]?.full_path +
                                  'thumb/' +
                                  item?.slider_images[0]?.file_name
                                }
                                // src='https://pbs.twimg.com/media/CwXhmYzXUAAb7r2?format=jpg&name=4096x4096'
                                className='img-fluid m-auto '
                                alt='...'
                                // style={{height: '13rem', width: '100%'}}
                                style={{height: '14rem', width: '100%', borderRadius: 7}}
                              />
                            </div>
                          ) : (
                            <div style={{height: '14rem'}}>
                              <img
                                // carouselImg[0].full_path + 'thumb/' + carouselImg[0].file_name
                                src={dummyImg}
                                className='img-fluid biz-owner-similar-listing-images'
                                alt='...'
                                style={{height: '14rem', width: '100%'}}
                              />
                            </div>
                          )}

                          <div className='card-body px-3 py-3 text-center'>
                            <h5 className='mb-0 py-1  text-truncate'>
                              {item?.title?.substring(0, 30) ?? ''}

                              {/* Profitable Growing of Tequila */}
                            </h5>
                            <p className='mb-0 text-primary text-truncate'>
                              {item?.location?.city
                                ? item?.location?.city
                                : item?.location?.country}
                              <span className='d-block similar-listings-asking-price text-truncate'>
                                Cash Rrequired: ${item?.cash_required ?? ''}
                                {/* 1226,750{' '} */}
                              </span>
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default SimilarListingsFranchise
