import '../../Landing-screen/body/ClientSlider.css'
import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import Slider from 'react-slick'
import MainScreenLoader from '../../../assets/Loader/MainScreenLoader.gif'
import recommendedIcon from '../../../assets/Dashboard/recomended.svg'
import locationIcon from '../../../assets/icons/location.svg'

export default class RecommendedBusinesses extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    function SampleNextArrow(props) {
      const {className, style, onClick} = props
      return (
        <div
          className={className}
          style={{
            ...style,
            display: 'block',
          }}
          onClick={onClick}
        />
      )
    }

    function SamplePrevArrow(props) {
      const {className, style, onClick} = props
      return <div className={className} style={{...style, display: 'block'}} onClick={onClick} />
    }

    const settings = {
      dots: false,
      nav: true,
      infinite: false,
      speed: 500,
      pauseOnHover: true,
      slidesToShow: 4,
      autoplay: true,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
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
        <div className='row mx-1 total-listing-section px-md-7 mt-5'>
          <div className='col-12 '>
            <div className='text-start border border-gray border-top-0 border-left-0 border-right-0 border-bottom-3'>
              <h3 className='text-start  pt-6'>
                <span className='d-none d-md-inline'>
                  <img src={recommendedIcon} alt='' className='listing-icon-recommend' />
                </span>
                Recommended Businesses
              </h3>
            </div>
          </div>
          {/* {this.state.loader ? (
            <> */}
          <div className='col-md-12 mx-auto py-5' id='broker-slider'>
            <Slider {...settings}>
              {this.props?.similarBusinesses?.map((item, index) => (
                <Link to={`/businesses/${item.slug}/${item.id}`} key={index}>
                  <div className='owl_item '>
                    <div className=' text-center'>
                      <div
                        className=' rounded w-100 h-auto '
                        // style={{width: '278.67px', height: '277.61px'}}
                      >
                        <div className='card total-listing-section-broker mx-md-3'>
                          <div style={{height: '13rem'}}>
                            <img
                              src={
                                item.slider_images[0]?.full_path +
                                'thumb/' +
                                item.slider_images[0]?.file_name
                              }
                              style={{height: '13rem'}}
                              className='card-img-top'
                              alt='...'
                            />
                          </div>
                          <div className=' text-center py-3'>
                            <h5 className='card-title card-heading'>{item?.title}</h5>
                            <p className='card-text location-text card-heading'>
                              <span className='me-2 '>
                                <img src={locationIcon} alt='' className='d-inline mb-1 w-11px' />
                              </span>
                              {item?.location?.formatted_address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
          {/* </>
          ) : (
            <div
              className='col-9 d-flex justify-content-center align-items-center'
              style={{height: '40vh'}}
            >
              <div>
                <img src={MainScreenLoader} alt="BizOwnerSell" width="80" height="80" />
              </div>
            </div>
          )} */}
        </div>
      </>
    )
  }
}
