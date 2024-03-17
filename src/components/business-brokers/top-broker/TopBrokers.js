import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import locationIcon from '../../../assets/icons/location.svg'
import dummyImg from '../../../assets/dummy.jpg'

import './TopBrokers.css'

export default class TopBrokers extends Component {
  render() {
    console.log(this?.props?.topBroker)
    return (
      <>
        <div className='container-fluid' style={{backgroundColor: '#eff4f5', borderRadius: '5px'}}>
          <div className={`Client my-6`}>
            <h2 className='ms-3 mb-6 mb-md-0'>
              Top Brokers |{' '}
              <Link to={'/search-for-broker'} className='fs-6 cursor-pointer fw-bold ps-1'>
                View All Brokers
              </Link>
            </h2>
            <div
              className={`d-flex flex-wrap gap-1  ${
                this?.props?.topBroker?.length > 3 ? 'justify-content-center' : ''
              } `}
            >
              {this?.props?.topBroker?.length > 0
                ? this?.props?.topBroker?.map((item, index) => (
                    <div className='top-brokers' key={index}>
                      <div className='px-0 biz-owner-similar-listing-cards-broker mt-3 m-md-5  '>
                        <div className='px-0'>
                          <Link to={`/search-for-broker/${item?.id}`}>
                            <div
                              className=' m-auto'
                              style={{
                                height: '12rem',
                                overflow: 'hidden',
                              }}
                            >
                              {item.profile_image?.full_path && item.profile_image?.file_name ? (
                                <img
                                  src={
                                    item.profile_image?.full_path +
                                    'medium/' +
                                    item.profile_image?.file_name
                                  }
                                  className='d-block m-auto img-fluid '
                                  style={{height: '12rem', width: '100%', borderRadius: '7px'}}
                                />
                              ) : (
                                <img
                                  src={dummyImg}
                                  className='d-block img-fluid m-auto'
                                  style={{borderRadius: '5px'}}
                                />
                              )}
                            </div>

                            <div className=' px-3 pt-3 text-center text-dark fw-bolder  text-truncate'>
                              {item?.first_name ? item?.first_name + ' ' + item?.last_name : 'NaN'}

                              {/* <h5>sadsad</h5> */}
                              {/* <h5 className='mb-0 py-1   '>
                              {item?.title?.substring(0, 30) ?? ''}
                              {item?.title.length > 30 && '...'}
                              Profitable Growing of Tequila
                            </h5> */}
                            </div>
                            <div className=' px-3 pb-3 pt-1 text-center text-dark card-heading-broker  text-truncate'>
                              <span className='me-2 text-truncate'>
                                <img src={locationIcon} alt='' />
                              </span>
                              {item?.location != null && item?.location != 'null'
                                ? item?.location?.country ?? item?.location?.formatted_address
                                : 'USA'}
                              {/* <h5>sadsad</h5> */}
                              {/* <h5 className='mb-0 py-1   '>
                              {item?.title?.substring(0, 30) ?? ''}
                              {item?.title.length > 30 && '...'}
                              Profitable Growing of Tequila
                            </h5> */}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </>
    )
  }
}
