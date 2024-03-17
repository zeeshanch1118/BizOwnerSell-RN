import machines from '../../../assets/images/846cfd13-f7e3-4e13-96ee-6e01b1963ff8-W768.png'
import waterDrink from '../../../assets/images/2e8d9680-ff65-4f58-851b-ec3f71447488-W768.jpg'
import cloths from '../../../assets/images/1952c652-8799-4eaf-a489-99feaf359652-W768.jpg'
import fish from '../../../assets/images/d5633df0-4b60-4659-932b-18eb19b4c3b7-W768.jpg'
import restaurant from '../../../assets/images/1c6e0302-00d1-4be3-a242-f94328adf6e2-W768.jpg'
import store from '../../../assets/images/382d71dc-5a29-4593-827e-d6404412c559-W768.jpg'
import './Slider.css'
import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import Slider from 'react-slick'
import {MdArrowBackIos, MdArrowForwardIos} from 'react-icons/md'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import {getHomeSesvices} from '../../services/home-services'
export default class ListingSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latestFranchises: [],
      loader: false,
    }
  }
  async componentDidMount() {
    this.getFranchiseListings()
  }
  async getFranchiseListings() {
    try {
      this.state.loader = false
      const result = await getHomeSesvices()
      if (result.status == true) {
        this.state.loader = true
        this.setState({latestFranchises: result.topFranchise})
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
      // infinite: children.length > 4,
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
        <div className='row justify-content-center'>
          <div className='col-8 col-md-3'>
            <div className=' text-center'>
              <div
                className=' rounded w-100'
                // style={{width: '278.67px', height: '277.61px', backgroundColor: '#DEE9F1'}}
              >
                <div className='text-start'>
                  <h2 className='featured-business fw-bolder'>Recent Listings</h2>
                  <div className=' text-center'>
                    <p className='fs-2 text-start text-primary'>
                      Latest franchises you can find here
                    </p>
                    <div className='text-start mt-6'>
                      <Link
                        to='/search-franchises'
                        className='px-8 py-3 fs-3 btn-color2 rounded-pill border border-primary text-nowrap'
                        style={{backgroundColor: '#DEE9F1'}}
                      >
                        See more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.loader ? (
            <div className='col-9' id='landing'>
              <Slider {...settings}>
                {this.state.latestFranchises?.map((item, index) => (
                  <div className='owl_item' key={index}>
                    <div className='text-center'>
                      <div className='card-shadow w-100 h-auto rounded'>
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
                              <Link
                                to={`/franchise/${item?.slug}/${item?.id}`}
                                className='text-primary'
                              >
                                <button className=' py-1 px-3 btn-color rounded-pill border border-primary text-nowrap'>
                                  {`Asking Price: $${item?.cash_required}`}
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
