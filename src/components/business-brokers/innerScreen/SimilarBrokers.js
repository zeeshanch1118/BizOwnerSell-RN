import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../top-broker/TopBrokers.css'
import locationIcon from '../../../assets/icons/location.svg'
import dummyImage from '../../../assets/dummy.jpg'
export default class SimilarBrokers extends Component {
  render() {
    return (
      <>
        {this.props?.data[0]?.samiler_broker?.length > 0 ? (
          <div
            className='container-fluid'
            style={{backgroundColor: '#ffffff', borderRadius: '5px'}}
          >
            <div className='container'>
              <div className='row'>
                <div id='similar-broker-box' className={`Client mt-10 mb-10 pb-10 pt-5 ps-0`}>
                  <h2 className='ms-3 pt-2 '>
                    Similar Broker |
                    <Link to={'/search-for-broker'} className='fs-7 cursor-pointer fw-bold ps-1'>
                      View All Brokers
                    </Link>
                  </h2>
                  <div
                    className={`d-flex flex-wrap gap-1 ps-0 ${
                      this.props.data[0]?.samiler_broker?.length > 3
                        ? 'justify-content-start'
                        : 'justify-content-start'
                    }`}
                  >
                    {this.props.data[0]?.samiler_broker?.length > 0
                      ? this.props.data[0]?.samiler_broker?.map((item, index) => (
                          <>
                            <div className='top-brokers' key={index}>
                              <div className='px-0 pt-0  pb-5 biz-owner-similar-listing-cards-broker mt-4 m-md-5 ms-0 card-heading-broker '>
                                <div className=' '>
                                  <Link to={`/search-for-broker/${item?.id}`}>
                                    <div className=' m-auto' style={{height: '14rem'}}>
                                      {item?.profile_image?.full_path &&
                                      item?.profile_image?.file_name ? (
                                        <img
                                          src={
                                            item?.profile_image?.full_path +
                                            'medium/' +
                                            item?.profile_image?.file_name
                                          }
                                          className='d-block  img-fluid m-auto'
                                          style={{
                                            height: '14rem',
                                            width: '100%',
                                            borderRadius: '5px',
                                          }}
                                        />
                                      ) : (
                                        <img
                                          src={dummyImage}
                                          className='img-border-broker img-fluid m-auto'
                                          style={{borderRadius: '5px'}}
                                        />
                                      )}
                                    </div>

                                    <div className=' px-3 pt-3 text-center card-heading-broker text-dark fw-bolder  text-truncate'>
                                      {item?.first_name
                                        ? item?.first_name + ' ' + item?.last_name
                                        : 'NaN'}
                                    </div>
                                    <div className='text-center mx-2 text-dark card-heading-broker px-3  text-truncate'>
                                      <span className='me-2'>
                                        <img src={locationIcon} alt='' className='mb-1' />
                                      </span>
                                      {item?.location != null && item?.location != 'null'
                                        ? item?.location?.country ??
                                          item?.location?.formatted_address
                                        : 'USA'}
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    )
  }
}
