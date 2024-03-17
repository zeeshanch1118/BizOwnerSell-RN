import machines from '../../../assets/images/846cfd13-f7e3-4e13-96ee-6e01b1963ff8-W768.png'
import waterDrink from '../../../assets/images/2e8d9680-ff65-4f58-851b-ec3f71447488-W768.jpg'
import fish from '../../../assets/images/d5633df0-4b60-4659-932b-18eb19b4c3b7-W768.jpg'

import './ClientSlider.css'
import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import Slider from 'react-slick'
import {MdArrowBackIos, MdArrowForwardIos} from 'react-icons/md'
import {getHomeSesvices} from '../../services/home-services'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
export default class FeatureSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allBusinesses: [],
      loader: false,
    }
  }
  async componentDidMount() {
    this.getBusinessListings()
  }
  async getBusinessListings() {
    try {
      this.state.loader = false
      const result = await getHomeSesvices()

      if (result.status == true) {
        this.state.loader = true
        this.setState({allBusinesses: result.topBusiness})
      } else {
        this.state.loader = false
      }
    } catch (e) {
      console.log('error getAllBusinessesListings', e)
    }
  }
  render() {
    const settings = {
      dots: false,
      nav: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <>
        <div className='row features_row'>
          <div className='col-8 col-md-3 '>
            <div className=' text-center'>
              <div className=' rounded w-100'>
                <div className='text-start'>
                  <h2 className='featured-business fw-bolder'>Recent Businesses</h2>
                  <div className=' text-center'>
                    <p className='fs-2 text-start mb-7 fw-lighter'>
                      Latest businesses you can find here
                    </p>
                    <div className='text-start mt-3'>
                      <Link
                        to='/search-businesses-for-sale'
                        className='px-8 py-3 btn-color2  rounded-pill border border-primary text-nowrap fs-3 fw-lighter'
                      >
                        See more
                      </Link>
                    </div>
                    {/* <div className='text-lg-end mt-lg-12'>
                      <span className='p-3 bg-primary rounded'><Link to='#'><MdArrowBackIos className='fs-2 text-white' /></Link></span> <span className='p-3 bg-primary rounded'><Link to='#'><MdArrowForwardIos className='fs-2 text-white' /></Link></span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.loader ? (
            <div className='col-9' id='landing'>
              <Slider {...settings}>
                {this.state.allBusinesses?.map((item, index) => (
                  <div className='owl_item' key={index}>
                    <div className=' text-center'>
                      <div
                        className='card-shadow rounded w-100 h-auto'
                        // style={{width: '278.67px', height: '277.61px'}}
                      >
                        <div className='card px-0'>
                          <div style={{height: '14rem'}}>
                            <img
                              src={
                                item.slider_images[0]?.full_path +
                                'medium/' +
                                item.slider_images[0]?.file_name
                              }
                              className='img-fluid m-auto'
                              alt='...'
                              style={{width: '100%', height: '14rem', borderRadius: '0.625rem'}}
                            />
                          </div>
                          <div className='card-body p-3 pb-5 text-center'>
                            <h5 className=' card-heading'>
                              {item?.title ? item?.title : 'No Title'}
                              {/* {item?.title ? item?.title.substring(0, 25) : 'NaN'}
                                  {item?.title?.length >= 25 && '...'} */}
                            </h5>
                            <p className='card-text location-text card-heading'>
                              {item?.location?.formatted_address
                                ? item?.location?.formatted_address
                                : 'No Location'}
                            </p>
                            <div className='text-center'>
                              <Link to={`/businesses/${item?.slug}/${item?.id}`}>
                                <button className='py-1 px-3 btn-color rounded-pill border border-primary text-nowrap'>
                                  {`Asking Price: $${item?.asking_price}`}
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div
              className='col-9 d-flex justify-content-center align-items-center'
              style={{height: '40vh'}}
            >
              <div>
                <img src={MainScreenLoader} alt='BizOwnerSell' width='80' height='80' />
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}
